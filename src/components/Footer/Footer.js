import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-column">
            <h4 className="footer-title">Aventures Alpines</h4>
            <p>
              Votre partenaire de confiance pour toutes vos aventures en montagne. 
              Que vous soyez débutant ou expert, nous vous accompagnons dans vos 
              découvertes alpines.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </Col>
          
          <Col md={4} className="footer-column">
            <h4 className="footer-title">Liens Rapides</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">Accueil</Link>
              </li>
              <li>
                <Link to="/activites">Activités</Link>
              </li>
              <li>
                <Link to="/randonnee">Randonnée</Link>
              </li>
              <li>
                <Link to="/escalade">Escalade</Link>
              </li>
              <li>
                <Link to="/ski">Ski</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-column">
            <h4 className="footer-title">Contact</h4>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Rue des Montagnes, 74000 Chamonix, France</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>+33 4 12 34 56 78</span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>contact@aventures-alpines.fr</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Aventures Alpines. Tous droits réservés.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;