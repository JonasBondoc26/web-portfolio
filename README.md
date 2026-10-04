# Jonas Bondoc — Developer Portfolio

A racing-themed personal portfolio

**Live site:** https://jonasbondoc26.github.io/web-portfolio/

Built with **Next.js 15** and **React 19**. The whole site exports to plain static files, so it runs on any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages) with no server or database.

---

## What's on the site

| Section | What it shows |
| --- | --- |
| **Loading screen** | A progress counter and a mini F1 car driving to the chequered flag while the page loads. |
| **Hero** | My name, a rotating role line, start lights, and an F1 car that drives onto the grid. A "telemetry" panel sums up who I am. |
| **About** | Short bio and photo. |
| **Certifications** | 17 certifications shown as championship "seasons". On desktop the section pins while you scroll and a car drives from year to year. |
| **Tech Stack** | 28 technologies, grouped into Languages, Frameworks, Platforms and Tools. |
| **Projects** | Featured projects on the home page, an **All projects** page with category filters, and a **separate page for every project** (overview, features, tech, live demo and GitHub links). |
| **Contact** | A working contact form (sent through EmailJS) plus email, phone and social links. |
| **Resume** | A downloadable PDF resume. |

Every part works in **dark and light mode**, on **phones and desktops**. Visitors who turn on "reduce motion" on their device get a calm version with the animations switched off.

## Built with

