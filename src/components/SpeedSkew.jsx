'use client';

import { useRef } from 'react';
import { clamp, prefersReducedMotion, useScrollFrame } from '../lib/scroll';

/* Grids marked data-speed-skew lean a little with scroll speed, as if pulled by the G-force,
   and settle back when you stop. Set directly on each element, so nothing else re-styles. */
export default function SpeedSkew() {
    const els = useRef([]);
    const last = useRef(0);

    useScrollFrame(({ velocity, measure }) => {
        if (prefersReducedMotion()) return;
        // Re-find the grids after a resize, a page change, or the projects filter swapping its grid.
        if (measure || !els.current.length || !els.current.every((el) => el.isConnected)) {
            els.current = Array.from(document.querySelectorAll('[data-speed-skew]'));
        }
        const skew = clamp(velocity / 2500, -1, 1) * 1.6;      // degrees, at most about 1.6
        if (Math.abs(skew - last.current) < 0.02) return;
        last.current = skew;
        els.current.forEach((el) => {
            el.style.transform = Math.abs(skew) < 0.03 ? '' : `skewY(${skew.toFixed(2)}deg)`;
        });
    });

    return null;
}
