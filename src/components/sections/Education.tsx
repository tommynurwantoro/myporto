import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { education } from '../../constants/data';

export function Education() {
  const timelineItems = education.map((edu) => ({
    id: edu.degree,
    side: 'right' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-400/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-emerald-400">{edu.degree}</h3>
          <GraduationCap className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-lg font-semibold mb-2">{edu.school}</p>
        <div className="flex items-center gap-2 text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{edu.period}</span>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-emerald-400"
        >
          Education
        </motion.h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}
