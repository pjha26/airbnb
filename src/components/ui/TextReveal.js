'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * TextReveal Component
 * Animates text with a word-by-word reveal effect
 * Based on Skiper UI free text animation patterns
 * Fixed to prevent text overlapping issues
 */
export const TextReveal = ({
    text,
    className,
    delay = 0,
    duration = 0.5,
    staggerChildren = 0.1
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay,
                staggerChildren,
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration,
                ease: [0.25, 0.4, 0.25, 1],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            key={text}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={cn(className)}
            style={{
                display: 'block',
                lineHeight: '1.2',
                minHeight: '4.2rem'
            }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    variants={child}
                    style={{
                        display: 'inline-block',
                        marginRight: '0.3em'
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default TextReveal;
