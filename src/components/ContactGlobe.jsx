'use client';

import { useEffect, useRef } from 'react';
import { geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import land110m from 'world-atlas/land-110m.json';

// A wireframe globe for the Contact section, after 21st.dev's "Contact with Globe"
// (scrollxui), rebuilt for this site. It sways gently around the Philippines with a
// pulsing marker on San Fernando, Pampanga, so "where I am" always faces the visitor.
// Drag to spin it; let go and it eases back home. Still when motion is reduced.

const HOME = [120.69, 15.03];          // City of San Fernando, Pampanga (lon, lat)
const VIEW_LAT = HOME[1] + 8;          // centre a little north of home, so it sits below the middle
const SWAY = 32;                       // degrees either side of home
const land = feature(land110m, land110m.objects.land);
const graticule = geoGraticule10();

export default function ContactGlobe({ label = 'San Fernando' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!ctx) return undefined;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const projection = geoOrthographic().clipAngle(90).precision(0.6);
        const path = geoPath(projection, ctx);
        let size = 0;
        let dpr = 1;
        let raf = 0;
        let visible = true;
        let colors = {};
        let offset = 0;             // drag offset from the sway, in degrees
        let drag = null;            // { x, offset }
        const t0 = performance.now();

        const readColors = () => {
            const cs = getComputedStyle(document.documentElement);
            const v = (name) => cs.getPropertyValue(name).trim();
            colors = { line: v('--line'), muted: v('--muted'), accent: v('--accent'), text: v('--text'), card: v('--card') };
        };

        const resize = () => {
            size = canvas.clientWidth;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(size * dpr);
            canvas.height = Math.round(size * dpr);
            projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
        };

        const draw = (now) => {
            const sway = reduced ? 0 : Math.sin((now - t0) / 2600) * SWAY;
            projection.rotate([-HOME[0] + sway + offset, -VIEW_LAT, 0]);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, size, size);

            // Sphere, grid, then land on top.
            ctx.beginPath(); path({ type: 'Sphere' });
            ctx.fillStyle = colors.card; ctx.fill();
            ctx.lineWidth = 1; ctx.strokeStyle = colors.line; ctx.stroke();
            ctx.beginPath(); path(graticule);
            ctx.globalAlpha = 0.55; ctx.strokeStyle = colors.line; ctx.stroke(); ctx.globalAlpha = 1;
            ctx.beginPath(); path(land);
            ctx.lineWidth = 0.9; ctx.strokeStyle = colors.muted; ctx.stroke();

            // Home marker, only while it's on the near side of the globe.
            const r = projection.rotate();
            if (geoDistance(HOME, [-r[0], -r[1]]) < Math.PI / 2 - 0.05) {
                const [x, y] = projection(HOME);
                const pulse = reduced ? 0.5 : ((now - t0) % 1800) / 1800;
                ctx.beginPath(); ctx.arc(x, y, 4 + pulse * 16, 0, Math.PI * 2);
                ctx.globalAlpha = 1 - pulse; ctx.strokeStyle = colors.accent; ctx.lineWidth = 1.5; ctx.stroke(); ctx.globalAlpha = 1;
                ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = colors.accent; ctx.fill();
                ctx.font = `600 12px ${getComputedStyle(canvas).fontFamily}`;
                ctx.fillStyle = colors.text;
                // Label on whichever side of the marker has room, so it never runs off the globe.
                const left = x > size / 2;
                ctx.textAlign = left ? 'right' : 'left';
                ctx.fillText(label.toUpperCase(), x + (left ? -10 : 10), y - 8);
                ctx.textAlign = 'left';
            }
        };

        const loop = (now) => {
            raf = 0;
            if (!drag && Math.abs(offset) > 0.05) offset *= 0.94;   // ease back home after a drag
            draw(now);
            if (visible && !reduced && !document.hidden) raf = requestAnimationFrame(loop);
        };
        const start = () => { if (!raf) raf = requestAnimationFrame(loop); };

        const onDown = (e) => { drag = { x: e.clientX, offset }; canvas.setPointerCapture(e.pointerId); start(); };
        const onMove = (e) => {
            if (!drag) return;
            offset = drag.offset + (e.clientX - drag.x) * 0.4;
            if (reduced) draw(performance.now());
        };
        const onUp = () => { drag = null; start(); };
        const onTheme = () => { readColors(); draw(performance.now()); };
        const onVisibility = () => { if (!document.hidden) start(); };

        readColors();
        resize();
        draw(t0);
        start();

        const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
        ro.observe(canvas);
        const io = new IntersectionObserver(([entry]) => { visible = entry ? entry.isIntersecting : true; if (visible) start(); });
        io.observe(canvas);
        canvas.addEventListener('pointerdown', onDown);
        canvas.addEventListener('pointermove', onMove);
        canvas.addEventListener('pointerup', onUp);
        canvas.addEventListener('pointercancel', onUp);
        window.addEventListener('themechange', onTheme);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            canvas.removeEventListener('pointerdown', onDown);
            canvas.removeEventListener('pointermove', onMove);
            canvas.removeEventListener('pointerup', onUp);
            canvas.removeEventListener('pointercancel', onUp);
            window.removeEventListener('themechange', onTheme);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [label]);

    return (
        <canvas
            ref={canvasRef}
            className="contact-globe"
            role="img"
            aria-label="Globe showing San Fernando, Pampanga, in the Philippines"
        />
    );
}
