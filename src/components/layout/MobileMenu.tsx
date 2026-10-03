'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavItem } from '@/types';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  navItems: NavItem[];
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  // Close on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeMenu]);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={toggleMenu}
        className="inline-flex items-center justify-center rounded-md p-2 text-primary-800 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Slide-in Panel */}
      <nav
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-[82vw] max-w-xs bg-white shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="bg-white">
          <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 bg-white">
            <span className="text-base font-bold text-primary-900 tracking-wider uppercase">Menu</span>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-lg p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul className="flex flex-col px-4 py-3 space-y-1 bg-white" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between rounded-lg px-3.5 py-3 text-base font-medium transition-colors duration-150 min-h-[44px]',
                    pathname === item.href
                      ? 'bg-accent-50 text-accent-700 font-semibold'
                      : 'text-primary-800 hover:bg-neutral-100 hover:text-accent-600'
                  )}
                >
                  <span>{item.label}</span>
                  <svg className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Contact & Quick CTAs */}
        <div className="border-t border-neutral-200 p-4 space-y-2.5 bg-white">
          <Link
            href="/contact"
            className="block w-full rounded-lg bg-accent-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-600 transition-colors duration-150 min-h-[44px]"
          >
            Get a Quote
          </Link>

          <a
            href="https://wa.me/919016406429"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-center text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors duration-150 min-h-[40px]"
          >
            <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </nav>
    </div>
  );
}
