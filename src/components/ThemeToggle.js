
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-primary)'
            }} />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
                padding: '8px',
                borderRadius: '50%',
                border: '1px solid var(--border-light)',
                background: 'var(--bg-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                width: '40px',
                height: '40px'
            }}
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <Sun size={20} style={{ color: 'var(--text-primary)' }} />
            ) : (
                <Moon size={20} style={{ color: 'var(--text-primary)' }} />
            )}
        </button>
    );
}
