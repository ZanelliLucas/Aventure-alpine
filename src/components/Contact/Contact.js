import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  // États pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: ''
  });
  
  // États pour la validation et l'envoi
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    // Vérifier la validation du formulaire
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setSubmitting(true);
    
    // Simuler une requête API (remplacer par une vraie requête API)
    setTimeout(() => {
      try {
        // Ici, vous pouvez appeler votre API réelle pour envoyer le formulaire
        console.log('Formulaire envoyé avec succès:', formData);
        setSubmitSuccess(true);
        setSubmitting(false);
        
        // Réinitialiser le formulaire après un envoi réussi
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          sujet: '',
          message: ''
        });
        setValidated(false);
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        setSubmitError('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard.');
        setSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="contact-page">
      <Container>
        <h1 className="page-title">Contactez-nous</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Nous sommes à votre écoute</h2>
            <p>
              Des questions sur nos activités? Besoin d'informations supplémentaires? 
              Nous sommes là pour vous aider à planifier votre prochaine aventure alpine.
            </p>
          </div>
        </div>
        
        <Row className="mt-5">
          {/* Informations de contact */}
          <Col lg={4} className="mb-4">
            <div className="contact-info-section">
              <Card className="contact-info-card">
                <Card.Body>
                  <h3 className="card-title">Coordonnées</h3>
                  <ul className="contact-info-list">
                    <li>
                      <FaMapMarkerAlt className="contact-icon" />
                      <div>
                        <strong>Adresse</strong>
                        <p>123 Rue des Montagnes, 74000 Chamonix, France</p>
                      </div>
                    </li>
                    <li>
                      <FaPhone className="contact-icon" />
                      <div>
                        <strong>Téléphone</strong>
                        <p>+33 4 12 34 56 78</p>
                      </div>
                    </li>
                    <li>
                      <FaEnvelope className="contact-icon" />
                      <div>
                        <strong>Email</strong>
                        <p>contact@aventures-alpines.fr</p>
                      </div>
                    </li>
                    <li>
                      <FaClock className="contact-icon" />
                      <div>
                        <strong>Horaires d'ouverture</strong>
                        <p>Lundi - Vendredi: 9h00 - 18h00</p>
                        <p>Samedi: 10h00 - 16h00</p>
                        <p>Dimanche: Fermé</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              
              <Card className="mt-4 faqs-card">
                <Card.Body>
                  <h3 className="card-title">Questions fréquentes</h3>
                  <div className="faqs-list">
                    <div className="faq-item">
                      <h4>Comment réserver une activité?</h4>
                      <p>Vous pouvez réserver directement en ligne ou nous contacter par téléphone.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Quel équipement est fourni?</h4>
                      <p>L'équipement technique est généralement fourni. Un détail complet est disponible sur chaque page d'activité.</p>
                    </div>
                    <div className="faq-item">
                      <h4>Politique d'annulation?</h4>
                      <p>Annulation gratuite jusqu'à 48h avant le début de l'activité.</p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          
          {/* Formulaire de contact */}
          <Col lg={8}>
            <Card className="contact-form-card">
              <Card.Body>
                <h3 className="card-title">Envoyez-nous un message</h3>
                <p className="card-subtitle">Nous vous répondrons dans les plus brefs délais.</p>
                
                {submitSuccess && (
                  <Alert variant="success" className="mb-4">
                    <FaCheck className="me-2" />
                    Votre message a été envoyé avec succès! Nous vous contacterons très bientôt.
                  </Alert>
                )}
                
                {submitError && (
                  <Alert variant="danger" className="mb-4">
                    {submitError}
                  </Alert>
                )}
                
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Nom complet</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="nom" 
                          value={formData.nom}
                          onChange={handleChange}
                          required 
                          placeholder="Votre nom"
                        />
                        <Form.Control.Feedback type="invalid">
                          Veuillez entrer votre nom.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          value={formData.email}
                          onChange={handleChange}
                          required 
                          placeholder="votre.email@exemple.com"
                        />
                        <Form.Control.Feedback type="invalid">
                          Veuillez entrer une adresse email valide.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPhone">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control 
                          type="tel" 
                          name="telephone" 
                          value={formData.telephone}
                          onChange={handleChange}
                          placeholder="Votre numéro de téléphone (optionnel)"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formSubject">
                        <Form.Label>Sujet</Form.Label>
                        <Form.Select 
                          name="sujet" 
                          value={formData.sujet}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Sélectionnez un sujet</option>
                          <option value="information">Demande d'information</option>
                          <option value="reservation">Réservation</option>
                          <option value="annulation">Annulation</option>
                          <option value="reclamation">Réclamation</option>
                          <option value="autre">Autre</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Veuillez sélectionner un sujet.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-4" controlId="formMessage">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      required 
                      placeholder="Votre message..."
                    />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer votre message.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="formConsent">
                    <Form.Check
                      type="checkbox"
                      label="J'accepte que mes données soient utilisées pour traiter ma demande."
                      required
                      feedback="Vous devez accepter avant de soumettre."
                      feedbackType="invalid"
                    />
                  </Form.Group>
                  
                  <div className="text-center">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      className="submit-button"
                      disabled={submitting}
                    >
                      {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Carte Google Maps */}
        <div className="map-section">
          <h3 className="section-title">Nous trouver</h3>
          <div className="map-container">
            <iframe
              title="Localisation Aventures Alpines"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2770.6357169407464!2d6.867688215337602!3d45.9236569791085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47894e7da9a2f35d%3A0xc0a2bdb7a8a1903d!2sChamonix-Mont-Blanc%2C%20France!5e0!3m2!1sfr!2sfr!4v1616796684805!5m2!1sfr!2sfr"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;