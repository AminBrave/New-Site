import type { IconName } from '../lib/icons';

export type Lang = 'en' | 'fa';
export type SectionId = 'top' | 'skills' | 'process' | 'work' | 'resume' | 'contact';
export type DisciplineId = 'ux' | 'woo' | 'content';

export interface Link { label: string; href: string }
export interface HeroPart { t: string; mark?: boolean }
export interface Step { title: string; text: string }
export interface ProcessStep { step: string; text: string }
export interface Experience { period: string; role: string; org: string }
export interface Metric { value: string; label: string }
export interface Testimonial { quote: string; author: string; title: string }

export interface SkillGroup { title: string; icon: IconName; items: string[]; ai?: boolean }

export interface DisciplineDetail {
  overview: string;
  deliverables: string[];
  approach: Step[];
  tools: string[];
  ai: { title: string; text: string; points: string[] };
  related: string[];
}

export interface Discipline {
  id: DisciplineId;
  name: string;
  summary: string;
  groups: SkillGroup[];
  detail: DisciplineDetail;
}

export interface Work {
  id: string;
  title: string;
  client: string;
  year: string;
  duration: string;
  team: string;
  roles: string[];
  summary: string;
  overview: string;
  challenge: string;
  goals: string[];
  role: string;
  process: Step[];
  solution: string;
  results: Metric[];
  tools: string[];
  testimonial: Testimonial;
}

/** Images and links shared by both languages. */
export interface WorkShared {
  logo: string;
  cover: string;
  color: string;
  url: string;
  gallery: string[];
}

export interface UiStrings {
  skip: string; sections: string; langLabel: string; themeLabel: string;
  menu: string; menuTitle: string; menuClose: string;
  nav: Record<SectionId, string>;
  ctaWork: string; ctaMail: string; copy: string; copied: string;
  viewCase: string; explore: string; close: string; visit: string; talk: string;
  overview: string; challenge: string; goals: string; process: string; myRole: string;
  solution: string; results: string; tools: string; client: string; year: string;
  duration: string; team: string; gallery: string; shot: string; backTop: string;
  deliver: string; approach: string; toolkit: string; related: string;
}

export interface Locale {
  name: string;
  title: string;
  description: string;
  hero: HeroPart[];
  intro: string;
  roles: Link[];
  email: string;
  links: Link[];
  ui: UiStrings;
  skillsHead: string;
  processHead: string;
  processSub: string;
  workHead: string;
  workSub: string;
  resumeHead: string;
  contactHead: string;
  contactSub: string;
  disciplines: Discipline[];
  process: ProcessStep[];
  work: Work[];
  experience: Experience[];
}
