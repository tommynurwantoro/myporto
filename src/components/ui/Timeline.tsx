import { motion } from 'framer-motion';
import { ReactNode, useRef, useLayoutEffect, useState } from 'react';

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
  const [height, setHeight] = useState(1000);

  // Calculate actual height from content
  useLayoutEffect(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.offsetHeight);
    }
  }, [items]);

  return (
    <section ref={containerRef} className={`relative ${className}`}>
      {/* Timeline items */}
      {items.map((item, index) => {
        const x = item.side === 'left' ? -30 : 30;

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
              className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gray-500"
              style={{
                boxShadow: '0 0 10px rgba(107, 114, 128, 0.5)'
              }}
            />

            {/* Content */}
            <div className={`w-full md:w-5/12 ${item.side === 'left' ? 'ml-auto mr-0' : 'mr-auto ml-0'}`}>
              {item.content}
            </div>
          </motion.div>
        );
      })}

      {/* Individual line segments between dots */}
      <svg className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 pointer-events-none" style={{ height: `${height}px` }}>
        {items.map((_, index) => {
          if (index === items.length - 1) return null; // Skip last item

          // Calculate line segment position (80px = mb-20 spacing)
          const yStart = index * 80 + 8; // 8px = dot radius
          const yEnd = (index + 1) * 80 - 8; // Next dot position minus radius

          return (
            <motion.line
              key={`line-${index}`}
              x1="0"
              y1={yStart}
              x2="0"
              y2={yEnd}
              stroke="#6b7280"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
    </section>
  );
}
