import './PersonalPresentation.css';
import PropTypes from 'prop-types';

const PersonalPresentation = ({ profileImage, name, title, description, resumeLink, contactLink }) => {
  return (
    <section className="personal-presentation">
      <div className="profile-image-container">
        <img src={profileImage} alt={`${name} Profile`} className="profile-image" />
      </div>
      <div className="presentation-text">
        <h2 className="name">{name}</h2>
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="action-buttons">
          <a href={resumeLink} target="_blank" rel="noopener noreferrer" className="action-button">Télécharger CV</a>
          <a href={contactLink} className="action-button">Me Contacter</a>
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
  resumeLink: PropTypes.string,
  contactLink: PropTypes.string,
};

PersonalPresentation.defaultProps = {
  resumeLink: '#',
  contactLink: '#',
};

export default PersonalPresentation;
