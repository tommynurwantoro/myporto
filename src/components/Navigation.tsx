import { useState, useEffect } from 'react';
import { MenuIcon, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';

const navLinks = [
  { href: '#about', label: 'About', description: 'Go to about section' },
  { href: '#skills', label: 'Skills', description: 'Go to skills section' },
  { href: '#projects', label: 'Projects', description: 'Go to projects section' },
  { href: '#experience', label: 'Experience', description: 'Go to experience section' },
  { href: '#education', label: 'Education', description: 'Go to education section' },
  { href: '#contact', label: 'Contact', description: 'Go to contact section' },
] as const;

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        // Return focus to menu button
        document.querySelector('[aria-controls="mobile-menu"]')?.querySelector('button')?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Set focus to the element for accessibility
        (element as HTMLElement).focus();
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-background-primary/95 backdrop-blur-md border-b border-surface-border"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-accent-primary font-mono text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary rounded px-2 py-1 cursor-pointer"
            aria-label="Tommy Nurwantoro - Home"
          >
            ~/portfolio
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-text-muted hover:text-accent-primary transition-colors min-w-[44px] min-h-[44px] rounded p-2 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="true"
          >
            <span className="sr-only">{isMenuOpen ? 'Close' : 'Open'} menu</span>
            {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <MenuIcon className="w-6 h-6" aria-hidden="true" />}
          </button>

          {/* Navigation links */}
          <div
            id="mobile-menu"
            className={cn(
              'md:block',
              isMenuOpen
                ? 'absolute top-full left-0 right-0 bg-background-secondary border-b border-surface-border p-4'
                : 'hidden'
            )}
          >
            <ul
              className={cn(
                'flex flex-col md:flex-row gap-2 md:gap-1',
                isMenuOpen ? 'flex-col items-start' : 'flex-row items-center'
              )}
              role="menubar"
            >
              {navLinks.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="block text-text-secondary hover:text-accent-primary transition-colors rounded-lg px-4 py-2 md:py-1 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary cursor-pointer"
                    aria-label={link.description}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
