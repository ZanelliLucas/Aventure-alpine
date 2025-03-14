import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaMountain, FaHiking, FaSkiing } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const [activites, setActivites] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simuler des données si l'API n'est pas disponible
        // Dans une application réelle, décommentez ces lignes
        /*
        // Récupérer les activités
        const activitesRes = await axios.get('/api/activites');
        
        // Récupérer les articles de blog
        const articlesRes = await axios.get('/api/articles-blog');
        
        setActivites(activitesRes.data.slice(0, 3)); // Limiter à 3 activités pour la page d'accueil
        setArticles(articlesRes.data.slice(0, 3)); // Limiter à 3 articles pour la page d'accueil
        */

        // Données simulées pour les activités
        const mockActivites = [
          {
            id: 1,
            nom: "Randonnée au Lac Blanc",
            description: "Une randonnée magnifique avec vue sur le Mont Blanc",
            niveau_difficulte: "intermediaire",
            image_url: "/images/randonnee-lac-blanc.jpg",
            saison_recommandee: "Été"
          },
          {
            id: 2,
            nom: "Escalade à Chamonix",
            description: "Grimper sur les plus belles parois des Alpes",
            niveau_difficulte: "avance",
            image_url: "/images/escalade-chamonix.jpg",
            saison_recommandee: "Été"
          },
          {
            id: 3,
            nom: "Ski à Val d'Isère",
            description: "Ski alpin sur l'un des plus beaux domaines des Alpes",
            niveau_difficulte: "intermediaire",
            image_url: "/images/ski-val-disere.jpg",
            saison_recommandee: "Hiver"
          }
        ];

        // Données simulées pour les articles
        const mockArticles = [
          {
            id: 1,
            titre: "Les 10 plus belles randonnées des Alpes",
            contenu: "Contenu détaillé sur les randonnées des Alpes françaises avec conseils et descriptions.",
            date_publication: "2023-03-15",
            auteur_nom: "Jean Alpiniste",
            image_url: "/images/randonnees-alpes.jpg"
          },
          {
            id: 2,
            titre: "Débuter en escalade: guide complet",
            contenu: "Tout ce que vous devez savoir pour commencer l'escalade en toute sécurité, du matériel aux techniques de base.",
            date_publication: "2023-04-20",
            auteur_nom: "Sophie Grimpeuse",
            image_url: "/images/debuter-escalade.jpg"
          },
          {
            id: 3,
            titre: "Préparer son matériel de ski pour l'hiver",
            contenu: "Comment entretenir et préparer votre équipement avant la saison pour des performances optimales.",
            date_publication: "2023-10-05",
            auteur_nom: "Marc Skieur",
            image_url: "/images/materiel-ski.jpg"
          }
        ];

        setActivites(mockActivites);
        setArticles(mockArticles);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Données de la bannière
  const bannerSlides = [
    {
      image: '/images/banner1.jpg',
      title: 'Découvrez la magie des Alpes',
      text: 'Des expériences inoubliables dans les plus beaux paysages montagneux',
      buttonText: 'Explorer',
      buttonLink: '/activites'
    },
    {
      image: '/images/banner2.jpg',
      title: 'Aventures en haute montagne',
      text: 'Randonnées, escalade, ski et bien plus encore',
      buttonText: 'Nos activités',
      buttonLink: '/activites'
    },
    {
      image: '/images/banner3.jpg',
      title: 'Partagez vos expériences',
      text: 'Rejoignez notre communauté de passionnés de montagne',
      buttonText: 'Partager',
      buttonLink: '/partage-experience'
    }
  ];

  return (
    <div className="home-page">
      {/* Bannière carrousel */}
      <section className="hero-section">
        <Carousel fade>
          {bannerSlides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <div 
                className="hero-banner" 
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="hero-content">
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-text">{slide.text}</p>
                  <Link to={slide.buttonLink}>
                    <Button variant="primary" size="lg">{slide.buttonText}</Button>
                  </Link>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Section "À propos" */}
      <section className="about-section">
        <Container>
          <h2 className="section-title">Bienvenue chez Aventures Alpines</h2>
          <Row>
            <Col md={6}>
              <p className="about-text">
                Aventures Alpines est une plateforme dédiée aux amoureux de la montagne et des sports alpins. 
                Que vous soyez un randonneur tranquille, un grimpeur passionné ou un skieur avide de sensations, 
                nous vous offrons un espace pour vous informer, vous inspirer et partager vos expériences.
              </p>
              <p className="about-text">
                Notre mission est de rassembler une communauté de passionnés et de faciliter la découverte 
                des plus beaux paysages et activités que les montagnes ont à offrir.
              </p>
              <Link to="/contact">
                <Button variant="outline-primary">En savoir plus</Button>
              </Link>
            </Col>
            <Col md={6}>
              <div className="about-image-container">
                <img 
                  src="/images/about-image.jpg" 
                  alt="Paysage de montagne" 
                  className="about-image" 
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section des activités populaires */}
      <section className="activities-section">
        <Container>
          <h2 className="section-title">Activités Populaires</h2>
          <Row>
            <Col md={4}>
              <Card className="activity-card">
                <div className="activity-icon">
                  <FaHiking />
                </div>
                <Card.Body>
                  <Card.Title>Randonnée</Card.Title>
                  <Card.Text>
                    Découvrez des sentiers magnifiques et des vues à couper le souffle, 
                    adaptés à tous les niveaux de marcheurs.
                  </Card.Text>
                  <Link to="/randonnee">
                    <Button variant="primary">Découvrir</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="activity-card">
                <div className="activity-icon">
                  <FaMountain />
                </div>
                <Card.Body>
                  <Card.Title>Escalade</Card.Title>
                  <Card.Text>
                    Relevez le défi des parois rocheuses avec nos guides expérimentés, 
                    des voies pour débutants aux plus avancées.
                  </Card.Text>
                  <Link to="/escalade">
                    <Button variant="primary">Découvrir</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="activity-card">
                <div className="activity-icon">
                  <FaSkiing />
                </div>
                <Card.Body>
                  <Card.Title>Ski</Card.Title>
                  <Card.Text>
                    Glissez sur les pentes enneigées des plus belles stations des Alpes, 
                    du ski alpin au ski de fond.
                  </Card.Text>
                  <Link to="/ski">
                    <Button variant="primary">Découvrir</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Link to="/activites">
              <Button variant="outline-primary">Voir toutes les activités</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section des derniers articles */}
      <section className="blog-section">
        <Container>
          <h2 className="section-title">Derniers Articles</h2>
          {loading ? (
            <p className="text-center">Chargement des articles...</p>
          ) : (
            <Row>
              {articles.map(article => (
                <Col md={4} key={article.id}>
                  <Card className="blog-card">
                    <Card.Img 
                      variant="top" 
                      src={article.image_url || '/images/default-article.jpg'} 
                      alt={article.titre} 
                    />
                    <Card.Body>
                      <Card.Title>{article.titre}</Card.Title>
                      <Card.Text>
                        {article.contenu.substring(0, 100)}...
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {new Date(article.date_publication).toLocaleDateString()}
                        </small>
                        <Link to={`/articles/${article.id}`}>
                          <Button variant="outline-primary" size="sm">Lire plus</Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <div className="text-center mt-4">
            <Link to="/blog">
              <Button variant="outline-primary">Voir tous les articles</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section de témoignages */}
      <section className="testimonials-section">
        <Container>
          <h2 className="section-title">Témoignages</h2>
          <Row>
            <Col md={4}>
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img src="/images/testimonial1.jpg" alt="Témoignage 1" />
                </div>
                <div className="testimonial-content">
                  <p>"Une expérience incroyable avec les guides d'Aventures Alpines. La randonnée était parfaitement adaptée à notre niveau et les paysages étaient à couper le souffle!"</p>
                  <h5>Marie Dubois</h5>
                  <small>Randonneuse</small>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img src="/images/testimonial2.jpg" alt="Témoignage 2" />
                </div>
                <div className="testimonial-content">
                  <p>"Grâce aux conseils avisés des experts d'Aventures Alpines, j'ai pu améliorer considérablement ma technique d'escalade. Je recommande vivement leurs stages!"</p>
                  <h5>Thomas Martin</h5>
                  <small>Grimpeur</small>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="testimonial-card">
                <div className="testimonial-image">
                  <img src="/images/testimonial3.jpg" alt="Témoignage 3" />
                </div>
                <div className="testimonial-content">
                  <p>"Notre séjour de ski organisé par Aventures Alpines était parfait! Logement confortable, accès rapide aux pistes et une ambiance conviviale. Nous reviendrons l'année prochaine!"</p>
                  <h5>Sophie et Pierre</h5>
                  <small>Famille de skieurs</small>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Section d'appel à l'action */}
      <section className="cta-section">
        <Container>
          <div className="cta-container">
            <h2>Prêt pour l'aventure?</h2>
            <p>Rejoignez-nous et découvrez des expériences inoubliables en montagne!</p>
            <Link to="/contact">
              <Button variant="primary" size="lg">Contactez-nous</Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;