import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hover = true, glow = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-gray-800 rounded-lg border border-gray-700',
          'transition-all duration-300',
          hover && 'hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]',
          glow && 'relative',
          className
        )}
        {...props}
      >
        {children}
        {glow && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';

