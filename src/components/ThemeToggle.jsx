'use client';

/** Switches between dark and light. The choice is saved and applied before paint by the script in layout.jsx. */
export default function ThemeToggle() {
    const toggle = (event) => {
        const root = document.documentElement;
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        const apply = () => {
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* private mode */ }
            window.dispatchEvent(new Event('themechange'));
        };

        // Where supported, the new theme grows out of the button in a circle.
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!document.startViewTransition || still) { apply(); return; }
        const r = event.currentTarget.getBoundingClientRect();
        const x = r.left + r.width / 2;
        const y = r.top + r.height / 2;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        document.startViewTransition(apply).ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 650, easing: 'cubic-bezier(0.16, 0.84, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
            );
        });
    };

    return (
        <button className="theme-toggle" type="button" onClick={toggle} aria-label="Switch between dark and light mode">
            <svg className="moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
            <svg className="sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
        </button>
    );
}
