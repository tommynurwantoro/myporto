import { Terminal, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import profilePicture from '../../assets/profile.jpg';
import { ParticleBackground } from '../ui/ParticleBackground';
import { useTypewriter } from '../../hooks/framer';

export function Header() {
  const { displayedText: title } = useTypewriter({
    text: 'Backend Engineer',
    speed: 50,
    delay: 300,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <header
      id="about"
      className="w-full px-6 pt-32 pb-16 md:py-32 relative overflow-hidden"
    >
      <ParticleBackground />
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div variants={itemVariants}>
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-emerald-400 transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 relative">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-emerald-400">
                  <img
                    src={profilePicture}
                    alt="Tommy Nurwantoro - Backend Engineer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="eager"
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
              <Sparkles
                className="absolute top-0 right-0 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce"
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4 text-center md:text-left"
          >
            <div className="flex items-center gap-2 text-emerald-400 justify-center md:justify-start">
              <Terminal className="w-5 h-5 animate-pulse" aria-hidden="true" />
              <span className="font-mono gradient-text">Hello, World!</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              Tommy Nurwantoro
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 py-3">
                {title}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              Passionate about crafting robust, high-performance backend
              solutions with clean architecture and scalable design patterns.
              Specialized in Golang and distributed systems.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
