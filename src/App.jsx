import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import ProjectCard from './components/ProjectCard/ProjectCard';
import PersonalPresentation from './components/PersonalPresentation/PersonalPresentation';
import "./styles/main.css";
import BackgroundAnimation from './components/BackgroundAnimation/BackgroundAnimation';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import { translations } from './translations';
import { updateDocumentSeo } from './seo';

import profileImage from '/assets/profile.jpg';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [language, setLanguage] = useState('fr');
  const t = translations[language];

  useEffect(() => {
    fetch('/projects.json')
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  useEffect(() => {
    updateDocumentSeo(language);
  }, [language]);

  return (
    <div className="app-container">
      <BackgroundAnimation />
      <Header title={t.siteTitle} labels={t.nav} />
      <main className="main-content" >
          <PersonalPresentation
            profileImage={profileImage}
            name="Malo Bastianelli"
            title={t.hero.title}
            description={t.hero.description}
            actionLabels={t.hero}
          />
        <section className="projects-section">
          <h2 className="section-title">{t.projects.title}</h2>
          <div className="projects-grid" id="projects">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                imageSrc={project.imageSrc}
                description={project.description}
                altText={project.altText}
                projectLink={project.projectLink}
                repoLink={project.repoLink}
                projectText={t.projects.items[project.id] || project.project_text}
                collaborators={project.collaborators}
                labels={t.projects}
              />
            ))}
          </div>
        </section>
          <About currentLanguage={language} onLanguageChange={setLanguage} labels={t.about} />
          <Contact labels={t.contact} />
      </main>
    </div>
  );
};

export default App;
