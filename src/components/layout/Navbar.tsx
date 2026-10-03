import Link from 'next/link';
import Container from '@/components/ui/Container';
import MobileMenu from '@/components/layout/MobileMenu';
import Logo from '@/components/ui/Logo';
import navItems from '@/data/navigation.json';
import company from '@/data/company.json';
import type { NavItem } from '@/types';

const navigationItems: NavItem[] = navItems as NavItem[];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white shadow-xs">
      <Container>
        <nav
          className="flex h-16 items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center hover:opacity-90 transition-opacity duration-150"
            aria-label={`${company.name} — Go to homepage`}
          >
            <Logo variant="full" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-primary-700 rounded-md hover:text-accent-600 hover:bg-neutral-50 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-3">
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-accent-500 rounded-md hover:bg-accent-600 transition-colors duration-150"
              >
                Get a Quote
              </Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          <MobileMenu navItems={navigationItems} />
        </nav>
      </Container>
    </header>
  );
}
