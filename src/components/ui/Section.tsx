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
          'w-full px-6',
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

