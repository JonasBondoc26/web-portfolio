'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { BASE } from '../lib/site';
import { prefersReducedMotion } from '../lib/scroll';
import shots from '../data/shots.json';

// A wheel of project names beside that project's screenshot, on the All projects page.
// Adapted from 21st.dev's Wheel Carousel (rebuilt without Tailwind, framer-motion or
// next-themes). Scroll or drag the wheel, use the arrow keys, or click a name to bring it
// round; click the selected name (or "Open project", or press Enter) to open it.
// Wide screens only (see globals.css): on phones the drag would fight page scrolling.
// The mouse wheel moves exactly one project per notch; trackpads step one per short swipe.

const DRUM = 170;          // px, radius of the drum the names are printed on
const SPACING = 22;        // degrees between names around the drum
const VISIBLE = 4;         // names drawn above and below the selected one (4 x 22 deg = the drum's edge)
const WHEEL_STEP = 50;      // px of scroll per project: one mouse-wheel notch (~100px) is one project
const DRAG_SPEED = 0.018;
const DRAG_START = 4;      // px of movement before a press becomes a drag (so clicks still work)

const wrap = (i, n) => ((i % n) + n) % n;
function shortestOffset(index, rotation, n) {
    let offset = index - rotation;
    while (offset > n / 2) offset -= n;
    while (offset < -n / 2) offset += n;
    return offset;
}

