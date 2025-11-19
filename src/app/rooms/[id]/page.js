'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ImageGallery from '@/components/Listing/ImageGallery';
import ListingInfo from '@/components/Listing/ListingInfo';
import BookingWidget from '@/components/Listing/BookingWidget';
import { listings } from '@/data/mockData';
import styles from './page.module.css';

export default function ListingPage() {
    const params = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        if (params.id) {
            const foundListing = listings.find(l => l.id === params.id);
            setListing(foundListing || listings[0]); // Fallback to first listing if not found
        }
    }, [params.id]);

    if (!listing) {
        return <div className="container" style={{ paddingTop: '100px' }}>Loading...</div>;
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
