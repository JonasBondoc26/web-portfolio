/**
 * The action buttons for a project, in priority order:
 *   1. Download App  - when the project has a direct download ("download" in projects.js)
 *   2. Visit Website - a real site in production ("liveSite": true), or
 *      Live Demo     - a hosted demo of the app
 *   3. GitHub        - the source
 * The project cards and the project pages both use this, so they always agree.
 */
export function projectLinks({ download, demo, liveSite, github }) {
    const dl = typeof download === 'string' ? { url: download } : download;
    return [
        dl?.url && { kind: 'download', href: dl.url, label: 'Download App', note: dl.note, cursor: 'Get' },
        demo && { kind: 'site', href: demo, label: liveSite ? 'Visit Website' : 'Live Demo', cursor: liveSite ? 'Visit' : 'Live' },
        github && { kind: 'code', href: github, label: 'GitHub', cursor: 'Code' },
    ].filter(Boolean);
}

/** Every project link opens in a new tab; downloads also carry the download hint. */
export const linkProps = (kind) => ({ target: '_blank', rel: 'noopener', ...(kind === 'download' && { download: true }) });
