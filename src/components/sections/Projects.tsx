import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { ChevronLeft, ChevronRight, Folder, X } from 'lucide-react';
import { Section } from '../ui/Section';
import { IconButton } from '../ui/IconButton';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { projects } from '../../constants/data';
import { PROJECTS } from '../../constants/theme';
import { cn } from '../../utils/cn';

export function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsRef, isProjectsInView] = useInView();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, PROJECTS.autoRotateInterval);

    return () => clearInterval(timer);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const goToPrevious = () => {
    setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const goToProject = (index: number) => {
    setCurrentProject(index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Section
      id="projects"
      className="py-16"
      ref={projectsRef}
      data-in-view={isProjectsInView}
    >
      <div className={cn('max-w-6xl mx-auto', isProjectsInView ? 'revealed' : '', 'reveal-fade')}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gradient-text">Featured Projects</h2>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setIsModalOpen(true)}
            className="text-emerald-400 hover:text-emerald-300"
          >
            Show All
          </Button>
        </div>
        <div className="relative">
          <IconButton
            onClick={goToPrevious}
            aria-label="Previous project"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10"
            size="md"
          >
            <ChevronLeft className="w-6 h-6" aria-hidden="true" />
          </IconButton>
          <IconButton
            onClick={goToNext}
            aria-label="Next project"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10"
            size="md"
          >
            <ChevronRight className="w-6 h-6" aria-hidden="true" />
          </IconButton>
          <div className="overflow-hidden">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className={cn(
                'flex transition-transform duration-500 ease-in-out'
              )}
              style={{ transform: `translateX(-${currentProject * 50}%)` }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="w-full md:w-1/2 flex-shrink-0 p-4 group"
                >
                  <div className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 h-full bg-gray-900">
                    <div className="h-48 bg-gray-100 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={`${project.title} logo`}
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <Folder className="w-16 h-16 text-emerald-400" aria-hidden="true" />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4 h-24 overflow-y-auto">
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap" role="list" aria-label="Technologies used">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm"
                            role="listitem"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="flex justify-center gap-2 mt-4" role="tablist" aria-label="Project navigation">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950',
                  currentProject === index ? 'bg-emerald-400' : 'bg-gray-600 hover:bg-gray-500'
                )}
                aria-label={`Go to project ${index + 1}`}
                aria-selected={currentProject === index}
                role="tab"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Projects Modal with AnimatePresence */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-50 w-full max-w-6xl bg-gray-900 border border-gray-700 rounded-lg max-h-[90vh] overflow-hidden flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <h2 id="modal-title" className="text-2xl font-bold gradient-text">
                  All Projects
                </h2>
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  size="sm"
                  className="text-gray-400 hover:text-emerald-400"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </IconButton>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {projects.map((project, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="group"
                    >
                      <div className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/20 h-full bg-gray-900">
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={`${project.title} logo`}
                              className="w-full h-full object-contain p-4"
                              loading="lazy"
                            />
                          ) : (
                            <Folder className="w-16 h-16 text-emerald-400" aria-hidden="true" />
                          )}
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                          <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex gap-2 flex-wrap" role="list" aria-label="Technologies used">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm"
                                role="listitem"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

