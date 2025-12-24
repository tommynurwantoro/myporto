import { GithubIcon, Mail, LinkedinIcon } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { cn } from '../../utils/cn';

export function Contact() {
  const [contactRef, isContactInView] = useInView();

  return (
    <Section
      className="py-16 bg-gray-900/30"
      ref={contactRef}
      data-in-view={isContactInView}
    >
      <div className={cn('max-w-6xl mx-auto text-center', isContactInView ? 'revealed' : '', 'reveal-fade')}>
        <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
        <div className={cn('flex gap-6 stagger-children', isContactInView ? 'revealed' : '', 'justify-center')}>
          <a
            href="https://github.com/tommynurwantoro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full p-2"
            aria-label="Visit GitHub profile"
          >
            <GithubIcon className="w-6 h-6" aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/tommynurwantoro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full p-2"
            aria-label="Visit LinkedIn profile"
          >
            <LinkedinIcon className="w-6 h-6" aria-hidden="true" />
          </a>
          <a
            href="mailto:tommy.nurwantoro@gmail.com"
            className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950 rounded-full p-2"
            aria-label="Send email"
          >
            <Mail className="w-6 h-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}

