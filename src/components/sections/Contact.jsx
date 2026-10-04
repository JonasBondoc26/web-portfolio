import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import ContactForm from '../ContactForm';
import { EMAIL } from '../../lib/site';

const icon = { width: 24, height: 24, viewBox: '0 0 24 24', 'aria-hidden': true };
const line = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function Contact() {
    return (
        <section id="contact" className="contact page-section">
            <div className="container">
                <SectionHeader title="Get In Touch" sector={3} />

                <div className="contact-grid">
                    <Reveal className="contact-info" variant="fade-left" delay={0.1}>
                        <h3 className="contact-subtitle">Let&apos;s Build Something Amazing</h3>
                        <p className="contact-text">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Whether you have a question or just want to say hi, feel free to reach out.
                        </p>

                        <div className="contact-details stagger">
                            <div className="contact-item" style={{ '--i': 0 }}>
                                <div className="contact-icon">
                                    <svg {...icon} fill="none">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" {...line} />
                                        <path d="M22 6l-10 7L2 6" {...line} />
                                    </svg>
                                </div>
                                <div className="contact-detail">
                                    <h4>Email</h4>
                                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                                </div>
                            </div>

                            <div className="contact-item" style={{ '--i': 1 }}>
                                <div className="contact-icon">
                                    <svg {...icon} fill="none">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" {...line} />
                                    </svg>
                                </div>
                                <div className="contact-detail">
                                    <h4>Phone</h4>
                                    <a href="tel:+639157759027">+63 915 775 9027</a>
                                </div>
                            </div>

                            <div className="contact-item" style={{ '--i': 2 }}>
                                <div className="contact-icon">
                                    <svg {...icon} fill="none">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" {...line} />
                                        <circle cx="12" cy="10" r="3" {...line} />
                                    </svg>
                                </div>
                                <div className="contact-detail">
                                    <h4>Location</h4>
                                    <p>City of San Fernando, Pampanga<br />Philippines</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-links stagger">
                            <a href="https://github.com/JonasBondoc26" target="_blank" rel="noopener" className="social-link" aria-label="GitHub" style={{ '--i': 3 }}>
                                <svg {...icon} fill="currentColor">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com/in/jonasbondoc" target="_blank" rel="noopener" className="social-link" aria-label="LinkedIn" style={{ '--i': 4 }}>
                                <svg {...icon} fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="https://m.me/jjbondoc07" target="_blank" rel="noopener" className="social-link" aria-label="Facebook Messenger" style={{ '--i': 5 }}>
                                <svg {...icon} fill="currentColor">
                                    <path d="M12 0C5.373 0 0 4.836 0 10.8c0 3.396 1.728 6.426 4.428 8.406V24l4.104-2.268c1.092.3 2.256.468 3.468.468 6.627 0 12-4.836 12-10.8S18.627 0 12 0zm1.2 14.4l-3.06-3.264-5.34 3.264 5.88-6.228 3.12 3.264 5.28-3.264-5.88 6.228z" />
                                </svg>
                            </a>
                        </div>
                    </Reveal>

                    <ContactForm />
                </div>
            </div>
        </section>
    );
}
