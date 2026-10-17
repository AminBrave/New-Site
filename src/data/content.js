// All site text lives here, in English (en) and Persian (fa). Items marked TODO are placeholders.
const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' }, // TODO
  { label: 'GitHub', href: 'https://github.com/your-handle' }, // TODO
  { label: 'Dribbble', href: 'https://dribbble.com/your-handle' }, // TODO
];
const email = 'hello@example.com'; // TODO

export const content = {
  en: {
    name: 'Your Name', // TODO
    title: 'Senior UI/UX designer, WooCommerce developer and content strategist',
    description:
      'Portfolio of a senior UI/UX designer, senior WordPress and WooCommerce developer, and content strategist.',
    hero: [{ t: 'I design it,' }, { t: 'build it,', mark: true }, { t: 'and write it.' }],
    intro:
      'I design online stores and digital products, build them in WooCommerce, and write the words that guide people through them. One person owning the experience, the code, and the message means fewer hand-offs and fewer gaps.',
    roles: [
      { label: 'UI/UX design', href: '#ux' },
      { label: 'WooCommerce development', href: '#woo' },
      { label: 'Content strategy', href: '#content' },
    ],
    email,
    links,
    resumeUrl: '', // TODO: e.g. 'resume-en.pdf' after placing it in /public
    ui: {
      skip: 'Skip to content',
      sections: 'Page sections',
      langLabel: 'Language',
      theme: 'Toggle light and dark theme',
      nav: { top: 'Home', skills: 'Skills', process: 'Process', work: 'Work', resume: 'Resume', contact: 'Contact' },
      ctaWork: 'See selected work',
      ctaMail: 'Email me',
      copy: 'Copy email',
      copied: 'Copied',
      problem: 'Problem',
      role: 'My role',
      result: 'Result',
      download: 'Download resume (PDF)',
      viewCase: 'View case study', close: 'Close', visit: 'Visit live site',
      overview: 'Overview', challenge: 'Challenge', goals: 'Goals', process: 'Process', myRole: 'My role',
      solution: 'Solution', results: 'Results', tools: 'Tools', client: 'Client', year: 'Year',
      duration: 'Duration', team: 'Team', gallery: 'Project images', shot: 'Screenshot', backTop: 'Back to top',
    },
    skillsHead: 'Three skills, one workflow',
    processHead: 'How I work',
    processSub: 'The same five steps apply whether the project is a redesign, a build, or a content overhaul.',
    workHead: 'Selected work',
    workSub: 'Each project shows the problem, my part in it, and the result.',
    resumeHead: 'Resume',
    contactHead: "Let's talk about your project",
    contactSub: 'Tell me what you are building and where it is stuck. I reply within a few working days.',
    disciplines: [
      {
        id: 'ux',
        name: 'UI/UX design',
        summary:
          'Interfaces people understand on the first try. I start with who is using the product and what stops them, then design the simplest path to their goal.',
        skills: [
          'User research and interviews',
          'Information architecture and user flows',
          'Wireframing and interactive prototyping',
          'Design systems and component libraries',
          'Usability testing and iteration',
          'Accessibility (WCAG 2.1 AA)',
          'Conversion-focused ecommerce UX',
          'Responsive and mobile-first design',
        ],
      },
      {
        id: 'woo',
        name: 'WordPress and WooCommerce development',
        summary:
          'Stores that are fast, maintainable, and easy for the client to run. I build what the design calls for without piling plugins on top of each other.',
        skills: [
          'Custom themes and block themes',
          'Custom plugins and WooCommerce extensions',
          'Cart and checkout customization',
          'Payment, shipping, and tax integrations',
          'Performance and Core Web Vitals tuning',
          'Store migrations and platform upgrades',
          'REST API and third-party integrations',
          'Security hardening and maintenance',
        ],
      },
      {
        id: 'content',
        name: 'Content strategy',
        summary:
          'Content that has a job. I decide what needs to be said, to whom, and where, then make sure it is clear, findable, and consistent.',
        skills: [
          'Content audits and gap analysis',
          'Site structure and taxonomy',
          'UX writing and microcopy',
          'Product and category copy',
          'SEO content planning',
          'Editorial calendars and governance',
          'Brand voice and style guides',
          'Measuring content performance',
        ],
      },
    ],
    process: [
      { step: 'Discover', text: 'Goals, users, constraints, and the current numbers.' },
      { step: 'Define', text: 'The problem, the audience, and what success looks like.' },
      { step: 'Design', text: 'Structure, flows, interface, and the copy inside it.' },
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
        title: 'Content strategy and site structure', // TODO
        client: 'Client or brand name',
        year: '2024',
        duration: '2 months',
        team: 'Team size and roles',
        roles: ['Content strategy', 'UI/UX'],
        summary: 'One sentence on the content problem and the change you made.',
        overview: 'Two or three sentences about the site, its audience, and its content before the project.',
        challenge: 'Describe the content problem, such as unclear navigation or thin product pages.',
        goals: ['Goal one', 'Goal two', 'Goal three'],
        role: 'Describe the audit, structure, and writing you delivered.',
        process: [
          { title: 'Audit', text: 'What existed and what was missing.' },
          { title: 'Structure', text: 'New site map and taxonomy.' },
          { title: 'Write', text: 'Voice, templates, and key pages.' },
          { title: 'Measure', text: 'How you tracked the effect.' },
        ],
        solution: 'The content system you delivered, in plain terms.',
        results: [
          { value: '—', label: 'Organic traffic' },
          { value: '—', label: 'Time to find a product' },
        ],
        tools: ['Content audit', 'Analytics', 'Style guide'], // TODO
        testimonial: { quote: 'A short quote from the client.', author: 'Client name', title: 'Role, company' },
      },
    ],
    experience: [
      { period: 'Year – Present', role: 'Senior UI/UX designer and WooCommerce developer', org: 'Company or freelance' },
      { period: 'Year – Year', role: 'Role title', org: 'Company' },
    ],
  },

  fa: {
    name: 'نام شما', // TODO
    title: 'طراح ارشد UI/UX، توسعه‌دهنده ارشد وردپرس و ووکامرس و استراتژیست محتوا',
    description: 'نمونه‌کار و رزومه یک طراح ارشد UI/UX، توسعه‌دهنده ارشد وردپرس و ووکامرس و استراتژیست محتوا.',
    hero: [{ t: 'طراحی می‌کنم،' }, { t: 'توسعه می‌دهم', mark: true }, { t: 'و می‌نویسم.' }],
    intro:
      'فروشگاه‌های آنلاین و محصولات دیجیتال را طراحی می‌کنم، با ووکامرس پیاده‌سازی می‌کنم و متنی می‌نویسم که کاربر را در مسیر راهنمایی کند. وقتی تجربه کاربری، کد و پیام در دست یک نفر باشد، کار کمتر دست‌به‌دست می‌شود و شکاف‌های کمتری پیش می‌آید.',
    roles: [
      { label: 'طراحی UI/UX', href: '#ux' },
      { label: 'توسعه ووکامرس', href: '#woo' },
      { label: 'استراتژی محتوا', href: '#content' },
    ],
    email,
    links,
    resumeUrl: '', // TODO: مثلاً 'resume-fa.pdf' پس از قرار دادن در پوشه public
    ui: {
      skip: 'رفتن به محتوا',
      sections: 'بخش‌های صفحه',
      langLabel: 'زبان',
      theme: 'تغییر پوسته روشن و تیره',
      nav: { top: 'خانه', skills: 'مهارت‌ها', process: 'روش کار', work: 'نمونه‌کارها', resume: 'رزومه', contact: 'تماس' },
      ctaWork: 'مشاهده نمونه‌کارها',
      ctaMail: 'ایمیل بزنید',
      copy: 'کپی ایمیل',
      copied: 'کپی شد',
      problem: 'مسئله',
      role: 'نقش من',
      result: 'نتیجه',
      download: 'دانلود رزومه (PDF)',
      viewCase: 'مشاهده مطالعه موردی', close: 'بستن', visit: 'مشاهده وب‌سایت',
      overview: 'معرفی پروژه', challenge: 'چالش', goals: 'اهداف', process: 'روند کار', myRole: 'نقش من',
      solution: 'راه‌حل', results: 'نتایج', tools: 'ابزارها', client: 'کارفرما', year: 'سال',
      duration: 'مدت', team: 'تیم', gallery: 'تصاویر پروژه', shot: 'تصویر', backTop: 'بازگشت به بالا',
    },
    skillsHead: 'سه مهارت، یک جریان کار',
    processHead: 'روش کار',
    processSub: 'این پنج مرحله برای بازطراحی، توسعه و بازسازی محتوا یکسان است.',
    workHead: 'نمونه‌کارهای منتخب',
    workSub: 'هر پروژه مسئله، نقش من و نتیجه را نشان می‌دهد.',
    resumeHead: 'رزومه',
    contactHead: 'درباره پروژه‌تان صحبت کنیم',
    contactSub: 'بگویید چه می‌سازید و کجا گیر کرده‌اید. ظرف چند روز کاری پاسخ می‌دهم.',
    disciplines: [
      {
        id: 'ux',
        name: 'طراحی UI/UX',
        summary:
          'رابط‌هایی که کاربر همان بار اول می‌فهمد. از اینجا شروع می‌کنم که چه کسی از محصول استفاده می‌کند و چه چیزی او را متوقف می‌کند، سپس ساده‌ترین مسیر تا هدفش را طراحی می‌کنم.',
        skills: [
          'پژوهش کاربر و مصاحبه',
          'معماری اطلاعات و جریان‌های کاربری',
          'وایرفریم و پروتوتایپ تعاملی',
          'سیستم طراحی و کتابخانه کامپوننت',
          'تست کاربردپذیری و بهبود مستمر',
          'دسترس‌پذیری (WCAG 2.1 AA)',
          'تجربه کاربری متمرکز بر نرخ تبدیل',
          'طراحی واکنش‌گرا و موبایل‌محور',
        ],
      },
      {
        id: 'woo',
        name: 'توسعه وردپرس و ووکامرس',
        summary:
          'فروشگاه‌هایی سریع، قابل نگهداری و ساده برای مدیریت توسط کارفرما. آنچه طراحی می‌خواهد را می‌سازم، بدون انباشتن افزونه روی افزونه.',
        skills: [
          'قالب‌های سفارشی و قالب‌های بلوکی',
          'افزونه‌های سفارشی و توسعه ووکامرس',
          'شخصی‌سازی سبد خرید و تسویه‌حساب',
          'اتصال به درگاه پرداخت، حمل‌ونقل و مالیات',
          'بهینه‌سازی سرعت و Core Web Vitals',
          'انتقال و ارتقای فروشگاه',
          'REST API و اتصال به سرویس‌های خارجی',
          'امنیت و نگهداری',
        ],
      },
      {
        id: 'content',
        name: 'استراتژی محتوا',
        summary:
          'محتوایی که وظیفه دارد. تصمیم می‌گیرم چه چیزی، به چه کسی و کجا گفته شود؛ بعد مطمئن می‌شوم روشن، قابل‌پیدا‌شدن و یکدست باشد.',
        skills: [
          'ممیزی محتوا و تحلیل شکاف',
          'ساختار سایت و طبقه‌بندی',
          'نگارش رابط کاربری (UX Writing) و میکروکپی',
          'متن محصول و دسته‌بندی',
          'برنامه‌ریزی محتوای سئو',
          'تقویم محتوایی و حاکمیت محتوا',
          'لحن برند و راهنمای نگارش',
          'سنجش عملکرد محتوا',
        ],
      },
    ],
    process: [
      { step: 'کشف', text: 'اهداف، کاربران، محدودیت‌ها و اعداد فعلی.' },
      { step: 'تعریف', text: 'مسئله، مخاطب و معنای موفقیت.' },
      { step: 'طراحی', text: 'ساختار، جریان‌ها، رابط و متن درون آن.' },
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
        title: 'استراتژی محتوا و ساختار سایت', // TODO
        client: 'نام کارفرما یا برند',
        year: '۱۴۰۳',
        duration: '۲ ماه',
        team: 'اندازه تیم و نقش‌ها',
        roles: ['استراتژی محتوا', 'UI/UX'],
        summary: 'در یک جمله بگویید مسئله محتوایی چه بود و چه تغییری دادید.',
        overview: 'در دو یا سه جمله درباره سایت، مخاطبان و وضعیت محتوا پیش از پروژه بنویسید.',
        challenge: 'مسئله محتوایی را توضیح دهید، مثل ناوبری نامشخص یا صفحات محصول کم‌محتوا.',
        goals: ['هدف اول', 'هدف دوم', 'هدف سوم'],
        role: 'ممیزی، ساختار و متن‌هایی که تحویل دادید را شرح دهید.',
        process: [
          { title: 'ممیزی', text: 'چه چیزی وجود داشت و چه چیزی کم بود.' },
          { title: 'ساختار', text: 'نقشه سایت و طبقه‌بندی جدید.' },
          { title: 'نگارش', text: 'لحن، قالب‌ها و صفحات کلیدی.' },
          { title: 'سنجش', text: 'چگونه اثر کار را دنبال کردید.' },
        ],
        solution: 'سیستم محتوایی که تحویل دادید را ساده توضیح دهید.',
        results: [
          { value: '—', label: 'ترافیک ارگانیک' },
          { value: '—', label: 'زمان پیدا کردن محصول' },
        ],
        tools: ['ممیزی محتوا', 'آنالیتیکس', 'راهنمای نگارش'], // TODO
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
export const workShared = {
  'store-redesign': { logo: '', cover: '', color: '#2447f5', url: '', gallery: [] },
  'custom-checkout': { logo: '', cover: '', color: '#6d33e0', url: '', gallery: [] },
  'content-strategy': { logo: '', cover: '', color: '#0b8a7b', url: '', gallery: [] },
};
