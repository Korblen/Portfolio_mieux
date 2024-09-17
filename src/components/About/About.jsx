import './About.css';
import { FaReact, FaNodeJs, FaPython, FaGem } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiCplusplus, SiRuby, SiJavascript } from 'react-icons/si';
import { motion } from 'framer-motion';
import japaneseFlag from '/assets/flags/japanese.png';
import englishFlag from '/assets/flags/english.png';

const About = () => {
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
          <h2>À Propos de Moi</h2>
          <p>
            Bonjour ! Je m'appelle Malo Bastianelli, développeur Full-Stack passionné. Avec une solide expérience en React et Node.js, je crée des applications web performantes et esthétiques qui offrent une excellente expérience utilisateur.
          </p>

          {/* Compétences */}
          <h3>Compétences</h3>
          <div className="skills">
            {/* Exemple de compétence avec tooltip */}
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaReact className="skill-icon" />
              <span>React</span>
              <span className="tooltip">Développement Frontend avec React</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaNodeJs className="skill-icon" />
              <span>Node.js</span>
              <span className="tooltip">Développement Backend avec Node.js</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SiJavascript className="skill-icon" />
              <span>Javascript</span>
              <span className="tooltip">Programmation en Javascript</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SiRuby className="skill-icon" />
              <span>Ruby</span>
              <span className="tooltip">Programmation en Ruby</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaGem className="skill-icon" />
              <span>Ruby on Rails</span>
              <span className="tooltip">Framework Ruby on Rails</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaPython className="skill-icon" />
              <span>Python</span>
              <span className="tooltip">Programmation en Python</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SiTypescript className="skill-icon" />
              <span>TypeScript</span>
              <span className="tooltip">Développement avec TypeScript</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SiNextdotjs className="skill-icon" />
              <span>Next.js</span>
              <span className="tooltip">Framework Next.js pour React</span>
            </motion.div>
            <motion.div
              className="skill"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <SiCplusplus className="skill-icon" />
              <span>C & C++</span>
              <span className="tooltip">Apprentissage de C et C++</span>
            </motion.div>
          </div>

          {/* Centres d'Intérêt */}
          <h3>Centres d'Intérêt</h3>
          <div className="interests">
            <motion.div
              className="interest"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Design Graphique</span>
              <span className="tooltip">Création de visuels attrayants</span>
            </motion.div>
            <motion.div
              className="interest"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Développement Web</span>
              <span className="tooltip">Création de sites et d'applications web</span>
            </motion.div>
            <motion.div
              className="interest"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Gestion de Bases de Données</span>
              <span className="tooltip">Optimisation et administration des bases de données</span>
            </motion.div>
            <motion.div
              className="interest"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span>Création d'Interfaces</span>
              <span className="tooltip">Design d'interfaces utilisateur intuitives</span>
            </motion.div>
          </div>

          {/* Langues */}
          <h3>Langues</h3>
          <div className="languages">
            <ul>
              <li>
                <motion.div
                  className="language-card"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={japaneseFlag} alt="Drapeau Japonais" className="language-flag" />
                  <span>Japonais (Apprentissage en cours)</span>
                  <span className="tooltip">Compétences en japonais en cours de développement</span>
                </motion.div>
              </li>
              <li>
                <motion.div
                  className="language-card"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={englishFlag} alt="Drapeau Anglais" className="language-flag" />
                  <span>Anglais (Courant)</span>
                  <span className="tooltip">Maîtrise complète de l'anglais</span>
                </motion.div>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
