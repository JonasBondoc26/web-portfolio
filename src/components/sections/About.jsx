import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import CertSeasons from '../CertSeasons';
import TechStack from '../TechStack';
import { certifications } from '../../data/certifications';
import { experience } from '../../data/experience';
import { tech, TECH_GROUPS } from '../../data/tech';
import portrait from '../../assets/portrait.webp';   // 25 KB copy of portrait.png, sized for the card

export default function About() {
    return (
        <section id="about" className="about page-section">
            <div className="container">
                <SectionHeader title="About Me" sector={1} />

                <div className="about-top">
                    <Reveal className="about-content" variant="fade-left">
                        <p className="about-text">
                            I&apos;m Jonas, a BSIT student at Holy Angel University majoring in web development. My capstone, SmartToll, is a Laravel API behind a React web app and a React Native mobile app that plans toll routes across nine Luzon expressway systems.
                        </p>
                        <p className="about-text">
                            I&apos;ve also built for real clients. A WordPress site I made for Galang Dental Center reached the first page of local search, and DiaWeb connects a diabetes-tracking web app to physical buzzer alerts.
                        </p>
                        <p className="about-text">
                            Most recently I trained as an endpoint engineer at Cloudstaff, where I was part of the team refurbishing 1,500 PCs for deployment.
                        </p>
                    </Reveal>

                    <div className="driver-wrap">
                        <Reveal as="figure" className="driver-card chamfer" variant="fade-right" delay={0.15}>
                            <img src={portrait.src} alt="Portrait of Jonas Bondoc" width={portrait.width} height={portrait.height} loading="lazy" />
                            <figcaption>
                                <strong>Jonas Jason Bondoc</strong>
                                <span>BS Information Technology, specialized in Web Development · Holy Angel University</span>
                            </figcaption>
                        </Reveal>
                    </div>
                </div>

                <Reveal className="experience">
                    <h3 className="skills-title">Experience</h3>
                    <ol className="exp-list">
                        {experience.map(({ org, role, dates, detail }) => (
                            <li className="exp-row" key={org}>
                                <div className="exp-who">
                                    <h4 className="exp-org">{org}</h4>
                                    <p className="exp-role">{role}</p>
                                </div>
                                <p className="exp-detail">{detail}</p>
                                <p className="exp-dates">{dates}</p>
                            </li>
                        ))}
                    </ol>
                </Reveal>

                <CertSeasons certifications={certifications} />

                <Reveal className="skills-container">
                    <TechStack tech={tech} groups={TECH_GROUPS} />
                </Reveal>
            </div>
        </section>
    );
}
