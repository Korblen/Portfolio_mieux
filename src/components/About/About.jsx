import './About.css';
import PropTypes from 'prop-types';
import {
  FaCloud,
  FaDatabase,
  FaKeyboard,
  FaLanguage,
  FaLaptopCode,
  FaLinux,
  FaMusic,
  FaNetworkWired,
  FaPython,
  FaServer,
  FaShieldAlt,
  FaTerminal,
  FaWindows,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import japaneseFlag from '/assets/flags/japanese.png';
import englishFlag from '/assets/flags/english.png';
import frenchFlag from '/assets/flags/french.png';
import italianFlag from '/assets/flags/italian.png';

const skillIcons = [
  FaServer,
  FaNetworkWired,
  FaShieldAlt,
  FaLinux,
  FaWindows,
  FaPython,
  FaTerminal,
  FaDatabase,
  FaCloud,
];

const interestIcons = [FaKeyboard, FaMusic, FaLaptopCode, FaLanguage];

const languages = [
  {
    code: 'fr',
    flag: frenchFlag,
    alt: 'Drapeau Français',
  },
  {
    code: 'en',
    flag: englishFlag,
    alt: 'Drapeau Anglais',
  },
  {
    code: 'ja',
    flag: japaneseFlag,
    alt: 'Drapeau Japonais',
  },
  {
    code: 'it',
    flag: italianFlag,
    alt: 'Drapeau Italien',
  },
];

const About = ({ currentLanguage, onLanguageChange, labels }) => {
  const canHover = typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const skillMotion = canHover
    ? {
        whileHover: { scale: 1.1 },
        transition: { type: 'spring', stiffness: 300 },
      }
    : {};

  const interestMotion = canHover
    ? {
        whileHover: { scale: 1.05 },
        transition: { type: 'spring', stiffness: 300 },
      }
    : {};

  return (
    <section id="about" >
      <div className="about-container">
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Introduction */}
          <h2>{labels.title}</h2>
          <p>{labels.intro}</p>

          {/* Compétences */}
          <h3>{labels.skillsTitle}</h3>
          <div className="skills">
            {labels.skills.map(([label, tooltip], index) => {
              const Icon = skillIcons[index];

              return (
                <motion.div
                  className="skill"
                  key={label}
                  {...skillMotion}
                >
                  <Icon className="skill-icon" />
                  <span>{label}</span>
                  <span className="tooltip">{tooltip}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Centres d'Intérêt */}
          <h3>{labels.interestsTitle}</h3>
          <div className="interests">
            {labels.interests.map(([label, tooltip], index) => {
              const Icon = interestIcons[index];

              return (
                <motion.div
                  className="interest"
                  key={label}
                  {...interestMotion}
                >
                  <Icon className="interest-icon" />
                  <span>{label}</span>
                  <span className="tooltip">{tooltip}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Langues */}
          <h3>{labels.languagesTitle}</h3>
          <div className="languages">
            <ul>
              {languages.map((language) => (
                <li key={language.code}>
                  <motion.button
                    className={`language-card ${currentLanguage === language.code ? 'is-active' : ''}`}
                    type="button"
                    aria-pressed={currentLanguage === language.code}
                    onClick={() => onLanguageChange(language.code)}
                    {...skillMotion}
                  >
                    <img src={language.flag} alt={language.alt} className="language-flag" />
                    <span>{labels.languages[language.code][0]}</span>
                    <span className="tooltip">{labels.languages[language.code][1]}</span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

About.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    intro: PropTypes.string.isRequired,
    skillsTitle: PropTypes.string.isRequired,
    interestsTitle: PropTypes.string.isRequired,
    languagesTitle: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    interests: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    languages: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }).isRequired,
};

export default About;
