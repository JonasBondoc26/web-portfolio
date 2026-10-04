import HeroTitle from '../HeroTitle';
import HeroCar from '../HeroCar';
import Stat from '../Stat';
import RoleCycler from '../RoleCycler';
import HeroTelemetry from '../HeroTelemetry';
import { projects } from '../../data/projects';
import { certifications } from '../../data/certifications';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <p className="hero-role"><RoleCycler roles={['Full-stack developer', 'Web app builder', 'WordPress + SEO']} /> in San Fernando, Pampanga</p>
                <div className="hero-head">
                    <div className="hero-title-wrap"><HeroTitle lines={['Jonas', 'Bondoc']} /></div>
                    <HeroTelemetry />
                </div>
                <div className="hero-row">
                    <p className="hero-description">
                        I build web apps and business sites, from Vue and Node storefronts to WordPress sites that rank on the first page.
                    </p>
                    <div className="hero-cta">
                        <a href="#projects" className="btn btn-primary">
                            <span>View projects</span>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a href="#contact" className="btn btn-secondary">
                            <span>Get in touch</span>
                        </a>
                    </div>
                </div>
            </div>

            <HeroCar />

            <div className="container">
                <div className="stats-grid">
                    {/* These two count themselves from the data files, so they never go stale. */}
                    <Stat value={projects.length} label="projects built" />
                    <Stat value={2} label="client projects" />
                    <Stat value={certifications.length} label="certifications" />
                </div>
            </div>
        </section>
    );
}
