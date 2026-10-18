import HeroTitle from '../HeroTitle';
import HeroCar from '../HeroCar';
import Stat from '../Stat';
import HeroBuild from '../HeroBuild';
import { projects } from '../../data/projects';
import { certifications } from '../../data/certifications';

export default function Hero() {
    return (
        <section id="home" className="hero">
            <div className="container">
                <p className="hero-role">Full-stack developer · <span className="nowrap">Graduating 2027</span> · <span className="nowrap">Open to full-stack roles</span></p>
                <div className="hero-head">
                    <div className="hero-title-wrap"><HeroTitle lines={['Jonas', 'Bondoc']} /></div>
                    <HeroBuild />
                </div>
                <div className="hero-row">
                    <p className="hero-description">
                        I build full-stack web apps that people actually use: a toll route planner covering nine Luzon expressway systems, a clinic website that reached page one of local search, and an IoT alert system for a diabetes-care client.
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
