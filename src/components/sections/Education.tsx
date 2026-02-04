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
        whileHover={{ y: -4 }}
        className="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-400/10"
      >
        <div className="flex items-start gap-4">
          {edu.logo && (
            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
              <img src={edu.logo} alt={`${edu.school} logo`} className="w-8 h-8 object-contain" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-emerald-400 mb-1 group-hover:text-emerald-300 transition-colors">
              {edu.degree}
            </h3>
            <p className="text-lg font-semibold text-gray-200 mb-2">{edu.school}</p>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{edu.period}</span>
            </div>
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
          className="text-3xl font-bold mb-12 gradient-text"
        >
          Education
        </motion.h2>
        <Timeline items={timelineItems} position="right" />
      </div>
    </section>
  );
}
