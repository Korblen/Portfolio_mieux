import { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ title = 'Mon Portfolio' }) => {
  const [points, setPoints] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const generatePoint = () => {
      const id = Date.now() + Math.random(); // Assurez une unicité
      const sides = ['top', 'bottom', 'left', 'right'];
      const side = sides[Math.floor(Math.random() * sides.length)];
      const position = {
        top: side === 'top' || side === 'bottom' ? `${Math.random() * 100}%` : `${Math.random() * 100}%`,
        left: side === 'left' || side === 'right' ? `${Math.random() * 100}%` : `${Math.random() * 100}%`,
      };

      const newPoint = {
        id,
        side,
        position,
      };

      setPoints((prevPoints) => [...prevPoints, newPoint]);

      // Supprimer le point après la durée de l'animation (3s)
      setTimeout(() => {
        setPoints((prevPoints) => prevPoints.filter((point) => point.id !== id));
      }, 3000);
    };

    const interval = setInterval(generatePoint, 300); // Génère un point toutes les 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <h1>{title}</h1>
        </div>
        <nav className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#accueil" onClick={() => setIsMobileMenuOpen(false)}>Accueil</a>
          <a href="#projets" onClick={() => setIsMobileMenuOpen(false)}>Projets</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>À propos</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
        </nav>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
      {/* Conteneur pour les points lumineux */}
      <div className="points-container">
        {points.map((point) => (
          <div
            key={point.id}
            className={`point ${point.side}`}
            style={{
              top: point.position.top,
              left: point.position.left,
            }}
          ></div>
        ))}
      </div>
    </header>
  );
};

export default Header;
