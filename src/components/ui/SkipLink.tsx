interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
}

/**
 * Accessible skip link for keyboard navigation
 * Allows users to skip to main content, navigation, etc.
 * Only visible on focus
 */
export function SkipLink({ href, children }: SkipLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Move focus to the target element
      (target as HTMLElement).focus();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="sr-only focus:absolute focus:top-4 focus:left-4 z-[100] focus:not-sr-only px-6 py-3 bg-accent-primary text-background-primary font-semibold rounded-lg shadow-lg outline-none ring-2 ring-accent-primary ring-offset-2 transition-all duration-200 cursor-pointer"
    >
      {children}
    </a>
  );
}
