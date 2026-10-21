// Resume content (section + CV dialog), English (en) and Persian (fa).
// Wrap text in **double asterisks** to make it bold.
// Name, title and email come from content.ts so they are edited in one place.
// NOTE: this supersedes `experience` in content.ts (no longer rendered; safe to delete there).
// TODO: roles, employers, figures and tech lists below were taken from the resume draft. Verify before launch.
import type { Lang } from './types';

export interface ResumeJob {
  period: string;
  role: string;
  org: string;
  place: string;
  points: string[];
  stack: string[];
}
export interface ResumeCompetency { title: string; text: string }
export interface ResumeContent {
  sub: string;
  preview: string;
  download: string;
  modalTitle: string;
  availability: string;
  competenciesHead: string;
  careerHead: string;
  stackLabel: string;
  printHint: string;
  print: string;
  competencies: ResumeCompetency[];
  jobs: ResumeJob[];
}

export const resume: Record<Lang, ResumeContent> = {
  en: {
    sub: 'Seven-plus years of specialized practice across creative agencies, e-commerce brands, and independent work.',
    preview: 'Preview resume',
    download: 'Download resume (PDF)',
    modalTitle: 'Resume preview',
    availability: 'Available worldwide',
    competenciesHead: 'Core competencies',
    careerHead: 'Career',
    stackLabel: 'Stack',
    printHint: 'Opens the print dialog. Choose “Save as PDF”.',
    print: 'Print / Save PDF',
    competencies: [
      { title: 'UI/UX and design systems', text: 'Atomic design tokens, micro-interactions, and WCAG AAA accessible experiences.' },
      { title: 'WooCommerce and web engineering', text: 'Headless and monolith architectures, bespoke plugins, custom checkout funnels.' },
      { title: 'Content strategy and visuals', text: 'Editorial storytelling, conversion copywriting, and bilingual content modeling.' },
    ],
    jobs: [
      {
        period: '2023 – Present',
        role: 'Senior full-stack designer and WooCommerce architect',
        org: 'Independent practice',
        place: 'Remote / International',
        points: [
          'Architected high-volume bespoke WooCommerce platforms processing over $14M in aggregate annual GMV.',
          'Designed and implemented bidirectional design systems (English LTR / Persian RTL) for regional B2B and consumer brands.',
          'Built **AI-accelerated workflows** that cut client development timelines by up to 35% without technical debt.',
        ],
        stack: ['WooCommerce', 'WordPress Core', 'Astro', 'Bootstrap 5.3', 'PHP 8.3', 'TypeScript', 'Tailwind CSS'],
      },
      {
        period: '2020 – 2023',
        role: 'Lead UI/UX designer and frontend engineer',
        org: 'Aura Creative Studio',
        place: 'Tehran and Dubai',
        points: [
          'Led a team of 4 designers and 5 frontend engineers delivering digital products for retail, fintech, and publishing clients.',
          'Established design-token pipelines syncing Figma variables with Bootstrap 5 SCSS and Astro component libraries.',
          'Authored and standardized the agency’s Persian web typography guide and accessibility handbook.',
        ],
        stack: ['Figma', 'Design systems', 'JavaScript (ESNext)', 'Bootstrap 5', 'HTML5 / CSS3', 'Git'],
      },
      {
        period: '2018 – 2020',
        role: 'WordPress and e-commerce developer',
        org: 'Novin Digital Agency',
        place: 'Tehran',
        points: [
          'Developed 25+ custom WordPress themes and WooCommerce extensions tailored to Iranian payment gateways and Shetab banking.',
          'Optimized server caching with Redis and NGINX FastCGI microcaching.',
          'Ran UX workshops and turned client requirements into structured technical roadmaps.',
        ],
        stack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'jQuery / Vanilla JS', 'REST APIs'],
      },
    ],
  },

  fa: {
    sub: 'بیش از ۷ سال تجربه تخصصی در آژانس‌های خلاق، برندهای تجارت الکترونیک و فعالیت مستقل.',
    preview: 'مشاهده رزومه',
    download: 'دانلود رزومه (PDF)',
    modalTitle: 'پیش‌نمایش رزومه',
    availability: 'آماده همکاری در سراسر جهان',
    competenciesHead: 'شایستگی‌های اصلی',
    careerHead: 'مسیر شغلی',
    stackLabel: 'فناوری‌ها',
    printHint: 'پنجره چاپ باز می‌شود؛ گزینه «ذخیره به‌صورت PDF» را انتخاب کنید.',
    print: 'چاپ / ذخیره PDF',
    competencies: [
      { title: 'طراحی UI/UX و سیستم‌های طراحی', text: 'توکن‌های طراحی اتمیک، ریزتعامل‌ها و تجربه‌های دسترس‌پذیر مطابق WCAG AAA.' },
      { title: 'ووکامرس و مهندسی وب', text: 'معماری هدلس و یکپارچه، افزونه‌های اختصاصی و قیف‌های پرداخت سفارشی.' },
      { title: 'استراتژی محتوا و بصری', text: 'روایت‌گری تحریریه‌ای، کپی‌رایتینگ تبدیل‌محور و مدل‌سازی محتوای دوزبانه.' },
    ],
    jobs: [
      {
        period: '۲۰۲۳ – اکنون',
        role: 'طراح ارشد فول‌استک و معمار ووکامرس',
        org: 'فعالیت مستقل',
        place: 'دورکار / بین‌المللی',
        points: [
          'معماری پلتفرم‌های اختصاصی و پرترافیک ووکامرس با بیش از ۱۴ میلیون دلار حجم فروش سالانه (مجموع).',
          'طراحی و پیاده‌سازی سیستم‌های طراحی دوسویه (انگلیسی چپ‌به‌راست / فارسی راست‌به‌چپ) برای برندهای B2B و مصرف‌کننده منطقه‌ای.',
          'ساخت **جریان‌های کاری مبتنی بر هوش مصنوعی** که زمان توسعه پروژه‌ها را تا ۳۵٪ کاهش داد، بدون ایجاد بدهی فنی.',
        ],
        stack: ['WooCommerce', 'WordPress Core', 'Astro', 'Bootstrap 5.3', 'PHP 8.3', 'TypeScript', 'Tailwind CSS'],
      },
      {
        period: '۲۰۲۰ – ۲۰۲۳',
        role: 'طراح ارشد UI/UX و مهندس فرانت‌اند',
        org: 'Aura Creative Studio',
        place: 'تهران و دبی',
        points: [
          'رهبری تیمی شامل ۴ طراح و ۵ مهندس فرانت‌اند برای تحویل محصولات دیجیتال در حوزه‌های خرده‌فروشی، فین‌تک و نشر.',
          'راه‌اندازی خط لوله توکن‌های طراحی برای همگام‌سازی متغیرهای Figma با SCSS بوت‌استرپ ۵ و کتابخانه کامپوننت‌های Astro.',
          'تدوین و استانداردسازی راهنمای تایپوگرافی وب فارسی و کتابچه رعایت دسترس‌پذیری استودیو.',
        ],
        stack: ['Figma', 'Design systems', 'JavaScript (ESNext)', 'Bootstrap 5', 'HTML5 / CSS3', 'Git'],
      },
      {
        period: '۲۰۱۸ – ۲۰۲۰',
        role: 'توسعه‌دهنده وردپرس و تجارت الکترونیک',
        org: 'Novin Digital Agency',
        place: 'تهران',
        points: [
          'توسعه بیش از ۲۵ قالب سفارشی وردپرس و افزونه ووکامرس متناسب با درگاه‌های پرداخت ایرانی و شبکه بانکی شتاب.',
          'بهینه‌سازی معماری کش سرور با Redis و میکروکش FastCGI در NGINX.',
          'برگزاری کارگاه‌های تجربه کاربری و تبدیل نیازهای کارفرما به نقشه راه فنی ساختارمند.',
        ],
        stack: ['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'jQuery / Vanilla JS', 'REST APIs'],
      },
    ],
  },
};
