// All site text lives here, in English (en) and Persian (fa). Items marked TODO are placeholders.
// Wrap text in **double asterisks** to make it bold.
import type { Lang, Link, Locale, WorkShared } from './types';

const links: Link[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' }, // TODO
  { label: 'GitHub', href: 'https://github.com/your-handle' }, // TODO
  { label: 'Dribbble', href: 'https://dribbble.com/your-handle' }, // TODO
];
const email = 'hello@example.com'; // TODO

export const content: Record<Lang, Locale> = {
  /* ============================== ENGLISH ============================== */
  en: {
    name: 'Your Name', // TODO
    title: 'Senior UI/UX designer, WooCommerce developer and content strategist',
    description:
      'Portfolio of a senior UI/UX designer, senior WordPress and WooCommerce developer, and content strategist covering brand visual identity, graphics, photography and video, with an AI-powered workflow.',
    hero: [{ t: 'I design it,' }, { t: 'build it,', mark: true }, { t: 'and write it.' }],
    intro:
      'I design online stores and digital products, build them in WooCommerce, and shape the content and **brand visuals** that carry them: identity, graphics, photography, and video. I work with **advanced AI tools** across design, development, and strategy, and keep every decision human.',
    roles: [
      { label: 'UI/UX design', href: '#ux' },
      { label: 'WooCommerce development', href: '#woo' },
      { label: 'Content strategy and visuals', href: '#content' },
    ],
    email,
    links,
    ui: {
      skip: 'Skip to content',
      sections: 'Page sections',
      langLabel: 'Language',
      themeLabel: 'Dark mode',
      menu: 'Menu',
      menuTitle: 'Site menu',
      menuClose: 'Close menu',
      nav: { top: 'Home', skills: 'Skills', process: 'Process', work: 'Work', resume: 'Resume', contact: 'Contact' },
      ctaWork: 'See selected work',
      ctaMail: 'Email me',
      copy: 'Copy email',
      copied: 'Copied',
      viewCase: 'View case study',
      explore: 'Explore details',
      close: 'Close',
      visit: 'Visit live site',
      talk: 'Discuss a project',
      overview: 'Overview', challenge: 'Challenge', goals: 'Goals', process: 'Process', myRole: 'My role',
      solution: 'Solution', results: 'Results', tools: 'Tools', client: 'Client', year: 'Year',
      duration: 'Duration', team: 'Team', gallery: 'Project images', shot: 'Screenshot', backTop: 'Back to top',
      deliver: 'What I deliver', approach: 'Approach', toolkit: 'Toolkit', related: 'Related work',
    },
    skillsHead: 'Three skills, one workflow',
    processHead: 'How I work',
    processSub:
      'The same five steps apply whether the project is a redesign, a build, or a content overhaul, with **advanced AI tools** supporting each one.',
    workHead: 'Selected work',
    workSub: 'Each project opens into a full case study: problem, process, solution, and results.',
    resumeHead: 'Resume',
    contactHead: "Let's talk about your project",
    contactSub: 'Tell me what you are building and where it is stuck. I reply within a few working days.',
    disciplines: [
      {
        id: 'ux',
        name: 'UI/UX design',
        summary:
          'Interfaces people understand on the first try. I start with who is using the product and what stops them, then design the simplest path to their goal, with **AI-assisted** exploration to widen the options.',
        groups: [
          { title: 'Research and strategy', icon: 'search', items: [
            'User research and interviews',
            'Information architecture and user flows',
            'Usability testing and iteration',
          ] },
          { title: 'Design and systems', icon: 'pen', items: [
            'Wireframing and interactive prototyping',
            'Design systems and component libraries',
            'Responsive and mobile-first design',
          ] },
          { title: 'Quality and growth', icon: 'target', items: [
            'Accessibility (WCAG 2.1 AA)',
            'Conversion-focused ecommerce UX',
          ] },
          { title: 'AI workflow', icon: 'spark', ai: true, items: [
            '**AI-assisted design** and rapid prototyping',
            'Research and feedback synthesis',
          ] },
        ],
        detail: {
          overview:
            'I design interfaces for online stores and digital products, from research to tested, developer-ready design. The goal is always the same: fewer steps between a visitor and what they came to do.',
          deliverables: [
            'User research summaries and personas',
            'Information architecture and sitemaps',
            'User flows and wireframes',
            'Interactive prototypes',
            'UI kits and design systems',
            'Usability test reports',
            'Accessibility review (WCAG 2.1 AA)',
            'Developer handoff specs',
          ],
          approach: [
            { title: 'Understand', text: 'Research with stakeholders and users.' },
            { title: 'Structure', text: 'Information architecture, flows, and wireframes.' },
            { title: 'Design', text: 'Interface, design system, and prototype.' },
            { title: 'Validate', text: 'Usability tests and accessibility checks.' },
            { title: 'Hand off', text: 'Specs, tokens, and support during QA.' },
          ],
          tools: ['Figma', 'Prototyping', 'Design systems', 'Usability testing'], // TODO
          ai: {
            title: 'AI in my design workflow',
            text: 'I use **advanced AI tools** to speed up the slow parts of design, such as research synthesis, copy and layout exploration, and asset variations, then review everything by hand. AI widens the options; design judgment makes the decisions.',
            points: [
              'Research and feedback synthesis',
              'Rapid concept and layout exploration',
              'Asset variations and image editing',
              'Accessibility and consistency checks',
            ],
          },
          related: ['store-redesign', 'content-strategy'],
        },
      },
      {
        id: 'woo',
        name: 'WordPress and WooCommerce development',
        summary:
          'Stores that are fast, maintainable, and easy for the client to run. I build what the design calls for without piling plugins on top of each other, with **AI-assisted development** and careful review.',
        groups: [
          { title: 'Build and extend', icon: 'code', items: [
            'Custom themes and block themes',
            'Custom plugins and WooCommerce extensions',
            'REST API and third-party integrations',
          ] },
          { title: 'Store experience', icon: 'cart', items: [
            'Cart and checkout customization',
            'Payment, shipping, and tax integrations',
          ] },
          { title: 'Speed and care', icon: 'shield', items: [
            'Performance and Core Web Vitals tuning',
            'Store migrations and platform upgrades',
            'Security hardening and maintenance',
          ] },
          { title: 'AI workflow', icon: 'spark', ai: true, items: [
            '**AI-assisted development** and code review',
            'Test generation and debugging',
          ] },
        ],
        detail: {
          overview:
            'I build and maintain WooCommerce stores that are fast, secure, and easy for the team to run. I prefer clean custom code and a small set of well-chosen plugins over stacks of overlapping ones.',
          deliverables: [
            'Custom themes and block themes',
            'Custom plugins and extensions',
            'Checkout and cart customization',
            'Payment, shipping, and tax integrations',
            'Performance and Core Web Vitals audits',
            'Migrations and upgrades',
            'Security hardening and backups',
            'Documentation and handover',
          ],
          approach: [
            { title: 'Audit', text: 'Current state, speed, and security.' },
            { title: 'Plan', text: 'Architecture and priorities.' },
            { title: 'Build', text: 'Clean, maintainable code.' },
            { title: 'Test', text: 'Function, compatibility, and security.' },
            { title: 'Maintain', text: 'Updates and monitoring.' },
          ],
          tools: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'REST API', 'Git'], // TODO
          ai: {
            title: 'AI in my development workflow',
            text: 'I use **advanced AI tools** for code review, test generation, debugging, and documentation. I treat AI output as a draft: every line is read, tested, and security-checked before it ships.',
            points: [
              'Code review and refactoring suggestions',
              'Test and edge-case generation',
              'Debugging and log analysis',
              'Documentation and handover notes',
            ],
          },
          related: ['custom-checkout', 'store-redesign'],
        },
      },
      {
        id: 'content',
        name: 'Content strategy and brand visuals',
        summary:
          'Content that has a job: words, visuals, and video working as one brand. I decide what needs to be said, to whom, and where, then shape it through **brand visual identity**, **graphic content**, **photography**, and **videography**, using **AI** where it helps.',
        groups: [
          { title: 'Brand and visuals', icon: 'palette', items: [
            '**Brand visual identity**',
            '**Graphic content** for web and social',
            'Brand voice and style guides',
          ] },
          { title: 'Photo and video', icon: 'camera', items: [
            '**Photography**',
            '**Videography** and video editing',
          ] },
          { title: 'Strategy and structure', icon: 'layers', items: [
            'Content audits and gap analysis',
            'Site structure and taxonomy',
            'SEO content planning',
            'UX writing and microcopy',
          ] },
          { title: 'AI workflow', icon: 'spark', ai: true, items: [
            '**AI-assisted content** and strategy',
            'Image and video generation',
          ] },
        ],
        detail: {
          overview:
            'I plan and produce content that supports a brand end to end: the strategy, the visual identity, the graphics, the photography, and the video, so every piece looks and sounds like it comes from the same place.',
          deliverables: [
            'Content audits and strategy',
            '**Brand visual identity**: color, typography, usage guidelines',
            '**Graphic content** for web and social',
            'Product and brand **photography**',
            '**Video** production and editing',
            'Site structure and taxonomy',
            'UX writing and SEO content plans',
            'Editorial calendars and style guides',
          ],
          approach: [
            { title: 'Audit', text: 'Existing content and assets.' },
            { title: 'Define', text: 'Brand, audience, and message.' },
            { title: 'Create', text: 'Written, visual, and video content.' },
            { title: 'Publish', text: 'Channels, structure, and workflow.' },
            { title: 'Measure', text: 'Effect and next improvements.' },
          ],
          tools: ['Brand guidelines', 'Photography', 'Video editing', 'Analytics'], // TODO
          ai: {
            title: 'AI in my content and strategy workflow',
            text: 'I use **advanced AI tools** for research, audience analysis, outlines, image and video generation, and editing, then shape the result with brand judgment. AI is for speed and range, never for generic output.',
            points: [
              'Research and competitor analysis',
              'Concept, mood-board, and image generation',
              'Video and photo editing assistance',
              'Draft outlines and copy variations',
            ],
          },
          related: ['content-strategy'],
        },
      },
    ],
    process: [
      { step: 'Discover', text: 'Goals, users, constraints, and the current numbers.' },
      { step: 'Define', text: 'The problem, the audience, and what success looks like.' },
      { step: 'Design', text: 'Structure, flows, interface, and the copy and visuals inside it.' },
      { step: 'Build', text: 'Clean, tested code that the client can maintain.' },
      { step: 'Improve', text: 'Measure after launch and keep refining.' },
    ],
    work: [
      {
        id: 'store-redesign',
        title: 'Ecommerce store redesign', // TODO
        client: 'Client or brand name',
        year: '2025',
        duration: '3 months',
        team: 'Team size and roles',
        roles: ['UI/UX', 'WooCommerce'],
        summary: 'One sentence on what the project was and why it mattered.',
        overview: 'Two or three sentences about the client, the product, and the context of the project.',
        challenge: 'What was broken or missing? Who was affected, and how did you know?',
        goals: ['Goal one, stated as a measurable outcome', 'Goal two', 'Goal three'],
        role: 'Exactly what you were responsible for and which decisions you made.',
        process: [
          { title: 'Research', text: 'What you learned and how you learned it.' },
          { title: 'Design', text: 'Key decisions and the trade-offs behind them.' },
          { title: 'Build', text: 'Stack, approach, and constraints.' },
          { title: 'Launch', text: 'Rollout, testing, and handover.' },
        ],
        solution: 'What you delivered, in plain terms.',
        results: [
          { value: '—', label: 'Change in conversion rate' },
          { value: '—', label: 'Page load time' },
          { value: '—', label: 'Support tickets' },
        ],
        tools: ['Figma', 'WooCommerce', 'PHP'], // TODO
        testimonial: { quote: 'A short quote from the client about working with you.', author: 'Client name', title: 'Role, company' },
      },
      {
        id: 'custom-checkout',
        title: 'Custom checkout and plugin build', // TODO
        client: 'Client or brand name',
        year: '2024',
        duration: '6 weeks',
        team: 'Team size and roles',
        roles: ['WooCommerce'],
        summary: 'One sentence on the limitation you removed and for whom.',
        overview: 'Two or three sentences about the store and why the default checkout was not enough.',
        challenge: 'Describe the limitation of the default checkout or workflow and its cost to the business.',
        goals: ['Goal one', 'Goal two', 'Goal three'],
        role: 'Describe the solution you built and what you owned.',
        process: [
          { title: 'Analysis', text: 'Requirements and edge cases.' },
          { title: 'Architecture', text: 'How the plugin fits into WooCommerce.' },
          { title: 'Build and test', text: 'Code quality, testing, and security.' },
          { title: 'Handover', text: 'Documentation and maintenance plan.' },
        ],
        solution: 'What the finished checkout or plugin does, in plain terms.',
        results: [
          { value: '—', label: 'Checkout completion rate' },
          { value: '—', label: 'Manual work saved' },
        ],
        tools: ['WooCommerce', 'PHP', 'JavaScript'], // TODO
        testimonial: { quote: 'A short quote from the client.', author: 'Client name', title: 'Role, company' },
      },
      {
        id: 'content-strategy',
        title: 'Brand identity and content system', // TODO
        client: 'Client or brand name',
        year: '2024',
        duration: '2 months',
        team: 'Team size and roles',
        roles: ['Content strategy', 'Brand visuals'],
        summary: 'One sentence on the brand and content problem and what you changed.',
        overview: 'Two or three sentences about the brand, its audience, and its content before the project.',
        challenge: 'Describe the problem, such as inconsistent visuals, thin product pages, or unclear messaging.',
        goals: ['Goal one', 'Goal two', 'Goal three'],
        role: 'Describe the identity, graphics, photography, video, and writing you delivered.',
        process: [
          { title: 'Audit', text: 'What existed and what was missing.' },
          { title: 'Identity', text: 'Visual language and guidelines.' },
          { title: 'Produce', text: 'Graphics, photography, video, and copy.' },
          { title: 'Measure', text: 'How you tracked the effect.' },
        ],
        solution: 'The identity and content system you delivered, in plain terms.',
        results: [
          { value: '—', label: 'Organic traffic' },
          { value: '—', label: 'Engagement' },
        ],
        tools: ['Brand guidelines', 'Photography', 'Video', 'AI tools'], // TODO
        testimonial: { quote: 'A short quote from the client.', author: 'Client name', title: 'Role, company' },
      },
    ],
    experience: [
      { period: 'Year – Present', role: 'Senior UI/UX designer and WooCommerce developer', org: 'Company or freelance' },
      { period: 'Year – Year', role: 'Role title', org: 'Company' },
    ],
  },

  /* ============================== PERSIAN ============================== */
  fa: {
    name: 'نام شما', // TODO
    title: 'طراح ارشد UI/UX، توسعه‌دهنده ارشد وردپرس و ووکامرس و استراتژیست محتوا',
    description:
      'نمونه‌کار و رزومه یک طراح ارشد UI/UX، توسعه‌دهنده ارشد وردپرس و ووکامرس و استراتژیست محتوا؛ هویت بصری برند، گرافیک، عکاسی و ویدیو، با جریان کاری مبتنی بر هوش مصنوعی.',
    hero: [{ t: 'طراحی می‌کنم،' }, { t: 'توسعه می‌دهم', mark: true }, { t: 'و می‌نویسم.' }],
    intro:
      'فروشگاه‌های آنلاین و محصولات دیجیتال را طراحی می‌کنم، با ووکامرس می‌سازم و محتوا و **هویت بصری** آن‌ها را شکل می‌دهم: برند، گرافیک، عکاسی و ویدیو. در طراحی، توسعه و استراتژی از **ابزارهای پیشرفته هوش مصنوعی** استفاده می‌کنم و تصمیم‌ها را همچنان انسانی نگه می‌دارم.',
    roles: [
      { label: 'طراحی UI/UX', href: '#ux' },
      { label: 'توسعه ووکامرس', href: '#woo' },
      { label: 'استراتژی محتوا و بصری', href: '#content' },
    ],
    email,
    links,
    ui: {
      skip: 'رفتن به محتوا',
      sections: 'بخش‌های صفحه',
      langLabel: 'زبان',
      themeLabel: 'حالت تیره',
      menu: 'منو',
      menuTitle: 'منوی سایت',
      menuClose: 'بستن منو',
      nav: { top: 'خانه', skills: 'مهارت‌ها', process: 'روش کار', work: 'نمونه‌کارها', resume: 'رزومه', contact: 'تماس' },
      ctaWork: 'مشاهده نمونه‌کارها',
      ctaMail: 'ایمیل بزنید',
      copy: 'کپی ایمیل',
      copied: 'کپی شد',
      viewCase: 'مشاهده مطالعه موردی',
      explore: 'مشاهده جزئیات',
      close: 'بستن',
      visit: 'مشاهده وب‌سایت',
      talk: 'گفتگو درباره پروژه',
      overview: 'معرفی پروژه', challenge: 'چالش', goals: 'اهداف', process: 'روند کار', myRole: 'نقش من',
      solution: 'راه‌حل', results: 'نتایج', tools: 'ابزارها', client: 'کارفرما', year: 'سال',
      duration: 'مدت', team: 'تیم', gallery: 'تصاویر پروژه', shot: 'تصویر', backTop: 'بازگشت به بالا',
      deliver: 'آنچه تحویل می‌دهم', approach: 'رویکرد', toolkit: 'جعبه‌ابزار', related: 'نمونه‌کارهای مرتبط',
    },
    skillsHead: 'سه مهارت، یک جریان کار',
    processHead: 'روش کار',
    processSub:
      'این پنج مرحله برای بازطراحی، توسعه و بازسازی محتوا یکسان است و **ابزارهای پیشرفته هوش مصنوعی** در هر کدام کمک‌کار هستند.',
    workHead: 'نمونه‌کارهای منتخب',
    workSub: 'هر پروژه به یک مطالعه موردی کامل باز می‌شود: مسئله، روند، راه‌حل و نتایج.',
    resumeHead: 'رزومه',
    contactHead: 'درباره پروژه‌تان صحبت کنیم',
    contactSub: 'بگویید چه می‌سازید و کجا گیر کرده‌اید. ظرف چند روز کاری پاسخ می‌دهم.',
    disciplines: [
      {
        id: 'ux',
        name: 'طراحی UI/UX',
        summary:
          'رابط‌هایی که کاربر همان بار اول می‌فهمد. از اینجا شروع می‌کنم که چه کسی از محصول استفاده می‌کند و چه چیزی او را متوقف می‌کند، سپس ساده‌ترین مسیر تا هدفش را طراحی می‌کنم و برای گسترش گزینه‌ها از کاوش **با کمک هوش مصنوعی** استفاده می‌کنم.',
        groups: [
          { title: 'پژوهش و راهبرد', icon: 'search', items: [
            'پژوهش کاربر و مصاحبه',
            'معماری اطلاعات و جریان‌های کاربری',
            'تست کاربردپذیری و بهبود مستمر',
          ] },
          { title: 'طراحی و سیستم', icon: 'pen', items: [
            'وایرفریم و پروتوتایپ تعاملی',
            'سیستم طراحی و کتابخانه کامپوننت',
            'طراحی واکنش‌گرا و موبایل‌محور',
          ] },
          { title: 'کیفیت و رشد', icon: 'target', items: [
            'دسترس‌پذیری (WCAG 2.1 AA)',
            'تجربه کاربری متمرکز بر نرخ تبدیل',
          ] },
          { title: 'جریان کاری هوش مصنوعی', icon: 'spark', ai: true, items: [
            '**طراحی با کمک هوش مصنوعی** و پروتوتایپ سریع',
            'جمع‌بندی پژوهش و بازخورد',
          ] },
        ],
        detail: {
          overview:
            'رابط فروشگاه‌ها و محصولات دیجیتال را از پژوهش تا طراحی تست‌شده و آماده تحویل به توسعه‌دهنده انجام می‌دهم. هدف همیشه یکی است: کم‌کردن گام‌های بین بازدیدکننده و کاری که برایش آمده.',
          deliverables: [
            'خلاصه پژوهش کاربر و پرسونا',
            'معماری اطلاعات و نقشه سایت',
            'جریان‌های کاربری و وایرفریم',
            'پروتوتایپ تعاملی',
            'کیت رابط کاربری و سیستم طراحی',
            'گزارش تست کاربردپذیری',
            'بازبینی دسترس‌پذیری (WCAG 2.1 AA)',
            'مشخصات تحویل به توسعه‌دهنده',
          ],
          approach: [
            { title: 'شناخت', text: 'پژوهش با ذی‌نفعان و کاربران.' },
            { title: 'ساختار', text: 'معماری اطلاعات، جریان‌ها و وایرفریم.' },
            { title: 'طراحی', text: 'رابط، سیستم طراحی و پروتوتایپ.' },
            { title: 'اعتبارسنجی', text: 'تست کاربردپذیری و بررسی دسترس‌پذیری.' },
            { title: 'تحویل', text: 'مشخصات، توکن‌ها و پشتیبانی در QA.' },
          ],
          tools: ['Figma', 'پروتوتایپ', 'سیستم طراحی', 'تست کاربردپذیری'], // TODO
          ai: {
            title: 'هوش مصنوعی در فرایند طراحی من',
            text: 'از **ابزارهای پیشرفته هوش مصنوعی** برای تندکردن بخش‌های زمان‌بر طراحی استفاده می‌کنم، مثل جمع‌بندی پژوهش، بررسی ایده‌های متن و چیدمان و ساخت نسخه‌های مختلف دارایی‌های بصری. بعد همه چیز را دستی بازبینی می‌کنم. هوش مصنوعی گزینه‌ها را بیشتر می‌کند؛ تصمیم‌گیری با قضاوت طراحی است.',
            points: [
              'جمع‌بندی پژوهش و بازخورد کاربران',
              'بررسی سریع ایده و چیدمان',
              'نسخه‌های مختلف دارایی و ویرایش تصویر',
              'بررسی دسترس‌پذیری و یکدستی',
            ],
          },
          related: ['store-redesign', 'content-strategy'],
        },
      },
      {
        id: 'woo',
        name: 'توسعه وردپرس و ووکامرس',
        summary:
          'فروشگاه‌هایی سریع، قابل نگهداری و ساده برای مدیریت توسط کارفرما. آنچه طراحی می‌خواهد را می‌سازم، بدون انباشتن افزونه روی افزونه، با **توسعه با کمک هوش مصنوعی** و بازبینی دقیق.',
        groups: [
          { title: 'ساخت و توسعه', icon: 'code', items: [
            'قالب‌های سفارشی و قالب‌های بلوکی',
            'افزونه‌های سفارشی و توسعه ووکامرس',
            'REST API و اتصال به سرویس‌های خارجی',
          ] },
          { title: 'تجربه فروشگاه', icon: 'cart', items: [
            'شخصی‌سازی سبد خرید و تسویه‌حساب',
            'اتصال به درگاه پرداخت، حمل‌ونقل و مالیات',
          ] },
          { title: 'سرعت و نگهداری', icon: 'shield', items: [
            'بهینه‌سازی سرعت و Core Web Vitals',
            'انتقال و ارتقای فروشگاه',
            'امنیت و نگهداری',
          ] },
          { title: 'جریان کاری هوش مصنوعی', icon: 'spark', ai: true, items: [
            '**توسعه با کمک هوش مصنوعی** و بازبینی کد',
            'تولید تست و رفع اشکال',
          ] },
        ],
        detail: {
          overview:
            'فروشگاه‌های ووکامرس سریع، امن و ساده برای مدیریت تیم می‌سازم و نگهداری می‌کنم. کد سفارشی تمیز و چند افزونه منتخب را به انبوه افزونه‌های هم‌پوشان ترجیح می‌دهم.',
          deliverables: [
            'قالب‌های سفارشی و قالب‌های بلوکی',
            'افزونه‌ها و توسعه‌های سفارشی',
            'شخصی‌سازی سبد خرید و تسویه‌حساب',
            'اتصال به درگاه پرداخت، حمل‌ونقل و مالیات',
            'ممیزی سرعت و Core Web Vitals',
            'انتقال و ارتقای فروشگاه',
            'امنیت و پشتیبان‌گیری',
            'مستندات و تحویل پروژه',
          ],
          approach: [
            { title: 'ممیزی', text: 'وضعیت فعلی، سرعت و امنیت.' },
            { title: 'برنامه‌ریزی', text: 'معماری و اولویت‌ها.' },
            { title: 'ساخت', text: 'کد تمیز و قابل نگهداری.' },
            { title: 'تست', text: 'عملکرد، سازگاری و امنیت.' },
            { title: 'نگهداری', text: 'به‌روزرسانی و پایش.' },
          ],
          tools: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript', 'REST API', 'Git'], // TODO
          ai: {
            title: 'هوش مصنوعی در فرایند توسعه من',
            text: 'از **ابزارهای پیشرفته هوش مصنوعی** برای بازبینی کد، تولید تست، رفع اشکال و مستندسازی استفاده می‌کنم. خروجی هوش مصنوعی را پیش‌نویس می‌دانم: هر خط پیش از انتشار خوانده، تست و از نظر امنیتی بررسی می‌شود.',
            points: [
              'بازبینی و بازنویسی کد',
              'تولید تست و حالت‌های خاص',
              'رفع اشکال و تحلیل لاگ',
              'مستندات و یادداشت‌های تحویل',
            ],
          },
          related: ['custom-checkout', 'store-redesign'],
        },
      },
      {
        id: 'content',
        name: 'استراتژی محتوا و هویت بصری',
        summary:
          'محتوایی که وظیفه دارد؛ متن، تصویر و ویدیو در قالب یک برند. تصمیم می‌گیرم چه چیزی، به چه کسی و کجا گفته شود، و آن را با **هویت بصری برند**، **محتوای گرافیکی**، **عکاسی** و **ویدیو** شکل می‌دهم؛ در جاهایی که کمک می‌کند، با **هوش مصنوعی**.',
        groups: [
          { title: 'برند و بصری', icon: 'palette', items: [
            '**هویت بصری برند**',
            '**محتوای گرافیکی** برای وب و شبکه‌های اجتماعی',
            'لحن برند و راهنمای نگارش',
          ] },
          { title: 'عکس و ویدیو', icon: 'camera', items: [
            '**عکاسی**',
            '**تولید و تدوین ویدیو**',
          ] },
          { title: 'استراتژی و ساختار', icon: 'layers', items: [
            'ممیزی محتوا و تحلیل شکاف',
            'ساختار سایت و طبقه‌بندی',
            'برنامه‌ریزی محتوای سئو',
            'نگارش رابط کاربری (UX Writing) و میکروکپی',
          ] },
          { title: 'جریان کاری هوش مصنوعی', icon: 'spark', ai: true, items: [
            '**محتوا و استراتژی با کمک هوش مصنوعی**',
            'تولید تصویر و ویدیو با هوش مصنوعی',
          ] },
        ],
        detail: {
          overview:
            'محتوایی را برنامه‌ریزی و تولید می‌کنم که از ابتدا تا انتها پشتیبان برند باشد: استراتژی، هویت بصری، گرافیک، عکاسی و ویدیو؛ تا هر قطعه از همان جایی به نظر برسد که بقیه آمده‌اند.',
          deliverables: [
            'ممیزی و استراتژی محتوا',
            '**هویت بصری برند**: رنگ، تایپوگرافی و راهنمای استفاده',
            '**محتوای گرافیکی** برای وب و شبکه‌های اجتماعی',
            '**عکاسی** محصول و برند',
            'تولید و تدوین **ویدیو**',
            'ساختار سایت و طبقه‌بندی',
            'نگارش رابط کاربری و برنامه محتوای سئو',
            'تقویم محتوایی و راهنمای نگارش',
          ],
          approach: [
            { title: 'ممیزی', text: 'محتوا و دارایی‌های موجود.' },
            { title: 'تعریف', text: 'برند، مخاطب و پیام.' },
            { title: 'تولید', text: 'محتوای نوشتاری، تصویری و ویدیویی.' },
            { title: 'انتشار', text: 'کانال‌ها، ساختار و روند کار.' },
            { title: 'سنجش', text: 'اثر کار و بهبودهای بعدی.' },
          ],
          tools: ['راهنمای برند', 'عکاسی', 'تدوین ویدیو', 'آنالیتیکس'], // TODO
          ai: {
            title: 'هوش مصنوعی در فرایند محتوا و استراتژی من',
            text: 'از **ابزارهای پیشرفته هوش مصنوعی** برای پژوهش، تحلیل مخاطب، ساخت طرح کلی، تولید تصویر و ویدیو و ویرایش استفاده می‌کنم و نتیجه را با قضاوت برندی شکل می‌دهم. هوش مصنوعی برای سرعت و تنوع است، نه برای خروجی کلیشه‌ای.',
            points: [
              'پژوهش و تحلیل رقبا',
              'مفهوم‌پردازی، مودبرد و تولید تصویر',
              'کمک در تدوین ویدیو و ویرایش عکس',
              'طرح کلی و نسخه‌های مختلف متن',
            ],
          },
          related: ['content-strategy'],
        },
      },
    ],
    process: [
      { step: 'کشف', text: 'اهداف، کاربران، محدودیت‌ها و اعداد فعلی.' },
      { step: 'تعریف', text: 'مسئله، مخاطب و معنای موفقیت.' },
      { step: 'طراحی', text: 'ساختار، جریان‌ها، رابط و متن و تصاویر درون آن.' },
      { step: 'ساخت', text: 'کدی تمیز و تست‌شده که کارفرما بتواند نگهداری کند.' },
      { step: 'بهبود', text: 'اندازه‌گیری بعد از انتشار و اصلاح مداوم.' },
    ],
    work: [
      {
        id: 'store-redesign',
        title: 'بازطراحی فروشگاه اینترنتی', // TODO
        client: 'نام کارفرما یا برند',
        year: '۱۴۰۴',
        duration: '۳ ماه',
        team: 'اندازه تیم و نقش‌ها',
        roles: ['UI/UX', 'ووکامرس'],
        summary: 'در یک جمله بگویید پروژه چه بود و چرا اهمیت داشت.',
        overview: 'در دو یا سه جمله درباره کارفرما، محصول و زمینه پروژه بنویسید.',
        challenge: 'چه چیزی خراب یا ناقص بود؟ چه کسانی تحت تأثیر بودند و از کجا فهمیدید؟',
        goals: ['هدف اول، به‌صورت نتیجه قابل اندازه‌گیری', 'هدف دوم', 'هدف سوم'],
        role: 'دقیقاً مسئول چه کاری بودید و چه تصمیم‌هایی گرفتید.',
        process: [
          { title: 'پژوهش', text: 'چه چیزی یاد گرفتید و چگونه.' },
          { title: 'طراحی', text: 'تصمیم‌های کلیدی و مصالحه‌های پشت آن‌ها.' },
          { title: 'ساخت', text: 'ابزارها، رویکرد و محدودیت‌ها.' },
          { title: 'انتشار', text: 'راه‌اندازی، تست و تحویل.' },
        ],
        solution: 'آنچه تحویل دادید را ساده توضیح دهید.',
        results: [
          { value: '—', label: 'تغییر نرخ تبدیل' },
          { value: '—', label: 'زمان بارگذاری صفحه' },
          { value: '—', label: 'تعداد تیکت‌های پشتیبانی' },
        ],
        tools: ['Figma', 'WooCommerce', 'PHP'], // TODO
        testimonial: { quote: 'جمله کوتاهی از کارفرما درباره همکاری با شما.', author: 'نام کارفرما', title: 'سمت، شرکت' },
      },
      {
        id: 'custom-checkout',
        title: 'تسویه‌حساب و افزونه سفارشی', // TODO
        client: 'نام کارفرما یا برند',
        year: '۱۴۰۳',
        duration: '۶ هفته',
        team: 'اندازه تیم و نقش‌ها',
        roles: ['ووکامرس'],
        summary: 'در یک جمله بگویید چه محدودیتی را برای چه کسانی برداشتید.',
        overview: 'در دو یا سه جمله درباره فروشگاه و دلیل ناکافی بودن تسویه‌حساب پیش‌فرض بنویسید.',
        challenge: 'محدودیت تسویه‌حساب یا فرایند پیش‌فرض و هزینه آن برای کسب‌وکار را توضیح دهید.',
        goals: ['هدف اول', 'هدف دوم', 'هدف سوم'],
        role: 'راه‌حلی که ساختید و مسئولیت‌هایتان را شرح دهید.',
        process: [
          { title: 'تحلیل', text: 'نیازمندی‌ها و حالت‌های خاص.' },
          { title: 'معماری', text: 'جای افزونه در ساختار ووکامرس.' },
          { title: 'ساخت و تست', text: 'کیفیت کد، تست و امنیت.' },
          { title: 'تحویل', text: 'مستندات و برنامه نگهداری.' },
        ],
        solution: 'آنچه تسویه‌حساب یا افزونه نهایی انجام می‌دهد را ساده توضیح دهید.',
        results: [
          { value: '—', label: 'نرخ تکمیل خرید' },
          { value: '—', label: 'کار دستی صرفه‌جویی‌شده' },
        ],
        tools: ['WooCommerce', 'PHP', 'JavaScript'], // TODO
        testimonial: { quote: 'جمله کوتاهی از کارفرما.', author: 'نام کارفرما', title: 'سمت، شرکت' },
      },
      {
        id: 'content-strategy',
        title: 'هویت برند و سیستم محتوا', // TODO
        client: 'نام کارفرما یا برند',
        year: '۱۴۰۳',
        duration: '۲ ماه',
        team: 'اندازه تیم و نقش‌ها',
        roles: ['استراتژی محتوا', 'هویت بصری'],
        summary: 'در یک جمله بگویید مسئله برند و محتوا چه بود و چه تغییری دادید.',
        overview: 'در دو یا سه جمله درباره برند، مخاطبان و وضعیت محتوا پیش از پروژه بنویسید.',
        challenge: 'مسئله را توضیح دهید، مثل تصاویر ناهمگون، صفحات محصول کم‌محتوا یا پیام نامشخص.',
        goals: ['هدف اول', 'هدف دوم', 'هدف سوم'],
        role: 'هویت بصری، گرافیک، عکاسی، ویدیو و متن‌هایی که تحویل دادید را شرح دهید.',
        process: [
          { title: 'ممیزی', text: 'چه چیزی وجود داشت و چه چیزی کم بود.' },
          { title: 'هویت', text: 'زبان بصری و راهنمای استفاده.' },
          { title: 'تولید', text: 'گرافیک، عکس، ویدیو و متن.' },
          { title: 'سنجش', text: 'چگونه اثر کار را دنبال کردید.' },
        ],
        solution: 'هویت و سیستم محتوایی که تحویل دادید را ساده توضیح دهید.',
        results: [
          { value: '—', label: 'ترافیک ارگانیک' },
          { value: '—', label: 'تعامل مخاطبان' },
        ],
        tools: ['راهنمای برند', 'عکاسی', 'ویدیو', 'ابزارهای هوش مصنوعی'], // TODO
        testimonial: { quote: 'جمله کوتاهی از کارفرما.', author: 'نام کارفرما', title: 'سمت، شرکت' },
      },
    ],
    experience: [
      { period: 'سال – اکنون', role: 'طراح ارشد UI/UX و توسعه‌دهنده ووکامرس', org: 'نام شرکت یا فریلنس' },
      { period: 'سال – سال', role: 'عنوان شغلی', org: 'شرکت' },
    ],
  },
};

