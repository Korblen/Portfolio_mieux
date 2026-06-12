import './PersonalPresentation.css';
import PropTypes from 'prop-types';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import des icônes souhaitées

const PersonalPresentation = ({ profileImage, name, title, description, actionLabels }) => {
  return (
    <section id="accueil" className="personal-presentation" >
      <div className="profile-image-container">
        <img src={profileImage} alt={`${name} Profile`} className="profile-image" />
      </div>
      <div className="presentation-text">
        <h1 className="name">{name}</h1>
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        {/* Section des réseaux sociaux */}
        <div className="social-links">
          <a href="https://www.linkedin.com/in/malo-bastianelli-66360a285/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Korblen" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub />
          </a>
          {/* Ajoutez d'autres réseaux sociaux si nécessaire */}
        </div>
        <div className="action-buttons">
          <a href="#" target="_blank" rel="noopener noreferrer" className="action-button">{actionLabels.downloadCv}</a>
          <a href="#contact" className="action-button">{actionLabels.contact}</a>
        </div>
      </div>
    </section>
  );
};

PersonalPresentation.propTypes = {
  profileImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabels: PropTypes.shape({
    downloadCv: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonalPresentation;
