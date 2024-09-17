// src/components/ProjectCard/ProjectCard.jsx
import React, { useState } from 'react';
import './ProjectCard.css';
import Modal from '../Modal/Modal';

const ProjectCard = ({ imageSrc, description, altText, projectLink, repoLink, projectText, collaborators = [], isModal = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (!isModal) { // Empêcher l'ouverture de la modale si déjà dans la modale
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={`project-card ${isModal ? 'project-card-modal' : ''}`} onClick={openModal}>
        <img src={imageSrc} alt={altText} className="project-image" />
        <div className="project-description">
          <h3>{description}</h3>
        </div>
      </div>

      {!isModal && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="modal-project-container">
            <ProjectCard
              imageSrc={imageSrc}
              description={description}
              altText={altText}
              projectLink={projectLink}
              repoLink={repoLink}
              projectText={projectText}
              collaborators={collaborators}
              isModal={true} // Indiquer que c'est dans la modale
            />
            <div className="modal-text-content">
              <h2>{description}</h2>
              <p>{projectText}</p>
              {collaborators.length > 0 && (
                <div className="modal-collaborators">
                  <h3>Collaborateurs</h3>
                  <ul>
                    {collaborators.map((collab, index) => (
                      <li key={index}>
                        <a href={collab.github} target="_blank" rel="noopener noreferrer">
                          {collab.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="modal-links">
                {projectLink && (
                  <a href={projectLink} target="_blank" rel="noopener noreferrer" className="modal-link-button">
                    Voir le Projet
                  </a>
                )}
                {repoLink && (
                  <a href={repoLink} target="_blank" rel="noopener noreferrer" className="modal-link-button">
                    Voir le Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectCard;
