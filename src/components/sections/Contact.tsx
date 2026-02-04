import { GithubIcon, Mail, LinkedinIcon } from 'lucide-react';
import { Section } from '../ui/Section';
import { AnimatedSection } from '../ui/AnimatedSection';

export function Contact() {
  return (
    <AnimatedSection className="py-16 bg-gray-900/30">
      <Section>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
          <div className="flex gap-6 justify-center">
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
    </AnimatedSection>
  );
}

