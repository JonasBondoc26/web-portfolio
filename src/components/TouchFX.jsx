'use client';

import { useEffect } from 'react';
import { whileMedia } from '../lib/scroll';

const TAPPABLE = 'a, button, label, summary, .tech-item, .project-card, .hero-car';
const SPARKS = 9;

/* Touch screens only, where none of the pointer effects in PointerFX exist: tapping
   something sends a little burst of sparks off the finger, like a floor scraping the
   track, with a tiny haptic tick on phones that support it. */
export default function TouchFX() {
    // Switches on and off as the device (or DevTools device mode) changes.
    useEffect(() => whileMedia('(hover: none) and (prefers-reduced-motion: no-preference)', () => {
        const onDown = (e) => {
            if (e.pointerType !== 'touch') return;
            const t = e.target instanceof Element ? e.target.closest(TAPPABLE) : null;
            if (!t) return;
            const burst = document.createElement('div');
            burst.className = 'spark-burst';
            burst.setAttribute('aria-hidden', 'true');
            burst.style.left = `${e.clientX}px`;
            burst.style.top = `${e.clientY}px`;
            for (let i = 0; i < SPARKS; i++) {
                const spark = document.createElement('i');
                // Spread mostly upward and backward, as sparks fly off a moving car.
                spark.style.setProperty('--a', `${-160 + Math.random() * 140}deg`);
                spark.style.setProperty('--d', `${26 + Math.random() * 34}px`);
                spark.style.animationDelay = `${Math.random() * 60}ms`;
                burst.appendChild(spark);
            }
            document.body.appendChild(burst);
            setTimeout(() => burst.remove(), 700);
            navigator.vibrate?.(8);
        };

        document.addEventListener('pointerdown', onDown, { passive: true });
        return () => document.removeEventListener('pointerdown', onDown);
    }), []);

    return null;
}
