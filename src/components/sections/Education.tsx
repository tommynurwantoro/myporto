import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { education } from '../../constants/data';

export function Education() {
  const timelineItems = education.map((edu) => ({
    id: edu.degree,
    side: 'left' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="flex items-center gap-3"
      >
        {edu.logo && (
          <img src={edu.logo} alt={`${edu.school} logo`} className="w-8 h-8 rounded flex-shrink-0" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{edu.degree}</h3>
          <p className="text-lg font-semibold text-gray-200">{edu.school}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{edu.period}</span>
          </div>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
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
