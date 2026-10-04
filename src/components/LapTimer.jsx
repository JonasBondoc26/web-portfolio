'use client';

import { useEffect, useRef } from 'react';

const format = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(Math.floor(ms % 1000)).padStart(3, '0')}`;
};

/** "Your lap": how long you've been on the site, ticking only while the footer is on screen. */
export default function LapTimer() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const start = performance.now();
        let raf = 0;
        const tick = () => {
            el.textContent = format(performance.now() - start);
            raf = requestAnimationFrame(tick);
        };
        const observer = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(raf);
            if (entry.isIntersecting) raf = requestAnimationFrame(tick);
            else el.textContent = format(performance.now() - start);
        });
        observer.observe(el);
        return () => { observer.disconnect(); cancelAnimationFrame(raf); };
    }, []);

    return (
        <p className="lap-timer">
            <span>Your lap</span>
            <b ref={ref} suppressHydrationWarning>00:00.000</b>
        </p>
    );
}
