'use client';

import Link from 'next/link';
import { Search, Menu, User, Globe } from 'lucide-react';
import styles from './Header.module.css';
import { useUser, UserButton } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle';

export default function Header() {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <Link href="/" className={styles.logo}>
            <svg width="32" height="32" fill="currentcolor" style={{ display: "block" }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false">
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.177-.179-.177.179c-2.153 2.128-4.485 3.386-6.709 3.386-3.48 0-6.357-2.416-6.357-6.478l.001-.228.01-.415c.05-.924.293-1.805.96-3.396l.145-.353c.986-2.295 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.273 0-2.29.475-3.344 2.365l-.558 1.076c-2.04 4.001-6.205 12.717-7.184 15.002C4.29 22.886 4.083 23.8 4.083 24.5c0 3.055 2.01 4.478 4.417 4.478 1.952 0 4.012-1.154 6.022-3.132l.987-.98.491.491c2.01 2.008 4.07 3.162 6.022 3.162 2.407 0 4.417-1.423 4.417-4.478 0-.7-.207-1.614-.834-3.057-.979-2.285-5.144-11.001-7.184-15.002l-.558-1.076C18.29 3.475 17.273 3 16 3zm0 5c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"></path>
            </svg>
            <span className={styles.logoText}>airbnb</span>
          </Link>

          <div className={styles.searchBar}>
            <div className={styles.searchBtn}>Anywhere</div>
            <div className={styles.divider}></div>
            <div className={styles.searchBtn}>Any week</div>
            <div className={styles.divider}></div>
            <div className={`${styles.searchBtn} ${styles.addGuests}`}>Add guests</div>
            <div className={styles.searchIconContainer}>
              <Search size={14} color="white" strokeWidth={3} />
            </div>
          </div>

          <div className={styles.userMenu}>
            <div className={styles.hostLink}>Airbnb your home</div>
            <div className={styles.globeIcon}>
              <ThemeToggle />
            </div>

            <div className={styles.profileMenu} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
              <Menu size={18} />
              <div className={styles.avatar}>
                {isSignedIn ? (
                  <img src={user.imageUrl} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ) : (
                  <User size={18} className={styles.userIcon} />
                )}
              </div>
              {isOpen && (
                <div className={styles.dropdown}>
                  {isSignedIn ? (
                    <>
                      <div className={styles.menuItem} style={{ fontWeight: 600 }}>Messages</div>
                      <div className={styles.menuItem} style={{ fontWeight: 600 }}>Notifications</div>
                      <Link href="/trips" className={styles.menuItem} style={{ fontWeight: 600, display: 'block' }}>My Trips</Link>
                      <div className={styles.menuItem} style={{ fontWeight: 600 }}>Wishlists</div>
                      <div style={{ height: '1px', backgroundColor: '#ddd', margin: '8px 0' }}></div>
                      <div className={styles.menuItem}>Account</div>
                      <div className={styles.menuItem}>Help Center</div>
                      <div className={styles.menuItem} onClick={() => window.location.href = '/sign-in'}>Log out</div>
                    </>
                  ) : (
                    <>
                      <Link href="/sign-up" className={styles.menuItem} style={{ fontWeight: 600, display: 'block' }}>Sign up</Link>
                      <Link href="/sign-in" className={styles.menuItem} style={{ display: 'block' }}>Log in</Link>
                      <div style={{ height: '1px', backgroundColor: '#ddd', margin: '8px 0' }}></div>
                      <div className={styles.menuItem}>Airbnb your home</div>
                      <div className={styles.menuItem}>Help Center</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
