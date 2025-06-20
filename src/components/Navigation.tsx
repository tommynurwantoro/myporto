import { useState } from 'react';
import { MenuIcon, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-emerald-400 font-mono typing">~/portfolio</Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-emerald-400"
            >
              {isMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
          <div
            className={`${isMenuOpen ? "absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 p-4" : "hidden"} md:block`}
          >
            <div
              className={`flex ${isMenuOpen ? "flex-col" : "flex-row"} gap-6 ${isMenuOpen ? "items-start" : "items-center"}`}
            >
              <a
                href="#about"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                About
              </a>
              <a
                href="#skills"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Experience
              </a>
              <a
                href="#education"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                Education
              </a>
              <Link
                to="/schedule"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Schedule
              </Link>
              <Link
                to="/payme"
                className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
              >
                <Heart className="w-4 h-4" />
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 