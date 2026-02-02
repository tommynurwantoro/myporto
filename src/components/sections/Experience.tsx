import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { experiences } from '../../constants/data';
import { cn } from '../../utils/cn';
import { useTimelineAnimation } from '../../hooks/useAnime';

export function Experience() {
  const [experienceRef, isExperienceInView] = useInView();

  // Apply timeline animation when in view
  useTimelineAnimation('#experience-timeline > div', [isExperienceInView]);

  return (
    <Section
      id="experience"
      className="bg-background-secondary/50"
      ref={experienceRef}
      data-in-view={isExperienceInView}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={cn('mb-12', isExperienceInView ? 'revealed' : '', 'reveal-fade')}>
          <h2 id="experience-heading" className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
            Professional Experience
          </h2>
          <p className="text-text-secondary text-lg">
            My journey through the tech industry
          </p>
        </div>

        {/* Experience Timeline */}
        <div id="experience-timeline" className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-12 border-l-2 border-accent-primary/30 transition-all duration-300 hover:border-accent-primary/50 group"
            >
              {/* Timeline dot */}
              <div
                className="absolute w-4 h-4 bg-accent-primary/30 rounded-full -left-[9px] top-6 transition-all duration-300 group-hover:scale-125 group-hover:bg-accent-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                aria-hidden="true"
              />

              {/* Experience Card */}
              <div className="p-6 rounded-xl transition-all duration-300 hover:bg-background-tertiary/50 group">
                <div className="flex items-start gap-4">
                  {/* Company Logo */}
                  {exp.logo && (
                    <div className="w-12 h-12 rounded-lg bg-white p-2 flex-shrink-0 flex items-center justify-center shadow-lg">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}

                  {/* Experience Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-heading font-semibold text-text-primary mb-2">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-text-secondary mb-2">
                      <span className="font-medium text-accent-primary">
                        {exp.company}
                      </span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-muted">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
