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
        title: 'Ecommerce store redesign', // TODO
        roles: ['UI/UX', 'WooCommerce'],
        problem: 'Describe the business problem and who the users were.',
        role: 'Describe exactly what you did.',
        outcome: 'Add one measurable result, such as conversion rate, load time, or support tickets.',
        href: '',
      },
      {
        title: 'Custom checkout and plugin build', // TODO
        roles: ['WooCommerce'],
        problem: 'Describe the limitation of the default checkout or workflow.',
        role: 'Describe the solution you built and the tools you used.',
        outcome: 'Add one measurable result.',
        href: '',
      },
      {
        title: 'Content strategy and site structure', // TODO
        roles: ['Content strategy', 'UI/UX'],
        problem: 'Describe the content problem, such as unclear navigation or thin product pages.',
        role: 'Describe the audit, structure, and writing you delivered.',
        outcome: 'Add one measurable result, such as organic traffic or time to find a product.',
        href: '',
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
        title: 'بازطراحی فروشگاه اینترنتی', // TODO
        roles: ['UI/UX', 'ووکامرس'],
        problem: 'مسئله کسب‌وکار و کاربران را توضیح دهید.',
        role: 'دقیقاً بنویسید چه کاری انجام دادید.',
        outcome: 'یک نتیجه قابل اندازه‌گیری اضافه کنید، مثل نرخ تبدیل، زمان بارگذاری یا تعداد تیکت‌های پشتیبانی.',
        href: '',
      },
      {
        title: 'تسویه‌حساب و افزونه سفارشی', // TODO
        roles: ['ووکامرس'],
        problem: 'محدودیت تسویه‌حساب یا فرایند پیش‌فرض را توضیح دهید.',
        role: 'راه‌حلی که ساختید و ابزارهای استفاده‌شده را شرح دهید.',
        outcome: 'یک نتیجه قابل اندازه‌گیری اضافه کنید.',
        href: '',
      },
      {
        title: 'استراتژی محتوا و ساختار سایت', // TODO
        roles: ['استراتژی محتوا', 'UI/UX'],
        problem: 'مسئله محتوایی را توضیح دهید، مثل ناوبری نامشخص یا صفحات محصول کم‌محتوا.',
        role: 'ممیزی، ساختار و متن‌هایی که تحویل دادید را شرح دهید.',
        outcome: 'یک نتیجه قابل اندازه‌گیری اضافه کنید، مثل ترافیک ارگانیک یا زمان پیدا کردن محصول.',
        href: '',
      },
    ],
    experience: [
      { period: 'سال – اکنون', role: 'طراح ارشد UI/UX و توسعه‌دهنده ووکامرس', org: 'نام شرکت یا فریلنس' },
      { period: 'سال – سال', role: 'عنوان شغلی', org: 'شرکت' },
    ],
  },
};
