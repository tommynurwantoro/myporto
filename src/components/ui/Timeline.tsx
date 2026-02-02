import { motion, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useTimeline } from '../../hooks/framer';

interface TimelineItem {
  id: string;
  content: ReactNode;
  side: 'left' | 'right';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className = '' }: TimelineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useTimeline({
    containerRef,
    itemCount: items.length,
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {/* Animated timeline line */}
      <svg className="absolute left-1/2 transform -translate-x-1/2 h-full w-1" style={{ height: '100%' }}>
        <motion.path
          d="M 0 0 L 0 1000"
          stroke="url(#timelineGradient)"
          strokeWidth="4"
          fill="none"
          style={{ pathLength, opacity }}
        />
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#34d399" stopOpacity="1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Timeline items */}
      {items.map((item, index) => {
        const x = item.side === 'left' ? -30 : 30;
        const progressStart = index / items.length;
        const progressEnd = (index + 1) / items.length;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative z-10 mb-8"
          >
            {/* Connection dot */}
            <motion.div
              animate={{
                scale: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd ? 1.5 : 1,
                backgroundColor: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd ? '#34d399' : '#6b7280',
              }}
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full"
              style={{
                boxShadow: scrollYProgress.get() >= progressStart && scrollYProgress.get() <= progressEnd
                  ? '0 0 20px rgba(52, 211, 153, 0.5)'
                  : 'none'
              }}
            />

            {/* Content */}
            <div className={`w-full md:w-5/12 ${item.side === 'left' ? 'mr-auto' : 'ml-auto'}`}>
              {item.content}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
