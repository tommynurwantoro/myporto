import { Github as GithubIcon, Linkedin as LinkedinIcon, Mail, Send } from 'lucide-react';
import { useInView } from '../../hooks/useInView';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';
import { useRevealAnimation, useMagneticButton } from '../../hooks/useAnime';

export function Contact() {
  const [contactRef, isContactInView] = useInView();

  // Apply reveal animation when in view
  useRevealAnimation('#contact-social-links', 150, [isContactInView]);

  // Apply magnetic button effect to email CTA
  useMagneticButton('#email-cta', 0.3, []);

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/tommynurwantoro',
      icon: GithubIcon,
      ariaLabel: 'Visit GitHub profile',
      description: 'Check out my repositories',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tommynurwantoro',
      icon: LinkedinIcon,
      ariaLabel: 'Visit LinkedIn profile',
      description: 'Connect with me professionally',
    },
    {
      name: 'Email',
      href: 'mailto:tommy.nurwantoro@gmail.com',
      icon: Mail,
      ariaLabel: 'Send email',
      description: 'Get in touch directly',
    },
  ];

  return (
    <Section
      id="contact"
      className="bg-background-secondary/50"
      ref={contactRef}
      data-in-view={isContactInView}
    >
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <div className={cn('mb-12', isContactInView ? 'revealed' : '', 'reveal-fade')}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-primary/10 mb-6">
            <Send className="w-8 h-8 text-accent-primary" aria-hidden="true" />
          </div>
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </div>

        {/* Social Links */}
        <div
          id="contact-social-links"
          className={cn(
            'grid grid-cols-1 md:grid-cols-3 gap-6',
            'stagger-children',
            isContactInView ? 'revealed' : ''
          )}
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
              >
                <Card hover glass className="h-full p-8 text-center cursor-pointer social-card">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors duration-200">
                      <Icon className="w-8 h-8 text-accent-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-text-primary mb-1">
                        {link.name}
                      </h3>
                      <p className="text-text-muted text-sm">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            );
          })}
        </div>

        {/* Email CTA */}
        <div className={cn('mt-12', isContactInView ? 'revealed' : '', 'reveal-fade')}>
          <a
            id="email-cta"
            href="mailto:tommy.nurwantoro@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent-primary text-background-primary font-heading font-semibold rounded-xl hover:bg-accent-secondary transition-all duration-200 shadow-lg shadow-accent-primary/20 hover:shadow-xl hover:shadow-accent-primary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary cursor-pointer text-lg"
          >
            <Mail className="w-5 h-5" aria-hidden="true" />
            Send Me a Message
          </a>
        </div>
      </div>
    </Section>
  );
}
