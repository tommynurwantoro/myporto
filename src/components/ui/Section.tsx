import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SectionProps } from '../../types';

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className, children, 'data-in-view': inView, ...props }, ref) => {
    return (
      <section
        ref={ref as React.RefObject<HTMLElement>}
        id={id}
        className={cn(
          // Base styles
          'w-full',
          // Spacing
          'py-16 md:py-24',
          // Container padding
          'px-4 md:px-6',
          // Custom class
          className
        )}
        data-in-view={inView}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
