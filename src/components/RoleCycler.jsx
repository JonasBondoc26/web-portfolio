'use client';

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/scroll';

/** Cycles through a few roles, each one rolling up into place. Shows the first one if motion is reduced. */
export default function RoleCycler({ roles, interval = 2600 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (prefersReducedMotion() || roles.length < 2) return undefined;
        const timer = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
        return () => clearInterval(timer);
    }, [roles.length, interval]);

    return (
        <span className="role-cycler">
            {/* The key change remounts the word, which replays its entrance. */}
            <span className="role-word" key={index}>{roles[index]}</span>
        </span>
    );
}
