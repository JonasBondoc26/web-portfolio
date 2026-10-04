# Jonas Bondoc - Portfolio (Next.js)

A racing-themed portfolio built with Next.js (App Router) and React. It builds to plain static files, so it can be hosted anywhere, including GitHub Pages.

## Run it

You need Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # writes the finished site to /out
npm run preview    # serves /out so you can check the build
```

## Where things are

```
src/
  app/
    layout.jsx          page shell: fonts, theme script, nav, footer
    page.jsx            home page
    projects/page.jsx   all projects
    projects/[slug]/    one page per project, built from projects.js
    not-found.jsx       the 404 page
    globals.css         all styling; colours and sizes are variables at the top
  components/
    Car.jsx             the race car (one SVG)
    Loader.jsx          the loading screen on a full page load (waits for the page and fonts)
    HeroTelemetry.jsx   the "telemetry" panel beside the name (wide screens), filled from the data files
    HeroCar.jsx         start lights, the drive-in to the grid, and the scroll-driven drive-off
    LapBar.jsx          the bar along the bottom with the small car
    SpeedStreaks.jsx    the lines that move while you scroll
    Reveal.jsx          fade-in on scroll
    CertSeasons.jsx     certifications as seasons: pins while you scroll, a car drives year to year
    Ticker.jsx          the scrolling tech-stack band under the hero
    RoleCycler.jsx      the rotating role line in the hero
    PointerFX.jsx       mouse effects: card tilt + spotlight (data-tilt), magnetic buttons, cursor ring (data-cursor="text")
    RouteWipe.jsx       the striped wipe when you change pages
    SpeedSkew.jsx       grids marked data-speed-skew lean slightly with scroll speed
    DownloadResume.jsx  the resume button, which confirms the download started
    LapTimer.jsx        the "your lap" timer in the footer
    ProjectFilter.jsx   category buttons on the All projects page
    sections/           Hero, About, FeaturedProjects, Contact, Resume
  data/
    projects.js         every project
    certifications.js   every certification
    tech.js             tech stack tiles
  lib/
    scroll.js           the scroll engine and the useScrollFrame hook
    site.js             section list, email, EmailJS keys
public/resume/          the PDF
```

## Common edits

- **Add a project**: add an object to `src/data/projects.js`. Set `featured: true` to show it on the home page. The "projects built" number updates itself.
- **Add a tech tile**: add an object to `src/data/tech.js` with a `group` from `TECH_GROUPS` (Languages, Frameworks, Platforms, Tools).
- **Add a certification**: add an object to `src/data/certifications.js`. The count updates itself.
- **Add a project screenshot**: put the image in `public/photos/` and add `"image": "/photos/your-shot.jpg"` to that project.
- **Change colours**: edit the `--livery-*` and `--accent` variables at the top of `globals.css`. The car is painted from the same variables.

## How the scroll animation works

`src/lib/scroll.js` runs one `requestAnimationFrame` loop for the whole site. It wakes on scroll, measures how fast the page is moving, and sleeps when you stop. Components subscribe with `useScrollFrame()` and move things through refs, so scrolling does not re-render React.

## Deploy to GitHub Pages

1. Push this folder to your repository's `main` branch.
2. In the repository: Settings -> Pages -> Source -> **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push.

The workflow sets `NEXT_PUBLIC_BASE_PATH` to `/<repo-name>` because GitHub Pages serves the site from that sub-folder. On Vercel or Netlify, leave it unset.
