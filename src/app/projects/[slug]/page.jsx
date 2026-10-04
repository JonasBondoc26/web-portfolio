import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '../../../components/Reveal';
import LapBar from '../../../components/LapBar';
import ProjectCard, { DemoIcon, GitHubIcon } from '../../../components/ProjectCard';
import SectionHeader from '../../../components/SectionHeader';
import { projects } from '../../../data/projects';
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

export default async function ProjectPage({ params }) {
    const { slug } = await params;
    const index = projects.findIndex((p) => p.slug === slug);
    if (index === -1) notFound();

    const { title, placeholder, category, description, features, tech, demo, github, image } = projects[index];
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
                        </Reveal>

                        <Reveal className="project-image project-detail-image" delay={0.1}>
                            <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                            <div className="project-placeholder">{placeholder}</div>
                            {image && <img className="project-shot" src={`${BASE}${image}`} alt={`Screenshot of ${title}`} />}
                        </Reveal>

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

                                <div className="project-detail-actions">
                                    {demo && (
                                        <a href={demo} className="btn btn-primary" target="_blank" rel="noopener">
                                            <span className="btn-icon"><DemoIcon />Live Demo</span>
                                        </a>
                                    )}
                                    {github && (
                                        <a href={github} className="btn btn-secondary" target="_blank" rel="noopener">
                                            <span className="btn-icon"><GitHubIcon />GitHub</span>
                                        </a>
                                    )}
                                </div>
                            </Reveal>
                        </div>

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
