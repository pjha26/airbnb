import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function PATCH(request) {
    try {
        const user = await currentUser();
        const body = await request.json();
        const { name, bio, gender, phone, image } = body;

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = user.emailAddresses[0].emailAddress;

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                name,
                bio,
                gender,
                phone,
                image
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
