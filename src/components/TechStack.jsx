'use client';

import { useEffect, useState } from 'react';
import TechCloud from './TechCloud';

// The Tech Stack with a view switch: "Cloud" (logos on a turning sphere, beside the list
// by group) or "Grid" (logo tiles by group). The visitor's choice is remembered.

const VIEWS = [
    { id: 'cloud', label: 'Cloud' },
    { id: 'grid', label: 'Grid' },
];
const KEY = 'tech-view';

export default function TechStack({ tech, groups }) {
    const [view, setView] = useState('cloud');

    useEffect(() => {
        try {
            const saved = localStorage.getItem(KEY);
            if (VIEWS.some((v) => v.id === saved)) setView(saved);
        } catch (e) { /* private mode */ }
    }, []);

    const choose = (id) => {
        setView(id);
        try { localStorage.setItem(KEY, id); } catch (e) { /* private mode */ }
    };

    const byGroup = groups.map((group) => [group, tech.filter((t) => t.group === group)]);

    return (
        <>
            <div className="skills-head">
                <h3 className="skills-title">Tech Stack</h3>
                <div className="tech-views project-filters" role="group" aria-label="Tech stack view">
                    {VIEWS.map(({ id, label }) => (
                        <button
                            key={id}
                            type="button"
                            className={`project-filter${view === id ? ' active' : ''}`}
                            aria-pressed={view === id}
                            onClick={() => choose(id)}
                        >
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {view === 'cloud' ? (
                <div className="tech-layout">
                    <TechCloud items={tech} />
                    {/* The readable list: every technology by group. */}
                    <div className="tech-list">
                        {byGroup.map(([group, items]) => (
                            <div className="tech-list-group" key={group}>
                                <h4 className="tech-list-title"><span>{group}</span></h4>
                                <ul>{items.map(({ name }) => <li key={name}>{name}</li>)}</ul>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="tech-grid">
                    {byGroup.map(([group, items]) => (
                        <div className="tech-list-group tech-grid-group" key={group}>
                            <h4 className="tech-list-title"><span>{group}</span></h4>
                            <ul className="tech-tiles">
                                {items.map(({ name, icon, mono }) => (
                                    <li className="tech-tile" key={name}>
                                        <img src={icon} alt="" width="36" height="36" loading="lazy" className={mono ? 'is-mono' : undefined} />
                                        <span>{name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
