import { useState, useRef } from 'react';
import './Contact.css';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha'; // Import du reCAPTCHA
import PropTypes from 'prop-types';

const Contact = ({ labels }) => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null); // Stocke la valeur du CAPTCHA

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value); // Met à jour la valeur du CAPTCHA
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Vérification que le CAPTCHA est validé
    if (!captchaValue) {
      alert(labels.captchaAlert);
      return;
    }

    emailjs.sendForm(
      import.meta.env.VITE_SERVICE_ID, 
      import.meta.env.VITE_TEMPLATE_ID, 
      form.current, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then((result) => {
          console.log(result.text);
          setIsSent(true);
          setIsError(false);
          form.current.reset();
          setCaptchaValue(null); // Réinitialise le CAPTCHA après envoi
      }, (error) => {
          console.log(error.text);
          setIsSent(false);
          setIsError(true);
      });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>{labels.title}</h2>
          <form ref={form} onSubmit={sendEmail} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">{labels.name}</label>
              <input type="text" id="name" name="from_name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{labels.email}</label>
              <input type="email" id="email" name="from_email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{labels.message}</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <div className="form-group captcha-group">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} // Utilise la clé du site reCAPTCHA
                onChange={handleCaptchaChange}
              />
            </div>
            <button type="submit" className="submit-button">{labels.submit}</button>
          </form>
          {isSent && <p className="success-message">{labels.success}</p>}
          {isError && <p className="error-message">{labels.error}</p>}
        </motion.div>
      </div>
    </section>
  );
};

Contact.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    submit: PropTypes.string.isRequired,
    success: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    captchaAlert: PropTypes.string.isRequired,
  }).isRequired,
};

export default Contact;
