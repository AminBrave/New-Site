# Content launch checklist

Use this checklist before replacing portfolio placeholders or publishing new case studies. Keep unknown information as a placeholder until it can be confirmed.

## Profile and contact

- [ ] Replace the English and Persian display names with the correct names.
- [ ] Confirm the role/title and profile description in both languages.
- [ ] Replace the example email address with the intended public contact address.
- [ ] Replace placeholder social profile URLs, or remove links that should not be shown.
- [ ] Review every claim about experience, capabilities, certifications, and AI workflows for accuracy.
- [ ] Confirm the public contact and social links work.

## Experience and services

- [ ] Replace placeholder employment periods, roles, and organizations with accurate details.
- [ ] Confirm each listed tool, service, and skill reflects actual experience.
- [ ] Remove services or claims that should not be offered or advertised.
- [ ] Review English and Persian copy for meaning, tone, and consistency.

## Each case study

- [ ] Use a real, publishable project title and client/brand description; respect confidentiality.
- [ ] Explain the context, challenge, constraints, and goals.
- [ ] State your actual role, contributions, and collaborators clearly.
- [ ] Describe the process and important decisions, not only the deliverables.
- [ ] Replace instructional text with project-specific content.
- [ ] Include only outcomes supported by evidence. Do not invent metrics; omit unavailable metrics.
- [ ] Obtain permission for testimonials and confirm the exact quote, attribution, and title.
- [ ] Confirm tools and technologies used on the project.
- [ ] Add optimized project images to `public/images/projects/`, with appropriate alternatives where the content model supports them.
- [ ] Verify any live-project URL is correct and safe to publish.
- [ ] Keep the project ID consistent between English and Persian content and in `workShared`.
- [ ] Check related-project IDs in each discipline against the published project IDs.

## Before release

- [ ] Run `npm ci`.
- [ ] Run `npm run check`.
- [ ] Run `npm run build` and resolve any content-validation errors.
- [ ] Review the English and Persian pages at mobile and desktop widths.
- [ ] Check RTL direction, mixed-language text, navigation, and language switching.
- [ ] Check links, images, page metadata, and canonical URLs on the intended hosting path.
- [ ] Confirm no unintended placeholders, private client details, or unsupported claims remain.

## Placeholder policy

Placeholders are acceptable during development. Before public launch, explicitly review any `TODO`, example email/social URL, generic client or testimonial copy, instructional case-study text, and em-dash metric values. A structural build passing does not mean the portfolio content is ready to publish.
