import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  percentage: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'accent' | 'blue' | 'purple' | 'orange';
}

const sizeStyles = {
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
};

const colorStyles = {
  accent: 'bg-gradient-to-r from-accent-primary to-accent-secondary',
  blue: 'bg-gradient-to-r from-blue-500 to-blue-400',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-400',
  orange: 'bg-gradient-to-r from-orange-500 to-orange-400',
};

export function ProgressBar({
  label,
  percentage,
  showPercentage = true,
  size = 'md',
  color = 'accent',
  className,
  ...props
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-text-secondary">{label}</span>
        {showPercentage && (
          <span className="font-semibold text-accent-primary">{clampedPercentage}%</span>
        )}
      </div>
      <div
        className={cn(
          'w-full rounded-full overflow-hidden',
          'bg-background-tertiary border border-surface-border',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={clampedPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clampedPercentage}%`}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            'shadow-[0_0_10px_rgba(16,185,129,0.5)]',
            colorStyles[color]
          )}
          style={{ width: `${clampedPercentage}%` }}
        />
      </div>
    </div>
  );
}
