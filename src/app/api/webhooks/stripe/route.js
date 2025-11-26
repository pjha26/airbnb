import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    console.log('=== WEBHOOK RECEIVED ===');

    const sig = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET is not configured');
        return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    let event;

    try {
        const body = await req.text();
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        console.log('✅ Webhook signature verified');
    } catch (err) {
        console.error('❌ Webhook signature verification failed:', err.message);
        return NextResponse.json({ error: 'Webhook Error: ' + err.message }, { status: 400 });
    }

    console.log('Event type:', event.type);

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        console.log('Processing checkout session:', session.id);

        try {
            // Validate required metadata
            const requiredFields = ['userId', 'listingId', 'startDate', 'endDate', 'totalPrice', 'guests'];
            const missingFields = requiredFields.filter(field => !session.metadata[field]);

            if (missingFields.length > 0) {
                console.error('Missing required metadata fields:', missingFields);
                return NextResponse.json({
                    error: 'Missing metadata: ' + missingFields.join(', ')
                }, { status: 400 });
            }

            // Parse guest data
            const guestsData = JSON.parse(session.metadata.guests);
            const totalGuests = guestsData.adults + guestsData.children;

            console.log('Creating reservation with data:', {
                userId: session.metadata.userId,
                listingId: session.metadata.listingId,
                startDate: session.metadata.startDate,
                endDate: session.metadata.endDate,
                totalPrice: session.metadata.totalPrice,
                guests: totalGuests,
            });

            // Create the reservation in database
            const reservation = await prisma.reservation.create({
                data: {
                    userId: session.metadata.userId,
                    listingId: session.metadata.listingId,
                    startDate: new Date(session.metadata.startDate),
                    endDate: new Date(session.metadata.endDate),
                    totalPrice: parseFloat(session.metadata.totalPrice),
                    guests: totalGuests,
                    paymentStatus: 'PAID',
                    stripeSessionId: session.id,
                },
            });

            console.log('✅ Reservation created successfully:', reservation.id);
            console.log('=== WEBHOOK COMPLETED ===');

        } catch (error) {
            console.error('❌ Error creating reservation:', error);
            console.error('Error details:', {
                message: error.message,
                code: error.code,
                meta: error.meta,
            });
            return NextResponse.json({
                error: 'Database Error: ' + error.message
            }, { status: 500 });
        }
    } else {
        console.log('ℹ️ Unhandled event type:', event.type);
    }

    return NextResponse.json({ received: true });
}
