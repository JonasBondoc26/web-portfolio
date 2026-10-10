import { Barlow, Barlow_Condensed } from 'next/font/google';
import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SpeedStreaks from '../components/SpeedStreaks';
import BackToTop from '../components/BackToTop';
import PointerFX from '../components/PointerFX';
import TouchFX from '../components/TouchFX';
import RouteWipe from '../components/RouteWipe';
import ProjectMorph from '../components/ProjectMorph';
import SpeedSkew from '../components/SpeedSkew';
import Loader from '../components/Loader';

// next/font downloads these at build time and serves them from the site itself.
const bodyFont = Barlow({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-barlow',
    display: 'swap',
});
const displayFont = Barlow_Condensed({
    subsets: ['latin'],
    weight: ['600', '800'],
    style: ['normal', 'italic'],
    variable: '--font-barlow-condensed',
    display: 'swap',
});

export const metadata = {
    title: {
        default: 'Jonas Bondoc | Developer Portfolio',
        template: '%s | Jonas Bondoc',
    },
    description: 'Jonas Bondoc, full-stack web developer in San Fernando, Pampanga. Web apps, business sites and SEO.',
    keywords: ['web developer', 'portfolio', 'Jonas Bondoc', 'full-stack developer'],
    authors: [{ name: 'Jonas Bondoc' }],
    // What chat apps and social sites show when someone shares a link to the site.
    openGraph: {
        type: 'website',
        siteName: 'Jonas Bondoc',
        title: 'Jonas Bondoc | Developer Portfolio',
        description: 'Full-stack web developer in San Fernando, Pampanga. Web apps, business sites and SEO.',
    },
};

// Phone browsers: tint the address bar to match the site, and let the page reach under
// the notch / home bar (the lap bar adds the safe-area padding back).
export const viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#101218' },
        { media: '(prefers-color-scheme: light)', color: '#eef0f4' },
    ],
    viewportFit: 'cover',
};

// Runs before the page paints, so there is no flash of the wrong theme, the loading
// screen is up from the very first frame, and on the home page the hero car is already
// parked off-screen for the start lights. Only full page loads run this, never in-site navigation.
// With reduced motion there is no loading screen and no start sequence.
const bootScript = `(function () {
    var d = document.documentElement, theme = 'dark';
    try { theme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
    d.setAttribute('data-theme', theme);
    d.classList.add('js');
    var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (still) return;
    d.classList.add('is-loading');
    // Safety net: never leave the loading screen up if something fails to run.
    setTimeout(function () { d.classList.remove('is-loading', 'is-leaving'); }, 8000);
    if (location.pathname.replace(/\\/$/, '') === '${process.env.NEXT_PUBLIC_BASE_PATH || ''}') d.classList.add('lights-pending');
})();`;

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="dark" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: bootScript }} />
            </head>
            <body>
                <Loader />
                <a className="skip-link" href="#main">Skip to content</a>
                <SpeedStreaks />
                <Nav />
                {children}
                <Footer />
                <BackToTop />
                <PointerFX />
                <TouchFX />
                <RouteWipe />
                <ProjectMorph />
                <SpeedSkew />
            </body>
        </html>
    );
}
