'use client';

import { useEffect, useRef } from 'react';
import Car from './Car';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';

const MIN_MS = 1300;     // always on screen at least this long, so it doesn't just flicker
const MAX_MS = 5000;     // never hold the page longer than this, even on a slow connection
const EXIT_MS = 900;     // matches the exit animation in globals.css

const STATUS = ['Warming up tyres', 'Checking telemetry', 'Fuelling up', 'Rolling to the grid', 'Lights out soon'];

/* The loading screen on a full page load. layout.jsx's boot script adds "is-loading" to <html>
   before paint, which is what shows it, so it is never seen on in-site navigation.
   Progress follows the page's real loading (window load + fonts), eased so it never jumps
   backwards, and the screen leaves once both are done. Then it fires "loader:done",
   which is the start lights' cue. */
export default function Loader() {
    const countRef = useRef(null);
    const carRef = useRef(null);
    const fillRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        const root = document.documentElement;
        const finish = () => {
            root.classList.remove('is-loading', 'is-leaving');
            window.__loaderDone = true;
            window.dispatchEvent(new Event('loader:done'));
        };
        if (!root.classList.contains('is-loading')) { finish(); return undefined; }

        const t0 = performance.now();
        let ready = false;
        let shown = 0;
        let raf = 0;
        let exitTimer = 0;

        const pageLoaded = document.readyState === 'complete'
            ? Promise.resolve()
            : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));
        const fontsLoaded = document.fonts?.ready ?? Promise.resolve();
        Promise.all([pageLoaded, fontsLoaded]).then(() => { ready = true; });

        const tick = (now) => {
            const elapsed = now - t0;
            // Until the page is ready, creep toward 90%. Once ready (and the minimum time is up), run to 100.
            const done = (ready && elapsed > MIN_MS) || elapsed > MAX_MS;
            const target = done ? 100 : Math.min(90, (elapsed / MIN_MS) * 75 + (ready ? 15 : 0));
            shown += (target - shown) * (done ? 0.18 : 0.06);
            if (done && shown > 99.5) shown = 100;

            const pct = Math.round(shown);
            countRef.current.textContent = String(pct).padStart(3, '0');
            carRef.current.style.left = `${shown}%`;
            fillRef.current.style.transform = `scaleX(${shown / 100})`;
            statusRef.current.textContent = STATUS[Math.min(STATUS.length - 1, Math.floor(shown / (100 / STATUS.length)))];

            if (shown < 100) { raf = requestAnimationFrame(tick); return; }
            root.classList.add('is-leaving');
            exitTimer = setTimeout(finish, EXIT_MS);
        };
        raf = requestAnimationFrame(tick);

        return () => { cancelAnimationFrame(raf); clearTimeout(exitTimer); };
    }, []);

    return (
        <div className="loader" aria-hidden="true">
            <div className="loader-stripes"><i /><i /><i /></div>
            <div className="loader-panel">
                <div className="loader-logo">
                    <img src={logoDark.src} alt="" className="logo-img logo-dark" />
                    <img src={logoLight.src} alt="" className="logo-img logo-light" />
                </div>

                <p className="loader-count"><b ref={countRef}>000</b><span>%</span></p>

                <div className="loader-track">
                    <div className="loader-rail"><div className="loader-fill" ref={fillRef} /></div>
                    <div className="loader-car" ref={carRef}><Car /></div>
                    <div className="loader-flag" />
                </div>

                <p className="loader-status"><span ref={statusRef}>{STATUS[0]}</span><i>…</i></p>
            </div>
        </div>
    );
}
