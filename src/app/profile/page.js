import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProfileClient from './ProfileClient';

export const dynamic = 'force-dynamic';

async function getUser() {
    try {
        const user = await currentUser();

        if (!user || !user.emailAddresses?.[0]?.emailAddress) {
            return null;
        }

        const email = user.emailAddresses[0].emailAddress;
        let dbUser = await prisma.user.findUnique({
            where: { email },
        });

        // If user exists in Clerk but not in DB (e.g. after seed reset), create them
        if (!dbUser) {
            console.log('User missing in DB, recreating...');
            dbUser = await prisma.user.create({
                data: {
                    email,
                    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User',
                    image: user.imageUrl,
                    // id: user.id // REMOVED: Let Prisma generate a valid MongoDB ObjectID
                }
            });
        }

        return dbUser;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export default async function ProfilePage() {
    const user = await getUser();

    if (!user) {
        redirect('/sign-in');
    }

    return <ProfileClient currentUser={user} />;
}
