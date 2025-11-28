'use client';

import React from 'react';
import Skeleton from './Skeleton';
import styles from '../Home/ListingCard.module.css';

/**
 * SkeletonCard Component
 * Skeleton placeholder for listing cards
 * Matches the actual ListingCard layout
 */
export const SkeletonCard = () => {
    return (
        <div className={styles.card} style={{ cursor: 'default' }}>
            {/* Image skeleton */}
            <div className={styles.imageContainer}>
                <Skeleton height="280px" width="100%" />
            </div>

            {/* Info skeleton */}
            <div className={styles.info}>
                <div className={styles.titleRow}>
                    <Skeleton width="60%" height="18px" />
                    <Skeleton width="40px" height="18px" />
                </div>
                <Skeleton width="80%" height="16px" style={{ marginTop: '8px' }} />
                <Skeleton width="50%" height="16px" style={{ marginTop: '4px' }} />
                <div className={styles.priceRow} style={{ marginTop: '8px' }}>
                    <Skeleton width="100px" height="20px" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
