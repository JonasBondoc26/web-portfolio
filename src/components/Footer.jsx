import Link from 'next/link';
import LapTimer from './LapTimer';
import { BASE, EMAIL } from '../lib/site';

const COLUMNS = [
    {
        title: 'Site',
        links: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/#about' },
            { label: 'Projects', href: '/projects' },
            { label: 'Contact', href: '/#contact' },
        ],
    },
    {
        title: 'Shipped',
        links: [
            { label: 'SmartToll', href: '/projects/smarttoll-route-planner' },
            { label: 'KOMA PH', href: '/projects/koma-ph-e-commerce-site' },
            { label: 'Galang Dental', href: '/projects/galang-dental-center-business-site' },
        ],
    },
    {
        title: 'Contact',
        links: [
            { label: 'Email', href: `mailto:${EMAIL}`, external: true },
            { label: 'GitHub', href: 'https://github.com/JonasBondoc26', external: true },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/jonasbondoc', external: true },
            { label: 'Resume (PDF)', href: `${BASE}/resume/Jonas_Bondoc_Resume.pdf`, external: true },
        ],
    },
];

/** The site footer: who, where to go next, and the lap you just finished. */
export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <strong>Jonas Bondoc</strong>
                    <span>Full-stack developer · San Fernando, Pampanga</span>
                </div>
                {COLUMNS.map((col) => (
                    <nav className="footer-col" key={col.title} aria-label={col.title}>
                        <h3>{col.title}</h3>
                        <ul>
                            {col.links.map(({ label, href, external }) => (
                                <li key={label}>
                                    {external
                                        ? <a href={href} target="_blank" rel="noopener">{label}</a>
                                        : <Link href={href}>{label}</Link>}
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>
            <div className="footer-rule">
                <LapTimer />
                <p className="footer-copy">&copy; {new Date().getFullYear()} Jonas Bondoc</p>
            </div>
        </footer>
    );
}
