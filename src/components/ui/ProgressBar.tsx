import { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  percentage: number;
  showPercentage?: boolean;
}

export function ProgressBar({ 
  label, 
  percentage, 
  showPercentage = true,
  className,
  ...props 
}: ProgressBarProps) {
  const clampedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className={cn('space-y-1', className)} {...props}>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-300">{label}</span>
        {showPercentage && (
          <span className="text-gray-400 font-medium">{clampedPercentage}%</span>
        )}
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${clampedPercentage}%` }}
          role="progressbar"
          aria-valuenow={clampedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${label}: ${clampedPercentage}%`}
        />
      </div>
    </div>
  );
}

