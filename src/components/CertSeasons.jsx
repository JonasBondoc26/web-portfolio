'use client';

import { useRef, useState } from 'react';
import Car from './Car';
import { clamp, prefersReducedMotion, spinWheels, useScrollFrame } from '../lib/scroll';

/* Certifications as championship seasons.
   On a big enough screen the stage pins while you scroll; a car drives along the
   track from year to year, and each year's certifications come in like a timing sheet.
   On small screens, or with reduced motion, every season is simply listed in order
   (the CSS decides which: the stage is only sticky inside a media query). */
export default function CertSeasons({ certifications }) {
    const years = [...new Set(certifications.map((c) => c.year))].sort((a, b) => a - b);
    const seasons = years.map((year) => {
        const certs = certifications.filter((c) => c.year === year);
        const byOrg = {};
        certs.forEach(({ org }) => { byOrg[org] = (byOrg[org] || 0) + 1; });
        const orgs = Object.entries(byOrg).sort((a, b) => b[1] - a[1]);
        return { year, certs, orgs };
    });
    const totals = seasons.map((_, i) => seasons.slice(0, i + 1).reduce((n, s) => n + s.certs.length, 0));
    const last = seasons.length - 1;

    const wrapRef = useRef(null);
    const stageRef = useRef(null);
    const carRef = useRef(null);
    const fillRef = useRef(null);
    const [active, setActive] = useState(0);
    const [reversing, setReversing] = useState(false);
    const pinned = useRef(false);

    useScrollFrame(({ velocity, measure }) => {
        const wrap = wrapRef.current;
        const stage = stageRef.current;
        if (!wrap || !stage) return;
        if (measure) pinned.current = getComputedStyle(stage).position === 'sticky' && !prefersReducedMotion();
        if (!pinned.current) return;

        const travel = wrap.offsetHeight - stage.offsetHeight;
        const top = parseFloat(getComputedStyle(stage).top) || 0;
        const p = clamp((top - wrap.getBoundingClientRect().top) / Math.max(1, travel), 0, 1);

        // Car and fill follow the scroll exactly; the season snaps to the nearest year.
        const track = carRef.current.parentElement;
        const x = p * track.clientWidth;
        carRef.current.style.transform = `translateX(${x}px)`;
        fillRef.current.style.transform = `scaleX(${p})`;
        spinWheels(carRef.current, x);

        const next = Math.round(p * last);
        setActive((cur) => (cur === next ? cur : next));
        if (Math.abs(velocity) > 20) setReversing((r) => (r === velocity < 0 ? r : velocity < 0));
    });

    // Clicking a year on the track scrolls to the point where that season is showing.
    const goTo = (i) => {
        const wrap = wrapRef.current;
        const stage = stageRef.current;
        if (!pinned.current) {
            document.getElementById(`season-${seasons[i].year}`)?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        const travel = wrap.offsetHeight - stage.offsetHeight;
        const top = parseFloat(getComputedStyle(stage).top) || 0;
        const start = window.scrollY + wrap.getBoundingClientRect().top - top;
        window.scrollTo({ top: start + (last ? i / last : 0) * travel + 2, behavior: 'smooth' });
    };

    return (
        <div className="seasons" ref={wrapRef} style={{ '--seasons': seasons.length }}>
            <div className="seasons-stage" ref={stageRef}>
                <div className="seasons-head">
                    <h3 className="cert-title">Certifications</h3>
                    <p className="seasons-total">
                        <span>Total</span>
                        <b key={totals[active]}>{totals[active]}</b>
                        <span>/ {certifications.length}</span>
                    </p>
                </div>

                <div className="seasons-track">
                    <div className="seasons-rail"><div className="seasons-fill" ref={fillRef} /></div>
                    <div className="seasons-car-lane">
                        <div className={`seasons-car${reversing ? ' is-reversing' : ''}`} ref={carRef}><Car /></div>
                    </div>
                    <ol className="seasons-nodes">
                        {seasons.map(({ year }, i) => (
                            <li key={year} style={{ left: `${last ? (i / last) * 100 : 0}%` }}>
                                <button
                                    type="button"
                                    className={`seasons-node${i === active ? ' is-active' : ''}${i < active ? ' is-passed' : ''}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Show ${year} certifications`}
                                >
                                    <span>{year}</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="seasons-panels">
                    {seasons.map(({ year, certs, orgs }, i) => (
                        <article
                            key={year}
                            id={`season-${year}`}
                            className={`season${i === active ? ' is-active' : ''}`}
                            aria-label={`${year} certifications`}
                        >
                            <span className="season-ghost" aria-hidden="true">{year}</span>
                            <div className="season-side">
                                <p className="season-kicker">Season {String(i + 1).padStart(2, '0')}</p>
                                <p className="season-year">{year}</p>
                                <p className="season-count"><b>{certs.length}</b> {certs.length === 1 ? 'certification' : 'certifications'}</p>
                                <ul className="season-orgs">
                                    {orgs.map(([org, n]) => <li key={org}>{org}{n > 1 && <small> ×{n}</small>}</li>)}
                                </ul>
                            </div>

                            <ol className={`season-list${certs.length > 6 ? ' is-long' : ''}`}>
                                {certs.map(({ name, org, url }, j) => (
                                    <li key={name} style={{ '--j': j }}>
                                        <a className="season-row" href={url} target="_blank" rel="noopener" data-cursor="Open">
                                            <span className="season-pos">P{j + 1}</span>
                                            <span className="season-name">{name}</span>
                                            <span className="season-org">{org}</span>
                                        </a>
                                    </li>
                                ))}
                            </ol>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
