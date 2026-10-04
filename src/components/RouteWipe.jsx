'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/** A livery-striped wipe that sweeps across the screen when you move to another page.
    Skipped on the first load, where the start lights already put on a show. */
export default function RouteWipe() {
    const pathname = usePathname();
    const first = useRef(pathname);
    const [run, setRun] = useState(0);

    useEffect(() => {
        if (pathname === first.current) return;
        first.current = pathname;
        setRun((n) => n + 1);
    }, [pathname]);

    if (!run) return null;
    // Removed again once the last stripe has gone, so nothing is left over the page.
    return (
        <div className="route-wipe" key={run} aria-hidden="true">
            <i /><i /><i onAnimationEnd={() => setRun(0)} />
        </div>
    );
}
