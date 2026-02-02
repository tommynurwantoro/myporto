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
}

export function Timeline({ items, className = '' }: TimelineProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {/* Continuous timeline line */}
      <svg className="absolute left-1/2 transform -translate-x-1/2 h-full w-1.5 pointer-events-none" style={{ height: '100%' }}>
        <defs>
          <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="20%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="80%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <motion.line
          x1="6"
          y1="0"
          x2="6"
          y2="100%"
          stroke="url(#timelineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>

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
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
            />

            {/* Content */}
            <div className={`w-full md:w-5/12 ${item.side === 'left' ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}>
              {item.content}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
