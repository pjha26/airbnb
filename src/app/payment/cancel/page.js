'use client';

import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentCancel() {
    const router = useRouter();

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
                <XCircle size={64} color="#EF4444" style={{ margin: '0 auto 24px' }} />
                <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>
                    Payment Cancelled
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
                    Your payment was cancelled. No charges were made to your account.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => router.back()}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '14px 32px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Try Again
                    </button>
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
