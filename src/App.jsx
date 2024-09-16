import Header from './components/header/Header';
import ProjectCard from './components/ProjectCard/ProjectCard';
import PersonalPresentation from './components/PersonalPresentation/PersonalPresentation';
import "./styles/main.css";
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';

import profileImage from './assets/profile.jpg';
import project1 from './assets/img.webp';

const App = () => {
  const projects = [
    {
      id: 1,
      imageSrc: project1,
      description: 'Description du projet 1',
      altText: 'Projet 1',
      projectLink: '#',
      repoLink: '#',
    },
    {
      id: 2,
      imageSrc: project1,
      description: 'Description du projet 2',
      altText: 'Projet 2',
      projectLink: '#',
      repoLink: '#',
    },
    {
      id: 3,
      imageSrc: project1,
      description: 'Description du projet 3',
      altText: 'Projet 3',
      projectLink: '#',
      repoLink: '#',
    },
  ];

  return (
    <div className="app-container">
      <BackgroundAnimation id="particles" />
      <Header title="Mon Portfolio" />
      <main className="main-content">
        <PersonalPresentation
          profileImage={profileImage}
          name="Malo Bastianelli"
          title="Développeur Full-Stack"
          description="Je suis un développeur passionné avec une expérience en React, Node.js, et d'autres technologies modernes. J'aime créer des applications web performantes et esthétiques qui offrent une excellente expérience utilisateur."
        />
        <section className="projects-section">
          <h2 className="section-title">Mes Projets</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                imageSrc={project.imageSrc}
                description={project.description}
                altText={project.altText}
                projectLink={project.projectLink}
                repoLink={project.repoLink}
              />
            ))}
          </div>
        </section>
        {/* Vous pouvez ajouter d'autres sections ici */}
      </main>
    </div>
  );
};

export default App;
