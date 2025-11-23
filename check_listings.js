const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const listings = await prisma.listing.findMany({
        select: { id: true, title: true }
    });
    console.log('Total listings:', listings.length);
    listings.forEach(l => console.log(`${l.id}: ${l.title}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
