import './PersonalPresentation.css';
import { FaLinkedin, FaGithub} from 'react-icons/fa'; // Import des icônes souhaitées

const PersonalPresentation = ({ profileImage, name, title, description }) => {
  return (
    <section id="accueil" className="personal-presentation" >
      <div className="profile-image-container">
        <img src={profileImage} alt={`${name} Profile`} className="profile-image" />
      </div>
      <div className="presentation-text">
        <h2 className="name">{name}</h2>
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
          <a href="#" target="_blank" rel="noopener noreferrer" className="action-button">Télécharger CV</a>
          <a href="#" className="action-button">Me Contacter</a>
        </div>
      </div>
    </section>
  );
};

export default PersonalPresentation;
