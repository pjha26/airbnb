const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkRomanticListings() {
    try {
        // Get all listings
        const allListings = await prisma.listing.findMany({
            select: {
                title: true,
                romanticScore: true,
                location: true
            },
            orderBy: {
                romanticScore: 'desc'
            }
        });

        console.log('All listings with romantic scores (sorted):');
        allListings.forEach(l => {
            console.log(`- ${l.title}: ${l.romanticScore} (${l.location})`);
        });

        console.log('\n' + '='.repeat(60));

        // Get romantic listings (score >= 7)
        const romanticListings = await prisma.listing.findMany({
            where: {
                romanticScore: { gte: 7 }
            },
            select: {
                title: true,
                romanticScore: true,
                location: true
            }
        });

        console.log(`\nRomantic listings (score >= 7): ${romanticListings.length} found`);
        romanticListings.forEach(l => {
            console.log(`✓ ${l.title}: ${l.romanticScore}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkRomanticListings();
