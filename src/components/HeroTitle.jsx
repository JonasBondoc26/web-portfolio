'use client';

import { useRef } from 'react';
import { useScrollFrame } from '../lib/scroll';

/** The big name. Sized so its widest line exactly fills the column, whatever the screen. */
export default function HeroTitle({ lines }) {
    const ref = useRef(null);

    useScrollFrame(({ measure }) => {
        const title = ref.current;
        if (!measure || !title) return;
        const column = title.parentElement;
        const room = column.clientWidth - parseFloat(getComputedStyle(column).paddingLeft) * 2;
        title.style.fontSize = '100px';
        const widest = Math.max(...Array.from(title.children, (line) => line.offsetWidth));
        const size = Math.min((room / widest) * 100, window.innerHeight * 0.24, 250);
        title.style.fontSize = `${Math.max(size, 40)}px`;
    });

    return (
        <h1 className="hero-title" ref={ref}>
            {lines.map((line) => <span key={line}>{line}</span>)}
        </h1>
    );
}
