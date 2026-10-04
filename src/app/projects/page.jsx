import SectionHeader from '../../components/SectionHeader';
import ProjectFilter from '../../components/ProjectFilter';
import LapBar from '../../components/LapBar';
import { projects } from '../../data/projects';

export const metadata = {
    title: 'Projects',
    description: 'Web development projects by Jonas Bondoc, from client work to his first site.',
};

export default function ProjectsPage() {
    return (
        <>
            <main id="main">
                <section className="projects page-section">
                    <div className="container">
                        <SectionHeader title="All projects" as="h1" />
                        <p className="page-intro">{projects.length} builds, from client work to my very first site. Open any one for the full write-up, features and live demo.</p>

                        <ProjectFilter projects={projects} />
                    </div>
                </section>
            </main>
            <LapBar />
        </>
    );
}
