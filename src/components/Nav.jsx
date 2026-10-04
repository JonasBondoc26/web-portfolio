'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { SECTIONS } from '../lib/site';
import { currentSection, useScrollFrame } from '../lib/scroll';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';

const SECTION_IDS = SECTIONS.map((s) => s.id);

export default function Nav() {
    const pathname = usePathname() || '/';
    const onProjectsPage = pathname.startsWith('/projects');

    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');

    useScrollFrame(({ y }) => {
        setScrolled(y > 40);                       // React skips the re-render when the value is unchanged
        if (!onProjectsPage) setActive(currentSection(SECTION_IDS, y) || 'home');
    });

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    const activeId = onProjectsPage ? 'projects' : active;

    return (
        <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link href="/" aria-label="Jonas Bondoc, home">
                        <img src={logoDark.src} alt="" className="logo-img logo-dark" />
                        <img src={logoLight.src} alt="" className="logo-img logo-light" />
                    </Link>
                </div>

                <ul className={`nav-menu${open ? ' active' : ''}`} id="navMenu">
                    {SECTIONS.map(({ id, label }) => (
                        <li key={id}>
                            <Link
                                href={`/#${id}`}
                                className={`nav-link${id === 'resume' ? ' nav-resume' : ''}${id === activeId ? ' active' : ''}`}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <ThemeToggle />

                <button
                    className={`nav-toggle${open ? ' active' : ''}`}
                    id="navToggle"
                    type="button"
                    aria-label="Menu"
                    aria-expanded={open}
                    aria-controls="navMenu"
                    onClick={() => setOpen(!open)}
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    );
}
