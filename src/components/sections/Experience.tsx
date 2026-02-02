import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { experiences } from '../../constants/data';

export function Experience() {
  const timelineItems = experiences.map((exp) => ({
    id: exp.title,
    side: 'right' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="flex items-center gap-3"
      >
        {exp.logo && (
          <img src={exp.logo} alt={`${exp.company} logo`} className="w-8 h-8 rounded flex-shrink-0" />
        )}
        <div>
          <h3 className="text-xl font-bold text-emerald-400">{exp.title}</h3>
          <p className="text-lg font-semibold text-gray-200">{exp.company}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{exp.period}</span>
          </div>
        </div>
      </motion.div>
    ),
  }));

  return (
    <section className="w-full px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-emerald-400"
        >
          Professional Experience
        </motion.h2>
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}
