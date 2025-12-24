import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { education } from '../../constants/data';
import { cn } from '../../utils/cn';

export function Education() {
  const [educationRef, isEducationInView] = useInView();

  return (
    <Section
      id="education"
      className="py-16 bg-gray-900/30"
      ref={educationRef}
      data-in-view={isEducationInView}
    >
      <div className={cn('w-full', isEducationInView ? 'revealed' : '', 'reveal-fade')}>
        <h2 className="text-3xl font-bold mb-8 gradient-text text-right">Education</h2>
        <div className={cn('space-y-8 stagger-children', isEducationInView ? 'revealed' : '')}>
          {education.map((edu, index) => (
            <div
              key={index}
              className="relative pr-8 border-r-2 border-emerald-400/50 transform transition-all duration-500 hover:pr-12 group text-right"
            >
              <div
                className="absolute w-4 h-4 bg-emerald-400/50 rounded-full -right-[9px] top-1 transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-400"
                aria-hidden="true"
              />
              <div className="transition-all duration-500 p-4 rounded-lg group-hover:bg-gray-800/50">
                <h3 className="text-xl font-bold gradient-text">{edu.degree}</h3>
                <p className="text-emerald-400/80">
                  {edu.school} • {edu.period}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

