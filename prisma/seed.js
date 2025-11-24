const { PrismaClient } = require('@prisma/client');
const mockListings = [
    {
        title: 'Luxury Villa with Ocean View',
        location: 'Malibu, California',
        price: 350,
        rating: 4.9,
        type: 'Amazing pools',
        lat: 34.0259,
        lng: -118.7798,
        images: [
            'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Pool', 'Ocean View', 'WiFi', 'Kitchen'],
        description: 'Experience the ultimate luxury in this stunning villa overlooking the ocean. Featuring a private infinity pool, spacious living areas, and breathtaking views.',
    },
    {
        title: 'Cozy Mountain Cabin',
        location: 'Aspen, Colorado',
        price: 220,
        rating: 4.8,
        type: 'Cabins',
        lat: 39.1911,
        lng: -106.8175,
        images: [
            'https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Mountain View', 'Fireplace', 'WiFi'],
        description: 'Escape to the mountains in this cozy cabin. Perfect for a romantic getaway or a family vacation.',
    },
    {
        title: 'Modern Apartment in City Center',
        location: 'New York, New York',
        price: 180,
        rating: 4.7,
        type: 'Iconic cities',
        lat: 40.7128,
        lng: -74.0060,
        images: [
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['City View', 'WiFi', 'Kitchen', 'Elevator'],
        description: 'Stay in the heart of the city in this modern apartment. Close to all major attractions and public transport.',
    },
    {
        title: 'Secluded Treehouse',
        location: 'Bali, Indonesia',
        price: 120,
        rating: 4.95,
        type: 'Tropical',
        lat: -8.4095,
        lng: 115.1889,
        images: [
            'https://images.unsplash.com/photo-1488415032361-b7e238421f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Nature', 'WiFi', 'Breakfast'],
        description: 'Experience nature like never before in this secluded treehouse. Surrounded by lush greenery and wildlife.',
    },
    {
        title: 'Beachfront Bungalow',
        location: 'Maui, Hawaii',
        price: 450,
        rating: 4.85,
        type: 'Amazing pools',
        lat: 20.7984,
        lng: -156.3319,
        images: [
            'https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['Beach Access', 'Pool', 'WiFi', 'Kitchen'],
        description: 'Wake up to the sound of waves in this beachfront bungalow. Direct access to the beach and stunning sunsets.',
    },
    {
        title: 'Historic Castle Stay',
        location: 'Edinburgh, Scotland',
        price: 600,
        rating: 5.0,
        type: 'Castles',
        lat: 55.9533,
        lng: -3.1883,
        images: [
            'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['History', 'Garden', 'WiFi'],
        description: 'Live like royalty in this historic castle. Explore the grounds and enjoy the rich history of the area.',
    },
    {
        title: 'Residency Hotel',
        location: 'Mumbai, India',
        price: 150,
        rating: 4.6,
        type: 'Iconic cities',
        lat: 19.0760,
        lng: 72.8777,
        images: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        ],
        amenities: ['City View', 'WiFi', 'Restaurant', 'Gym'],
        description: 'Enjoy a luxurious stay at the Residency Hotel in the heart of Mumbai. Close to business districts and tourist attractions.',
    },
];

const prisma = new PrismaClient();

console.log('Prisma keys:', Object.keys(prisma));

async function main() {
    console.log('Start seeding ...');

    // Create a default host user
    const host = await prisma.user.upsert({
        where: { email: 'host@example.com' },
        update: {},
        create: {
            email: 'host@example.com',
            name: 'Host User',
            password: 'password', // In a real app, hash this!
            image: 'https://i.pravatar.cc/150?u=host',
        },
    });

    console.log(`Created user with id: ${host.id}`);

    // Clear existing listings
    await prisma.listing.deleteMany({});
    console.log('Cleared existing listings');

    for (const listing of mockListings) {
        const createdListing = await prisma.listing.create({
            data: {
                title: listing.title,
                description: listing.description,
                price: listing.price,
                location: listing.location,
                rating: listing.rating,
                type: listing.type || 'Entire home', // Default if missing
                lat: listing.lat,
                lng: listing.lng,
                images: listing.images,
                amenities: listing.amenities,
                hostId: host.id,
            },
        });
        console.log(`Created listing with id: ${createdListing.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
