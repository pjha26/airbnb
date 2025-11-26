const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Testing database connection...');

    try {
        // 1. Check if we can connect
        await prisma.$connect();
        console.log('✅ Connected to database');

        // 2. Try to find a user to link the reservation to
        // We'll just look for the first user
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log('❌ No users found in database. Cannot create test reservation.');
            return;
        }
        console.log('Found user:', user.id);

        // 3. Try to find a listing
        const listing = await prisma.listing.findFirst();
        if (!listing) {
            console.log('❌ No listings found in database. Cannot create test reservation.');
            return;
        }
        console.log('Found listing:', listing.id);

        // 4. Create a test reservation
        console.log('Attempting to create test reservation...');
        const reservation = await prisma.reservation.create({
            data: {
                userId: user.id,
                listingId: listing.id,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
                totalPrice: 100,
                guests: 1,
                paymentStatus: 'TEST_PAID',
                stripeSessionId: 'test_session_' + Date.now(),
            },
        });

        console.log('✅ Test reservation created successfully!');
        console.log('Reservation ID:', reservation.id);

    } catch (error) {
        console.error('❌ Database test failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
