import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaMountain, FaFilter, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import './Escalade.css';

const Escalade = () => {
  const [sites, setSites] = useState([]);
  const [filteredSites, setFilteredSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [niveauFilter, setNiveauFilter] = useState('');
  const [emplacementFilter, setEmplacementFilter] = useState('');
  const [tempsFilter, setTempsFilter] = useState('');

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await axios.get('/api/sites-escalade');
        setSites(response.data);
        setFilteredSites(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des sites d\'escalade');
        setLoading(false);
        console.error('Erreur de chargement des sites d\'escalade:', err);
      }
    };

    fetchSites();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = sites;
      
      // Filtre par terme de recherche
      if (searchTerm) {
        result = result.filter(
          site => 
            site.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (site.description && site.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Filtre par niveau de difficulté
      if (niveauFilter) {
        result = result.filter(site => site.niveau_difficulte === niveauFilter);
      }
      
      // Filtre par emplacement
      if (emplacementFilter) {
        result = result.filter(
          site => site.emplacement.toLowerCase().includes(emplacementFilter.toLowerCase())
        );
      }
      
      // Filtre par temps d'ascension
      if (tempsFilter) {
        const [min, max] = tempsFilter.split('-');
        result = result.filter(site => {
          const tempsText = site.temps_ascension || '';
          const tempsMatch = tempsText.match(/(\d+).*?(\d+)?/);
          
          if (tempsMatch) {
            const tempsMin = parseInt(tempsMatch[1], 10);
            const tempsMax = tempsMatch[2] ? parseInt(tempsMatch[2], 10) : tempsMin;
            
            if (max === '5+') {
              return tempsMin >= parseInt(min, 10);
            } else {
              return tempsMin <= parseInt(max, 10) && tempsMax >= parseInt(min, 10);
            }
          }
          return false;
        });
      }
      
      setFilteredSites(result);
    };
    
    applyFilters();
  }, [searchTerm, niveauFilter, emplacementFilter, tempsFilter, sites]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setNiveauFilter('');
    setEmplacementFilter('');
    setTempsFilter('');
  };

  // Fonction pour obtenir la couleur de badge selon le niveau de difficulté
  const getDifficultyBadgeClass = (niveau) => {
    switch (niveau) {
      case 'facile':
        return 'success';
      case 'moyen':
        return 'primary';
      case 'difficile':
        return 'warning';
      case 'experimente':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Fonction pour convertir le niveau de difficulté en texte lisible
  const formatDifficultyLevel = (niveau) => {
    switch (niveau) {
      case 'facile':
        return 'Facile';
      case 'moyen':
        return 'Moyen';
      case 'difficile':
        return 'Difficile';
      case 'experimente':
        return 'Expérimenté';
      default:
        return niveau;
    }
  };

  return (
    <div className="escalade-page">
      <Container>
        <h1 className="page-title">Sites d'Escalade</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Relevez le défi des parois</h2>
            <p>
              Découvrez les meilleurs sites d'escalade des Alpes, adaptés à tous les niveaux,
              des débutants aux grimpeurs chevronnés. Profitez de paysages exceptionnels tout en
              mettant vos compétences à l'épreuve.
            </p>
          </div>
        </div>
        
        {/* Section de filtre */}
        <div className="filter-section">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les sites d'escalade
              </h3>
              <Form>
                <Row>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rechercher</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Nom ou description" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Niveau de difficulté</Form.Label>
                      <Form.Select 
                        value={niveauFilter}
                        onChange={(e) => setNiveauFilter(e.target.value)}
                      >
                        <option value="">Tous les niveaux</option>
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                        <option value="experimente">Expérimenté</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Emplacement</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Région ou ville" 
                        value={emplacementFilter}
                        onChange={(e) => setEmplacementFilter(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Temps d'ascension (heures)</Form.Label>
                      <Form.Select 
                        value={tempsFilter}
                        onChange={(e) => setTempsFilter(e.target.value)}
                      >
                        <option value="">Tous les temps</option>
                        <option value="0-2">Moins de 2h</option>
                        <option value="2-4">2h - 4h</option>
                        <option value="4-5+">Plus de 4h</option>
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
        
        {/* Section des sites d'escalade */}
        <div className="sites-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des sites d'escalade...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredSites.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucun site d'escalade ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir tous les sites</Button>
            </div>
          ) : (
            <Row>
              {filteredSites.map(site => (
                <Col md={6} lg={4} key={site.id} className="mb-4">
                  <Card className="site-card h-100">
                    <div className="site-image-container">
                      <Card.Img 
                        variant="top" 
                        src={site.image_url || '/images/default-climbing.jpg'} 
                        alt={site.nom} 
                        className="site-image"
                      />
                      <Badge 
                        bg={getDifficultyBadgeClass(site.niveau_difficulte)} 
                        className="difficulty-badge"
                      >
                        {formatDifficultyLevel(site.niveau_difficulte)}
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title>{site.nom}</Card.Title>
                      <div className="site-details">
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span>{site.emplacement || 'Emplacement non spécifié'}</span>
                        </div>
                        {site.temps_ascension && (
                          <div className="detail-item">
                            <FaClock className="detail-icon" />
                            <span>{site.temps_ascension}</span>
                          </div>
                        )}
                      </div>
                      <div className="site-description">
                        {site.description ? (
                          site.description.length > 100 
                            ? `${site.description.substring(0, 100)}...` 
                            : site.description
                        ) : (
                          "Informations détaillées sur ce site d'escalade à venir."
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Link to={`/escalade/${site.id}`}>
                        <Button variant="outline-primary" className="w-100">Voir le site</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section des conseils de sécurité */}
        <div className="safety-section">
          <Card className="my-4">
            <Card.Body>
              <h3 className="text-center mb-4">
                <FaExclamationTriangle className="me-2 text-warning" />
                Conseils de sécurité pour l'escalade
              </h3>
              <Row>
                <Col md={4}>
                  <div className="safety-item">
                    <h4>Équipement adéquat</h4>
                    <p>Assurez-vous d'avoir tout l'équipement nécessaire : casque, harnais, cordes, mousquetons, chaussons et magnésie. Vérifiez toujours l'état de votre matériel avant de grimper.</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="safety-item">
                    <h4>Formation et technique</h4>
                    <p>Suivez une formation avec un guide professionnel pour apprendre les techniques d'assurage et de grimpe. Ne surestimez jamais vos capacités et progressez à votre rythme.</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="safety-item">
                    <h4>Conditions et météo</h4>
                    <p>Consultez toujours les prévisions météorologiques et l'état des parois avant de partir. N'hésitez pas à annuler en cas de mauvaises conditions ou d'orage annoncé.</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        
        {/* Section d'appel à l'action */}
        <div className="cta-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Envie d'être accompagné par un guide ?</h3>
              <p>Nos guides expérimentés vous accompagnent sur les plus beaux sites d'escalade des Alpes.</p>
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

export default Escalade;