import type { Project, Experience, Education, SkillCategory } from '../types';
import { Code2, Server, Database, Blocks } from 'lucide-react';
import mitraBLLogo from '../assets/logo-mitra-bl.png';
import blLogo from '../assets/logo-bl.png';
import laLogo from '../assets/logo-la.png';
import runsLogo from '../assets/logo-runs.png';
import accountingPlusLogo from '../assets/logo-acc.svg';

export const projects: Project[] = [
  {
    title: "Accounting+",
    image: accountingPlusLogo,
    description: "Accounting+ is a cloud-based web application designed to simplify accounting processes and business transaction recording in an efficient and intelligent way. Powered by RUN System’s AI-driven Personal Assistant technology, Accounting+ helps users prepare accounting and financial reports faster, more accurately, and with greater ease.",
    technologies: ["Golang", "NextJS", "PostgreSQL", "Redis", "Kafka", "AI"]
  },
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

export const experiences: Experience[] = [
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

export const education: Education[] = [
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

export const skillCategories: SkillCategory[] = [
  {
    title: "Backend Development",
    icon: Code2,
    skills: [
      { name: "Golang", percentage: 95 },
      { name: "Microservices", percentage: 95 },
      { name: "API Design", percentage: 90 },
    ]
  },
  {
    title: "Blockchain",
    icon: Blocks,
    skills: [
      { name: "Smart Contracts", percentage: 80 },
      { name: "Blockchain Integration", percentage: 80 },
    ]
  },
  {
    title: "Infrastructure",
    icon: Server,
    skills: [
      { name: "Docker", percentage: 90 },
      { name: "Kubernetes", percentage: 80 },
      { name: "AWS", percentage: 90 },
    ]
  },
  {
    title: "Database Systems",
    icon: Database,
    skills: [
      { name: "PostgreSQL", percentage: 90 },
      { name: "Redis", percentage: 90 },
      { name: "Kafka", percentage: 90 },
    ]
  }
];

