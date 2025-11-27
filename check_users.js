const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUserData() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
                bio: true,
                phone: true
            }
        });

        console.log(`Total users: ${users.length}\n`);
        users.forEach(user => {
            console.log(`User: ${user.name || 'No name'} (${user.email})`);
            console.log(`  Image: ${user.image || 'No image'}`);
            console.log(`  Bio: ${user.bio || 'No bio'}`);
            console.log(`  Phone: ${user.phone || 'No phone'}`);
            console.log('');
        });
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkUserData();
