import Link from 'next/link';
import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import ProjectCard from '../ProjectCard';
import { projects } from '../../data/projects';

export default function FeaturedProjects() {
    const featured = projects.filter((project) => project.featured);

    return (
        <section id="projects" className="projects page-section">
            <div className="container">
                <SectionHeader title="Featured Projects" sector={2} />

                <div className="projects-grid" data-speed-skew>
                    {featured.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} delay={0.1 * (i + 1)} />
                    ))}
                </div>

                <Reveal className="view-more-projects" delay={0.3}>
                    <Link href="/projects" className="btn btn-primary btn-view-more">
                        <span>View all projects</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
