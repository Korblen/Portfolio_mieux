import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import ProjectCard from './components/ProjectCard/ProjectCard';
import PersonalPresentation from './components/PersonalPresentation/PersonalPresentation';
import "./styles/main.css";
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import About from './components/About/About';
import Contact from './components/Contact/Contact';

import profileImage from '/assets/profile.jpg';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('../public/db/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <div className="app-container">
      <BackgroundAnimation />
      <Header title="Mon Portfolio" />
      <main className="main-content" >
          <PersonalPresentation
            profileImage={profileImage}
            name="Malo Bastianelli"
            title="Développeur Full-Stack"
            description="Je suis un développeur passionné avec une expérience en React, Node.js, et d'autres technologies modernes. J'aime créer des applications web performantes et esthétiques qui offrent une excellente expérience utilisateur."
          />
        <section className="projects-section">
          <h2 className="section-title">Mes Projets</h2>
          <div className="projects-grid" id="projects">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                imageSrc={project.imageSrc}
                description={project.description}
                altText={project.altText}
                projectLink={project.projectLink}
                repoLink={project.repoLink}
                projectText={project.project_text}
                collaborators={project.collaborators}
              />
            ))}
          </div>
        </section>
          <About />
          <Contact />
      </main>
    </div>
  );
};

export default App;