export default function ProjectWheel({ projects }) {
    const router = useRouter();
    const id = useId();
    const n = projects.length;
    const [rotation, setRotation] = useState(0);
    const [selected, setSelected] = useState(0);
    const stageRef = useRef(null);
    const rot = useRef(0);
    const sel = useRef(0);
    const velocity = useRef(0);
    const target = useRef(null);  // the rotation the wheel is easing toward, if any
    const frame = useRef(0);
    const drag = useRef(null);   // { y, rotation, last, active }

    const commit = useCallback((next) => {
        rot.current = next;
        setRotation(next);
        const i = wrap(Math.round(next), n);
        if (i !== sel.current) { sel.current = i; setSelected(i); }
    }, [n]);

    // Drag momentum, then ease to the target name (or the nearest one).
    const settle = useCallback(() => {
        if (frame.current) return;
        const still = prefersReducedMotion();
        const tick = () => {
            frame.current = 0;
            if (drag.current?.active) return;
            if (!still && target.current === null && Math.abs(velocity.current) > 0.0008) {
                commit(rot.current + velocity.current);
                velocity.current *= 0.9;
            } else {
                velocity.current = 0;
                const goal = target.current ?? Math.round(rot.current);
                const delta = goal - rot.current;
                if (Math.abs(delta) < 0.001 || still) { commit(goal); target.current = null; return; }
                commit(rot.current + delta * 0.22);
            }
            frame.current = requestAnimationFrame(tick);
        };
        frame.current = requestAnimationFrame(tick);
    }, [commit]);

    // Ease round to a project; rapid calls queue up from where the last one is heading.
    const goTo = useCallback((index) => {
        velocity.current = 0;
        const base = target.current ?? rot.current;
        target.current = base + shortestOffset(index, base, n);
        settle();
    }, [n, settle]);
    const stepBy = useCallback((dir) => {
        const from = wrap(Math.round(target.current ?? rot.current), n);
        goTo(wrap(from + dir, n));
    }, [goTo, n]);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    // The wheel turns with the mouse wheel while the pointer is over it.
    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return undefined;
        let acc = 0;
        let idle = 0;
        const onWheel = (e) => {
            if (e.ctrlKey || e.metaKey) return;      // leave pinch-zoom alone
            e.preventDefault();
            // Firefox can report lines or pages instead of pixels.
            acc += e.deltaY * (e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 800 : 1);
            clearTimeout(idle);
            idle = setTimeout(() => { acc = 0; }, 180);   // drop leftovers once scrolling stops
            // At most one project per wheel event: a mouse sends one event per notch, so one
            // notch is one project however hard it is flicked; trackpads step once per WHEEL_STEP.
            if (Math.abs(acc) >= WHEEL_STEP) {
                stepBy(Math.sign(acc));
                acc = 0;
            }
        };
        stage.addEventListener('wheel', onWheel, { passive: false });
        return () => { stage.removeEventListener('wheel', onWheel); clearTimeout(idle); };
    }, [stepBy]);
    const open = (index) => router.push(`/projects/${projects[index].slug}`);

    const onPointerDown = (e) => {
        if (!e.isPrimary || e.button !== 0) return;
        drag.current = { y: e.clientY, rotation: rot.current, last: rot.current, active: false, pointer: e.pointerId };
        velocity.current = 0;
        target.current = null;
    };
    const onPointerMove = (e) => {
        const d = drag.current;
        if (!d) return;
        const dist = e.clientY - d.y;
        if (!d.active) {
            if (Math.abs(dist) < DRAG_START) return;
            d.active = true;
            e.currentTarget.setPointerCapture(d.pointer);
        }
        const next = d.rotation - dist * DRAG_SPEED;
        velocity.current = next - d.last;
        d.last = next;
        commit(next);
    };
    const onPointerUp = (e) => {
        const d = drag.current;
        drag.current = null;
        if (!d?.active) return;                     // a click: the name's onClick handles it
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
        settle();
    };

    const onKeyDown = (e) => {
        const steps = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (e.key in steps) { e.preventDefault(); stepBy(steps[e.key]); }
        else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
        else if (e.key === 'End') { e.preventDefault(); goTo(n - 1); }
        else if (e.key === 'Enter') { e.preventDefault(); open(sel.current); }
    };

    const current = projects[selected];

    return (
        <div className="wheel">
            <div className="wheel-photo">
                <div className="wheel-frame">
                    {projects.map((p, i) => {
                        const cover = shots[p.slug]?.cover;
                        return (
                            <div key={p.slug} className={`wheel-slide${i === selected ? ' is-active' : ''}`} aria-hidden={i !== selected}>
                                {cover
                                    ? <img src={`${BASE}${cover.src}`} alt={`Screenshot of ${p.title}`} loading="lazy" width={cover.w} height={cover.h} />
                                    : <div className="project-image wheel-placeholder"><div className="project-placeholder">{p.placeholder}</div></div>}
                            </div>
                        );
                    })}
                </div>
                <div className="wheel-caption">
                    <span className="project-category">{current.category}</span>
                    <Link href={`/projects/${current.slug}`} className="btn btn-primary"><span>Open project <i aria-hidden="true">→</i></span></Link>
                </div>
            </div>

            <div
                ref={stageRef}
                className="wheel-stage"
                role="listbox"
                tabIndex={0}
                aria-label="Projects. Arrow keys to turn, Enter to open."
                aria-activedescendant={`${id}-item-${selected}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onKeyDown={onKeyDown}
            >
                <div className="wheel-track">
                <span className="wheel-marker" aria-hidden="true" />
                {projects.map((p, i) => {
                    const offset = shortestOffset(i, rotation, n);
                    if (Math.abs(offset) > VISIBLE + 1) return null;
                    // Names sit on the face of a drum that turns about a horizontal axis
                    // (after crafterui's Works Wheel): pivot DRUM px behind the name, tilt, push back out.
                    const angle = offset * SPACING;
                    const fade = Math.max(0, Math.cos((angle * Math.PI) / 180)) ** 1.5;
                    const isSel = Math.abs(offset) < 0.5;
                    return (
                        <div
                            key={p.slug}
                            id={`${id}-item-${i}`}
                            role="option"
                            aria-selected={isSel}
                            className={`wheel-item${isSel ? ' is-selected' : ''}`}
                            style={{ opacity: fade, transform: `translateY(-50%) translateZ(${-DRUM}px) rotateX(${-angle}deg) translateZ(${DRUM}px)` }}
                            onClick={() => (isSel ? open(i) : goTo(i))}
                        >
                            {p.title}
                        </div>
                    );
                })}
                </div>
            </div>

            <p className="sr-only" aria-live="polite">{current.title}, project {selected + 1} of {n}</p>
        </div>
    );
}
