import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, closeLabel = 'Fermer la modale', closeOnTouchContentClick = false }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleContentClick = (e) => {
    const isTouchViewport = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const isInteractiveElement = e.target.closest('a, button');

    if (closeOnTouchContentClick && isTouchViewport && !isInteractiveElement) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOutsideClick} aria-modal="true" role="dialog">
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-button" onClick={onClose} aria-label={closeLabel}>
          &times;
        </button>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  closeLabel: PropTypes.string,
  closeOnTouchContentClick: PropTypes.bool,
};

export default Modal;
