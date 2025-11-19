import React from 'react';
import { Share, Heart, Grip } from 'lucide-react';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
    // Ensure we have at least 5 images for the grid, or repeat existing ones
    const displayImages = [...images, ...images, ...images].slice(0, 5);

    return (
        <div className={styles.galleryContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Luxury Villa with Ocean View</h1>
                <div className={styles.actions}>
                    <button className={styles.actionBtn}>
                        <Share size={16} />
                        <span>Share</span>
                    </button>
                    <button className={styles.actionBtn}>
                        <Heart size={16} />
                        <span>Save</span>
                    </button>
                </div>
            </div>

            <div className={styles.grid}>
                <div className={styles.mainImage}>
                    <img src={displayImages[0]} alt="Main listing photo" />
                </div>
                <div className={styles.subImages}>
                    {displayImages.slice(1).map((img, index) => (
                        <div key={index} className={styles.subImageItem}>
                            <img src={img} alt={`Listing photo ${index + 2}`} />
                            {index === 3 && (
                                <button className={styles.showAllBtn}>
                                    <Grip size={16} />
                                    <span>Show all photos</span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
