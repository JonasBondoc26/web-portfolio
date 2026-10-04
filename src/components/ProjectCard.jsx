import Link from 'next/link';
import Reveal from './Reveal';
import { BASE } from '../lib/site';
import { projects } from '../data/projects';

export const DemoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const GitHubIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/** One project card. Its features and full write-up are on its own page, /projects/<slug>/. */
export default function ProjectCard({ project, delay = 0 }) {
    const { slug, title, placeholder, category, description, tech, demo, github, image } = project;

    // Its place in the list, worn like a race number.
    const number = String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, '0');

    return (
        <Reveal as="article" className="project-card" delay={delay} data-tilt="5">
            <div className="project-image">
                <span className="project-number" aria-hidden="true">{number}</span>
                <div className="project-placeholder">{placeholder}</div>
                {image && <img className="project-shot" src={`${BASE}${image}`} alt={`Screenshot of ${title}`} loading="lazy" />}
                <div className="project-overlay">
                    <div className="project-links">
                        {demo && <a href={demo} className="project-link" target="_blank" rel="noopener" data-cursor="Live"><DemoIcon />Live Demo</a>}
                        {github && <a href={github} className="project-link" target="_blank" rel="noopener" data-cursor="Code"><GitHubIcon />GitHub</a>}
                    </div>
                </div>
            </div>
            <div className="project-info">
                <div className="project-category">{category}</div>
                <h3 className="project-title"><Link href={`/projects/${slug}`} data-cursor="View">{title}</Link></h3>
                <p className="project-description">{description}</p>
                <div className="project-tech">
                    {tech.map((name) => <span className="tech-tag" key={name}>{name}</span>)}
                </div>
                <Link href={`/projects/${slug}`} className="btn btn-primary project-more" data-cursor="View"><span>View project <i aria-hidden="true">→</i></span></Link>
            </div>
        </Reveal>
    );
}
