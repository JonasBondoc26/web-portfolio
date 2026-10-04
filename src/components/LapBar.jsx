'use client';

import { useRef, useState } from 'react';
import Car from './Car';
import { clamp, currentSection, spinWheels, useScrollFrame } from '../lib/scroll';

/* The strip along the bottom of the screen. The small car drives from the
   start to the chequered flag as you scroll the page. Pass `sections`
   ([{ id, label }]) to get a tick where each one starts. */
export default function LapBar({ sections = [] }) {
    const trackRef = useRef(null);
    const carRef = useRef(null);
    const fillRef = useRef(null);
    const speedRef = useRef(null);
    const markRefs = useRef([]);
    const cache = useRef({ trackW: 0, carW: 0, at: [], lastSpeed: -1 });

    const [active, setActive] = useState(null);
    const [passed, setPassed] = useState(0);
    const [reversing, setReversing] = useState(false);

    useScrollFrame(({ y, velocity, progress, maxScroll, measure }) => {
        const track = trackRef.current;
        const car = carRef.current;
        if (!track || !car) return;
        const c = cache.current;

        if (measure || !c.trackW) {
            c.trackW = track.clientWidth;
            c.carW = car.offsetWidth;
            const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
            c.at = sections.map(({ id }, i) => {
                const el = document.getElementById(id);
                const at = el ? clamp((el.offsetTop - navH) / maxScroll, 0, 1) : 0;
                // Put the tick where the car's nose will be when that section reaches the top.
                const mark = markRefs.current[i];
                if (mark) mark.style.left = `${at * (c.trackW - c.carW) + c.carW}px`;
                return at;
            });
        }

        const x = progress * (c.trackW - c.carW);
        car.style.transform = `translate3d(${x}px,0,0)`;
        fillRef.current.style.transform = `scaleX(${(x + c.carW * 0.2) / (c.trackW || 1)})`;
        spinWheels(car, x * 6);          // exaggerated so the small wheels visibly turn

        const speed = Math.round(clamp(Math.abs(velocity) * 0.11, 0, 360));
        if (speed !== c.lastSpeed) { speedRef.current.textContent = speed; c.lastSpeed = speed; }

        if (velocity < -40) setReversing(true);
        else if (velocity > 40) setReversing(false);

        setPassed(c.at.filter((at) => progress >= at - 0.002).length);
        setActive(currentSection(sections.map((s) => s.id), y));
    });

    return (
        // Hidden from assistive tech: the main nav already covers the same links.
        <div className="lap" aria-hidden="true">
            <div className="lap-speed"><b ref={speedRef}>0</b><span>km/h</span></div>
            <div className="lap-track" ref={trackRef}>
                <div className="lap-fill" ref={fillRef} />
                {sections.map(({ id, label }, i) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        tabIndex={-1}
                        ref={(el) => { markRefs.current[i] = el; }}
                        className={`lap-mark${i < passed ? ' is-passed' : ''}${id === active ? ' is-active' : ''}`}
                    >
                        <span>{label}</span>
                    </a>
                ))}
                <div className={`lap-car${reversing ? ' is-reversing' : ''}`} ref={carRef}><Car /></div>
            </div>
            <div className="lap-flag" />
        </div>
    );
}
