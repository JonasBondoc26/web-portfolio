import { certifications } from '../data/certifications';
import { tech } from '../data/tech';
import { projects } from '../data/projects';

/* The "telemetry" panel on the right of the hero (wide screens only).
   Every line comes from the data files, so it stays current by itself. */
export default function HeroTelemetry() {
    const latestYear = Math.max(...certifications.map((c) => c.year));
    const latest = certifications.filter((c) => c.year === latestYear).at(-1);

    const rows = [
        ['Driver', 'Jonas Jason Bondoc'],
        ['Team', 'BSIT · Web Development, Holy Angel University'],
        ['Base', 'San Fernando, Pampanga'],
        ['Garage', `${tech.length} technologies · ${projects.length} builds`],
        ['Latest', `${latest.name} (${latest.year})`],
    ];

    return (
        <aside className="telemetry" aria-label="At a glance">
            <div className="telemetry-head">
                <span className="telemetry-live">Telemetry</span>
                <span className="telemetry-id">JB · 01</span>
            </div>
            <dl className="telemetry-rows">
                {rows.map(([label, value], i) => (
                    <div key={label} style={{ '--r': i }}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                    </div>
                ))}
            </dl>
            {/* A trace that draws itself, like a speed graph. */}
            <svg className="telemetry-trace" viewBox="0 0 300 48" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 40 L30 38 L48 22 L70 20 L84 34 L110 36 L130 12 L158 10 L172 30 L196 32 L214 16 L240 14 L256 28 L282 26 L300 8" />
            </svg>
        </aside>
    );
}
