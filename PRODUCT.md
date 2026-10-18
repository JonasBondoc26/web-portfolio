# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters, HR screeners and hiring managers evaluating Jonas Jason Bondoc for a full-stack web developer role. They arrive from a resume, LinkedIn or a job application, usually skim on a laptop or phone in a minute or two, and need to answer: can he build real, working software, and is he worth an interview?

Secondary (not the focus): local businesses looking for a web developer. They should still be able to reach him, but the site is not organized around selling freelance services.

## Product Purpose

A personal portfolio that gets Jonas interviews for full-stack web developer roles. It shows shipped work with live demos and source code, his client and on-the-job experience, his stack, and a resume to download. Success means a recruiter leaves with a clear picture of what he has built and contacts him or downloads the resume.

## Positioning

A BSIT (Web Development) student at Holy Angel University who has already shipped working software for real people: a capstone toll route planner covering nine Luzon expressway systems (Laravel API, React web, React Native mobile), a WordPress site that reached first-page local search results for a dental clinic, and a diabetes-management platform with IoT buzzer alerts for a direct client, plus an endpoint engineering OJT at Cloudstaff. Claims stay specific and verifiable through live demos and GitHub links.

## Operating Context

- Recruiters open it from a resume link or LinkedIn, on desktop and on phones, often skimming between other candidates.
- The downloadable resume (Harvard style, one page) is a core part of the evaluation, linked from the nav and its own section.
- Every project should open to a detail page with the full write-up, features, tech, and live demo / GitHub links.
- Contact happens through the on-site form (EmailJS) or email.

## Capabilities and Constraints

- Next.js 15 App Router, static export (`output: 'export'`), deployed to GitHub Pages at jonasbondoc26.github.io/web-portfolio (base path set by the deploy workflow).
- Plain JavaScript (JSX) and one global CSS file; no TypeScript, Tailwind or shadcn today. Adding them is an open decision, not a given.
- Content is data-driven: `src/data/projects.js`, `src/data/certifications.js`, `src/data/tech.js`. Counts and lists are derived from these files and must not be hard-coded.
- Pages: home (hero, about, featured projects, contact, resume), `/projects` with category filter, `/projects/[slug]` detail pages, 404.
- Dark and light themes, saved per visitor.
- The resume PDF lives at `public/resume/Jonas_Bondoc_Resume.pdf`.

## Brand Commitments

- Name: Jonas Jason Bondoc (display "Jonas Bondoc"); the "JB" logo in dark and light versions (`src/assets/logo-dark.png`, `logo-light.png`).
- Voice: first person, plain and specific. Concrete facts (numbers, named clients, named tech) over abstract claims; no buzzword copy like "scalable digital solutions".
- The F1 / motorsport identity is the incumbent theme and is liked, but it is not binding: a redesign may replace it.

## Evidence on Hand

- 8 projects with real descriptions, features and tech in `src/data/projects.js`; most have live demos and public GitHub repos. Featured: SmartToll Route Planner (capstone) and KOMA PH E-Commerce.
- Client work: Galang Dental Center (WordPress + local SEO, first-page results, live at galangdentalcenter.com), DiaWeb (direct client, Feb–Mar 2026).
- Experience: Cloudstaff, Endpoint Engineer Trainee (OJT), Jul–Oct 2026, team refurbishing 1,500 PCs; QA on 117 PCs in one week; assessment record for 584 units.
- 19 certifications with verification URLs (AWS Academy Cloud Foundations, freeCodeCamp, Cisco, MongoDB, HubSpot, Simplilearn, Anthropic).
- Portrait photo (`src/assets/portrait.webp`).
- Absent, must not be fabricated: project screenshots (no project has an `image` yet, cards show text placeholders), testimonials, client quotes, metrics beyond those above, employment beyond the OJT.

## Product Principles

1. Shipped work is the proof. Lead with real projects and their live demos; everything else supports them.
2. Specific beats impressive. A real number or named client outweighs any adjective.
3. A recruiter skimming for 60 seconds on a phone must still get the point.
4. Personality is welcome, but never at the cost of legibility, speed or the work being seen.
5. Nothing on the site claims more than Jonas can show or explain in an interview.

## Accessibility & Inclusion

Respects reduced-motion preferences (motion effects already switch off). No other product-specific requirement established.
