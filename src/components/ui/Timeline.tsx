import { motion, useTransform, useScroll } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface TimelineItem {
  id: string;
  content: ReactNode;
  side: 'left' | 'right';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  position?: 'left' | 'right';
}

export function Timeline({ items, className = '', position = 'left' }: TimelineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {/* Continuous timeline line */}
      <div className={`absolute ${position === 'left' ? 'left-2' : 'right-2'} top-8 bottom-8 w-px bg-gray-500`} />

      {/* Timeline items */}
      {items.map((item, index) => {
        const x = item.side === 'left' ? -30 : 30;
        const progressStart = index / items.length;
        const progressEnd = (index + 1) / items.length;

        const scale = useTransform(scrollYProgress, [progressStart, progressEnd], [1, 1.5]);
        const opacity = useTransform(scrollYProgress, [0, progressStart, progressEnd, 1], [0.2, 1, 1, 0.2]);

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative z-10 mb-20"
          >
            {/* Connection dot */}
            <motion.div
              style={{ scale, opacity }}
              className={`absolute ${position === 'left' ? 'left-0' : 'right-0'} top-8 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 z-20`}
            />

            {/* Content */}
            <div className={`w-full ${item.side === 'left' ? 'md:ml-0 md:mr-12' : 'md:mr-0 md:ml-12'} md:w-auto`}>
              {item.content}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
