// Edit this file to change the site's content. Items marked TODO are placeholders.
export const site = {
  name: 'Your Name', // TODO
  title: 'Senior UI/UX designer, WooCommerce developer and content strategist',
  description:
    'Portfolio of a senior UI/UX designer, senior WordPress and WooCommerce developer, and content strategist.',
  intro:
    'I design online stores and digital products, build them in WooCommerce, and write the words that guide people through them. One person owning the experience, the code, and the message means fewer hand-offs and fewer gaps.',
  email: 'hello@example.com', // TODO
  links: [
    // TODO: add real URLs, remove any you don't use
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-handle' },
    { label: 'GitHub', href: 'https://github.com/your-handle' },
    { label: 'Dribbble', href: 'https://dribbble.com/your-handle' },
  ],
  resumeUrl: '', // TODO: e.g. 'resume.pdf' after placing it in /public
};

export const disciplines = [
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
];

export const process = [
  { step: 'Discover', text: 'Goals, users, constraints, and the current numbers.' },
  { step: 'Define', text: 'The problem, the audience, and what success looks like.' },
  { step: 'Design', text: 'Structure, flows, interface, and the copy inside it.' },
  { step: 'Build', text: 'Clean, tested code that the client can maintain.' },
  { step: 'Improve', text: 'Measure after launch and keep refining.' },
];

// TODO: replace with real projects. Keep each to one clear result.
export const work = [
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
];

// TODO: replace with real history
export const experience = [
  { period: 'Year – Present', role: 'Senior UI/UX designer and WooCommerce developer', org: 'Company or Freelance' },
  { period: 'Year – Year', role: 'Role title', org: 'Company' },
];
