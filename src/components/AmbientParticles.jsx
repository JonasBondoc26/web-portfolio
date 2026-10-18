'use client';

import { useEffect, useRef } from 'react';

// A field of tiny shards drifting behind the page. Near the pointer they're pulled into a
// slow vortex and glow as they speed up. Adapted from an "ASMR static" background:
// themed to the site, sized to the screen, paused when the tab is hidden, and a single
// still frame when motion is reduced. Sits fixed behind the content (see .particles).

const RADIUS = 260;          // px, reach of the pointer's pull
const PULL = 0.12;
const SWIRL = 0.7;
const TRAIL = 0.2;           // how quickly old frames fade (lower = longer trails)

// [shard colour A (70%), shard colour B (30%), glow] per theme, as "r, g, b".
const THEMES = {
    dark: { a: '92, 98, 112', b: '236, 240, 248', glow: '246, 177, 122', bg: '16, 18, 24', fade: 1 },
    light: { a: '120, 126, 140', b: '74, 55, 180', glow: '90, 69, 201', bg: '238, 240, 244', fade: 0.6 },   // fainter: dark shards on a light page read louder
};

export default function AmbientParticles() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return undefined;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = 0;
        let h = 0;
        let dpr = 1;
        let raf = 0;
        let theme = THEMES.dark;
        const mouse = { x: -1e4, y: -1e4 };
        let ps = [];   // particles

        const readTheme = () => {
            theme = document.documentElement.getAttribute('data-theme') === 'light' ? THEMES.light : THEMES.dark;
        };

        const spawn = () => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 1.4 + 0.5,
            alpha: Math.random() * 0.3 + 0.08,
            glass: Math.random() > 0.7,
            rot: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.05,
            glow: 0,
        });

        const init = () => {
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            // About one shard per 2,200 px² of screen: ~600 on a laptop, ~170 on a phone.
            const count = Math.min(900, Math.round((w * h) / 2200));
            ps = Array.from({ length: count }, spawn);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = `rgb(${theme.bg})`;
            ctx.fillRect(0, 0, w, h);
        };

        const drawShard = (p) => {
            const c = Math.cos(p.rot) * dpr;
            const s = Math.sin(p.rot) * dpr;
            ctx.setTransform(c, s, -s, c, p.x * dpr, p.y * dpr);
            ctx.fillStyle = `rgba(${p.glass ? theme.b : theme.a}, ${Math.min(p.alpha * theme.fade + p.glow, 0.85)})`;
            if (p.glow > 0.3) {
                ctx.shadowBlur = 8 * p.glow;
                ctx.shadowColor = `rgba(${theme.glow}, ${p.glow})`;
            }
            ctx.beginPath();
            ctx.moveTo(0, -p.size * 2.5);
            ctx.lineTo(p.size, 0);
            ctx.lineTo(0, p.size * 2.5);
            ctx.lineTo(-p.size, 0);
            ctx.closePath();
            ctx.fill();
            if (p.glow > 0.3) ctx.shadowBlur = 0;
        };

        const frame = () => {
            // Fade the last frame toward the page colour: a short motion trail.
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = `rgba(${theme.bg}, ${TRAIL})`;
            ctx.fillRect(0, 0, w, h);

            for (const p of ps) {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist < RADIUS) {
                    const f = (RADIUS - dist) / RADIUS;
                    p.vx += (dx / dist) * f * PULL + (dy / dist) * f * SWIRL;
                    p.vy += (dy / dist) * f * PULL - (dx / dist) * f * SWIRL;
                    p.glow = f * 0.7;
                } else {
                    p.glow *= 0.92;
                }
                p.x += p.vx;
                p.y += p.vy;
                p.vx = p.vx * 0.95 + (Math.random() - 0.5) * 0.04;
                p.vy = p.vy * 0.95 + (Math.random() - 0.5) * 0.04;
                p.rot += p.spin + (Math.abs(p.vx) + Math.abs(p.vy)) * 0.05;
                if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
                if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;
                drawShard(p);
            }
            raf = requestAnimationFrame(frame);
        };

        const start = () => { if (!raf && !reduced && !document.hidden) raf = requestAnimationFrame(frame); };
        const stop = () => { cancelAnimationFrame(raf); raf = 0; };
        const still = () => {   // reduced motion: one quiet frame, no drift
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.fillStyle = `rgb(${theme.bg})`;
            ctx.fillRect(0, 0, w, h);
            ps.forEach(drawShard);
        };

        const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const onLeave = () => { mouse.x = -1e4; mouse.y = -1e4; };
        const onResize = () => { init(); if (reduced) still(); };
        const onTheme = () => { readTheme(); onResize(); };
        const onVisibility = () => (document.hidden ? stop() : start());

        readTheme();
        init();
        if (reduced) still(); else start();

        window.addEventListener('pointermove', onMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        window.addEventListener('resize', onResize);
        window.addEventListener('themechange', onTheme);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            stop();
            window.removeEventListener('pointermove', onMove);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('themechange', onTheme);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
