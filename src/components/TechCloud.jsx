'use client';

import { useEffect, useRef } from 'react';

// The tech stack as a cloud of logos on a slowly turning sphere, after Magic UI's
// Interactive Icon Cloud, rebuilt without react-icon-cloud (no new packages, no CDN fetch;
// it uses the logos already listed in data/tech.js). The sphere drifts on its own and
// steers toward the pointer; hovering a logo names it. The readable, grouped list sits
// beside it in About.jsx, so the cloud itself is decorative to screen readers.

const ICON = 40;   // px, logo size at the front of the sphere

export default function TechCloud({ items }) {
    const wrapRef = useRef(null);
    const captionRef = useRef(null);
    const iconRefs = useRef([]);

    useEffect(() => {
        const wrap = wrapRef.current;
        if (!wrap) return undefined;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const n = items.length;

        // Even spread over a sphere (Fibonacci lattice).
        const base = items.map((_, i) => {
            const y = 1 - (2 * (i + 0.5)) / n;
            const r = Math.sqrt(1 - y * y);
            const phi = i * Math.PI * (3 - Math.sqrt(5));
            return [Math.cos(phi) * r, y, Math.sin(phi) * r];
        });

        let size = 0;
        let ax = 0.35;              // current rotation about x / y, radians
        let ay = 0;
        let vx = 0.0012;            // angular speed
        let vy = 0.0028;
        let target = [0.0012, 0.0028];
        let raf = 0;
        let visible = true;

        const place = () => {
            const R = size * 0.38;
            const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
            base.forEach(([x, y, z], i) => {
                // rotate about y, then about x
                const x1 = x * cy + z * sy;
                const z1 = -x * sy + z * cy;
                const y2 = y * cx - z1 * sx;
                const z2 = y * sx + z1 * cx;
                const depth = (z2 + 1) / 2;                  // 0 back .. 1 front
                const el = iconRefs.current[i];
                if (!el) return;
                el.style.transform = `translate(${x1 * R}px, ${y2 * R}px) scale(${0.5 + depth * 0.55})`;
                el.style.opacity = String(0.18 + depth * 0.82);
                el.style.zIndex = String(Math.round(depth * 100));
            });
        };

        const loop = () => {
            raf = 0;
            vx += (target[0] - vx) * 0.05;
            vy += (target[1] - vy) * 0.05;
            ax += vx;
            ay += vy;
            place();
            if (visible && !document.hidden) raf = requestAnimationFrame(loop);
        };
        const start = () => { if (!raf && !reduced) raf = requestAnimationFrame(loop); };

        // Steer toward the pointer: the further from centre, the faster it turns that way.
        const onMove = (e) => {
            const b = wrap.getBoundingClientRect();
            const dx = (e.clientX - b.left) / b.width - 0.5;
            const dy = (e.clientY - b.top) / b.height - 0.5;
            target = [-dy * 0.03, dx * 0.03];
        };
        const onLeave = () => { target = [0.0012, 0.0028]; if (captionRef.current) captionRef.current.textContent = ''; };
        const onOver = (e) => {
            const name = e.target.closest?.('[data-name]')?.dataset.name;
            if (name && captionRef.current) captionRef.current.textContent = name;
        };

        const ro = new ResizeObserver(() => { size = wrap.clientWidth; place(); });
        ro.observe(wrap);
        const io = new IntersectionObserver(([entry]) => { visible = entry ? entry.isIntersecting : true; start(); });
        io.observe(wrap);
        const onVisibility = () => start();
        wrap.addEventListener('pointermove', onMove);
        wrap.addEventListener('pointerleave', onLeave);
        wrap.addEventListener('pointerover', onOver);
        document.addEventListener('visibilitychange', onVisibility);
        size = wrap.clientWidth;
        place();
        start();
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            wrap.removeEventListener('pointermove', onMove);
            wrap.removeEventListener('pointerleave', onLeave);
            wrap.removeEventListener('pointerover', onOver);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [items]);

    return (
        <div className="tech-cloud-wrap" aria-hidden="true">
            <div className="tech-cloud" ref={wrapRef}>
                {items.map(({ name, icon, mono }, i) => (
                    <span key={name} className="tech-cloud-icon" data-name={name} ref={(el) => { iconRefs.current[i] = el; }}>
                        <img src={icon} alt="" width={ICON} height={ICON} loading="lazy" className={mono ? 'is-mono' : undefined} draggable={false} />
                    </span>
                ))}
            </div>
            <p className="tech-cloud-caption" ref={captionRef} />
        </div>
    );
}
