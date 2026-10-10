'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

/* Opening a project from its card: the card's image grows into the big image at the top
   of the project page (a View Transition). Links opt in with data-morph="<route>".
   Browsers without View Transitions, and reduced motion, get a normal page change. */
export default function ProjectMorph() {
    const router = useRouter();
    const pathname = usePathname();
    const arrived = useRef(null);

    // The new page has rendered: let the transition take its "after" picture.
    useEffect(() => {
        arrived.current?.();
        arrived.current = null;
    }, [pathname]);

    useEffect(() => {
        const onClick = (e) => {
            const link = e.target instanceof Element ? e.target.closest('a[data-morph]') : null;
            if (!link || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const image = link.closest('.project-card')?.querySelector('.project-image');
            if (!image) return;

            // Runs in the capture phase, before Next's <Link> sees the click.
            e.preventDefault();
            const root = document.documentElement;
            image.style.viewTransitionName = 'project-hero';
            root.classList.add('is-morphing');
            window.__routeMorph = true;            // RouteWipe sits this one out

            // Name the landing image only once the new page is in, so it never clashes with the
            // card (or with a project page we are leaving, when the card is under "More like this").
            let landing = null;
            const transition = document.startViewTransition(() => new Promise((resolve) => {
                arrived.current = () => {
                    landing = document.querySelector('.project-detail-image');
                    if (landing) landing.style.viewTransitionName = 'project-hero';
                    resolve();
                };
                setTimeout(resolve, 2000);          // never hang if the page is slow
                router.push(link.dataset.morph);
            }));
            transition.finished.finally(() => {
                image.style.viewTransitionName = '';
                if (landing) landing.style.viewTransitionName = '';
                root.classList.remove('is-morphing');
                window.__routeMorph = false;
            });
        };
        window.addEventListener('click', onClick, true);
        return () => window.removeEventListener('click', onClick, true);
    }, [router]);

    return null;
}
