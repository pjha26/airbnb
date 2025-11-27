'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function PaymentSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (!sessionId) {
            router.push('/');
            return;
        }

        // Simulate verification delay
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, [sessionId, router]);

    if (loading) {
        return (
            <div style={{
                minHeight: 'calc(100vh - 80px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Loader2 size={48} className="spinner" style={{ animation: 'spin 1s linear infinite' }} />
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Confirming your payment...</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px'
        }}>
            <div style={{
                maxWidth: '600px',
                width: '100%',
                textAlign: 'center',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                padding: '48px 32px',
                boxShadow: 'var(--shadow-md)'
            }}>
                <CheckCircle size={64} color="#10B981" style={{ margin: '0 auto 24px' }} />
                <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Payment Successful!
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    Your booking has been confirmed. We've sent a confirmation email with all the details.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        href="/trips"
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '14px 32px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            textDecoration: 'none',
                            display: 'inline-block'
                        }}
                    >
                        View Trips & Receipt
                    </Link>
                    <Link
                        href="/"
                        style={{
                            background: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            padding: '14px 32px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            textDecoration: 'none',
                            display: 'inline-block',
                            border: '1px solid var(--border-light)'
                        }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
