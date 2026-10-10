'use client';

/* =========================================================
   SCROLL ENGINE
   One requestAnimationFrame loop for the whole site. It wakes
   on scroll, works out how fast the page is moving, tells every
   subscriber, and goes back to sleep when scrolling stops.

   Components subscribe with the useScrollFrame hook and update
   the DOM through refs, so scrolling never re-renders React.
   ========================================================= */
import { useEffect, useRef } from 'react';

export const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

export const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs start() while the media query matches, and its cleanup when it stops matching,
    so effects follow the device (and DevTools device mode) without a reload.
    Returns the cleanup for a useEffect. */
export function whileMedia(query, start) {
    const mq = window.matchMedia(query);
    let stop = null;
    const sync = () => {
        stop?.();
        stop = mq.matches ? start() || null : null;
    };
    sync();
    mq.addEventListener('change', sync);
    return () => {
        mq.removeEventListener('change', sync);
        stop?.();
    };
}

const listeners = new Set();
let started = false;
let running = false;
let lastY = 0;
let lastT = 0;
let velocity = 0;      // px per second, smoothed
let quietFrames = 0;
let maxScroll = 1;

function emit(dt, measure) {
    const y = window.scrollY;
    const state = { y, velocity, dt, maxScroll, progress: clamp(y / maxScroll, 0, 1), measure };
    listeners.forEach((fn) => fn(state));
}

/** Re-measure the page and push one update. Called on load, resize, and when the page height changes. */
function refresh() {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    emit(16, true);
}

function frame(now) {
    const y = window.scrollY;
    const dt = Math.max(1, now - lastT);
    const instant = ((y - lastY) / dt) * 1000;
    velocity += (instant - velocity) * 0.2;
    lastY = y;
    lastT = now;

    quietFrames = Math.abs(velocity) < 3 ? quietFrames + 1 : 0;
    if (quietFrames > 8) {
        velocity = 0;
        running = false;
        emit(dt, false);
        return;
    }
    emit(dt, false);
    requestAnimationFrame(frame);
}

function wake() {
    if (running) return;
    running = true;
    quietFrames = 0;
    lastT = performance.now() - 16;
    requestAnimationFrame(frame);
}

function start() {
    if (started) return;
    started = true;
    lastY = window.scrollY;
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);
    if ('ResizeObserver' in window) new ResizeObserver(refresh).observe(document.body);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
}

/**
 * Run `callback` on every scroll frame.
 * It receives { y, velocity, dt, progress, maxScroll, measure }.
 * `measure` is true when sizes may have changed and cached measurements should be redone.
 */
export function useScrollFrame(callback) {
    const saved = useRef(callback);
    useEffect(() => { saved.current = callback; });

    useEffect(() => {
        const fn = (state) => saved.current(state);
        listeners.add(fn);
        start();
        refresh();
        return () => { listeners.delete(fn); };
    }, []);
}

/** The id of the section currently on screen, or null. */
export function currentSection(ids, y) {
    let current = null;
    for (const id of ids) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop - window.innerHeight * 0.35) current = id;
    }
    return current;
}

/** Turn a car's wheels to match the distance it has travelled. */
export function spinWheels(carEl, distancePx) {
    const radius = carEl.offsetWidth * (24 / 420) || 1;
    const deg = (distancePx / radius) * (180 / Math.PI);
    carEl.querySelectorAll('.car-wheel').forEach((wheel) => { wheel.style.transform = `rotate(${deg}deg)`; });
}
