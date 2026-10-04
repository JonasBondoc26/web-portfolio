'use client';

import { useState } from 'react';
import { prefersReducedMotion, useScrollFrame } from '../lib/scroll';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    useScrollFrame(({ y }) => setVisible(y > 500));

    return (
        <button
            className={`back-to-top${visible ? ' visible' : ''}`}
            type="button"
            aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
        >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    );
}
