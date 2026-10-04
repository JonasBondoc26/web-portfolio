import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import Contact from '../components/sections/Contact';
import Resume from '../components/sections/Resume';
import LapBar from '../components/LapBar';
import Ticker from '../components/Ticker';
import { SECTIONS } from '../lib/site';

export default function HomePage() {
    return (
        <>
            <main id="main">
                <Hero />
                <Ticker />
                <About />
                <FeaturedProjects />
                <Contact />
                <Resume />
            </main>
            {/* One tick per section after the hero */}
            <LapBar sections={SECTIONS.slice(1)} />
        </>
    );
}
