import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="not-found-page py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8} lg={6}>
            <div className="error-container">
              <h1 className="display-1 fw-bold text-primary">404</h1>
              <h2 className="mb-4">Page non trouvée</h2>
              <p className="lead mb-4">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
              </p>
              <p className="mb-5">
                Vous pouvez revenir à la page d'accueil ou utiliser notre formulaire de recherche pour trouver ce que vous cherchez.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/">
                  <Button variant="primary" size="lg">
                    <FaHome className="me-2" /> Accueil
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline-primary" size="lg">
                    <FaSearch className="me-2" /> Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col md={12}>
            <div className="suggestions-container p-4 bg-light rounded text-center">
              <h3 className="mb-3">Vous pourriez être intéressé par</h3>
              <Row className="justify-content-center">
                <Col xs={6} md={3} className="mb-3">
                  <Link to="/randonnee" className="text-decoration-none">
                    <div className="suggestion-item p-3 bg-white rounded shadow-sm">
                      <h5>Randonnées</h5>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={3} className="mb-3">
                  <Link to="/escalade" className="text-decoration-none">
                    <div className="suggestion-item p-3 bg-white rounded shadow-sm">
                      <h5>Escalade</h5>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={3} className="mb-3">
                  <Link to="/ski" className="text-decoration-none">
                    <div className="suggestion-item p-3 bg-white rounded shadow-sm">
                      <h5>Ski</h5>
                    </div>
                  </Link>
                </Col>
                <Col xs={6} md={3} className="mb-3">
                  <Link to="/blog" className="text-decoration-none">
                    <div className="suggestion-item p-3 bg-white rounded shadow-sm">
                      <h5>Blog</h5>
                    </div>
                  </Link>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;