import { useState, useEffect, useRef } from 'react';
import { useInView } from '../../hooks/useInView';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { IconButton } from '../ui/IconButton';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { projects } from '../../constants/data';
import { PROJECTS } from '../../constants/theme';
import { cn } from '../../utils/cn';
import { useRevealAnimation, useCardTilt } from '../../hooks/useAnime';

export function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsRef, isProjectsInView] = useInView();
  const carouselRef = useRef<HTMLDivElement>(null);

  // Apply reveal animation when in view
  useRevealAnimation('#projects-carousel', 150, [isProjectsInView]);

  // Apply card tilt to project cards
  useCardTilt('.project-card', [isProjectsInView]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, PROJECTS.autoRotateInterval);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  return (
    <Section
      id="projects"
      ref={projectsRef}
      data-in-view={isProjectsInView}
    >
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={cn('mb-12 flex items-center justify-between', isProjectsInView ? 'revealed' : '', 'reveal-fade')}>
          <div>
            <h2 id="projects-heading" className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-2">
              Featured Projects
            </h2>
            <p className="text-text-secondary text-lg">
              Showcase of my recent work and contributions
            </p>
          </div>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            className="hidden md:flex"
          >
            View All Projects
          </Button>
        </div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <IconButton
            onClick={goToPrevious}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 hidden md:flex"
            size="md"
            variant="secondary"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </IconButton>
          <IconButton
            onClick={goToNext}
            aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 hidden md:flex"
            size="md"
            variant="secondary"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </IconButton>

          {/* Carousel */}
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              id="projects-carousel"
              className={cn(
                'flex transition-transform duration-500 ease-out',
                isProjectsInView ? 'revealed' : ''
              )}
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="w-full flex-shrink-0 px-0 md:px-4">
                  <Card hover glow className="h-full overflow-hidden project-card">
                    {/* Project Image */}
                    <div className="h-56 bg-gradient-to-br from-background-tertiary to-background-secondary flex items-center justify-center p-8">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <FolderOpen className="w-20 h-20 text-accent-primary/50" aria-hidden="true" />
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-heading font-semibold text-text-primary mb-3">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary mb-6 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1.5 bg-accent-primary/10 text-accent-primary rounded-lg text-sm font-medium border border-accent-primary/20"
                            role="listitem"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label="Project navigation">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={cn(
                  'h-2 rounded-full transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary cursor-pointer',
                  currentProject === index
                    ? 'w-8 bg-accent-primary'
                    : 'w-2 bg-background-tertiary hover:bg-accent-primary/50'
                )}
                aria-label={`Go to project ${index + 1}`}
                aria-selected={currentProject === index}
                role="tab"
              />
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <IconButton
              onClick={goToPrevious}
              aria-label="Previous project"
              size="md"
              variant="secondary"
            >
              <ChevronLeft className="w-6 h-6" aria-hidden="true" />
            </IconButton>
            <IconButton
              onClick={goToNext}
              aria-label="Next project"
              size="md"
              variant="secondary"
            >
              <ChevronRight className="w-6 h-6" aria-hidden="true" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Projects Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="All Projects"
        size="xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} hover className="h-full overflow-hidden project-card">
              <div className="h-48 bg-gradient-to-br from-background-tertiary to-background-secondary flex items-center justify-center p-6">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <FolderOpen className="w-16 h-16 text-accent-primary/50" aria-hidden="true" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-lg text-sm font-medium border border-accent-primary/20"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Modal>
    </Section>
  );
}
