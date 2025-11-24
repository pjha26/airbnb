import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            // Create the reservation in database
            await prisma.reservation.create({
                data: {
                    userId: session.metadata.userId,
                    listingId: session.metadata.listingId,
                    startDate: new Date(session.metadata.startDate),
                    endDate: new Date(session.metadata.endDate),
                    totalPrice: parseFloat(session.metadata.totalPrice),
                    guests: JSON.parse(session.metadata.guests).adults + JSON.parse(session.metadata.guests).children,
                    paymentStatus: 'PAID',
                    stripeSessionId: session.id,
                },
            });

            console.log('Reservation created successfully for session:', session.id);
        } catch (error) {
            console.error('Error creating reservation:', error);
            return NextResponse.json({ error: 'Database Error' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
