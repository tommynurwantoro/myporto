import { motion, useScroll, useTransform } from 'framer-motion';

export interface AnimatedBackgroundProps {
  mousePosition?: { x: number; y: number };
}

export function AnimatedBackground({ mousePosition }: AnimatedBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200]);

  return (
    <motion.div style={{ y }} className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-[gradient-x_15s_ease_infinite] bg-[length:400%_400%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(16,185,129,0.05),transparent)] animate-pulse" />
      </div>
      {mousePosition && (
        <div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.03), transparent 80%)`,
          }}
        />
      )}
    </motion.div>
  );
}

