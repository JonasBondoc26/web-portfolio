'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { EMAIL, SECTIONS } from '../lib/site';
import { currentSection, useScrollFrame } from '../lib/scroll';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';

const SECTION_IDS = SECTIONS.map((s) => s.id);

/** A link label split into letters, so on desktop hover they roll up one by one (see .roll in globals.css).
    The letters are hidden from screen readers; the link's aria-label carries the name. */
const Roll = ({ text }) => (
    <span className="roll" aria-hidden="true">
        {[...text].map((ch, i) => <span key={i} className="roll-ch" data-ch={ch} style={{ '--c': i }}>{ch}</span>)}
    </span>
);

export default function Nav() {
    const pathname = usePathname() || '/';
    const onProjectsPage = pathname.startsWith('/projects');

    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('home');

    useScrollFrame(({ y }) => {
        setScrolled(y > 40);                       // React skips the re-render when the value is unchanged
        if (!onProjectsPage) setActive(currentSection(SECTION_IDS, y) || 'home');
    });

    // Close the menu when the page changes, and when the window grows past the mobile layout.
    useEffect(() => { setOpen(false); }, [pathname]);
    useEffect(() => {
        const wide = window.matchMedia('(min-width: 901px)');
        const onChange = () => { if (wide.matches) setOpen(false); };
        wide.addEventListener('change', onChange);
        return () => wide.removeEventListener('change', onChange);
    }, []);

    // While the menu is open, the page behind it doesn't scroll.
    useEffect(() => {
        document.documentElement.classList.toggle('menu-open', open);
        return () => document.documentElement.classList.remove('menu-open');
    }, [open]);

    // Escape closes the menu; while it's open, Tab cycles through the menu and the close button only.
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') { setOpen(false); return; }
            if (e.key !== 'Tab' || !open || !menuRef.current) return;
            const items = [toggleRef.current, ...menuRef.current.querySelectorAll('a[href]')].filter(Boolean);
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

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

                {/* Wide screens: the links sit in the bar. Phones: a full-screen menu that opens in a
                    circle from the menu button, links rising in one after another (see globals.css). */}
                <div className={`nav-menu${open ? ' active' : ''}`} id="navMenu" ref={menuRef}>
                    <ul className="nav-links">
                        {SECTIONS.map(({ id, label }, i) => (
                            <li key={id} style={{ '--i': i }}>
                                <Link
                                    href={`/#${id}`}
                                    className={`nav-link${id === 'resume' ? ' nav-resume' : ''}${id === activeId ? ' active' : ''}`}
                                    onClick={() => setOpen(false)}
                                    aria-label={label}
                                >
                                    <Roll text={label} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="nav-menu-foot">
                        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                        <span>San Fernando, Pampanga</span>
                        <span className="nav-menu-social">
                            <a href="https://github.com/JonasBondoc26" target="_blank" rel="noopener">GitHub</a>
                            <a href="https://linkedin.com/in/jonasbondoc" target="_blank" rel="noopener">LinkedIn</a>
                        </span>
                    </div>
                </div>

                <ThemeToggle />

                <button
                    ref={toggleRef}
                    className={`nav-toggle${open ? ' active' : ''}`}
                    id="navToggle"
                    type="button"
                    aria-label={open ? 'Close menu' : 'Open menu'}
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