- **Next.js 15** (App Router, static export) and **React 19**
- Plain **CSS** (one stylesheet, no CSS framework), with colours as CSS variables
- **EmailJS** for the contact form
- **Barlow** and **Barlow Condensed** fonts (via `next/font`, served from the site itself)
- Tech logos from **[Devicon](https://devicon.dev/)**
- **GitHub Actions** for automatic deployment to GitHub Pages

---

## Run it on your computer

**You need:** [Node.js](https://nodejs.org/) 18.18 or newer (20 or 22 recommended) and npm, which comes with Node.

```bash
npm install        # first time only: downloads the dependencies
npm run dev        # starts the site at http://localhost:3000
```

The page reloads by itself whenever you save a file.

### Build the finished site

```bash
npm run build      # creates the finished static site in the out/ folder
npm run preview    # serves out/ at http://localhost:3000 so you can check it
```

> **Stop `npm run dev` before running `npm run build`.** Both use the same `.next` folder, and running them together breaks both (you'll see random "500" errors or build failures). If that happens, stop everything, delete the `.next` folder, and start again.

---

## Updating the content

All the content lives in three data files in `src/data/`. You don't need to touch any component code to update the site.

### Add a project

Add an object to `src/data/projects.js`:

```js
{
    "slug": "my-new-project",                 // used in the page address: /projects/my-new-project/
    "title": "My New Project",
    "placeholder": "Booking System",          // big text shown on the card until you add a screenshot
    "category": "Full Stack Development",     // projects with the same category are grouped in the filter
    "description": "What it does and who it's for.",
    "features": ["User Authentication", "Online Payments"],
    "tech": ["React", "Laravel", "MySQL"],
    "demo": "https://example.com",            // or null
    "github": "https://github.com/...",       // or null
    "featured": false                         // true = also shown on the home page
}
```

Its own page, its card, the filter buttons and the "projects built" count all update automatically.

**To add a screenshot**, put the image in `public/photos/` and add `"image": "/photos/my-shot.jpg"` to the project.

### Add a certification

Add an object to `src/data/certifications.js` with `name`, `org`, `year` and `url` (the link to the certificate). A new year automatically becomes a new "season".

### Add a technology

Add an object to `src/data/tech.js` with `name`, `icon` (an image URL; [Devicon](https://devicon.dev/) has most logos) and `group`, which must be one of `Languages`, `Frameworks`, `Platforms` or `Tools`. It also appears in the scrolling ticker under the hero.

### Other common edits

| To change… | Edit |
| --- | --- |
| Resume PDF | Replace `public/resume/Jonas_Bondoc_Resume.pdf` (keep the same file name), and update "Last updated" in `src/components/sections/Resume.jsx`. |
| Profile photo | Replace `src/assets/portrait.webp`. Keep it small (around 800px wide). |
| Email, contact form keys | `src/lib/site.js` |
| Phone, location, social links | `src/components/sections/Contact.jsx` |
| About text | `src/components/sections/About.jsx` |
| Hero text and rotating roles | `src/components/sections/Hero.jsx` |
| Colours | The `--livery-*` and `--accent` variables at the top of `src/app/globals.css`. The car is painted with the same colours. |

### Contact form (EmailJS)

The form sends messages through [EmailJS](https://www.emailjs.com/), so no backend is needed. The service ID, template ID and public key are in `src/lib/site.js`. The public key is designed to be visible in browser code. To stop other sites from using it, add your live domain under **Account → Security → Allowed origins** in the EmailJS dashboard.

---

## Project structure

```
src/
  app/
    layout.jsx            page shell: fonts, theme + loading-screen script, nav, footer
    page.jsx              home page
    projects/page.jsx     All projects page
    projects/[slug]/      one page per project, generated from projects.js
    not-found.jsx         404 page
    globals.css           all styling, in numbered sections
  components/
    sections/             Hero, About, FeaturedProjects, Contact, Resume
    Loader.jsx            loading screen
    HeroCar.jsx           start lights, car drive-in, and drive-off on scroll
    Car.jsx               the race car (one SVG, reused everywhere)
    CertSeasons.jsx       certifications as scroll-pinned seasons
    ProjectCard.jsx       project card;  ProjectFilter.jsx: category buttons
    LapBar.jsx            progress bar at the bottom, with a car that follows your scroll
    PointerFX.jsx         mouse effects: card tilt, magnetic buttons, cursor ring
    …                     smaller pieces (ticker, role line, page wipe, lap timer, etc.)
  data/                   projects.js, certifications.js, tech.js   ← content lives here
  lib/
    scroll.js             shared scroll engine (one animation loop for the whole site)
    site.js               section list, email, EmailJS keys
  assets/                 logos and profile photo
public/
  resume/                 the resume PDF
.github/workflows/
  deploy.yml              builds and publishes to GitHub Pages on every push to main
```

### How the animations stay smooth

`src/lib/scroll.js` runs **one** `requestAnimationFrame` loop for the whole site. It wakes when you scroll, measures scroll speed, and sleeps when you stop. Components subscribe with the `useScrollFrame()` hook and move elements directly through refs, so scrolling never re-renders React. Mouse-only effects are switched off on touch screens, and all motion respects the device's "reduce motion" setting.

---

## Deploying

### GitHub Pages (set up already)

1. Push this project to the `main` branch of a **public** GitHub repository.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` now builds and publishes the site automatically. Progress shows in the **Actions** tab.

The address depends on the repository name:

| Repository name | Site address |
| --- | --- |
| `JonasBondoc26.github.io` | `https://jonasbondoc26.github.io/` |
| anything else, e.g. `portfolio` | `https://jonasbondoc26.github.io/portfolio/` |

The workflow works out the right sub-folder by itself through `NEXT_PUBLIC_BASE_PATH`.

### Netlify, Vercel or Cloudflare Pages

Connect the repository with build command `npm run build` and output folder `out`. Don't set `NEXT_PUBLIC_BASE_PATH`, because these hosts serve the site from the root of its domain.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "500" errors or random build failures | `npm run dev` and `npm run build` were running at the same time. Stop both, delete `.next`, and start again. |
| Site loads without styles on GitHub Pages | Check that **Settings → Pages → Source** is set to **GitHub Actions**, not "Deploy from a branch". |
| Contact form says it couldn't send | Check the keys in `src/lib/site.js` and the allowed origins in your EmailJS dashboard. |
| A project page shows 404 | Its `slug` in `projects.js` must be unique and contain only lowercase letters, numbers and dashes. |

---

## Usage

This is my personal portfolio. You're welcome to read the code and learn from it, but please don't publish my name, photo, resume or project write-ups as your own.

© Jonas Bondoc
