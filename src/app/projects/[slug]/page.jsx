import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import LapBar from '../../../components/LapBar';
import ProjectCard, { LinkIcon } from '../../../components/ProjectCard';
import { projectLinks, linkProps } from '../../../lib/projectLinks';
import SectionHeader from '../../../components/SectionHeader';
import { projects } from '../../../data/projects';
import shots from '../../../data/shots.json';
import { BASE } from '../../../lib/site';

// The site is a static export, so every project page is built ahead of time.
export const dynamicParams = false;

export function generateStaticParams() {
    return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);
    if (!project) return {};
    const description = project.description.slice(0, 160);
    return {
        title: project.title,
        description,
        openGraph: { type: 'article', title: `${project.title} | Jonas Bondoc`, description },
    };
}

const Arrow = ({ back = false }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={back ? { transform: 'scaleX(-1)' } : undefined}>
        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** One screenshot: the top of the page, linking to the full-length capture. */
const Screen = ({ shot }) => (
    <li>
        <a className="screen" href={`${BASE}${shot.full}`} target="_blank" rel="noopener" aria-label={`${shot.label}, full page (opens in a new tab)`}>
            <img src={`${BASE}${shot.view}`} alt="" loading="lazy" width={shot.w} height={shot.h} />
        </a>
        <span className="screen-label">{shot.label}</span>
    </li>
);

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const project = projects[index];
    const { slug: id, title, category, description, features, tech } = project;
    const links = projectLinks(project);
    const download = typeof project.download === 'string' ? { url: project.download } : project.download;
    const cover = shots[id]?.cover;
    const screens = (shots[id]?.screens ?? []).filter((s) => !s.isCover);
    const desktopScreens = screens.filter((s) => !s.phone);
    const phoneScreens = screens.filter((s) => s.phone);
    const prev = projects[(index - 1 + projects.length) % projects.length];
    const next = projects[(index + 1) % projects.length];
    // Up to two others from the same category, for the "More like this" row.
    const related = projects.filter((p, i) => i !== index && p.category === category).slice(0, 2);

    return (
        <>
            <main id="main">
                <section className="project-detail page-section">
                    <div className="container">
                        <Reveal>
                            <Link href="/projects" className="project-back"><Arrow back />All projects</Link>
                        </Reveal>

                        <Reveal className="project-detail-head">
                            <div className="project-category">{category}</div>
                            <h1 className="project-detail-title">{title}</h1>
                            {/* Try it first: the links sit right under the title, above the fold. */}
                            {links.length > 0 && (
                                <div className="project-detail-actions">
                                    {links.map(({ kind, href, label }, i) => (
                                        <a key={kind} href={href} className={`btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}`} {...linkProps(kind)}>
                                            <span className="btn-icon"><LinkIcon kind={kind} />{label}</span>
                                        </a>
                                    ))}
                                </div>
                            )}
                            {download?.note && <p className="project-download-note">{download.note}</p>}
                        </Reveal>

                        {/* The main proof: not behind a scroll reveal, so it shows even before scripts run. */}
                        {cover && (
                            <div className="project-detail-image project-detail-shot">
                                <img src={`${BASE}${cover.src}`} alt={`Screenshot of ${title}`} width={cover.w} height={cover.h} fetchPriority="high" />
                            </div>
                        )}

                        <div className="project-detail-body">
                            <Reveal className="project-detail-main" delay={0.15}>
                                <h2 className="project-detail-sub">Overview</h2>
                                <p className="project-detail-text">{description}</p>

                                {features.length > 0 && (
                                    <div className="project-features">
                                        <h2 className="project-detail-sub">Key Features</h2>
                                        <ul className="stagger">{features.map((feature, i) => <li key={feature} style={{ '--i': i }}>{feature}</li>)}</ul>
                                    </div>
                                )}
                            </Reveal>

                            <Reveal as="aside" className="project-detail-side" delay={0.2}>
                                <h2 className="project-detail-sub">Built with</h2>
                                <div className="project-tech">
                                    {tech.map((name) => <span className="tech-tag" key={name}>{name}</span>)}
                                </div>
                            </Reveal>
                        </div>

                        {screens.length > 0 && (
                            <section className="project-screens" aria-labelledby="screens-title">
                                <h2 className="project-detail-sub" id="screens-title">Screens</h2>
                                {desktopScreens.length > 0 && (
                                    <ul className="screens-desktop">
                                        {desktopScreens.map((s) => <Screen key={s.view} shot={s} />)}
                                    </ul>
                                )}
                                {phoneScreens.length > 0 && (
                                    <ul className="screens-phone">
                                        {phoneScreens.map((s) => <Screen key={s.view} shot={s} />)}
                                    </ul>
                                )}
                            </section>
                        )}

                        {related.length > 0 && (
                            <div className="project-related">
                                <SectionHeader title="More like this" />
                                <div className="projects-grid">
                                    {related.map((p, i) => <ProjectCard key={p.slug} project={p} delay={0.1 * i} />)}
                                </div>
                            </div>
                        )}

                        <nav className="project-pager" aria-label="More projects">
                            <Link href={`/projects/${prev.slug}`} className="project-pager-link">
                                <span><Arrow back />Previous</span>
                                <strong>{prev.title}</strong>
                            </Link>
                            <Link href={`/projects/${next.slug}`} className="project-pager-link is-next">
                                <span>Next<Arrow /></span>
                                <strong>{next.title}</strong>
                            </Link>
                        </nav>
                    </div>
                </section>
            </main>
            <LapBar />
        </>
    );
}
