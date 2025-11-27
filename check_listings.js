const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkListings() {
    try {
        const count = await prisma.listing.count();
        console.log('Total listings in database:', count);

        if (count > 0) {
            const listings = await prisma.listing.findMany({
                select: {
                    id: true,
                    title: true,
                    price: true,
                    location: true,
                    romanticScore: true,
                    familyScore: true,
                    adventureScore: true
                },
                take: 5
            });

            console.log('\nFirst 5 listings:');
            listings.forEach(l => {
                console.log(`- ${l.title} (${l.location}) - $${l.price}`);
                console.log(`  Scores: Romantic=${l.romanticScore}, Family=${l.familyScore}, Adventure=${l.adventureScore}`);
            });
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkListings();
