import Link from 'next/link';

export const metadata = {
    title: 'Off track',
};

// Shown for any address that doesn't exist. The static export writes it to 404.html,
// which GitHub Pages and most static hosts serve automatically.
export default function NotFound() {
    return (
        <main id="main">
            <section className="not-found page-section">
                <div className="container">
                    <p className="project-category">Error 404</p>
                    <h1 className="not-found-title">Off track</h1>
                    <p className="page-intro">This page doesn&apos;t exist, or it has been moved. Head back to the pits and try again.</p>
                    <div className="hero-cta">
                        <Link href="/" className="btn btn-primary"><span>Back to home</span></Link>
                        <Link href="/projects" className="btn btn-secondary"><span>See all projects</span></Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
