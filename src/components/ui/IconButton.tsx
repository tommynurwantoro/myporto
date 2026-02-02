import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  'aria-label': string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
}

const sizeStyles = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

const variantStyles = {
  primary: cn(
    'bg-accent-primary text-background-primary',
    'hover:bg-accent-secondary',
    'shadow-lg shadow-accent-primary/20'
  ),
  secondary: cn(
    'bg-surface-glass text-text-primary',
    'border border-surface-border',
    'hover:bg-background-tertiary hover:border-accent-primary/50'
  ),
  ghost: cn(
    'bg-transparent text-text-muted',
    'hover:bg-surface-glass hover:text-accent-primary'
  ),
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = 'md', variant = 'secondary', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center rounded-full',
          'transition-all duration-200 ease-out',
          // Focus
          'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary',
          'cursor-pointer',
          // Disabled
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Touch target (minimum 44px)
          'min-w-[44px] min-h-[44px]',
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Custom class
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';
