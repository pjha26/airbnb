import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
    console.log('=== Checkout API Called ===');

    try {
        const { userId } = await auth();
        console.log('User ID from auth():', userId);

        if (!userId) {
            console.log('User not authenticated');
            return NextResponse.json({
                error: 'You must be signed in to make a reservation.'
            }, { status: 401 });
        }

        const body = await req.json();
        console.log('Request body:', body);

        // For now, just return success to confirm auth works
        console.log('Auth successful! User ID:', userId);
        return NextResponse.json({
            success: true,
            message: 'Authentication works! Stripe integration will be added next.',
            userId: userId,
            url: '/payment/success?session_id=test_' + Date.now()
        });

    } catch (error) {
        console.error('=== ERROR ===');
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);

        return NextResponse.json(
            {
                error: error.message || 'Failed to process request',
                details: error.toString()
            },
            { status: 500 }
        );
    }
}
