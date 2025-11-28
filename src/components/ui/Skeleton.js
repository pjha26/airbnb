'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Skeleton Component
 * Base skeleton component with shimmer animation
 * Based on Skiper UI loading patterns
 */
export const Skeleton = ({
    className,
    variant = 'shimmer', // 'shimmer' or 'pulse'
    width,
    height,
    circle = false
}) => {
    const shimmerVariant = {
        initial: { backgroundPosition: '-200% 0' },
        animate: {
            backgroundPosition: '200% 0',
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
            }
        }
    };

    const pulseVariant = {
        initial: { opacity: 1 },
        animate: {
            opacity: [1, 0.5, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
            }
        }
    };

    const baseStyles = {
        width: width || '100%',
        height: height || '20px',
        borderRadius: circle ? '50%' : '8px',
        backgroundColor: '#e5e7eb',
    };

    const shimmerStyles = variant === 'shimmer' ? {
        backgroundImage: 'linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)',
        backgroundSize: '200% 100%',
    } : {};

    return (
        <motion.div
            className={cn('skeleton', className)}
            style={{ ...baseStyles, ...shimmerStyles }}
            variants={variant === 'shimmer' ? shimmerVariant : pulseVariant}
            initial="initial"
            animate="animate"
        />
    );
};

export default Skeleton;
