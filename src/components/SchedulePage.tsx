import { useEffect, useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import { Navigation } from './Navigation';
import { AnimatedBackground } from './ui/AnimatedBackground';
import { Card } from './ui/Card';

const CALENDLY_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_URL = 'https://calendly.com/tommy-nurwantoro/30min?background_color=707070&text_color=ffffff&primary_color=bcd7ff';

const features = [
  {
    icon: Calendar,
    label: 'Flexible Scheduling',
    color: 'text-emerald-400',
  },
  {
    icon: Clock,
    label: '45 Minutes',
    color: 'text-blue-400',
  },
  {
    icon: Users,
    label: '1-on-1 Meeting',
    color: 'text-purple-400',
  },
] as const;

export function SchedulePage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(`script[src="${CALENDLY_SCRIPT_URL}"]`);
    if (existingScript) {
      setIsLoading(false);
      return;
    }

    // Load Calendly script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = CALENDLY_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      setIsLoading(false);
    };
    script.onerror = () => {
      console.error('Failed to load Calendly script');
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      // Don't remove script on unmount as it might be used elsewhere
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <AnimatedBackground />
      <Navigation />
      <div className="max-w-6xl mx-auto px-6 py-16 pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Schedule a Meeting</h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Let's connect and discuss your project, ideas, or potential collaboration opportunities.
            Pick a time that works best for you.
          </p>

          <div className="flex justify-center gap-8 mb-8 flex-wrap">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="flex items-center gap-2"
                  aria-label={feature.label}
                >
                  <Icon className={`w-5 h-5 ${feature.color}`} aria-hidden="true" />
                  <span className={feature.color}>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card hover className="p-6">
            {isLoading && (
              <div className="flex items-center justify-center h-[700px]">
                <div className="text-gray-400">Loading calendar...</div>
              </div>
            )}
            {!isLoading && (
              <div
                className="calendly-inline-widget"
                data-url={CALENDLY_URL}
                style={{ minWidth: '320px', height: '700px' }}
                aria-label="Calendly scheduling widget"
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
