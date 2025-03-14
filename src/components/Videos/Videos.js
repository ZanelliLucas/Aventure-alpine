import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import axios from 'axios';
import { FaPlay, FaCalendarAlt, FaUserAlt, FaFilter } from 'react-icons/fa';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Dans une application réelle, cette URL serait vers votre API
        // const response = await axios.get('/api/videos');
        // setVideos(response.data);
        
        // Données simulées
        const mockVideos = [
          {
            id: 1,
            titre: "Ascension du Mont Blanc - Les étapes clés",
            description: "Découvrez les différentes étapes pour réussir l'ascension du Mont Blanc, le plus haut sommet des Alpes.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-06-10",
            auteur: {
              nom: "Jean Alpiniste"
            },
            categorie: "Alpinisme",
            thumbnail: "/images/video-thumbnail-1.jpg"
          },
          {
            id: 2,
            titre: "Techniques d'escalade pour débutants",
            description: "Apprenez les techniques de base pour débuter en escalade en toute sécurité.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-05-15",
            auteur: {
              nom: "Sophie Grimpeuse"
            },
            categorie: "Escalade",
            thumbnail: "/images/video-thumbnail-2.jpg"
          },
          {
            id: 3,
            titre: "Les plus beaux sentiers de randonnée des Alpes",
            description: "Un tour d'horizon des sentiers de randonnée les plus spectaculaires des Alpes françaises.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-07-20",
            auteur: {
              nom: "Marc Randonneur"
            },
            categorie: "Randonnée",
            thumbnail: "/images/video-thumbnail-3.jpg"
          },
          {
            id: 4,
            titre: "Ski de fond: techniques et conseils",
            description: "Les meilleures techniques et astuces pour progresser en ski de fond.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-01-08",
            auteur: {
              nom: "Clara Glisseuse"
            },
            categorie: "Ski de fond",
            thumbnail: "/images/video-thumbnail-4.jpg"
          },
          {
            id: 5,
            titre: "Préparation physique pour l'alpinisme",
            description: "Comment se préparer physiquement pour des expéditions d'alpinisme exigeantes.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-04-03",
            auteur: {
              nom: "Thomas Coach"
            },
            categorie: "Préparation",
            thumbnail: "/images/video-thumbnail-5.jpg"
          },
          {
            id: 6,
            titre: "Les stations de ski des Alpes - Guide complet",
            description: "Découvrez les meilleures stations de ski des Alpes, leurs pistes et leurs installations.",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            date_ajout: "2023-02-17",
            auteur: {
              nom: "Éric Skieur"
            },
            categorie: "Ski alpin",
            thumbnail: "/images/video-thumbnail-6.jpg"
          }
        ];
        
        setVideos(mockVideos);
        setFilteredVideos(mockVideos);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des vidéos');
        setLoading(false);
        console.error('Erreur de chargement des vidéos:', err);
      }
    };

    fetchVideos();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = [...videos];
      
      // Filtre par terme de recherche
      if (searchTerm) {
        result = result.filter(
          video => 
            video.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtre par catégorie
      if (categoryFilter) {
        result = result.filter(video => video.categorie === categoryFilter);
      }
      
      // Tri par date
      result.sort((a, b) => {
        const dateA = new Date(a.date_ajout);
        const dateB = new Date(b.date_ajout);
        
        return sortOrder === 'newest' 
          ? dateB - dateA 
          : dateA - dateB;
      });
      
      setFilteredVideos(result);
    };
    
    applyFilters();
  }, [searchTerm, categoryFilter, sortOrder, videos]);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setSortOrder('newest');
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Extraire toutes les catégories uniques
  const categories = [...new Set(videos.map(video => video.categorie))];

  // Fonction pour ouvrir la modal avec la vidéo sélectionnée
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    // Dans une application réelle, vous pourriez utiliser une modal pour afficher la vidéo
    window.open(video.url, '_blank');
  };

  return (
    <div className="videos-page">
      <Container>
        <h1 className="page-title">Vidéos</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Explorez nos vidéos inspirantes</h2>
            <p>
              Des tutoriels, des aventures et des paysages à couper le souffle. 
              Plongez dans le monde de la montagne à travers notre collection de vidéos.
            </p>
          </div>
        </div>
        
        {/* Section de filtre */}
        <div className="filter-section mb-4">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les vidéos
              </h3>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Rechercher</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Titre ou description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="">Toutes les catégories</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                                        </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tri</Form.Label>
                    <Form.Select 
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="newest">Plus récentes</option>
                      <option value="oldest">Plus anciennes</option>
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
            </Card.Body>
          </Card>
        </div>
        
        {/* Section des vidéos */}
        <div className="videos-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des vidéos...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucune vidéo ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir toutes les vidéos</Button>
            </div>
          ) : (
            <Row>
              {filteredVideos.map(video => (
                <Col md={6} lg={4} key={video.id} className="mb-4">
                  <Card className="video-card h-100">
                    <div className="video-thumbnail-container position-relative">
                      <Card.Img 
                        variant="top" 
                        src={video.thumbnail || '/images/default-video-thumbnail.jpg'} 
                        alt={video.titre} 
                        className="video-thumbnail"
                      />
                      <div className="play-button" onClick={() => handleVideoSelect(video)}>
                        <FaPlay />
                      </div>
                    </div>
                    <Card.Body>
                      <div className="video-meta mb-2">
                        <span className="meta-category badge bg-primary me-2">{video.categorie}</span>
                        <span className="meta-date small text-muted">
                          <FaCalendarAlt className="me-1" />
                          {formatDate(video.date_ajout)}
                        </span>
                      </div>
                      <Card.Title>{video.titre}</Card.Title>
                      <Card.Text className="video-description">
                        {video.description}
                      </Card.Text>
                      <div className="video-author small text-muted mb-3">
                        <FaUserAlt className="me-1" />
                        {video.auteur?.nom || 'Auteur inconnu'}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Button 
                        variant="primary" 
                        className="w-100"
                        onClick={() => handleVideoSelect(video)}
                      >
                        <FaPlay className="me-2" /> Regarder la vidéo
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section pour s'abonner à la chaîne */}
        <div className="subscribe-section my-5">
          <Card className="text-center">
            <Card.Body className="p-4">
              <h3>Vous aimez nos vidéos ?</h3>
              <p className="mb-4">Abonnez-vous à notre chaîne pour ne manquer aucune de nos nouvelles aventures.</p>
              <Button variant="danger" size="lg">
                <FaPlay className="me-2" /> S'abonner à notre chaîne
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Videos;