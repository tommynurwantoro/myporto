import { Navigation } from './components/Navigation';
import { Header } from './components/sections/Header';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';
import { SkipLink } from './components/ui/SkipLink';

export function App() {
  return (
    <div className="w-full min-h-screen bg-background-primary text-text-primary">
      {/* Skip Links for Accessibility */}
      <SkipLink href="#about">Skip to main content</SkipLink>
      <SkipLink href="#navigation">Skip to navigation</SkipLink>

      {/* Navigation */}
      <Navigation />

      {/* Main Content with proper landmark */}
      <main id="main-content">
        {/* Header Section */}
        <Header />

        {/* Skills Section */}
        <section aria-labelledby="skills-heading">
          <Skills />
        </section>

        {/* Projects Section */}
        <section aria-labelledby="projects-heading">
          <Projects />
        </section>

        {/* Two Column Layout for Experience & Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <section aria-labelledby="experience-heading">
            <Experience />
          </section>
          <section aria-labelledby="education-heading">
            <Education />
          </section>
        </div>

        {/* Contact Section */}
        <section aria-labelledby="contact-heading">
          <Contact />
        </section>
      </main>

      {/* Footer with proper landmark */}
      <footer className="py-8 text-center text-text-muted border-t border-surface-border bg-background-secondary">
        <p className="text-sm">
          © {new Date().getFullYear()} Tommy Nurwantoro. Built with{' '}
          <span className="text-accent-primary">React</span>,{' '}
          <span className="text-accent-primary">TypeScript</span>, and{' '}
          <span className="text-accent-primary">Tailwind CSS</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
