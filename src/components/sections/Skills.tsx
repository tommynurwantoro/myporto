import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { skillCategories } from '../../constants/data';
import { cn } from '../../utils/cn';

export function Skills() {
  const [skillsRef, isSkillsInView] = useInView();

  return (
    <Section
      id="skills"
      className="py-16 bg-gray-900/30"
      ref={skillsRef}
      data-in-view={isSkillsInView}
    >
      <div className={cn('max-w-6xl mx-auto', isSkillsInView ? 'revealed' : '', 'reveal-fade')}>
        <h2 className="text-3xl font-bold mb-8 gradient-text">Technical Expertise</h2>
        <div
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
            'stagger-children',
            isSkillsInView ? 'revealed' : ''
          )}
        >
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} hover className="p-6">
                <Icon className="w-8 h-8 text-emerald-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold mb-4">{category.title}</h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <ProgressBar
                      key={skillIndex}
                      label={skill.name}
                      percentage={skill.percentage}
                    />
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

