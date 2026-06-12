import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaExternalLinkAlt, FaGithub, FaUsers } from 'react-icons/fa';
import './ProjectCard.css';
import Modal from '../Modal/Modal';

const ProjectCard = ({ imageSrc, description, altText, projectLink, repoLink, projectText, collaborators = [], labels }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflowY = '';
  };

  return (
    <>
      <button className="project-card" type="button" onClick={openModal}>
        <span className="project-card-image-wrap">
          <img src={imageSrc} alt={altText} className="project-image" />
          <span className="project-card-glow" aria-hidden="true" />
        </span>
        <span className="project-card-content">
          <span className="project-card-eyebrow">{labels.cardEyebrow}</span>
          <span className="project-card-title">{description}</span>
          <span className="project-card-summary">{projectText}</span>
          <span className="project-card-meta">
            {collaborators.length > 0 && (
              <span className="project-card-chip">
                <FaUsers aria-hidden="true" />
                {collaborators.length}
              </span>
            )}
            {projectLink && <span className="project-card-chip">Live</span>}
            {repoLink && <span className="project-card-chip">Code</span>}
          </span>
        </span>
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal} closeLabel={labels.closeModal} closeOnTouchContentClick>
        <article className="project-modal">
          <div className="project-modal-visual">
            <img src={imageSrc} alt={altText} />
          </div>
          <div className="project-modal-content">
            <div>
              <span className="project-modal-label">{labels.selected}</span>
              <h2>{description}</h2>
              <p>{projectText}</p>
            </div>

            {collaborators.length > 0 && (
              <section className="modal-collaborators" aria-labelledby={`${description}-collaborators`}>
                <h3 id={`${description}-collaborators`}>{labels.collaborators}</h3>
                <ul>
                  {collaborators.map((collab) => (
                    <li key={collab.github}>
                      <a href={collab.github} target="_blank" rel="noopener noreferrer">
                        {collab.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="modal-links">
              {projectLink && (
                <a href={projectLink} target="_blank" rel="noopener noreferrer" className="modal-link-button">
                  <FaExternalLinkAlt aria-hidden="true" />
                  {labels.viewProject}
                </a>
              )}
              {repoLink && (
                <a href={repoLink} target="_blank" rel="noopener noreferrer" className="modal-link-button modal-link-button-secondary">
                  <FaGithub aria-hidden="true" />
                  {labels.viewCode}
                </a>
              )}
            </div>
          </div>
        </article>
      </Modal>
    </>
  );
};

ProjectCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  projectLink: PropTypes.string,
  repoLink: PropTypes.string,
  projectText: PropTypes.string.isRequired,
  labels: PropTypes.shape({
    cardEyebrow: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    collaborators: PropTypes.string.isRequired,
    viewProject: PropTypes.string.isRequired,
    viewCode: PropTypes.string.isRequired,
    closeModal: PropTypes.string.isRequired,
  }).isRequired,
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired,
    })
  ),
};

export default ProjectCard;
