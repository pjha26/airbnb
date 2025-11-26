'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from '@/components/Inputs/ImageUpload';
import { Loader2 } from 'lucide-react';
import Toast from '@/components/Toast/Toast';
import styles from './ProfileClient.module.css';

export default function ProfileClient({ currentUser }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const [formData, setFormData] = useState({
        name: currentUser?.name || '',
        bio: currentUser?.bio || '',
        gender: currentUser?.gender || '',
        phone: currentUser?.phone || '',
        image: currentUser?.image || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const setCustomValue = (id, value) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setShowToast(true);
            router.refresh();
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1>Your Profile</h1>
                    <p>Manage your personal information and preferences.</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.section}>
                        <div className={styles.uploadSection}>
                            <ImageUpload
                                value={formData.image}
                                onChange={(value) => setCustomValue('image', value)}
                            />
                        </div>
                    </div>

                    <div className={styles.grid}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="e.g. John Doe"
                                autoComplete="name"
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="gender">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className={styles.select}
                                autoComplete="sex"
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                className={styles.input}
                                placeholder="e.g. +1 234 567 8900"
                                autoComplete="tel"
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className={styles.textarea}
                            placeholder="Tell us a bit about yourself..."
                            rows={4}
                        />
                        <p className={styles.hint}>
                            Share a little about yourself, so your future hosts or guests can get to know you.
                        </p>
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="submit"
                            className={styles.saveButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={18} className={styles.spinner} />
                                    Saving...
                                </>
                            ) : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>

            {showToast && (
                <Toast
                    message="Profile updated successfully!"
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}
