import React from 'react';
import ImageGallery from '@/components/Listing/ImageGallery';
import ListingInfo from '@/components/Listing/ListingInfo';
import BookingWidget from '@/components/Listing/BookingWidget';
import prisma from '@/lib/prisma';
import styles from './page.module.css';

async function getListing(id) {
    try {
        const listing = await prisma.listing.findUnique({
            where: { id: id },
            include: { host: true },
        });
        return listing;
    } catch (error) {
        console.error('Error fetching listing:', error);
        return null;
    }
}

export default async function ListingPage({ params }) {
    const { id } = await params;
    const listing = await getListing(id);

    if (!listing) {
        return <div className="container" style={{ paddingTop: '100px' }}>Listing not found</div>;
    }

    return (
        <div className={`container ${styles.pageContainer}`}>
            <ImageGallery images={listing.images} />
            <div className={styles.contentGrid}>
                <ListingInfo listing={listing} />
                <BookingWidget listing={listing} />
            </div>
        </div>
    );
}
