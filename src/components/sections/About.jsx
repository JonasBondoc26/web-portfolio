import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import CertSeasons from '../CertSeasons';
import { certifications } from '../../data/certifications';
import { tech, TECH_GROUPS, COMPOUNDS } from '../../data/tech';
import portrait from '../../assets/portrait.webp';   // 25 KB copy of portrait.png, sized for the card

const ORDER = Object.keys(COMPOUNDS);   // soft, medium, hard

/** A tyre seen side-on: black rubber, a ring in the compound colour, and its letter. */
function Tyre({ compound, className = 'tyre' }) {
    return (
        <svg className={`${className} tyre-${compound}`} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="11.5" fill="#15171c" />
            <circle className="tyre-ring" cx="12" cy="12" r="8.6" fill="none" strokeWidth="2.2" strokeDasharray="11.5 2" />
            <text x="12" y="12" dy="0.36em" textAnchor="middle">{COMPOUNDS[compound].letter}</text>
        </svg>
    );
}

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

                    <div className="driver-wrap">
                        {/* Liquid livery paint morphing behind the card. */}
                        <span className="liquid-blob" aria-hidden="true"><i /><i /></span>
                        <Reveal as="figure" className="driver-card chamfer" variant="fade-right" delay={0.15} data-tilt="8">
                            <img src={portrait.src} alt="Portrait of Jonas Bondoc" width={portrait.width} height={portrait.height} loading="lazy" />
                            <figcaption>
                                <strong>Jonas Jason Bondoc</strong>
                                <span>BS Information Technology, specialized in Web Development · Holy Angel University</span>
                            </figcaption>
                        </Reveal>
                    </div>
                </div>

                <CertSeasons certifications={certifications} />

                <Reveal className="skills-container">
                    <div className="skills-head">
                        <h3 className="skills-title">Tech Stack</h3>
                        <ul className="tyre-legend" aria-label="Tyre compounds">
                            {ORDER.map((c) => (
                                <li key={c}><Tyre compound={c} /><span><b>{COMPOUNDS[c].label}</b> {COMPOUNDS[c].note}</span></li>
                            ))}
                        </ul>
                    </div>
                    <div className="tech-groups stagger">
                        {TECH_GROUPS.map((group, g) => (
                            <div className="tech-group" key={group} style={{ '--i': g }}>
                                <h4 className="tech-group-name"><span>{group}</span></h4>
                                <div className="tech-stack-grid" data-speed-skew>
                                    {tech
                                        .filter((t) => t.group === group)
                                        .sort((a, b) => ORDER.indexOf(a.compound) - ORDER.indexOf(b.compound))
                                        .map(({ name, icon, compound, mono }, i) => (
                                        <div className="tech-item" key={name} style={{ '--t': i }} title={`${COMPOUNDS[compound].label}: ${COMPOUNDS[compound].note}`}>
                                            <Tyre compound={compound} className="tyre tech-tyre" />
                                            <img src={icon} alt="" loading="lazy" width="40" height="40" className={mono ? 'is-mono' : undefined} />
                                            <span>{name}<span className="sr-only">, {COMPOUNDS[compound].label.toLowerCase()} compound</span></span>
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
