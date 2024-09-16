import './ProjectCard.css';
import PropTypes from 'prop-types';

const ProjectCard = ({ imageSrc, description, altText, projectLink, repoLink }) => {
  return (
    <div className="project-card">
      <img src={imageSrc} alt={altText} className="project-image" />
      <div className="project-overlay">
        <p className="project-description">{description}</p>
        <div className="project-buttons">
          <a href={projectLink} target="_blank" rel="noopener noreferrer" className="project-button">Voir le Projet</a>
          <a href={repoLink} target="_blank" rel="noopener noreferrer" className="project-button">Voir le Repo</a>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  altText: PropTypes.string,
  projectLink: PropTypes.string,
  repoLink: PropTypes.string,
};

ProjectCard.defaultProps = {
  altText: 'Project Image',
  projectLink: '#',
  repoLink: '#',
};

export default ProjectCard;
