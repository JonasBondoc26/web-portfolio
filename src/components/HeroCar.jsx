'use client';

import { useEffect, useRef, useState } from 'react';
import Car from './Car';
import { clamp, prefersReducedMotion, spinWheels, useScrollFrame } from '../lib/scroll';

const LIGHTS = 5;
/* The strip of track under the name. On each full load of the home page, once the
   loading screen has gone, five start lights count in, go out, and the car drives in
   from off-screen to its spot on the grid, braking to a stop. After that, scrolling
   drives it off the right-hand side.

   The script in layout.jsx adds "lights-pending" to <html> before paint when the start
   sequence should run; that class parks the car off-screen so there is no flash. */
const DRIVE_MS = 1700;

export default function HeroCar() {
    const innerRef = useRef(null);
    const launchRef = useRef(null);
    const carRef = useRef(null);
    const cache = useRef({ heroH: 0, runway: 0 });

    const [lit, setLit] = useState(0);
    const [braking, setBraking] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        if (!root.classList.contains('lights-pending')) return undefined;

        const timers = [];
        let raf = 0;

        // Drive in: decelerating from off-screen, wheels turning with the distance covered.
        const driveIn = () => {
            const launch = launchRef.current;
            const car = carRef.current;
            // Measure from the track, not the car: the car is still parked at -110vw here,
            // which would put the start point on the wrong (right) side of the screen.
            const from = -(innerRef.current.getBoundingClientRect().left + car.offsetWidth + 80);
            launch.style.transform = `translate3d(${from}px,0,0)`;
            root.classList.remove('lights-pending');
            const t0 = performance.now();
            const step = (now) => {
                const p = Math.min((now - t0) / DRIVE_MS, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                const x = from * (1 - eased);
                launch.style.transform = `translate3d(${x}px,0,0)`;
                spinWheels(car, x - from);
                car.style.setProperty('--trail', (1 - p) * 1.4);    // slipstream fades as it slows
                if (p < 1) { raf = requestAnimationFrame(step); return; }
                launch.style.transform = '';
                car.style.setProperty('--trail', 0);
                setBraking(true);
                timers.push(setTimeout(() => setBraking(false), 900));
            };
            raf = requestAnimationFrame(step);
        };

        const runLights = () => {
            for (let i = 1; i <= LIGHTS; i++) timers.push(setTimeout(() => setLit(i), 200 + (i - 1) * 260));
            timers.push(setTimeout(() => { setLit(0); driveIn(); }, 200 + LIGHTS * 260 + 400));   // lights out: go
        };

        // Wait for the loading screen to leave first.
        if (window.__loaderDone) runLights();
        else window.addEventListener('loader:done', runLights, { once: true });

        return () => {
            window.removeEventListener('loader:done', runLights);
            timers.forEach(clearTimeout);
            cancelAnimationFrame(raf);
        };
    }, []);

    useScrollFrame(({ y, measure }) => {
        const car = carRef.current;
        const inner = innerRef.current;
        if (!car || !inner || prefersReducedMotion()) return;
        const c = cache.current;
        if (measure || !c.heroH) {
            c.heroH = inner.closest('.hero').offsetHeight;
            c.runway = window.innerWidth - inner.getBoundingClientRect().left + 40;
        }
        const p = clamp(y / (c.heroH * 0.7 || 1), 0, 1);
        const x = Math.pow(p, 1.7) * c.runway;                // slow off the line, then it goes
        car.style.transform = `translate3d(${x}px,0,0)`;
        car.style.setProperty('--trail', clamp(p * 4, 0, 1));
        spinWheels(car, x);
    });

    return (
        <div className="hero-track" aria-hidden="true">
            <div className="hero-track-inner" ref={innerRef}>
                <div className="lights">
                    {Array.from({ length: LIGHTS }, (_, i) => <i key={i} className={i < lit ? 'on' : undefined} />)}
                </div>
                <div className={`hero-car-launch${braking ? ' is-braking' : ''}`} ref={launchRef}>
                    <div className="hero-car" ref={carRef}><Car /></div>
                </div>
            </div>
        </div>
    );
}
