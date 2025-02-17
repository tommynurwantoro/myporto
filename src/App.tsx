import { useState, useEffect } from "react";
import { useInView } from "./hooks/useInView";
import {
  Terminal,
  Database,
  Server,
  Code2,
  GithubIcon,
  Mail,
  LinkedinIcon,
  Folder,
  MenuIcon,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import mitraBLLogo from './assets/logo-mitra-bl.png';
import blLogo from './assets/logo-bl.png';
import laLogo from './assets/logo-la.png';
import runsLogo from './assets/logo-runs.png';
import profilePicture from './assets/profile.png';

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for scroll animations
  const [skillsRef, isSkillsInView] = useInView();
  const [projectsRef, isProjectsInView] = useInView();
  const [experienceRef, isExperienceInView] = useInView();
  const [contactRef, isContactInView] = useInView();

  const projects = [
    {
      title: "RUN System ERP Web",
      image: runsLogo,
      description: "A web version of RUN System ERP. This project is a part of RUN System ERP, which is a system for managing businesses. This project is responsible for managing business data, including customer, supplier, and more.",
      technologies: ["Golang", "NextJS", "PostgreSQL", "Redis"]
    },
    {
      title: "RUN System Platform",
      image: runsLogo,
      description: "A low-code application for creating an app without coding. This project has a lot of complex features, including multi-tenant, integration with other systems, and more. User can easily design their own resource, workflow, and screen to display data.",
      technologies: ["Golang", "NextJS", "PostgreSQL", "Redis", "Kafka"]
    },
    {
      title: "LinkAja Bonus Balance",
      image: laLogo,
      description: "High-performance bonus balance backend supporting 200+ concurrent transactions. This project is responsible for managing bonus balance usecases for LinkAja users. Mostly focusing on bonus balance movement with history for each user.",
      technologies: ["Golang", "PostgreSQL", "Redis"]
    },
    {
      title: "LinkAja Loyalty",
      image: laLogo,
      description: "A loyalty program for LinkAja users. Mainly focus on voucher user and partner in LinkAja. This project handled B2B and B2C voucher usecases.",
      technologies: ["Golang", "PostgreSQL", "Redis", "Kafka"]
    },
    {
      title: "Bukalapak (Voucher)",
      image: blLogo,
      description: "High-performance voucher backend supporting 10K+ concurrent users. This project is a part of Bukalapak voucher team, which is responsible for creating voucher usecases for Bukalapak users. We also handle voucher redemption and any other features related to voucher.",
      technologies: ["Golang", "Redis", "Kubernetes", "GCP"]
    },
    {
      title: "Mitra Bukalapak",
      image: mitraBLLogo,
      description: "One of Bukalapak project for merchant. We called the merchant as warung in Indonesia. This apps help warung to excalate their income and become a modern warung, so they can compete with modern markets. Warung can sell virtual product from Mitra Bukalapak and buy their goods by grosir in the apps.",
      technologies: ["Ruby on Rails", "Golang", "Kubernetes", "GCP"]
    }
  ];

  const experiences = [
    {
      title: "Head of Platform and Digital Product Engineering",
      company: "RUN System",
      period: "2023 - Present",
    },
    {
      title: "AVP Loyalty and Promo Engineering",
      company: "LinkAja",
      period: "2021 - 2023",
    },
    {
      title: "Backend Engineer Specialist",
      company: "LinkAja",
      period: "2020 - 2021",
    },
    {
      title: "Senior Software Engineer",
      company: "Bukalapak",
      period: "2018 - 2020",
    },
    {
      title: "Software Engineer",
      company: "Mitrais",
      period: "2017 - 2018",
    },
    {
      title: ".NET Developer",
      company: "PT. Indocyber Global Technology",
      period: "2015 - 2017",
    },
    {
      title: "Bootcamp Programmer .NET",
      company: "PT. Indocyber Global Technology",
      period: "2015 - 2015",
    }
  ];

  const education = [
    {
      degree: "Computer Software Engineering",
      school: "Institut Teknologi Sepuluh Nopember (ITS)",
      period: "2011 - 2015"
    },
    {
      degree: "Senior High School",
      school: "SMA Negeri 2 Lumajang",
      period: "2008 - 2011"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    }, 5000);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [projects.length]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100">
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(16,185,129,0.05),transparent)] animate-pulse"></div>
      </div>

      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.03), transparent 80%)`,
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <span className="text-emerald-400 font-mono typing">~/portfolio</span>
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
                  href="#experience"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Education
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header
        id="about"
        className="w-full px-6 pt-32 pb-16 md:py-32 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-4 w-4 bg-emerald-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-emerald-400 transition-all duration-500 group-hover:scale-105 group-hover:rotate-6 glow">
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-emerald-400">
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <Sparkles className="absolute top-0 right-0 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-bounce" />
            </div>
            <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center gap-2 text-emerald-400 justify-center md:justify-start animate-fade-in floating">
                <Terminal className="w-5 h-5 animate-pulse" />
                <span className="font-mono gradient-text">Hello, World!</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold animate-slide-up animate-gradient-x shine">
                Tommy Nurwantoro
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 py-3">
                  Backend Engineer
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl animate-fade-in">
                Passionate about crafting robust, high-performance backend
                solutions with clean architecture and scalable design patterns.
                Specialized in Golang and distributed systems.
              </p>
            </div>
          </div>
        </div>
      </header>
      <section 
        id="skills" 
        className="w-full px-6 py-16 bg-gray-900/30"
        ref={skillsRef as any}
      >
        <div className={`max-w-6xl mx-auto ${isSkillsInView ? 'revealed' : ''} reveal-fade`}>
          <h2 className="text-3xl font-bold mb-8 gradient-text">Technical Expertise</h2>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${isSkillsInView ? 'revealed' : ''}`}>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover-card-effect tilt-effect">
              <Code2 className="w-8 h-8 text-emerald-400 mb-4 floating" />
              <h3 className="text-xl font-bold mb-4">Backend Development</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Golang</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[95%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Microservices</span>
                    <span>95%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[95%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>API Design</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[90%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover-card-effect tilt-effect">
              <Server className="w-8 h-8 text-emerald-400 mb-4 floating" />
              <h3 className="text-xl font-bold mb-4">Infrastructure</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Docker</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[90%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Kubernetes</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[85%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>AWS</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[80%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 hover-card-effect tilt-effect">
              <Database className="w-8 h-8 text-emerald-400 mb-4 floating" />
              <h3 className="text-xl font-bold mb-4">Database Systems</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>PostgreSQL</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[90%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Redis</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[90%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Kafka</span>
                    <span>90%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-[90%] bg-emerald-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section 
        id="projects" 
        className="w-full px-6 py-16"
        ref={projectsRef as any}
      >
        <div className={`max-w-6xl mx-auto ${isProjectsInView ? 'revealed' : ''} reveal-fade`}>
          <h2 className="text-3xl font-bold mb-8 gradient-text">Featured Projects</h2>
          <div className="relative">
            <button
              onClick={() => setCurrentProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-2 bg-gray-800/50 rounded-full text-emerald-400 hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-2 bg-gray-800/50 rounded-full text-emerald-400 hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="overflow-hidden">
              <div
                className={`flex transition-transform duration-500 ease-in-out stagger-children ${isProjectsInView ? 'revealed' : ''}`}
                style={{ transform: `translateX(-${currentProject * 50}%)` }}
              >
                {projects.map((project, index) => (
                  <div key={index} className="w-full md:w-1/2 flex-shrink-0 p-4">
                    <div className="h-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover-card-effect shine">
                      <div className="h-48 bg-gray-100 flex items-center justify-center">
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Folder className="w-16 h-16 text-emerald-400" />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4 h-24 overflow-y-auto">{project.description}</p>
                        <div className="flex gap-2 flex-wrap">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-emerald-400/10 text-emerald-400 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${currentProject === index ? "bg-emerald-400" : "bg-gray-600"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section 
        id="experience" 
        className="w-full px-6 py-16 bg-gray-900/30"
        ref={experienceRef as any}
      >
        <div className={`max-w-6xl mx-auto ${isExperienceInView ? 'revealed' : ''} reveal-fade`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-8 gradient-text">Professional Experience</h2>
              <div className={`space-y-8 stagger-children ${isExperienceInView ? 'revealed' : ''}`}>
                {experiences.map((exp, index) => (
                  <div 
                    key={index} 
                    className="relative pl-8 border-l-2 border-emerald-400/50 transform transition-all duration-500 hover:pl-12 group"
                  >
                    <div className="absolute w-4 h-4 bg-emerald-400/50 rounded-full -left-[9px] top-1 transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-400"></div>
                    <div className="transition-all duration-500 p-4 rounded-lg group-hover:bg-gray-800/50">
                      <h3 className="text-xl font-bold gradient-text">{exp.title}</h3>
                      <p className="text-emerald-400/80">{exp.company} • {exp.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-3xl font-bold mb-8 gradient-text">Education</h2>
              <div className={`space-y-8 stagger-children ${isExperienceInView ? 'revealed' : ''}`}>
                {education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="relative pr-8 border-r-2 border-emerald-400/50 transform transition-all duration-500 hover:pr-12 group"
                  >
                    <div className="absolute w-4 h-4 bg-emerald-400/50 rounded-full -right-[9px] top-1 transition-all duration-500 group-hover:scale-125 group-hover:bg-emerald-400"></div>
                    <div className="transition-all duration-500 p-4 rounded-lg group-hover:bg-gray-800/50">
                      <h3 className="text-xl font-bold gradient-text">{edu.degree}</h3>
                      <p className="text-emerald-400/80">{edu.school} • {edu.period}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer 
        className="w-full px-6 py-16 bg-gray-900/30"
        ref={contactRef as any}
      >
        <div className={`max-w-6xl mx-auto ${isContactInView ? 'revealed' : ''} reveal-fade text-center`}>
          <h2 className="text-3xl font-bold mb-8 gradient-text">Get in Touch</h2>
          <div className={`flex gap-6 stagger-children ${isContactInView ? 'revealed' : ''} justify-center`}>
            <a
              href="https://github.com/tommynurwantoro"
              className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 floating"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/tommynurwantoro"
              className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 floating"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a
              href="mailto:tommy.nurwantoro@gmail.com"
              className="text-gray-400 hover:text-emerald-400 transition-all duration-300 transform hover:scale-125 floating"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
          background-size: 400% 400%;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App
