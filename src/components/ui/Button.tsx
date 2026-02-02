import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonVariant, ButtonSize } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-accent-primary text-background-primary hover:bg-accent-secondary',
    'shadow-lg shadow-accent-primary/20',
    'hover:shadow-xl hover:shadow-accent-primary/30'
  ),
  secondary: cn(
    'bg-background-secondary text-text-primary hover:bg-background-tertiary',
    'border border-surface-border hover:border-accent-primary/50'
  ),
  ghost: cn(
    'bg-transparent text-text-secondary hover:text-accent-primary',
    'hover:bg-surface-glass'
  ),
  icon: cn(
    'bg-surface-glass text-accent-primary',
    'hover:bg-background-tertiary hover:text-accent-secondary',
    'border border-surface-border hover:border-accent-primary/30'
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, isLoading, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-heading font-semibold rounded-lg',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary',
          'cursor-pointer',
          // Disabled state
          'disabled:opacity-50 disabled:cursor-not-allowed',
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Custom class
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
