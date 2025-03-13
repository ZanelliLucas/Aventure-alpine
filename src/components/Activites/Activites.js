import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaFilter } from 'react-icons/fa';
import './Activites.css';

const Activites = () => {
  const [activites, setActivites] = useState([]);
  const [filteredActivites, setFilteredActivites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [difficulteFilter, setDifficulteFilter] = useState('');
  const [saisonFilter, setSaisonFilter] = useState('');

  useEffect(() => {
    const fetchActivites = async () => {
      try {
        const response = await axios.get('/api/activites');
        setActivites(response.data);
        setFilteredActivites(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des activités');
        setLoading(false);
        console.error('Erreur de chargement des activités:', err);
      }
    };

    fetchActivites();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = activites;
      
      // Filtre par terme de recherche
      if (searchTerm) {
        result = result.filter(
          activite => 
            activite.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activite.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtre par niveau de difficulté
      if (difficulteFilter) {
        result = result.filter(activite => activite.niveau_difficulte === difficulteFilter);
      }
      
      // Filtre par saison
      if (saisonFilter) {
        result = result.filter(activite => 
          activite.saison_recommandee && 
          activite.saison_recommandee.toLowerCase().includes(saisonFilter.toLowerCase())
        );
      }
      
      setFilteredActivites(result);
    };
    
    applyFilters();
  }, [searchTerm, difficulteFilter, saisonFilter, activites]);

  // Fonction pour gérer la soumission du formulaire de recherche
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // La recherche est déjà appliquée via l'effet ci-dessus
  };

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setDifficulteFilter('');
    setSaisonFilter('');
  };

  // Fonction pour obtenir la couleur de badge selon le niveau de difficulté
  const getDifficultyBadgeClass = (niveau) => {
    switch (niveau) {
      case 'debutant':
        return 'badge-success';
      case 'intermediaire':
        return 'badge-primary';
      case 'avance':
        return 'badge-warning';
      case 'expert':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  // Fonction pour convertir le niveau de difficulté en texte lisible
  const formatDifficultyLevel = (niveau) => {
    switch (niveau) {
      case 'debutant':
        return 'Débutant';
      case 'intermediaire':
        return 'Intermédiaire';
      case 'avance':
        return 'Avancé';
      case 'expert':
        return 'Expert';
      default:
        return niveau;
    }
  };

  return (
    <div className="activites-page">
      <Container>
        <h1 className="page-title">Nos Activités</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Découvrez Nos Aventures en Montagne</h2>
            <p>
              Explorez une variété d'activités pour tous les niveaux, des randonnées tranquilles
              aux défis d'escalade exigeants, en passant par les sensations du ski alpin.
            </p>
          </div>
        </div>
        
        {/* Section de filtre et recherche */}
        <div className="filter-section">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les activités
              </h3>
              <Form onSubmit={handleSearchSubmit}>
                <Row>
                  <Col md={6} lg={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rechercher</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Entrez un mot-clé" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Niveau de difficulté</Form.Label>
                      <Form.Select 
                        value={difficulteFilter}
                        onChange={(e) => setDifficulteFilter(e.target.value)}
                      >
                        <option value="">Tous les niveaux</option>
                        <option value="debutant">Débutant</option>
                        <option value="intermediaire">Intermédiaire</option>
                        <option value="avance">Avancé</option>
                        <option value="expert">Expert</option>
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
                        <option value="automne">Automne</option>
                        <option value="hiver">Hiver</option>
                        <option value="printemps">Printemps</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6} lg={2} className="d-flex align-items-end mb-3">
                    <Button 
                      variant="outline-secondary" 
                      className="w-100"
                      onClick={resetFilters}
                    >
                      Réinitialiser
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
        
        {/* Section d'affichage des activités */}
        <div className="activites-list-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des activités...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredActivites.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucune activité ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir toutes les activités</Button>
            </div>
          ) : (
            <Row>
              {filteredActivites.map(activite => (
                <Col sm={6} lg={4} key={activite.id} className="mb-4">
                  <Card className="activity-card h-100">
                    <div className="activity-image-container">
                      <Card.Img 
                        variant="top" 
                        src={activite.image_url || '/images/default-activity.jpg'} 
                        alt={activite.nom} 
                        className="activity-image"
                      />
                      <span className={`difficulty-badge ${getDifficultyBadgeClass(activite.niveau_difficulte)}`}>
                        {formatDifficultyLevel(activite.niveau_difficulte)}
                      </span>
                    </div>
                    <Card.Body>
                      <Card.Title>{activite.nom}</Card.Title>
                      <Card.Text className="activity-description">
                        {activite.description.length > 120 
                          ? `${activite.description.substring(0, 120)}...` 
                          : activite.description
                        }
                      </Card.Text>
                      {activite.saison_recommandee && (
                        <p className="season-info">
                          <span className="text-muted">Saison recommandée:</span> {activite.saison_recommandee}
                        </p>
                      )}
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0 d-flex justify-content-between align-items-center">
                      <div className="rating">
                        <FaStar className="rating-star" />
                        <FaStar className="rating-star" />
                        <FaStar className="rating-star" />
                        <FaStar className="rating-star" />
                        <FaStar className="rating-star-half" />
                        <span className="rating-count">(24)</span>
                      </div>
                      <Link to={`/activites/${activite.id}`}>
                        <Button variant="outline-primary">En savoir plus</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section d'appel à l'action */}
        <div className="cta-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Vous ne trouvez pas ce que vous cherchez?</h3>
              <p>N'hésitez pas à nous contacter pour une activité personnalisée selon vos besoins et préférences.</p>
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

export default Activites;