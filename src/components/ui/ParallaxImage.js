'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxImage Component
 * Creates a parallax scroll effect on images
 * Based on Skiper UI parallax patterns
 */
export const ParallaxImage = ({
    children,
    intensity = 0.3,
    className
}) => {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to parallax movement
    const y = useTransform(
        scrollYProgress,
        [0, 1],
        [`${intensity * 100}%`, `-${intensity * 100}%`]
    );

    return (
        <div ref={ref} className={className} style={{ overflow: 'hidden', position: 'relative' }}>
            <motion.div
                style={{
                    y,
                    willChange: 'transform',
                    height: '120%',
                    width: '100%',
                    position: 'relative',
                    top: '-10%'
                }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ParallaxImage;
