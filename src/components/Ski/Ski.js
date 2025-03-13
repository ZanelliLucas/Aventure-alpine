import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMapMarkerAlt, FaSnowflake, FaFilter, FaMountain } from 'react-icons/fa';
import './Ski.css';

const Ski = () => {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [typePisteFilter, setTypePisteFilter] = useState('');
  const [emplacementFilter, setEmplacementFilter] = useState('');
  const [remonteesFilter, setRemonteesFilter] = useState('');

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await axios.get('/api/stations-ski');
        setStations(response.data);
        setFilteredStations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des stations de ski');
        setLoading(false);
        console.error('Erreur de chargement des stations de ski:', err);
      }
    };

    fetchStations();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = stations;
      
      // Filtre par terme de recherche
      if (searchTerm) {
        result = result.filter(
          station => 
            station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (station.description && station.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      // Filtre par type de piste
      if (typePisteFilter) {
        result = result.filter(station => station.type_piste === typePisteFilter);
      }
      
      // Filtre par emplacement
      if (emplacementFilter) {
        result = result.filter(
          station => station.emplacement.toLowerCase().includes(emplacementFilter.toLowerCase())
        );
      }
      
      // Filtre par remontées mécaniques
      if (remonteesFilter !== '') {
        const hasRemonteesFilter = remonteesFilter === 'true';
        result = result.filter(station => station.remontees_mecaniques === hasRemonteesFilter);
      }
      
      setFilteredStations(result);
    };
    
    applyFilters();
  }, [searchTerm, typePisteFilter, emplacementFilter, remonteesFilter, stations]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setTypePisteFilter('');
    setEmplacementFilter('');
    setRemonteesFilter('');
  };

  // Fonction pour obtenir la couleur de badge selon le type de piste
  const getPisteBadgeClass = (typePiste) => {
    switch (typePiste) {
      case 'verte':
        return 'success';
      case 'bleue':
        return 'primary';
      case 'rouge':
        return 'danger';
      case 'noire':
        return 'dark';
      default:
        return 'secondary';
    }
  };

  // Fonction pour convertir le type de piste en texte lisible
  const formatPisteType = (typePiste) => {
    switch (typePiste) {
      case 'verte':
        return 'Piste Verte';
      case 'bleue':
        return 'Piste Bleue';
      case 'rouge':
        return 'Piste Rouge';
      case 'noire':
        return 'Piste Noire';
      default:
        return typePiste;
    }
  };

  return (
    <div className="ski-page">
      <Container>
        <h1 className="page-title">Stations de Ski</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Glissez sur les pentes enneigées</h2>
            <p>
              Découvrez les meilleures stations de ski des Alpes, des domaines adaptés aux débutants 
              jusqu'aux pistes les plus techniques pour les skieurs expérimentés. Profitez de panoramas 
              exceptionnels et d'une neige de qualité tout au long de la saison.
            </p>
          </div>
        </div>
        
        {/* Section de filtre */}
        <div className="filter-section">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les stations de ski
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
                      <Form.Label>Type de piste</Form.Label>
                      <Form.Select 
                        value={typePisteFilter}
                        onChange={(e) => setTypePisteFilter(e.target.value)}
                      >
                        <option value="">Tous les types</option>
                        <option value="verte">Verte (Débutant)</option>
                        <option value="bleue">Bleue (Intermédiaire)</option>
                        <option value="rouge">Rouge (Avancé)</option>
                        <option value="noire">Noire (Expert)</option>
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
                      <Form.Label>Remontées mécaniques</Form.Label>
                      <Form.Select 
                        value={remonteesFilter}
                        onChange={(e) => setRemonteesFilter(e.target.value)}
                      >
                        <option value="">Tous</option>
                        <option value="true">Avec remontées</option>
                        <option value="false">Sans remontées</option>
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
        
        {/* Section des stations de ski */}
        <div className="stations-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des stations de ski...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredStations.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucune station de ski ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir toutes les stations</Button>
            </div>
          ) : (
            <Row>
              {filteredStations.map(station => (
                <Col md={6} lg={4} key={station.id} className="mb-4">
                  <Card className="station-card h-100">
                    <div className="station-image-container">
                      <Card.Img 
                        variant="top" 
                        src={station.image_url || '/images/default-ski.jpg'} 
                        alt={station.nom} 
                        className="station-image"
                      />
                      <Badge 
                        bg={getPisteBadgeClass(station.type_piste)} 
                        className="piste-badge"
                      >
                        {formatPisteType(station.type_piste)}
                      </Badge>
                    </div>
                    <Card.Body>
                      <Card.Title>{station.nom}</Card.Title>
                      <div className="station-details">
                        <div className="detail-item">
                          <FaMapMarkerAlt className="detail-icon" />
                          <span>{station.emplacement || 'Emplacement non spécifié'}</span>
                        </div>
                        <div className="detail-item">
                          <FaSnowflake className="detail-icon" />
                          <span>{station.conditions_enneigement || 'Conditions à vérifier'}</span>
                        </div>
                        <div className="detail-item">
                          <FaMountain className="detail-icon" />
                          <span>
                            {station.remontees_mecaniques 
                              ? 'Avec remontées mécaniques' 
                              : 'Sans remontées mécaniques'}
                          </span>
                        </div>
                      </div>
                      <div className="station-description">
                        {station.description ? (
                          station.description.length > 100 
                            ? `${station.description.substring(0, 100)}...` 
                            : station.description
                        ) : (
                          "Informations détaillées sur cette station à venir."
                        )}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Link to={`/ski/${station.id}`}>
                        <Button variant="outline-primary" className="w-100">Voir la station</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section des conseils */}
        <div className="tips-section">
          <h3 className="section-title">Conseils pour votre séjour au ski</h3>
          <Row>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaSnowflake />
                </div>
                <h4>Vérifiez les conditions</h4>
                <p>Consultez les bulletins d'enneigement et les prévisions météo avant de partir. Les conditions peuvent changer rapidement en montagne.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaMountain />
                </div>
                <h4>Équipement adapté</h4>
                <p>Assurez-vous d'avoir tout l'équipement nécessaire : skis, bâtons, chaussures, vêtements chauds et imperméables, casque, lunettes de soleil.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="tip-card">
                <div className="tip-icon">
                  <FaMapMarkerAlt />
                </div>
                <h4>Connaissez vos limites</h4>
                <p>Choisissez des pistes adaptées à votre niveau et restez sur les zones balisées. N'hésitez pas à prendre des cours si vous débutez.</p>
              </div>
            </Col>
          </Row>
        </div>
        
        {/* Section d'appel à l'action */}
        <div className="cta-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Envie de réserver votre prochain séjour au ski ?</h3>
              <p>Nos conseillers sont à votre disposition pour vous aider à planifier votre séjour idéal.</p>
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

export default Ski;