import { motion } from 'framer-motion';
import { Building, Calendar } from 'lucide-react';
import { Timeline } from '../ui/Timeline';
import { experiences } from '../../constants/data';

export function Experience() {
  const timelineItems = experiences.map((exp) => ({
    id: exp.title,
    side: 'left' as const,
    content: (
      <motion.div
        whileHover={{ y: -6 }}
        className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-emerald-400/50 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-emerald-400">{exp.title}</h3>
          <Building className="w-5 h-5 text-gray-400" />
        </div>
        <p className="text-lg font-semibold mb-2">{exp.company}</p>
        <div className="flex items-center gap-2 text-gray-400 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{exp.period}</span>
        </div>
        {exp.logo && (
          <div className="w-8 h-8 rounded flex-shrink-0 bg-white flex items-center justify-center">
            <img
              src={exp.logo}
              alt={`${exp.company} logo`}
              className="w-full h-full object-contain"
            />
          </div>
        )}
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
