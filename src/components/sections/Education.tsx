import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { GraduationCap } from 'lucide-react';
import { education } from '../../constants/data';
import { cn } from '../../utils/cn';
import { useTimelineAnimation } from '../../hooks/useAnime';

export function Education() {
  const [educationRef, isEducationInView] = useInView();

  // Apply timeline animation when in view
  useTimelineAnimation('#education-timeline > div', [isEducationInView]);

  return (
    <Section
      id="education"
      className="bg-background-secondary/50"
      ref={educationRef}
      data-in-view={isEducationInView}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={cn('mb-12', isEducationInView ? 'revealed' : '', 'reveal-fade')}>
          <h2 id="education-heading" className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
            Education
          </h2>
          <p className="text-text-secondary text-lg">
            Academic background and qualifications
          </p>
        </div>

        {/* Education Timeline */}
        <div id="education-timeline" className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative pr-8 md:pr-12 border-r-2 border-accent-primary/30 transition-all duration-300 hover:border-accent-primary/50 group text-right"
            >
              {/* Timeline dot */}
              <div
                className="absolute w-4 h-4 bg-accent-primary/30 rounded-full -right-[9px] top-6 transition-all duration-300 group-hover:scale-125 group-hover:bg-accent-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                aria-hidden="true"
              />

              {/* Education Card */}
              <div className="p-6 rounded-xl transition-all duration-300 hover:bg-background-tertiary/50 group">
                <div className="flex items-center justify-end gap-4 mb-3">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-accent-primary" aria-hidden="true" />
                  </div>

                  {/* Degree */}
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-text-primary">
                    {edu.degree}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3 text-text-secondary">
                  <span className="font-medium text-accent-primary">
                    {edu.school}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-muted">{edu.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
