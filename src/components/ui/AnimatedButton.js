'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import MagneticButton from './MagneticButton';

/**
 * AnimatedButton Component
 * Enhanced button with smooth hover animations
 * Based on Skiper UI free button patterns
 * Now with optional magnetic effect
 */
export const AnimatedButton = ({
    children,
    className,
    onClick,
    variant = 'primary', // 'primary' or 'secondary'
    magnetic = false, // Enable magnetic cursor effect
    ...props
}) => {
    const buttonContent = (
        <motion.button
            onClick={onClick}
            className={cn(
                "relative overflow-hidden px-8 py-3 rounded-full font-semibold transition-all duration-300",
                variant === 'primary'
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl"
                    : "bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white/20",
                className
            )}
            whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            <motion.span
                className="relative z-10"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
            >
                {children}
            </motion.span>

            {/* Ripple effect on hover */}
            <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{
                    scale: 2,
                    opacity: [0, 0.3, 0],
                    transition: { duration: 0.6 }
                }}
                style={{ borderRadius: '50%' }}
            />
        </motion.button>
    );

    // Wrap with magnetic effect if enabled
    if (magnetic) {
        return (
            <MagneticButton strength={0.25} range={60}>
                {buttonContent}
            </MagneticButton>
        );
    }

    return buttonContent;
};

export default AnimatedButton;
