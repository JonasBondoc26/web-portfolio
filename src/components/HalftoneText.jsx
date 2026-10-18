'use client';

import { useEffect, useRef } from 'react';

// A line of display type printed as halftone dots. The real text stays in the element
// (invisible, still selectable and read by screen readers) and sets the size; a canvas
// laid over it draws the same glyphs as dots. Each dot is sized by how much of the letter
// covers its cell. Move across it and the dots part around the pointer on springs, warming
// toward the livery colour; click and a shock ring runs through the word.
// The dot engine comes from 21st.dev's Halftone Wordmark Footer, adapted to sit on live text.

/** Hex -> [r, g, b], or null for anything that isn't #rgb / #rrggbb. */
function hex(value) {
    const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec((value || '').trim());
    if (!m) return null;
    const h = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/** Dot radius for a cell coverage in [0, 1]: area-true, so tone stays even. */
const dotRadius = (coverage, gap) => Math.sqrt(Math.min(1, Math.max(0, coverage))) * gap * 0.56;

/** One spring step back home, plus the push from a pointer at (px, py) within radius r. */
function step(x, y, vx, vy, hx, hy, px, py, r) {
    const dx = x - px;
    const dy = y - py;
    const d2 = dx * dx + dy * dy;
    if (r > 0 && d2 < r * r) {
        const d = Math.sqrt(d2) + 0.001;
        const f = (1 - d / r) * 2.6;
        vx += (dx / d) * f;
        vy += (dy / d) * f;
    }
    vx = (vx + (hx - x) * 0.05) * 0.84;
    vy = (vy + (hy - y) * 0.05) * 0.84;
    return [x + vx, y + vy, vx, vy];
}

export default function HalftoneText({ text, className = '', inkVar = '--text', warmVar = '--livery-1' }) {
    const hostRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!host || !ctx) return undefined;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let w = 0;
        let h = 0;
        let dpr = 1;
        let gap = 4;
        let px = -1e5;
        let py = -1e5;
        let raf = 0;
        let visible = true;
        let ring = { x: 0, y: 0, t: -1 };
        let dots = new Float32Array(0);   // x, y, vx, vy, hx, hy, r per dot
        let count = 0;
        let ink = [236, 238, 243];
        let warm = [246, 177, 122];
        let inkCss = '#eceef3';

        const layout = () => {
            const cs = getComputedStyle(host);
            const root = getComputedStyle(document.documentElement);
            inkCss = root.getPropertyValue(inkVar).trim() || inkCss;
            ink = hex(inkCss) || ink;
            warm = hex(root.getPropertyValue(warmVar)) || warm;

            const size = parseFloat(cs.fontSize);
            // The glyphs overhang the tight line box (italic lean, ascenders), so the canvas
            // bleeds past the element on every side.
            const bx = Math.round(size * 0.2);
            const by = Math.round(size * 0.35);
            const boxW = host.offsetWidth;
            const boxH = host.offsetHeight;
            w = boxW + bx * 2;
            h = boxH + by * 2;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(w * dpr);
            canvas.height = Math.round(h * dpr);
            Object.assign(canvas.style, { left: `${-bx}px`, top: `${-by}px`, width: `${w}px`, height: `${h}px` });
            gap = Math.max(3, Math.round(size / 34));

            // Set the word exactly where the browser sets the (invisible) real text.
            const mask = document.createElement('canvas');
            mask.width = w;
            mask.height = h;
            const m = mask.getContext('2d', { willReadFrequently: true });
            m.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
            if ('letterSpacing' in m) m.letterSpacing = cs.letterSpacing;
            // Canvas ignores CSS text-transform, so apply it here (the hero title is uppercase).
            const tt = cs.textTransform;
            const word = tt === 'uppercase' ? text.toUpperCase() : tt === 'lowercase' ? text.toLowerCase() : text;
            const metrics = m.measureText(word);
            const ascent = metrics.fontBoundingBoxAscent ?? size * 0.8;
            const descent = metrics.fontBoundingBoxDescent ?? size * 0.2;
            const lineH = parseFloat(cs.lineHeight) || boxH;
            const baseline = by + (lineH - (ascent + descent)) / 2 + ascent;   // CSS half-leading
            m.fillStyle = '#000';
            m.textBaseline = 'alphabetic';
            m.fillText(word, bx + parseFloat(cs.paddingLeft || 0), baseline);
            const img = m.getImageData(0, 0, w, h).data;

            const cols = Math.ceil(w / gap);
            const rows = Math.ceil(h / gap);
            const tmp = [];
            for (let gy = 0; gy < rows; gy++) {
                for (let gx = 0; gx < cols; gx++) {
                    let sum = 0;   // coverage: average alpha over a 3x3 sample of the cell
                    for (let sy = 0; sy < 3; sy++) {
                        for (let sx = 0; sx < 3; sx++) {
                            const x = Math.min(w - 1, Math.floor(gx * gap + ((sx + 0.5) * gap) / 3));
                            const y = Math.min(h - 1, Math.floor(gy * gap + ((sy + 0.5) * gap) / 3));
                            sum += img[(y * w + x) * 4 + 3];
                        }
                    }
                    const cov = sum / (9 * 255);
                    if (cov < 0.06) continue;
                    const hx = gx * gap + gap / 2;
                    const hy = gy * gap + gap / 2;
                    tmp.push(hx, hy, 0, 0, hx, hy, dotRadius(cov, gap));
                }
            }
            dots = new Float32Array(tmp);
            count = tmp.length / 7;
        };

        // Returns whether anything is still moving.
        const draw = (now) => {
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const r = reduced ? 0 : gap * 14;
            const ringAge = ring.t < 0 ? 1e9 : now - ring.t;
            const ringR = ringAge * 0.9;
            let moving = false;
            for (let i = 0; i < count; i++) {
                const j = i * 7;
                let x = dots[j];
                let y = dots[j + 1];
                let vx = dots[j + 2];
                let vy = dots[j + 3];
                const hx = dots[j + 4];
                const hy = dots[j + 5];
                if (!reduced) {
                    if (ringAge < 900) {
                        const dx = hx - ring.x;
                        const dy = hy - ring.y;
                        const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
                        const band = 1 - Math.min(1, Math.abs(d - ringR) / 26);
                        if (band > 0) {
                            const f = band * 3.2 * (1 - ringAge / 900);
                            vx += (dx / d) * f;
                            vy += (dy / d) * f;
                        }
                    }
                    [x, y, vx, vy] = step(x, y, vx, vy, hx, hy, px, py, r);
                    if (Math.abs(vx) + Math.abs(vy) > 0.02 || Math.abs(x - hx) + Math.abs(y - hy) > 0.05) moving = true;
                    else { x = hx; y = hy; vx = 0; vy = 0; }
                    dots[j] = x; dots[j + 1] = y; dots[j + 2] = vx; dots[j + 3] = vy;
                }
                const k = Math.min(1, Math.hypot(x - hx, y - hy) / 28);
                ctx.fillStyle = k > 0.02
                    ? `rgb(${Math.round(ink[0] + (warm[0] - ink[0]) * k)},${Math.round(ink[1] + (warm[1] - ink[1]) * k)},${Math.round(ink[2] + (warm[2] - ink[2]) * k)})`
                    : inkCss;
                ctx.beginPath();
                ctx.arc(x, y, dots[j + 6], 0, 6.2832);
                ctx.fill();
            }
            return moving || ringAge < 900 || px > -1e4;
        };

        const loop = (now) => {
            raf = 0;
            if (!visible) return;
            if (draw(now)) raf = requestAnimationFrame(loop);
        };
        const wake = () => { if (!raf && visible) raf = requestAnimationFrame(loop); };
        // Resizing the canvas clears it, so every re-layout paints a frame straight away.
        const relayout = () => { layout(); draw(performance.now()); wake(); };

        const local = (e) => {
            const b = canvas.getBoundingClientRect();
            return [e.clientX - b.left, e.clientY - b.top];
        };
        const onMove = (e) => { [px, py] = local(e); wake(); };
        const onLeave = () => { px = -1e5; py = -1e5; wake(); };
        const onDown = (e) => {
            if (reduced) return;
            const [x, y] = local(e);
            ring = { x, y, t: performance.now() };
            wake();
        };

        relayout();
        host.addEventListener('pointermove', onMove);
        host.addEventListener('pointerleave', onLeave);
        host.addEventListener('pointerdown', onDown);
        window.addEventListener('themechange', relayout);
        const ro = new ResizeObserver(relayout);   // the hero title resizes its own font
        ro.observe(host);
        const io = new IntersectionObserver(([entry]) => { visible = entry ? entry.isIntersecting : true; wake(); });
        io.observe(host);
        let alive = true;
        document.fonts?.ready.then(() => { if (alive) relayout(); });

        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
            host.removeEventListener('pointermove', onMove);
            host.removeEventListener('pointerleave', onLeave);
            host.removeEventListener('pointerdown', onDown);
            window.removeEventListener('themechange', relayout);
        };
    }, [text, inkVar, warmVar]);

    return (
        <span ref={hostRef} className={`halftone-text ${className}`.trim()}>
            {text}
            <canvas ref={canvasRef} aria-hidden="true" />
        </span>
    );
}
