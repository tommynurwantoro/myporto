import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  glass?: boolean;
  clickable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = false, glow = false, glass = false, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-xl border transition-all duration-300 ease-out',
          // Glassmorphism effect
          glass
            ? 'glass glass-hover'
            : 'bg-background-secondary border-surface-border',
          // Hover effects
          hover && [
            'hover:-translate-y-1 hover:shadow-xl',
            clickable && 'cursor-pointer',
          ],
          // Glow effect
          glow && 'relative overflow-hidden group',
          // Focus for clickable cards
          clickable && [
            'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary',
            'active:scale-[0.98]',
          ],
          // Custom class
          className
        )}
        {...props}
      >
        {children}
        {glow && (
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
