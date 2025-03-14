import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Activites.css';

const AjouterActivite = () => {
  const navigate = useNavigate();
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    niveau_difficulte: '',
    image_url: '',
    saison_recommandee: '',
    type_activite_id: ''
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
  const handleSubmit = async (e) => {
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
    
    try {
      // Appeler l'API pour créer une nouvelle activité
      await axios.post('/api/activites', formData);
      
      setSubmitSuccess(true);
      setSubmitting(false);
      
      // Réinitialiser le formulaire après un envoi réussi
      setFormData({
        nom: '',
        description: '',
        niveau_difficulte: '',
        image_url: '',
        saison_recommandee: '',
        type_activite_id: ''
      });
      setValidated(false);
      
      // Rediriger vers la liste des activités après 2 secondes
      setTimeout(() => {
        navigate('/activites');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité:', error);
      setSubmitError('Une erreur est survenue lors de la création de l\'activité. Veuillez réessayer plus tard.');
      setSubmitting(false);
    }
  };

  return (
    <div className="ajouter-activite-page">
      <Container>
        <h1 className="page-title">Ajouter une activité</h1>
        
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            L'activité a été créée avec succès! Vous allez être redirigé vers la liste des activités.
          </Alert>
        )}
        
        {submitError && (
          <Alert variant="danger" className="mb-4">
            {submitError}
          </Alert>
        )}
        
        <Card>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formNom">
                    <Form.Label>Nom de l'activité</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="nom" 
                      value={formData.nom}
                      onChange={handleChange}
                      required 
                      placeholder="Entrez le nom de l'activité"
                    />
                    <Form.Control.Feedback type="invalid">
                      Veuillez entrer un nom pour l'activité.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formNiveauDifficulte">
                    <Form.Label>Niveau de difficulté</Form.Label>
                    <Form.Select 
                      name="niveau_difficulte" 
                      value={formData.niveau_difficulte}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionnez un niveau</option>
                      <option value="debutant">Débutant</option>
                      <option value="intermediaire">Intermédiaire</option>
                      <option value="avance">Avancé</option>
                      <option value="expert">Expert</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Veuillez sélectionner un niveau de difficulté.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-3" controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5} 
                  name="description" 
                  value={formData.description}
                  onChange={handleChange}
                  required 
                  placeholder="Décrivez l'activité"
                />
                <Form.Control.Feedback type="invalid">
                  Veuillez entrer une description.
                </Form.Control.Feedback>
              </Form.Group>
              
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formImageUrl">
                    <Form.Label>URL de l'image</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="image_url" 
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="URL de l'image (facultatif)"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formSaisonRecommandee">
                    <Form.Label>Saison recommandée</Form.Label>
                    <Form.Select 
                      name="saison_recommandee" 
                      value={formData.saison_recommandee}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionnez une saison</option>
                      <option value="Printemps">Printemps</option>
                      <option value="Été">Été</option>
                      <option value="Automne">Automne</option>
                      <option value="Hiver">Hiver</option>
                      <option value="Toutes les saisons">Toutes les saisons</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Veuillez sélectionner une saison recommandée.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              
              <Form.Group className="mb-4" controlId="formTypeActiviteId">
                <Form.Label>Type d'activité</Form.Label>
                <Form.Select 
                  name="type_activite_id" 
                  value={formData.type_activite_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  <option value="1">Loisir</option>
                  <option value="2">Compétition</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Veuillez sélectionner un type d'activité.
                </Form.Control.Feedback>
              </Form.Group>
              
              <div className="d-flex justify-content-between">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/activites')}
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Création en cours...' : 'Créer l\'activité'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AjouterActivite;