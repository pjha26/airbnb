'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, DollarSign, Download } from 'lucide-react';
import styles from './trips.module.css';
import { generateReceiptPDF } from '@/utils/pdfGenerator';

export default function TripsPage() {
    const { isSignedIn, isLoaded } = useUser();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isLoaded && !isSignedIn) {
            router.push('/sign-in');
            return;
        }

        if (isSignedIn) {
            fetchBookings();
        }
    }, [isSignedIn, isLoaded, router]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/bookings/user');
            if (!response.ok) {
                throw new Error('Failed to fetch bookings');
            }
            const data = await response.json();
            setBookings(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    if (!isLoaded || loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>Loading your trips...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>My Trips</h1>
                <p>View and manage your reservations</p>
            </div>

            {error && (
                <div className={styles.error}>
                    <p>Error loading bookings: {error}</p>
                </div>
            )}

            {!error && bookings.length === 0 && (
                <div className={styles.empty}>
                    <div className={styles.emptyIcon}>✈️</div>
                    <h2>No trips yet</h2>
                    <p>Time to dust off your bags and start planning your next adventure!</p>
                    <button onClick={() => router.push('/')} className={styles.exploreBtn}>
                        Explore destinations
                    </button>
                </div>
            )}

            {!error && bookings.length > 0 && (
                <div className={styles.bookingsGrid}>
                    {bookings.map((booking) => (
                        <div key={booking.id} className={styles.bookingCard}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={booking.listing.images[0]}
                                    alt={booking.listing.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>

                            <div className={styles.bookingDetails}>
                                <h3>{booking.listing.title}</h3>

                                <div className={styles.infoRow}>
                                    <MapPin size={16} />
                                    <span>{booking.listing.location}</span>
                                </div>

                                <div className={styles.infoRow}>
                                    <Calendar size={16} />
                                    <span>
                                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                                    </span>
                                </div>

                                <div className={styles.infoRow}>
                                    <DollarSign size={16} />
                                    <span className={styles.price}>
                                        ₹{booking.totalPrice.toLocaleString('en-IN')} total
                                    </span>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        onClick={() => router.push(`/rooms/${booking.listing.id}`)}
                                        className={styles.viewBtn}
                                    >
                                        View Listing
                                    </button>
                                    <button
                                        onClick={() => generateReceiptPDF(booking)}
                                        className={styles.receiptBtn}
                                        style={{
                                            padding: '8px 16px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            background: 'white',
                                            color: '#333',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '14px'
                                        }}
                                    >
                                        <Download size={14} />
                                        Receipt
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
