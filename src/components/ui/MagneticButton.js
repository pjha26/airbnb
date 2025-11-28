'use client';

import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

/**
 * MagneticButton Component
 * Creates a magnetic cursor effect on buttons
 * Based on Skiper UI magnetic interaction patterns
 * Desktop only - uses enhanced tap feedback on mobile
 */
export const MagneticButton = ({
    children,
    className,
    strength = 0.3,
    range = 50,
    ...props
}) => {
    const ref = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount
    React.useEffect(() => {
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    }, []);

    // Spring animation for smooth magnetic effect
    const x = useSpring(0, { stiffness: 150, damping: 15 });
    const y = useSpring(0, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        if (isMobile || !ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        // Only apply magnetic effect within range
        if (distance < range) {
            x.set(distanceX * strength);
            y.set(distanceY * strength);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x,
                y,
                display: 'inline-block',
                cursor: 'pointer'
            }}
            className={className}
            whileTap={isMobile ? { scale: 0.95 } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
