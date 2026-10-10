'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/scroll';
import logoDark from '../assets/logo-dark.png';
import logoLight from '../assets/logo-light.png';
import Car from './Car';

const INTERACTIVE = 'a, button, [data-cursor], label, summary';
const MAGNETIC = '.btn, [data-magnetic]';
// What the lens can look at: the element under the pointer, and the part of it to line up with.
const LENSES = [
    { kind: 'logo', hover: '.nav-logo', target: 'a' },
    { kind: 'car', hover: '.hero-car', target: '.car' },
];

/* One pointer listener for the whole site (mouse only, and off when motion is reduced):
   - data-tilt elements lean toward the pointer and get --mx / --my for a spotlight
   - buttons (.btn, data-magnetic) pull a little toward the pointer
   - a ring trails the pointer, grows over anything clickable, and shows data-cursor text
   - over the nav logo or the hero car the ring becomes a lens that shows it in the other theme */
export default function PointerFX() {
    const ringRef = useRef(null);
    const labelRef = useRef(null);
    const lensRef = useRef(null);
    const pathname = usePathname();

    // A new page appears under a mouse that hasn't moved, so drop the old hover state.
    useEffect(() => {
        ringRef.current?.classList.remove('is-hover', 'has-label', 'is-text', 'is-down', 'is-lens', 'lens-logo', 'lens-car');
        if (labelRef.current) labelRef.current.textContent = '';
    }, [pathname]);

    useEffect(() => {
        if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
        const ring = ringRef.current;
        const label = labelRef.current;
        const lens = lensRef.current;
        document.documentElement.classList.add('has-cursor');

        let tiltEl = null;
        let magnetEl = null;
        let lensEl = null;
        let lensKind = '';
        let last = null;
        let raf = 0;
        const pos = { x: -100, y: -100 };
        const target = { x: -100, y: -100 };

        const resetTilt = (el) => {
            el.classList.remove('is-tilting');
            el.style.setProperty('--rx', '0deg');
            el.style.setProperty('--ry', '0deg');
        };
        const resetMagnet = (el) => {
            el.style.setProperty('--tx', '0px');
            el.style.setProperty('--ty', '0px');
        };

        const frame = () => {
            raf = 0;
            if (last) {
                if (tiltEl) {
                    const r = tiltEl.getBoundingClientRect();
                    const x = (last.clientX - r.left) / r.width;
                    const y = (last.clientY - r.top) / r.height;
                    const max = Number(tiltEl.dataset.tilt) || 6;
                    tiltEl.style.setProperty('--mx', `${x * 100}%`);
                    tiltEl.style.setProperty('--my', `${y * 100}%`);
                    tiltEl.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
                    tiltEl.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
                }
                if (magnetEl) {
                    const r = magnetEl.getBoundingClientRect();
                    const dx = last.clientX - (r.left + r.width / 2);
                    const dy = last.clientY - (r.top + r.height / 2);
                    magnetEl.style.setProperty('--tx', `${Math.max(-10, Math.min(10, dx * 0.2))}px`);
                    magnetEl.style.setProperty('--ty', `${Math.max(-8, Math.min(8, dy * 0.3))}px`);
                }
            }
            // The ring eases toward the pointer; keep going until it has caught up.
            pos.x += (target.x - pos.x) * 0.22;
            pos.y += (target.y - pos.y) * 0.22;
            ring.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
            // Line the lens's copy up with the real thing under it.
            if (lensEl) {
                const r = lensEl.getBoundingClientRect();
                const radius = lens.offsetWidth / 2;
                lens.style.setProperty('--lx', `${r.left - pos.x + radius}px`);
                lens.style.setProperty('--ly', `${r.top - pos.y + radius}px`);
                lens.style.setProperty('--lw', `${r.width}px`);
                lens.style.setProperty('--lh', `${r.height}px`);
                if (lensKind === 'car') {
                    // Turn the copy's wheels with the real ones (HeroCar.jsx spins them on scroll).
                    const real = lensEl.querySelectorAll('.car-wheel');
                    lens.querySelectorAll('.car-wheel').forEach((w, i) => { w.style.transform = real[i]?.style.transform || ''; });
                }
            }
            if (Math.abs(target.x - pos.x) > 0.3 || Math.abs(target.y - pos.y) > 0.3) raf = requestAnimationFrame(frame);
        };
        const wake = () => { if (!raf) raf = requestAnimationFrame(frame); };

        const onMove = (e) => {
            last = e;
            target.x = e.clientX;
            target.y = e.clientY;
            const t = e.target instanceof Element ? e.target : null;

            const tilt = t?.closest('[data-tilt]') || null;
            if (tilt !== tiltEl) {
                if (tiltEl) resetTilt(tiltEl);
                tiltEl = tilt;
                tiltEl?.classList.add('is-tilting');
            }

            const magnet = t?.closest(MAGNETIC) || null;
            if (magnet !== magnetEl) {
                if (magnetEl) resetMagnet(magnetEl);
                magnetEl = magnet;
            }

            const found = LENSES.find((l) => t?.closest(l.hover));
            lensEl = found ? t.closest(found.hover).querySelector(found.target) : null;
            lensKind = lensEl ? found.kind : '';
            ring.classList.toggle('is-lens', !!lensEl);
            ring.classList.toggle('lens-logo', lensKind === 'logo');
            ring.classList.toggle('lens-car', lensKind === 'car');

            const hit = t?.closest(INTERACTIVE);
            const text = hit?.closest('[data-cursor]')?.dataset.cursor || '';
            ring.classList.toggle('is-hover', !!hit);
            ring.classList.toggle('has-label', !!text);
            ring.classList.toggle('is-text', !!t?.closest('input, textarea, [contenteditable]'));
            if (label.textContent !== text) label.textContent = text;
            ring.classList.add('is-on');
            wake();
        };

        const onLeave = () => {
            if (tiltEl) resetTilt(tiltEl);
            if (magnetEl) resetMagnet(magnetEl);
            tiltEl = magnetEl = lensEl = null;
            ring.classList.remove('is-on', 'is-lens', 'lens-logo', 'lens-car');
        };
        const onDown = () => ring.classList.add('is-down');
        const onUp = () => ring.classList.remove('is-down');

        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerdown', onDown);
        document.addEventListener('pointerup', onUp);
        document.documentElement.addEventListener('pointerleave', onLeave);
        return () => {
            document.removeEventListener('pointermove', onMove);
            document.removeEventListener('pointerdown', onDown);
            document.removeEventListener('pointerup', onUp);
            document.documentElement.removeEventListener('pointerleave', onLeave);
            document.documentElement.classList.remove('has-cursor');
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="cursor-ring" ref={ringRef} aria-hidden="true">
            <span className="cursor-label" ref={labelRef} />
            <span className="cursor-lens" ref={lensRef}>
                <span className="cursor-lens-inner">
                    <img src={logoDark.src} alt="" className="lens-logo-dark" />
                    <img src={logoLight.src} alt="" className="lens-logo-light" />
                    <span className="lens-car-copy"><Car /></span>
                </span>
            </span>
        </div>
    );
}
