import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import CertSeasons from '../CertSeasons';
import { certifications } from '../../data/certifications';
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
                            I&apos;m a full-stack developer driven by the challenge of building high-performing, scalable digital solutions. I take pride in transforming ideas into powerful applications that are not only visually refined but also reliable, efficient, and user-centered.
                        </p>
                        <p className="about-text">
                            With solid experience in modern web technologies, I approach every project with precision, strategic thinking, and attention to detail. I don&apos;t just build applications — I engineer solutions that deliver real impact and seamless user experiences.
                        </p>
                        <p className="about-text">
                            I&apos;m committed to continuous growth, constantly refining my skills, exploring emerging technologies, and optimizing my workflow to stay ahead in an ever-evolving tech landscape.
                        </p>
                    </Reveal>

                    <Reveal as="figure" className="driver-card chamfer" variant="fade-right" delay={0.15} data-tilt="8">
                        <img src={portrait.src} alt="Portrait of Jonas Bondoc" width={portrait.width} height={portrait.height} loading="lazy" />
                        <figcaption>
                            <strong>Jonas Jason Bondoc</strong>
                            <span>BS Information Technology, specialized in Web Development · Holy Angel University</span>
                        </figcaption>
                    </Reveal>
                </div>

                <CertSeasons certifications={certifications} />

                <Reveal className="skills-container">
                    <h3 className="skills-title">Tech Stack</h3>
                    <div className="tech-groups stagger">
                        {TECH_GROUPS.map((group, g) => (
                            <div className="tech-group" key={group} style={{ '--i': g }}>
                                <h4 className="tech-group-name"><span>{group}</span></h4>
                                <div className="tech-stack-grid" data-speed-skew>
                                    {tech.filter((t) => t.group === group).map(({ name, icon }, i) => (
                                        <div className="tech-item" key={name} style={{ '--t': i }}>
                                            <img src={icon} alt="" loading="lazy" width="40" height="40" />
                                            <span>{name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
