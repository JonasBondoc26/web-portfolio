// Shared constants.

/** Prefix for files in /public, so links still work when the site is served from a sub-folder. */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** The sections of the home page, in order. The nav and the lap bar are both built from this. */
export const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume' },
];

export const EMAIL = 'jjbondoc07@gmail.com';

export const EMAILJS = {
    serviceId: 'service_b8sqidt',
    templateId: 'template_95ypvs2',
    publicKey: 'sxfGRIrdBUb2s95Hc',
};
