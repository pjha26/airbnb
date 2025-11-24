const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const listings = await prisma.listing.findMany({
        select: { id: true, title: true, lat: true, lng: true }
    });
    console.log('Total listings:', listings.length);
    listings.forEach(l => console.log(`${l.title}: Lat=${l.lat}, Lng=${l.lng}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
