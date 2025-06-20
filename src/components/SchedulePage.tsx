import { useEffect } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';

export function SchedulePage() {
    useEffect(() => {
        // Load Calendly script if not already loaded
        if (!document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
            <div className="fixed inset-0 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(16,185,129,0.05),transparent)] animate-pulse"></div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 gradient-text">Schedule a Meeting</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Let's connect and discuss your project, ideas, or potential collaboration opportunities.
                        Pick a time that works best for you.
                    </p>

                    <div className="flex justify-center gap-8 mb-8">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <Calendar className="w-5 h-5" />
                            <span>Flexible Scheduling</span>
                        </div>
                        <div className="flex items-center gap-2 text-blue-400">
                            <Clock className="w-5 h-5" />
                            <span>45 Minutes</span>
                        </div>
                        <div className="flex items-center gap-2 text-purple-400">
                            <Users className="w-5 h-5" />
                            <span>1-on-1 Meeting</span>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover-card-effect">
                        <div
                            className="calendly-inline-widget"
                            data-url="https://calendly.com/tommy-nurwantoro/30min?background_color=707070&text_color=ffffff&primary_color=bcd7ff"
                            style={{ minWidth: '320px', height: '700px' }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
