'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';

/** The All projects grid, with a button per category to narrow it down. */
export default function ProjectFilter({ projects }) {
    const categories = ['All', ...new Set(projects.map((project) => project.category))];
    const [active, setActive] = useState('All');
    const shown = active === 'All' ? projects : projects.filter((project) => project.category === active);

    return (
        <>
            <div className="project-filters" role="group" aria-label="Filter projects by category">
                {categories.map((category) => {
                    const count = category === 'All' ? projects.length : projects.filter((p) => p.category === category).length;
                    return (
                        <button
                            key={category}
                            type="button"
                            className={`project-filter${active === category ? ' active' : ''}`}
                            aria-pressed={active === category}
                            onClick={() => setActive(category)}
                        >
                            <span>{category} <small>{count}</small></span>
                        </button>
                    );
                })}
            </div>

            {/* A new key on each filter change replays the cards' entrance. */}
            <div className="projects-grid" key={active} data-speed-skew>
                {shown.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} delay={0.06 * i} />
                ))}
            </div>
        </>
    );
}
