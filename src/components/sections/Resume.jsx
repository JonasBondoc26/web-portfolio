import Reveal from '../Reveal';
import SectionHeader from '../SectionHeader';
import DownloadResume, { ViewResume } from '../DownloadResume';

const INCLUDED = [
    'Professional Summary',
    'Technical Skills & Technologies',
    'Education & Certifications',
    'Notable Projects Portfolio',
    'Contact Information',
];

const line = { stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function Resume() {
    return (
        <section id="resume" className="resume page-section">
            <div className="container">
                <SectionHeader title="Resume" sector={4} />

                <Reveal className="resume-content" delay={0.1}>
                    <div className="resume-intro">
                        <p className="resume-text">
                            Download my complete resume to learn more about my professional experience, education, technical skills, and achievements. The PDF includes detailed information about my work history, certifications, and project portfolio.
                        </p>
                    </div>

                    <div className="resume-preview">
                        {/* A sketch of the first page: lifts and fans out on hover. */}
                        <div className="resume-paper" aria-hidden="true">
                            <div className="paper-sheet paper-back" />
                            <div className="paper-sheet">
                                <div className="paper-head"><i className="paper-avatar" /><div><b /><i /></div></div>
                                <div className="paper-rule" />
                                {[92, 80, 86, 60].map((w, i) => <i key={`a${i}`} className="paper-line" style={{ width: `${w}%` }} />)}
                                <b className="paper-heading" />
                                {[88, 74, 82].map((w, i) => <i key={`b${i}`} className="paper-line" style={{ width: `${w}%` }} />)}
                                <div className="paper-chips">{[0, 1, 2, 3].map((i) => <i key={i} />)}</div>
                                <b className="paper-heading" />
                                {[70, 84].map((w, i) => <i key={`c${i}`} className="paper-line" style={{ width: `${w}%` }} />)}
                            </div>
                        </div>
                        <div className="preview-card">
                            <div className="preview-header">
                                <div className="preview-icon">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...line} />
                                        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" {...line} />
                                    </svg>
                                </div>
                                <div className="preview-info">
                                    <h3>Jonas_Bondoc_<wbr />Resume.pdf</h3>
                                    <p>Last updated: February 2026</p>
                                </div>
                            </div>

                            <div className="preview-details">
                                <h4>What&apos;s Included:</h4>
                                <ul className="stagger">
                                    {INCLUDED.map((item, i) => (
                                        <li key={item} style={{ '--i': i }}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" {...line} />
                                                <path d="M22 4L12 14.01l-3-3" {...line} />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="download-actions">
                                <DownloadResume />
                                <ViewResume />
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