// Images and links shared by both languages. Paths are relative to /public (or use full https:// URLs).
export const workShared: Record<string, WorkShared> = {
  'store-redesign': { logo: '', cover: '', color: '#2447f5', url: '', gallery: [] },
  'custom-checkout': { logo: '', cover: '', color: '#6d33e0', url: '', gallery: [] },
  'content-strategy': { logo: '', cover: '', color: '#0b8a7b', url: '', gallery: [] },
};

// Validate cross-record relationships when Astro imports this module during a build.
// Placeholder copy is intentionally allowed; this checks structure, not portfolio readiness.
function validateContentData(): void {
  const errors: string[] = [];
  const enWork = content.en.work;
  const faWork = content.fa.work;

  const idsFor = (items: { id: string }[], label: string): Set<string> => {
    const ids = new Set<string>();
    for (const item of items) {
      if (!item.id.trim()) {
        errors.push(`${label} contains an empty ID.`);
        continue;
      }
      if (ids.has(item.id)) errors.push(`${label} contains duplicate ID "${item.id}".`);
      ids.add(item.id);
    }
    return ids;
  };

  const enWorkIds = idsFor(enWork, 'English projects');
  const faWorkIds = idsFor(faWork, 'Persian projects');
  const sharedWorkIds = new Set(Object.keys(workShared));

  for (const id of enWorkIds) {
    if (!faWorkIds.has(id)) errors.push(`Project "${id}" is missing from Persian content.`);
    if (!sharedWorkIds.has(id)) errors.push(`Project "${id}" has no workShared record.`);
  }
  for (const id of faWorkIds) {
    if (!enWorkIds.has(id)) errors.push(`Project "${id}" is missing from English content.`);
    if (!sharedWorkIds.has(id)) errors.push(`Project "${id}" has no workShared record.`);
  }
  for (const id of sharedWorkIds) {
    if (!enWorkIds.has(id) || !faWorkIds.has(id)) {
      errors.push(`workShared contains orphan project ID "${id}".`);
    }
  }

  for (const lang of ['en', 'fa'] as const) {
    const locale = content[lang];
    const disciplineIds = new Set<string>();
    for (const discipline of locale.disciplines) {
      if (disciplineIds.has(discipline.id)) {
        errors.push(`Locale "${lang}" contains duplicate discipline ID "${discipline.id}".`);
      }
      disciplineIds.add(discipline.id);
      for (const relatedId of discipline.detail.related) {
        if (!locale.work.some((project) => project.id === relatedId)) {
          errors.push(`Locale "${lang}", discipline "${discipline.id}" references missing project "${relatedId}".`);
        }
      }
    }
  }

  if (errors.length) {
    throw new Error(`[portfolio content] Validation failed:\n- ${errors.join('\n- ')}`);
  }
}

validateContentData();
