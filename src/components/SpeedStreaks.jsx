'use client';

import { useEffect, useRef } from 'react';
import { clamp, prefersReducedMotion, useScrollFrame } from '../lib/scroll';

/* Thin lines on a canvas behind the page. They only move while you
   scroll, and faster scrolling makes them longer and brighter. */
export default function SpeedStreaks() {
    const canvasRef = useRef(null);
    const sim = useRef({ lines: [], colour: '#fff', dirty: false });

    useEffect(() => {
        sim.current.lines = Array.from({ length: 34 }, () => ({
            x: Math.random(),
            y: Math.random(),
            len: 60 + Math.random() * 220,
            depth: 0.35 + Math.random() * 0.65,
        }));
        const readColour = () => {
            sim.current.colour = getComputedStyle(document.documentElement).getPropertyValue('--streak').trim() || '#fff';
        };
        readColour();
        window.addEventListener('themechange', readColour);
        return () => window.removeEventListener('themechange', readColour);
    }, []);

    useScrollFrame(({ velocity, dt, measure }) => {
        const canvas = canvasRef.current;
        if (!canvas || prefersReducedMotion()) return;
        if (measure && (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight)) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        const ctx = canvas.getContext('2d');
        const { lines, colour } = sim.current;
        const w = canvas.width;
        const h = canvas.height;

        const strength = clamp(Math.abs(velocity) / 2600, 0, 1);
        if (strength < 0.02) {
            if (sim.current.dirty) { ctx.clearRect(0, 0, w, h); sim.current.dirty = false; }
            return;
        }
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = colour;
        const travel = velocity * (dt / 1000) * 0.9;
        for (const line of lines) {
            line.x -= (travel * line.depth) / w;
            if (line.x < -0.3) { line.x = 1.05; line.y = Math.random(); }
            if (line.x > 1.05) { line.x = -0.3; line.y = Math.random(); }
            ctx.globalAlpha = strength * line.depth * 0.55;
            ctx.fillRect(line.x * w, line.y * h, line.len * (0.4 + strength), line.depth > 0.8 ? 2 : 1);
        }
        ctx.globalAlpha = 1;
        sim.current.dirty = true;
    });

    return <canvas ref={canvasRef} className="streaks" aria-hidden="true" />;
}
