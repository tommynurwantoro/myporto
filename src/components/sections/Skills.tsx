import { useRef, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { skillCategories } from '../../constants/data';
import { cn } from '../../utils/cn';
import { useCardTilt } from '../../hooks/useAnime';

export function Skills() {
  const [skillsRef, isSkillsInView] = useInView();
  const skillsGridRef = useRef<HTMLDivElement>(null);

  // Apply card tilt effect to skill cards
  useCardTilt('#skills-grid > div', [isSkillsInView]);

  // Apply counter animations to progress bars when in view
  useEffect(() => {
    if (isSkillsInView && skillsGridRef.current) {
      const progressBars = skillsGridRef.current.querySelectorAll('[data-percentage]');
      progressBars.forEach((bar, index) => {
        const percentage = parseInt(bar.getAttribute('data-percentage') || '0', 10);
        const progressBar = bar.querySelector('[role="progressbar"]') as HTMLElement;
        if (progressBar) {
          setTimeout(() => {
            progressBar.style.transition = 'width 1.5s ease-out';
            progressBar.style.width = `${percentage}%`;
          }, 200 + index * 100);
        }
      });
    }
  }, [isSkillsInView]);

  return (
    <Section
      id="skills"
      className="bg-background-secondary/50"
      ref={skillsRef}
      data-in-view={isSkillsInView}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={cn('mb-12', isSkillsInView ? 'revealed' : '', 'reveal-fade')}>
          <h2 id="skills-heading" className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Technical Expertise
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Technologies and tools I use to build scalable, high-performance systems
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={skillsGridRef}
          id="skills-grid"
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
            'stagger-children',
            isSkillsInView ? 'revealed' : ''
          )}
          role="list"
          aria-label="Technical skills categories"
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} hover glass className="p-6 skill-card" role="listitem" data-index={index}>
                {/* Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center" aria-hidden="true">
                    <Icon className="w-6 h-6 text-accent-primary" />
                  </div>
                </div>

                {/* Category Title */}
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-6">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-5" role="list" aria-label={`${category.title} skills`}>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} data-percentage={skill.percentage}>
                      <ProgressBar
                        label={skill.name}
                        percentage={0} // Start at 0, animate to actual value
                        size="md"
                        color="accent"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
