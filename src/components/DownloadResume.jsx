'use client';

import { useEffect, useRef, useState } from 'react';
import { BASE } from '../lib/site';

const line = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

/** The resume download button. After a click it confirms the download has started, then resets. */
export default function DownloadResume() {
    const [started, setStarted] = useState(false);
    const timer = useRef(0);
    useEffect(() => () => clearTimeout(timer.current), []);

    return (
        <a
            href={`${BASE}/resume/Jonas_Bondoc_Resume.pdf`}
            className={`btn btn-primary btn-download${started ? ' is-started' : ''}`}
            download
            onClick={() => {
                setStarted(true);
                clearTimeout(timer.current);
                timer.current = setTimeout(() => setStarted(false), 2600);
            }}
        >
            {started ? (
                <svg key="done" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5l4 4 8-9" {...line} /></svg>
            ) : (
                <svg key="dl" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M17 13v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3M6 10l4 4m0 0l4-4m-4 4V2" {...line} /></svg>
            )}
            <span aria-live="polite">{started ? 'Download started' : 'Download Resume (PDF)'}</span>
        </a>
    );
}
