'use client';

import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/scroll';

/** A number that counts up from zero the first time it is seen. */
export default function Stat({ value, label }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(value);

    useEffect(() => {
        const el = ref.current;
        if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return undefined;
        let raf = 0;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            observer.disconnect();
            const start = performance.now();
            const tick = (now) => {
                const p = Math.min((now - start) / 1200, 1);
                setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
                if (p < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
        }, { threshold: 0.5 });
        observer.observe(el);
        return () => { observer.disconnect(); cancelAnimationFrame(raf); };
    }, [value]);

    return (
        <div className="stat-item" ref={ref}>
            <div className="stat-value">{shown}</div>
            <div className="stat-label">{label}</div>
        </div>
    );
}
