import Link from 'next/link';
import { BASE } from '../lib/site';
import { projects } from '../data/projects';
import shots from '../data/shots.json';

// "Latest build" beside the name: the newest project's real screenshot and one line on
// what it is, linking to its page. Shows the work in the first screen instead of a fact box.
// The project is the first one in data/projects.js (the newest), so adding a project updates it.

const SUMMARY = {
    'smarttoll-route-planner': 'Toll route planner · 9 Luzon expressways · web + mobile',
};

export default function HeroBuild() {
    const project = projects.find((p) => shots[p.slug]?.cover) ?? projects[0];
    const cover = shots[project.slug]?.cover;
    const line = SUMMARY[project.slug] ?? project.category;

    return (
        <Link href={`/projects/${project.slug}`} className="hero-build">
            <span className="hero-build-label">Latest build</span>
            {cover && (
                <span className="hero-build-shot">
                    <img src={`${BASE}${cover.src}`} alt={`Screenshot of ${project.title}`} width={cover.w} height={cover.h} />
                </span>
            )}
            <span className="hero-build-title">{project.title} <i aria-hidden="true">→</i></span>
            <span className="hero-build-line">{line}</span>
        </Link>
    );
}
