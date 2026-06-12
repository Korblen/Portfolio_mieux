import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Header.css';

const navItems = [
  { href: '#accueil', label: 'Accueil' },
  { href: '#projects', label: 'Projets' },
  { href: '#about', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
];

const Header = ({ title = 'Mon Portfolio' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="navbar" id="accueil">
      <div className="navbar-content">
        <a className="navbar-brand" href="#accueil" onClick={closeMobileMenu}>
          <span className="brand-mark">MB</span>
          <span className="brand-text">{title}</span>
        </a>

        <nav id="main-navigation" className={`nav-links ${isMobileMenuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
      {isMobileMenuOpen && <button className="nav-backdrop" type="button" aria-label="Fermer le menu" onClick={closeMobileMenu} />}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
