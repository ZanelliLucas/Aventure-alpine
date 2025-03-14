import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaRoute, FaCalendarAlt, FaClock, FaUserFriends, FaFilter } from 'react-icons/fa';
import './Randonnee.css';

const Randonnee = () => {
  const [itineraires, setItineraires] = useState([]);
  const [filteredItineraires, setFilteredItineraires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les filtres
  const [regionFilter, setRegionFilter] = useState('');
  const [distanceFilter, setDistanceFilter] = useState('');
  const [saisonFilter, setSaisonFilter] = useState('');
  const [guideFilter, setGuideFilter] = useState('');
  
  useEffect(() => {
    const fetchItineraires = async () => {
      try {
        const response = await axios.get('/api/itineraires-randonnee');
        setItineraires(response.data);
        setFilteredItineraires(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des itinéraires de randonnée');
        setLoading(false);
        console.error('Erreur de chargement des itinéraires:', err);
      }
    };

    fetchItineraires();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = itineraires;
      
      // Filtre par région
      if (regionFilter) {
        result = result.filter(
          itineraire => itineraire.region.toLowerCase().includes(regionFilter.toLowerCase())
        );
      }
      
      // Filtre par distance
      if (distanceFilter) {
        const [min, max] = distanceFilter.split('-').map(Number);
        result = result.filter(itineraire => {
          return itineraire.distance_km >= min && itineraire.distance_km <= max;
        });
      }
      
      // Filtre par saison
      if (saisonFilter === 'ete') {
        result = result.filter(itineraire => itineraire.praticable_ete);
      } else if (saisonFilter === 'hiver') {
        result = result.filter(itineraire => itineraire.praticable_hiver);
      }
      
      // Filtre par besoin de guide
      if (guideFilter !== '') {
        const guideNeeded = guideFilter === 'true';
        result = result.filter(itineraire => itineraire.guide_necessaire === guideNeeded);
      }
      
      setFilteredItineraires(result);
    };
    
    applyFilters();
  }, [regionFilter, distanceFilter, saisonFilter, guideFilter, itineraires]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setRegionFilter('');
    setDistanceFilter('');
    setSaisonFilter('');
    setGuideFilter('');
  };

  // Liste de toutes les régions disponibles (pour le filtre)
  const regions = [...new Set(itineraires.map(i => i.region))];

  return (
    <div className="randonnee-page">
      <Container>
        <h1 className="page-title">Randonnées Alpines</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Explorez des sentiers magnifiques</h2>
            <p>
              Découvrez des itinéraires de randonnée exceptionnels à travers les plus beaux paysages des Alpes.
              Que vous soyez débutant ou randonneur expérimenté, nous avons des parcours adaptés à tous les niveaux.
            </p>
          </div>
        </div>
        
        {/* Section de filtre */}
        <div className="filter-section">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les randonnées
              </h3>
              <Form>
                <Row>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Région</Form.Label>
                      <Form.Select 
                        value={regionFilter}
                        onChange={(e) => setRegionFilter(e.target.value)}
                      >
                        <option value="">Toutes les régions</option>
                        {regions.map((region, index) => (
                          <option key={index} value={region}>{region}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Distance (km)</Form.Label>
                      <Form.Select 
                        value={distanceFilter}
                        onChange={(e) => setDistanceFilter(e.target.value)}
                      >
                        <option value="">Toutes les distances</option>
                        <option value="0-5">Moins de 5 km</option>
                        <option value="5-10">5 - 10 km</option>
                        <option value="10-20">10 - 20 km</option>
                        <option value="20-50">20 - 50 km</option>
                        <option value="50-1000">Plus de 50 km</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Saison</Form.Label>
                      <Form.Select 
                        value={saisonFilter}
                        onChange={(e) => setSaisonFilter(e.target.value)}
                      >
                        <option value="">Toutes les saisons</option>
                        <option value="ete">Été</option>
                        <option value="hiver">Hiver</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Guide</Form.Label>
                      <Form.Select 
                        value={guideFilter}
                        onChange={(e) => setGuideFilter(e.target.value)}
                      >
                        <option value="">Tous</option>
                        <option value="true">Guide nécessaire</option>
                        <option value="false">Sans guide</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-end">
                  <Button 
                    variant="outline-secondary" 
                    onClick={resetFilters}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
        
        {/* Section des itinéraires */}
        <div className="itineraires-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des itinéraires...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredItineraires.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucun itinéraire ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir tous les itinéraires</Button>
            </div>
          ) : (
            <Row>
              {filteredItineraires.map(itineraire => (
                <Col md={6} lg={4} key={itineraire.id} className="mb-4">
                  <Card className="itineraire-card h-100">
                    <div className="itineraire-image-container">
                      <Card.Img 
                        variant="top" 
                        src={itineraire.image_url || '/images/default-hiking.jpg'} 
                        alt={itineraire.nom} 
                        className="itineraire-image"
                      />
                      <div className="itineraire-badges">
                        {itineraire.praticable_ete && (
                          <Badge bg="success" className="season-badge">Été</Badge>
                        )}
                        {itineraire.praticable_hiver && (
                          <Badge bg="info" className="season-badge">Hiver</Badge>
                        )}
                        {itineraire.guide_necessaire && (
                          <Badge bg="warning" className="guide-badge">Guide requis</Badge>
                        )}
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{itineraire.nom}</Card.Title>
                      <div className="itineraire-details">
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span>{itineraire.region}</span>
                        </div>
                        <div className="detail-item">
                          <FaRoute className="detail-icon" />
                          <span>{itineraire.distance_km} km</span>
                        </div>
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span title="Départ">De: {itineraire.lieu_depart}</span>
                        </div>
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span title="Arrivée">À: {itineraire.lieu_arrivee}</span>
                        </div>
                        {itineraire.guide_necessaire && itineraire.guide_nom && (
                          <div className="detail-item">
                            <FaUserFriends className="detail-icon" />
                            <span>Guide: {itineraire.guide_prenom} {itineraire.guide_nom}</span>
                          </div>
                        )}
                      </div>
                      <div className="itineraire-description">
                        {itineraire.description ? (
                          itineraire.description.length > 100 
                            ? `${itineraire.description.substring(0, 100)}...` 
                            : itineraire.description
                        ) : (
                          "Découvrez ce magnifique itinéraire de randonnée dans les Alpes."
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Link to={`/randonnee/${itineraire.id}`}>
                        <Button variant="outline-primary" className="w-100">Voir l'itinéraire</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section de conseils */}
        <div className="tips-section">
          <h3>Conseils pour une randonnée réussie</h3>
          <Row>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaMapMarkerAlt />
                </div>
                <h4>Préparez votre itinéraire</h4>
                <p>Étudiez le parcours, la météo et la difficulté avant de partir. Informez toujours quelqu'un de votre itinéraire et de votre heure de retour prévue.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaCalendarAlt />
                </div>
                <h4>Choisissez la bonne saison</h4>
                <p>Certains itinéraires ne sont praticables qu'en été, d'autres sont accessibles toute l'année. Vérifiez les conditions avant votre départ.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaClock />
                </div>
                <h4>Équipez-vous correctement</h4>
                <p>Bonnes chaussures, vêtements adaptés, eau, nourriture et trousse de premiers secours sont essentiels pour toute randonnée en montagne.</p>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Section d'appel à l'action */}
        <div className="cta-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Envie d'une randonnée guidée?</h3>
              <p>Nos guides expérimentés vous accompagnent sur les plus beaux sentiers des Alpes.</p>
              <Link to="/contact">
                <Button variant="primary">Contactez-nous</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Randonnee;