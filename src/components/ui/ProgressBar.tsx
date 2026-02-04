import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  percentage: number;
  showPercentage?: boolean;
  index?: number;
}

export function ProgressBar({
  label,
  percentage,
  showPercentage = true,
  index = 0,
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
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${clampedPercentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
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

