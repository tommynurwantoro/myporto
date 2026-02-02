import { useRef, useEffect } from 'react';
import { Terminal, Sparkles, MapPin } from 'lucide-react';
import profilePicture from '../../assets/profile.jpg';
import { AnimeBackground } from '../ui/AnimeBackground';
import { useMagneticButton, useBounceAnimation } from '../../hooks/useAnime';

export function Header() {
  const greetingRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<SVGSVGElement>(null);

  // Apply hero reveal animations after component mounts
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Animate greeting
      if (greetingRef.current) {
        greetingRef.current.style.opacity = '0';
        greetingRef.current.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          if (greetingRef.current) {
            greetingRef.current.style.transition = 'all 0.6s ease-out';
            greetingRef.current.style.opacity = '1';
            greetingRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      // Animate name
      if (nameRef.current) {
        nameRef.current.style.opacity = '0';
        nameRef.current.style.transform = 'translateY(50px)';
        requestAnimationFrame(() => {
          if (nameRef.current) {
            nameRef.current.style.transition = 'all 0.8s ease-out 0.2s';
            nameRef.current.style.opacity = '1';
            nameRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      // Animate title
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transform = 'translateY(50px)';
        requestAnimationFrame(() => {
          if (titleRef.current) {
            titleRef.current.style.transition = 'all 0.8s ease-out 0.4s';
            titleRef.current.style.opacity = '1';
            titleRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      // Animate location
      if (locationRef.current) {
        locationRef.current.style.opacity = '0';
        locationRef.current.style.transform = 'translateY(20px)';
        requestAnimationFrame(() => {
          if (locationRef.current) {
            locationRef.current.style.transition = 'all 0.6s ease-out 0.5s';
            locationRef.current.style.opacity = '1';
            locationRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      // Animate description
      if (descriptionRef.current) {
        descriptionRef.current.style.opacity = '0';
        descriptionRef.current.style.transform = 'translateY(30px)';
        requestAnimationFrame(() => {
          if (descriptionRef.current) {
            descriptionRef.current.style.transition = 'all 0.8s ease-out 0.6s';
            descriptionRef.current.style.opacity = '1';
            descriptionRef.current.style.transform = 'translateY(0)';
          }
        });
      }

      // Animate CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a');
        buttons.forEach((btn, index) => {
          (btn as HTMLElement).style.opacity = '0';
          (btn as HTMLElement).style.transform = 'translateY(30px) scale(0.9)';
          requestAnimationFrame(() => {
            (btn as HTMLElement).style.transition = `all 0.6s ease-out ${0.8 + index * 0.1}s`;
            (btn as HTMLElement).style.opacity = '1';
            (btn as HTMLElement).style.transform = 'translateY(0) scale(1)';
          });
        });
      }

      // Animate profile
      if (profileRef.current) {
        profileRef.current.style.opacity = '0';
        profileRef.current.style.transform = 'scale(0.8) rotate(-10deg)';
        requestAnimationFrame(() => {
          if (profileRef.current) {
            profileRef.current.style.transition = 'all 1s ease-out 0.3s';
            profileRef.current.style.opacity = '1';
            profileRef.current.style.transform = 'scale(1) rotate(0deg)';
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Apply magnetic button effect to CTAs
  useMagneticButton('#header-cta a', 0.3, []);

  // Apply bounce animation to sparkle icon
  useBounceAnimation('.sparkle-icon', []);

  return (
    <header
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Animated Background */}
      <AnimeBackground />

      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl animate-pulse-slow"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: '1s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32" tabIndex={-1}>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <div
            ref={profileRef}
            className="relative group flex-shrink-0"
          >
            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
              aria-hidden="true"
            />

            {/* Image container */}
            <div className="relative">
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-accent-primary/30 backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:border-accent-primary/50">
                <img
                  src={profilePicture}
                  alt="Tommy Nurwantoro - Backend Engineer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                />
              </div>

              {/* Animated border ring */}
              <div
                className="absolute inset-0 rounded-full border-2 border-accent-primary/20 scale-110 group-hover:scale-125 transition-transform duration-700"
                aria-hidden="true"
              />
            </div>

            {/* Sparkle decoration */}
            <Sparkles
              ref={sparkleRef}
              className="sparkle-icon absolute -top-2 -right-2 text-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-8 h-8"
              aria-hidden="true"
            />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left flex-1">
            {/* Greeting */}
            <div ref={greetingRef} className="flex items-center justify-center lg:justify-start gap-3">
              <Terminal className="w-5 h-5 text-accent-primary animate-pulse" aria-hidden="true" />
              <span className="font-mono text-accent-primary font-medium">Hello, World!</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1
                ref={nameRef}
                className="text-5xl md:text-7xl font-heading font-bold text-text-primary leading-tight"
              >
                Tommy Nurwantoro
              </h1>
              <p
                ref={titleRef}
                className="text-2xl md:text-4xl font-heading font-semibold text-accent-primary"
              >
                Backend Engineer
              </p>
            </div>

            {/* Location */}
            <div ref={locationRef} className="flex items-center justify-center lg:justify-start gap-2 text-text-muted">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Jakarta, Indonesia</span>
            </div>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed"
            >
              Passionate about crafting robust, high-performance backend solutions with{' '}
              <span className="text-accent-primary font-medium">clean architecture</span> and{' '}
              <span className="text-accent-primary font-medium">scalable design patterns</span>.
              Specialized in Golang and distributed systems.
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              id="header-cta"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-background-primary font-heading font-semibold rounded-lg hover:bg-accent-secondary transition-all duration-200 shadow-lg shadow-accent-primary/20 hover:shadow-xl hover:shadow-accent-primary/30 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary cursor-pointer"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 glass text-text-primary font-heading font-semibold rounded-lg hover:bg-background-tertiary transition-all duration-200 border border-surface-border focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background-primary cursor-pointer"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
