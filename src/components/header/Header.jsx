import { useEffect, useRef, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ title = 'Mon Portfolio', labels }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const navItems = [
    { href: '#accueil', label: labels.home },
    { href: '#projects', label: labels.projects },
    { href: '#about', label: labels.about },
    { href: '#contact', label: labels.contact },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasPassedHeader = currentScrollY > 96;

      setIsHidden(isScrollingDown && hasPassedHeader && !isMobileMenuOpen);
      lastScrollY.current = Math.max(currentScrollY, 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  return (
    <header className={`navbar ${isHidden ? 'is-hidden' : ''}`}>
      <div className="navbar-content">
        <a className="navbar-brand" href="#accueil" onClick={closeMobileMenu}>
          <span className="brand-mark">MB</span>
          <span className="brand-text">{title}</span>
        </a>

        <nav id="main-navigation" className={`nav-links ${isMobileMenuOpen ? 'is-open' : ''}`} aria-label={labels.mainNavigation}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMobileMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          type="button"
          aria-label={isMobileMenuOpen ? labels.menuClose : labels.menuOpen}
          aria-expanded={isMobileMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
      {isMobileMenuOpen && <button className="nav-backdrop" type="button" aria-label={labels.menuClose} onClick={closeMobileMenu} />}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.shape({
    home: PropTypes.string.isRequired,
    projects: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    menuOpen: PropTypes.string.isRequired,
    menuClose: PropTypes.string.isRequired,
    mainNavigation: PropTypes.string.isRequired,
  }).isRequired,
};

export default Header;
