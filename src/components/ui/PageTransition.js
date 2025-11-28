'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

/**
 * PageTransition Component
 * Handles page transition animations
 * Based on Skiper UI transition patterns
 */
export const PageTransition = ({
    children,
    variant = 'fade' // 'fade', 'slide-left', 'slide-right', 'scale'
}) => {
    const pathname = usePathname();

    const variants = {
        fade: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        'slide-left': {
            initial: { opacity: 0, x: 20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -20 }
        },
        'slide-right': {
            initial: { opacity: 0, x: -20 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: 20 }
        },
        scale: {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 }
        }
    };

    const selectedVariant = variants[variant] || variants.fade;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={selectedVariant}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1]
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
