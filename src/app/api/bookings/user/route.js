import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
    console.log('=== FETCHING USER BOOKINGS ===');

    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            console.log('❌ No user or email found');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const email = user.emailAddresses[0].emailAddress;
        console.log('User email:', email);

        // Find MongoDB user
        const dbUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!dbUser) {
            console.log('❌ MongoDB user not found for email:', email);
            return NextResponse.json([], { status: 200 });
        }

        console.log('Querying reservations for MongoDB userId:', dbUser.id);

        // Fetch user's reservations with listing details
        const reservations = await prisma.reservation.findMany({
            where: {
                userId: dbUser.id,
            },
            include: {
                listing: {
                    select: {
                        id: true,
                        title: true,
                        location: true,
                        price: true,
                        images: true,
                        rating: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        console.log(`✅ Found ${reservations.length} reservations`);
        console.log('=== BOOKINGS FETCH COMPLETED ===');

        return NextResponse.json(reservations, { status: 200 });
    } catch (error) {
        console.error('❌ Error fetching user bookings:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            stack: error.stack,
        });
        return NextResponse.json({
            error: 'Internal Server Error: ' + error.message
        }, { status: 500 });
    }
}
