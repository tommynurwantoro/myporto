import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { experiences } from '../../constants/data';
import { cn } from '../../utils/cn';

export function Experience() {
  const [experienceRef, isExperienceInView] = useInView();

  return (
    <Section
      id="experience"
      className="py-16 bg-gray-900/30"
      ref={experienceRef}
      data-in-view={isExperienceInView}
    >
      <div className={cn('w-full', isExperienceInView ? 'revealed' : '', 'reveal-fade')}>
        <h2 className="text-3xl font-bold mb-8 gradient-text">Professional Experience</h2>
        <div className={cn('space-y-8 stagger-children', isExperienceInView ? 'revealed' : '')}>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-2 border-emerald-400/50 transform transition-all duration-500 hover:pl-12 group"
            >
              <div
                className="absolute w-4 h-4 bg-emerald-400/50 rounded-full -left-[9px] top-1 transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-400"
                aria-hidden="true"
              />
              <div className="transition-all duration-500 p-4 rounded-lg group-hover:bg-gray-800/50">
                <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                <p className="text-emerald-400/80">
                  {exp.company} • {exp.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

