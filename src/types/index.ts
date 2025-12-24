export interface Project {
  title: string;
  image: string;
  description: string;
  technologies: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export interface Skill {
  name: string;
  percentage: number;
}

import type { ComponentType } from 'react';

export interface SkillCategory {
  title: string;
  icon: ComponentType<{ className?: string }>;
  skills: Skill[];
}

export interface PaymentMethod {
  name: string;
  accountNumber: string;
  accountName: string;
  qrImage: string;
}

export interface ParticlePosition {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLElement>;
  'data-in-view'?: boolean;
}

