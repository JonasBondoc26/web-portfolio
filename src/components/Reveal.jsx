'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Fades its children in the first time they scroll into view.
 * variant: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up'
 */
export default function Reveal({ as: Tag = 'div', variant = 'fade-up', delay = 0, className = '', children, ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (still || !('IntersectionObserver' in window)) {
            setShown(true);
            return undefined;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShown(true);
                observer.disconnect();
            }
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <Tag
            ref={ref}
            data-scroll-reveal={variant}
            className={`${className}${shown ? ' is-in' : ''}`.trim()}
            style={delay ? { transitionDelay: `${Math.min(delay, 0.3)}s` } : undefined}
            {...rest}
        >
            {children}
        </Tag>
    );
}
