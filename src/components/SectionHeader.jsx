import Reveal from './Reveal';

/** Section title with the line that streaks out from it. `sector` adds a small "Sector 0n" label at the end of the line. */
export default function SectionHeader({ title, as: Heading = 'h2', sector }) {
    return (
        <Reveal className="section-header">
            <Heading className="section-title">{title}</Heading>
            <div className="section-line" />
            {sector && <span className="section-kicker">Sector {String(sector).padStart(2, '0')}</span>}
        </Reveal>
    );
}
