import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaCalendarAlt, FaUserAlt, FaTags, FaFilter } from 'react-icons/fa';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles-blog');
        setArticles(response.data);
        setFilteredArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des articles');
        setLoading(false);
        console.error('Erreur de chargement des articles:', err);
      }
    };

    fetchArticles();
  }, []);

  // Appliquer les filtres à chaque changement des critères de filtre
  useEffect(() => {
    const applyFilters = () => {
      let result = [...articles];
      
      // Filtre par terme de recherche
      if (searchTerm) {
        result = result.filter(
          article => 
            article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.contenu.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filtre par catégorie
      if (categoryFilter) {
        result = result.filter(article => {
          if (article.categorie) {
            return article.categorie === categoryFilter;
          }
          return false;
        });
      }
      
      // Tri par date
      result.sort((a, b) => {
        const dateA = new Date(a.date_publication);
        const dateB = new Date(b.date_publication);
        
        return sortOrder === 'newest' 
          ? dateB - dateA 
          : dateA - dateB;
      });
      
      setFilteredArticles(result);
    };
    
    applyFilters();
  }, [searchTerm, categoryFilter, sortOrder, articles]);

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

  // Extraire un extrait du contenu
  const getExcerpt = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(' ', maxLength)) + '...';
  };

  // Créer de fausses catégories pour la démo
  const categories = [
    "Randonnée",
    "Escalade",
    "Ski alpin",
    "Ski de fond",
    "Alpinisme",
    "Équipement",
    "Sécurité"
  ];

  return (
    <div className="articles-page">
      <Container>
        <h1 className="page-title">Articles et Guides</h1>
        
        {/* Bannière d'introduction */}
        <div className="intro-banner">
          <div className="intro-content">
            <h2>Découvrez nos conseils d'experts</h2>
            <p>
              Des guides détaillés et des articles inspirants pour tous les passionnés de montagne,
              que vous soyez débutants ou experts.
            </p>
          </div>
        </div>
        
        {/* Section de filtre */}
        <div className="filter-section">
          <Card>
            <Card.Body>
              <h3 className="filter-title">
                <FaFilter className="filter-icon" /> Filtrer les articles
              </h3>
              <Row>
                <Col md={5}>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Rechercher par titre ou contenu"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
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
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Select 
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="newest">Plus récents</option>
                      <option value="oldest">Plus anciens</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={1}>
                  <Button 
                    variant="outline-secondary" 
                    className="w-100 mb-3"
                    onClick={resetFilters}
                  >
                    <FaFilter />
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        
        {/* Section des articles */}
        <div className="articles-section">
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Chargement...</span>
              </Spinner>
              <p className="mt-3">Chargement des articles...</p>
            </div>
          ) : error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center my-5">
              <p className="lead">Aucun article ne correspond à vos critères de recherche.</p>
              <Button variant="primary" onClick={resetFilters}>Voir tous les articles</Button>
            </div>
          ) : (
            <Row>
              {filteredArticles.map(article => (
                <Col md={6} lg={4} key={article.id} className="mb-4">
                  <Card className="article-card h-100">
                    <div className="article-image-container">
                      <Card.Img 
                        variant="top" 
                        src={article.image_url || '/images/default-article.jpg'} 
                        alt={article.titre} 
                        className="article-image"
                      />
                    </div>
                    <Card.Body>
                      <div className="article-meta">
                        <span className="meta-date">
                          <FaCalendarAlt className="meta-icon" />
                          {formatDate(article.date_publication)}
                        </span>
                        <span className="meta-author">
                          <FaUserAlt className="meta-icon" />
                          {article.auteur_nom || 'Auteur inconnu'}
                        </span>
                      </div>
                      
                      <Card.Title>{article.titre}</Card.Title>
                      
                      {/* Afficher les catégories si elles existent */}
                      {article.categorie && (
                        <div className="article-categories">
                          <FaTags className="meta-icon" />
                          <span className="category-tag">{article.categorie}</span>
                        </div>
                      )}
                      
                      <div className="article-excerpt">
                        {getExcerpt(article.contenu)}
                      </div>
                    </Card.Body>
                    <Card.Footer className="bg-white border-top-0">
                      <Link to={`/articles/${article.id}`}>
                        <Button variant="outline-primary" className="w-100">Lire l'article</Button>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </div>
        
        {/* Section d'abonnement à la newsletter */}
        <div className="newsletter-section">
          <Card className="text-center">
            <Card.Body>
              <h3>Restez informé de nos derniers articles</h3>
              <p>Abonnez-vous à notre newsletter et recevez nos nouveaux articles directement dans votre boîte mail.</p>
              <Row className="justify-content-center">
                <Col md={6}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Votre adresse email"
                      aria-label="Adresse email pour newsletter"
                    />
                    <Button variant="primary">S'abonner</Button>
                  </InputGroup>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Articles;