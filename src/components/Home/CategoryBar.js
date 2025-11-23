'use client';

import React, { useState } from 'react';
import styles from './CategoryBar.module.css';
import { categories } from '@/data/mockData';

const CategoryBar = () => {
    const [selectedCategory, setSelectedCategory] = useState('Amazing pools');

    return (
        <div className={styles.categoryBar}>
            <div className={`container ${styles.container}`}>
                <div className={styles.scrollContainer}>
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.label;
                        return (
                            <div
                                key={index}
                                className={`${styles.categoryItem} ${isSelected ? styles.selected : ''}`}
                                onClick={() => setSelectedCategory(category.label)}
                            >
                                <Icon size={24} strokeWidth={isSelected ? 2 : 1.5} />
                                <span className={styles.label}>{category.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
