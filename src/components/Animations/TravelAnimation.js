'use client';

import React from 'react';
import { X } from 'lucide-react';

export default function TravelAnimation({ onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f0f8ff',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <button
                onClick={onClose}
                style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10000,
                    transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
                <X size={24} color="#333" />
            </button>

            <div style={{
                width: '100%',
                maxWidth: '600px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px'
            }}>
                {/* Simple animated icon */}
                <div style={{
                    fontSize: '120px',
                    animation: 'bounce 2s ease-in-out infinite'
                }}>
                    ✈️
                </div>

                <h2 style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '32px',
                    fontWeight: 600,
                    color: '#333',
                    margin: 0,
                    animation: 'slideUp 0.8s ease-out'
                }}>
                    Let's go somewhere new
                </h2>

                <p style={{
                    textAlign: 'center',
                    fontFamily: 'var(--font-geist-sans)',
                    fontSize: '16px',
                    color: '#666',
                    margin: 0,
                    animation: 'slideUp 0.8s ease-out 0.2s backwards'
                }}>
                    Discover amazing places around the world
                </p>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                @keyframes bounce {
                    0%, 100% { 
                        transform: translateY(0); 
                    }
                    50% { 
                        transform: translateY(-20px); 
                    }
                }
            `}</style>
        </div>
    );
}
