import React from 'react';
import { Star, ShieldCheck, DoorOpen, Calendar } from 'lucide-react';
import styles from './ListingInfo.module.css';

const ListingInfo = ({ listing }) => {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.header}>
                <div className={styles.titleSection}>
                    <h2>Entire home hosted by {listing.host.name}</h2>
                    <p>4 guests · 2 bedrooms · 2 beds · 2 baths</p>
                </div>
                <div className={styles.hostImage}>
                    <img src={listing.host.image} alt={listing.host.name} />
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.features}>
                <div className={styles.featureItem}>
                    <DoorOpen size={24} className={styles.icon} />
                    <div>
                        <h3>Self check-in</h3>
                        <p>Check yourself in with the keypad.</p>
                    </div>
                </div>
                <div className={styles.featureItem}>
                    <ShieldCheck size={24} className={styles.icon} />
                    <div>
                        <h3>{listing.host.name} is a Superhost</h3>
                        <p>Superhosts are experienced, highly rated hosts.</p>
                    </div>
                </div>
                <div className={styles.featureItem}>
                    <Calendar size={24} className={styles.icon} />
                    <div>
                        <h3>Free cancellation for 48 hours</h3>
                    </div>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.description}>
                <p>{listing.description}</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
                <button className={styles.showMore}>Show more</button>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.amenities}>
                <h3>What this place offers</h3>
                <div className={styles.amenityGrid}>
                    <div>Wifi</div>
                    <div>Kitchen</div>
                    <div>Free parking</div>
                    <div>Pool</div>
                    <div>Hot tub</div>
                    <div>Patio or balcony</div>
                </div>
                <button className={styles.showAmenities}>Show all amenities</button>
            </div>
        </div>
    );
};

export default ListingInfo;
