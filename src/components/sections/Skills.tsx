import { Section } from '../ui/Section';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { skillCategories } from '../../constants/data';

export function Skills() {
  return (
    <AnimatedSection className="py-16 bg-gray-900/30">
      <Section id="skills">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                        index={skillIndex}
                      />
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Section>
    </AnimatedSection>
  );
}

