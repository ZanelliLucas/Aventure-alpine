import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Image, Card, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUser, FaTags, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const ArticleDetail = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles-blog/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération de l\'article');
        setLoading(false);
        console.error('Erreur de chargement de l\'article:', err);
      }
    };

    fetchArticle();
    // Scroll au début de la page lors du chargement
    window.scrollTo(0, 0);
  }, [id]);

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Articles similaires (simulation)
  const similarArticles = [
    {
      id: 2,
      titre: "Les meilleurs spots d'escalade dans les Alpes",
      image_url: "/images/article-escalade.jpg",
      date_publication: "2023-06-15"
    },
    {
      id: 3,
      titre: "Préparer son sac pour une randonnée de plusieurs jours",
      image_url: "/images/article-sac.jpg",
      date_publication: "2023-07-05"
    },
    {
      id: 4,
      titre: "Guide des stations de ski pour débutants",
      image_url: "/images/article-ski-debutant.jpg",
      date_publication: "2023-01-20"
    }
  ];

  return (
    <div className="article-detail-page">
      <Container>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" variant="primary">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
            <p className="mt-3">Chargement de l'article...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : article ? (
          <>
            <div className="mb-4">
              <Link to="/blog" className="btn btn-outline-secondary">
                <FaArrowLeft className="me-2" /> Retour aux articles
              </Link>
            </div>
            
            <div className="article-header mb-4">
              <h1 className="article-title">{article.titre}</h1>
              <div className="article-meta my-3">
                <span className="meta-item">
                  <FaCalendarAlt className="me-2" />
                  {formatDate(article.date_publication)}
                </span>
                <span className="meta-item ms-3">
                  <FaUser className="me-2" />
                  {article.auteur_nom || 'Auteur inconnu'}
                </span>
                {article.categorie && (
                  <span className="meta-item ms-3">
                    <FaTags className="me-2" />
                    {article.categorie}
                  </span>
                )}
              </div>
            </div>
            
            <Row>
              <Col lg={8}>
                <div className="article-image-container mb-4">
                  <Image 
                    src={article.image_url || '/images/default-article.jpg'} 
                    alt={article.titre} 
                    fluid 
                    className="article-main-image"
                  />
                </div>
                
                <div className="article-content">
                  <div dangerouslySetInnerHTML={{ __html: article.contenu }}></div>
                </div>
                
                <div className="article-actions mt-4 d-flex justify-content-between">
                  <Button variant="outline-primary">
                    Partager
                  </Button>
                  <Button variant="primary">
                    S'abonner au blog
                  </Button>
                </div>
              </Col>
              
              <Col lg={4}>
                <div className="article-sidebar">
                  <Card className="mb-4">
                    <Card.Header as="h5">Articles similaires</Card.Header>
                    <Card.Body className="p-0">
                      {similarArticles.map(similarArticle => (
                        <Link 
                          to={`/articles/${similarArticle.id}`} 
                          key={similarArticle.id}
                          className="text-decoration-none"
                        >
                          <div className="similar-article-item p-3 border-bottom">
                            <Row className="align-items-center">
                              <Col xs={4}>
                                <Image 
                                  src={similarArticle.image_url} 
                                  alt={similarArticle.titre} 
                                  fluid 
                                  rounded 
                                />
                              </Col>
                              <Col xs={8}>
                                <h6 className="mb-1">{similarArticle.titre}</h6>
                                <small className="text-muted">
                                  {formatDate(similarArticle.date_publication)}
                                </small>
                              </Col>
                            </Row>
                          </div>
                        </Link>
                      ))}
                    </Card.Body>
                  </Card>
                  
                  <Card>
                    <Card.Header as="h5">À propos de l'auteur</Card.Header>
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <Image 
                          src="/images/author-avatar.jpg" 
                          alt="Avatar de l'auteur" 
                          roundedCircle 
                          width={60} 
                          height={60} 
                          className="me-3"
                        />
                        <div>
                          <h5 className="mb-0">{article.auteur_nom || 'Guide de montagne'}</h5>
                          <small className="text-muted">Expert en sports de montagne</small>
                        </div>
                      </div>
                      <p>
                        Passionné de montagne depuis plus de 15 ans, notre guide partage son expertise 
                        et ses conseils pour des aventures alpines inoubliables.
                      </p>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div className="alert alert-warning" role="alert">
            Article introuvable.
          </div>
        )}
      </Container>
    </div>
  );
};

export default ArticleDetail;