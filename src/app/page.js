'use client';

import React from 'react';
import CategoryBar from '@/components/Home/CategoryBar';
import ListingCard from '@/components/Home/ListingCard';
import { listings } from '@/data/mockData';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.home}>
      <CategoryBar />
      <div className={`container ${styles.gridContainer}`}>
        <div className={styles.grid}>
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
}
