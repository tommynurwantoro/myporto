import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { AnimatedBackground } from './components/ui/AnimatedBackground';
import { Header } from './components/sections/Header';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

export function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <a
        href="#about"
        className="skip-to-content"
        onClick={(e) => {
          e.preventDefault();
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        Skip to main content
      </a>
      <AnimatedBackground mousePosition={mousePosition} />
      <Navigation />
      <Header />
      <Skills />
      <Projects />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-6xl mx-auto">
        <Experience />
        <Education />
      </div>
      <Contact />
    </div>
  );
}

export default App;
