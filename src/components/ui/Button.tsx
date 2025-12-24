import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { ButtonVariant, ButtonSize } from '../../types';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-400 text-gray-900 hover:bg-emerald-500 focus:ring-emerald-400',
  secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700 focus:ring-gray-600',
  ghost: 'bg-transparent text-gray-400 hover:text-emerald-400 hover:bg-gray-800/50 focus:ring-emerald-400',
  icon: 'bg-gray-800/50 text-emerald-400 hover:bg-gray-800 focus:ring-emerald-400',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium',
          'transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

