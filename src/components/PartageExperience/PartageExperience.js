import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaCamera, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaComments } from 'react-icons/fa';
import './PartageExperience.css';

const PartageExperience = () => {
  // État pour les expériences partagées
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // État pour le formulaire
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    sport: '',
    lieu: '',
    date: '',
    image: null
  });
  
  // État pour la soumission du formulaire
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [validated, setValidated] = useState(false);
  
  // État pour l'affichage
  const [showForm, setShowForm] = useState(false);
  
  // Récupération des expériences partagées
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Dans une application réelle, cette URL serait vers votre API
        // Ici, je simule des données pour la démo
        // const response = await axios.get('/api/partage-experience');
        // setExperiences(response.data);
        
        // Données simulées
        const mockExperiences = [
          {
            id: 1,
            titre: "Ascension du Mont Blanc",
            contenu: "Un périple inoubliable de 3 jours d'ascension jusqu'au sommet du Mont Blanc. Le panorama au sommet est à couper le souffle, on se sent vraiment tout petit face à l'immensité des Alpes. Je conseille vivement cette expérience à tout randonneur expérimenté!",
            sport: "Alpinisme",
            lieu: "Chamonix, France",
            date: "2023-07-15",
            user: {
              nom: "Jean Dupont"
            },
            image_url: "/images/experience-1.jpg",
            comments: 5
          },
          {
            id: 2,
            titre: "Ski hors-piste à La Grave",
            contenu: "Une journée exceptionnelle de ski hors-piste à La Grave avec de la poudreuse à perte de vue. Les conditions étaient parfaites et le guide très professionnel. À refaire sans hésiter!",
            sport: "Ski",
            lieu: "La Grave, France",
            date: "2023-02-10",
            user: {
              nom: "Marie Martin"
            },
            image_url: "/images/experience-2.jpg",
            comments: 3
          },
          {
            id: 3,
            titre: "Voie Rebuffat au Clocher de la Vanoise",
            contenu: "Belle journée d'escalade sur cette voie mythique. Quelques passages techniques mais accessibles avec un bon niveau. Vue imprenable sur toute la vallée!",
            sport: "Escalade",
            lieu: "Pralognan-la-Vanoise, France",
            date: "2023-08-05",
            user: {
              nom: "Thomas Durand"
            },
            image_url: "/images/experience-3.jpg",
            comments: 7
          }
        ];
        
        setExperiences(mockExperiences);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des expériences partagées');
        setLoading(false);
        console.error('Erreur de chargement des expériences:', err);
      }
    };

    fetchExperiences();
  }, []);

  // Gestion du changement dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Gestion du téléchargement d'image
  const handleImageChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    setSubmitting(true);
    
    try {
      // Dans une application réelle, vous feriez une requête POST vers votre API
      // Simulation d'une soumission réussie
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Ajoutez la nouvelle expérience au début de la liste (dans une application réelle,
      // vous récupéreriez l'ID de l'API)
      const newExperience = {
        id: Date.now(),  // Génère un ID temporaire
        titre: formData.titre,
        contenu: formData.contenu,
        sport: formData.sport,
        lieu: formData.lieu,
        date: formData.date,
        user: {
          nom: "Utilisateur actuel"  // Dans une application réelle, cela viendrait de l'authentification
        },
        image_url: formData.image ? URL.createObjectURL(formData.image) : "/images/default-experience.jpg",
        comments: 0
      };
      
      setExperiences([newExperience, ...experiences]);
      setSubmitSuccess(true);
      setFormData({
        titre: '',
        contenu: '',
        sport: '',
        lieu: '',
        date: '',
        image: null
      });
      setValidated(false);
      setShowForm(false);
      
      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      setSubmitError('Une erreur est survenue lors de la publication de votre expérience');
      console.error('Erreur lors de la soumission:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="partage-experience-page">
      <Container>
        <h1 className="page-title">Partagez Vos Aventures</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Inspirez la communauté avec vos récits</h2>
            <p>
              Partagez vos plus belles aventures alpines, vos conseils et vos photos.
              Inspirez d'autres passionnés et rejoignez une communauté active d'amoureux de la montagne.
            </p>
          </div>
        </div>
        
        {/* Messages de succès/erreur */}
        {submitSuccess && (
          <Alert variant="success" className="mb-4">
            Votre expérience a été partagée avec succès ! Merci pour votre contribution.
          </Alert>
        )}
        
        {submitError && (
          <Alert variant="danger" className="mb-4">
            {submitError}
          </Alert>
        )}
        
        {/* Bouton pour afficher/masquer le formulaire */}
        <div className="text-center mb-4">
          <Button 
            variant={showForm ? "secondary" : "primary"} 
            size="lg"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Annuler" : "Partager mon expérience"}
          </Button>
        </div>
        
        {/* Formulaire de partage d'expérience */}
        {showForm && (
          <div className="form-section mb-5">
            <Card>
              <Card.Body>
                <h3 className="form-title">Racontez votre aventure</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={8}>
                      <Form.Group className="mb-3" controlId="formTitle">
                        <Form.Label>Titre de votre aventure</Form.Label>
                        <Form.Control
                          type="text"
                          name="titre"
                          value={formData.titre}
                          onChange={handleChange}
                          placeholder="Un titre accrocheur pour votre expérience"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Veuillez donner un titre à votre aventure.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="formSport">
                        <Form.Label>Sport</Form.Label>
                        <Form.Select
                          name="sport"
                          value={formData.sport}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Sélectionnez un sport</option>
                          <option value="Randonnée">Randonnée</option>
                          <option value="Escalade">Escalade</option>
                          <option value="Ski">Ski</option>
                          <option value="Alpinisme">Alpinisme</option>
                          <option value="Autre">Autre</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Veuillez sélectionner un sport.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formLocation">
                        <Form.Label>Lieu</Form.Label>
                        <Form.Control
                          type="text"
                          name="lieu"
                          value={formData.lieu}
                          onChange={handleChange}
                          placeholder="Où s'est déroulée votre aventure?"
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Veuillez indiquer le lieu de votre aventure.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Veuillez indiquer la date de votre aventure.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="formContent">
                    <Form.Label>Votre récit</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="contenu"
                      value={formData.contenu}
                      onChange={handleChange}
                      placeholder="Partagez les détails de votre expérience, vos impressions, vos conseils..."
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Veuillez rédiger votre récit.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="formImage">
                    <Form.Label>Photo de votre aventure</Form.Label>
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                    <Form.Text className="text-muted">
                      Ajoutez une photo pour illustrer votre expérience (facultatif).
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2"
                    >
                      {submitting ? 'Publication en cours...' : 'Publier mon expérience'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        )}
        
        {/* Liste des expériences partagées */}
        <div className="experiences-section">
          <h2 className="section-title">Expériences de la communauté</h2>
          
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des expériences partagées...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : experiences.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucune expérience n'a encore été partagée.</p>
              <p>Soyez le premier à partager votre aventure !</p>
            </div>
          ) : (
            <Row>
              {experiences.map(experience => (
                <Col md={6} lg={4} key={experience.id} className="mb-4">
                  <Card className="experience-card h-100">
                    <div className="experience-image-container">
                      <Card.Img 
                        variant="top" 
                        src={experience.image_url || '/images/default-experience.jpg'} 
                        alt={experience.titre} 
                        className="experience-image"
                      />
                      <div className="experience-sport-badge">
                        {experience.sport}
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{experience.titre}</Card.Title>
                      <div className="experience-meta">
                        <div className="meta-item">
                          <FaMapMarkerAlt className="meta-icon" />
                          <span>{experience.lieu}</span>
                        </div>
                        <div className="meta-item">
                          <FaCalendarAlt className="meta-icon" />
                          <span>{formatDate(experience.date)}</span>
                        </div>
                        <div className="meta-item">
                          <FaUser className="meta-icon" />
                          <span>{experience.user.nom}</span>
                        </div>
                      </div>
                      <div className="experience-content">
                        {experience.contenu.length > 150 
                          ? `${experience.contenu.substring(0, 150)}...` 
                          : experience.contenu
                        }
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="comments-count">
                          <FaComments className="meta-icon" />
                          <span>{experience.comments} commentaires</span>
                        </div>
                        <Button variant="outline-primary" size="sm">Lire plus</Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section d'encouragement */}
        <div className="encouragement-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Vous avez vécu une aventure alpine mémorable ?</h3>
              <p>N'hésitez pas à partager votre expérience ! Vos récits peuvent inspirer et guider d'autres passionnés de montagne.</p>
              {!showForm && (
                <Button 
                  variant="primary"
                  onClick={() => {
                    setShowForm(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  Partager mon expérience
                </Button>
              )}
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default PartageExperience;