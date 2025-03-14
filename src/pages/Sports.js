import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMountain, FaHiking, FaSkiing, FaSnowboarding, FaWater, FaBiking } from 'react-icons/fa';

const Sports = () => {
  // Données pour les cartes de sports
  const sportsData = [
    {
      id: 1,
      title: "Randonnée",
      description: "Découvrez des sentiers magnifiques à travers les Alpes, adaptés à tous les niveaux.",
      icon: <FaHiking className="sport-icon" />,
      link: "/randonnee",
      image: "/images/sport-randonnee.jpg"
    },
    {
      id: 2,
      title: "Escalade",
      description: "Relevez le défi des plus belles parois rocheuses avec nos guides experts.",
      icon: <FaMountain className="sport-icon" />,
      link: "/escalade",
      image: "/images/sport-escalade.jpg"
    },
    {
      id: 3,
      title: "Ski Alpin",
      description: "Dévalez les pentes enneigées des meilleures stations des Alpes.",
      icon: <FaSkiing className="sport-icon" />,
      link: "/ski",
      image: "/images/sport-ski.jpg"
    },
    {
      id: 4,
      title: "Snowboard",
      description: "Glissez en toute liberté sur les plus beaux domaines skiables.",
      icon: <FaSnowboarding className="sport-icon" />,
      link: "/ski",
      image: "/images/sport-snowboard.jpg"
    },
    {
      id: 5,
      title: "Canyoning",
      description: "Explorez des gorges sauvages, des cascades et des toboggans naturels.",
      icon: <FaWater className="sport-icon" />,
      link: "/activites",
      image: "/images/sport-canyoning.jpg"
    },
    {
      id: 6,
      title: "VTT",
      description: "Parcourez des sentiers techniques en montagne pour tous les niveaux.",
      icon: <FaBiking className="sport-icon" />,
      link: "/activites",
      image: "/images/sport-vtt.jpg"
    }
  ];

  return (
    <div className="sports-page py-5">
      <Container>
        <h1 className="text-center mb-5">Sports & Activités</h1>
        
        <div className="intro-section text-center mb-5">
          <p className="lead">
            Découvrez la diversité des sports de montagne avec Aventures Alpines. 
            De la randonnée paisible à l'escalade technique, nous vous proposons 
            une multitude d'activités pour tous les niveaux.
          </p>
        </div>
        
        <Row>
          {sportsData.map(sport => (
            <Col md={6} lg={4} key={sport.id} className="mb-4">
              <Card className="sport-card h-100 shadow-sm">
                <div className="card-img-container">
                  <Card.Img 
                    variant="top" 
                    src={sport.image} 
                    alt={sport.title} 
                    className="sport-image"
                  />
                  <div className="card-img-overlay d-flex align-items-center justify-content-center">
                    {sport.icon}
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="text-center mb-3">{sport.title}</Card.Title>
                  <Card.Text>{sport.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-center border-0 bg-white">
                  <Link to={sport.link}>
                    <Button variant="outline-primary">Découvrir</Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="season-section mt-5">
          <h2 className="text-center mb-4">Activités par saison</h2>
          <Row>
            <Col md={6} className="mb-4">
              <Card className="season-card summer-card">
                <Card.Body className="text-center">
                  <h3>Activités d'été</h3>
                  <p>Randonnée, escalade, VTT, canyoning, via ferrata...</p>
                  <Link to="/activites">
                    <Button variant="light">Explorer</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="season-card winter-card">
                <Card.Body className="text-center">
                  <h3>Activités d'hiver</h3>
                  <p>Ski, snowboard, raquettes, alpinisme hivernal...</p>
                  <Link to="/activites">
                    <Button variant="light">Explorer</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        
        <div className="cta-section mt-5 text-center">
          <h2>Envie de découvrir nos activités?</h2>
          <p className="mb-4">
            Consultez notre catalogue complet d'activités et trouvez celle qui vous correspond.
          </p>
          <Link to="/activites">
            <Button variant="primary" size="lg">Voir toutes les activités</Button>
          </Link>
        </div>
      </Container>
      
      <style jsx>{`
        .sport-icon {
          font-size: 3rem;
          color: white;
        }
        
        .card-img-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        
        .sport-image {
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .sport-card:hover .sport-image {
          transform: scale(1.1);
        }
        
        .card-img-overlay {
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .sport-card:hover .card-img-overlay {
          opacity: 1;
        }
        
        .season-card {
          padding: 2rem;
          color: white;
        }
        
        .summer-card {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/summer-activities.jpg');
          background-size: cover;
          background-position: center;
        }
        
        .winter-card {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/winter-activities.jpg');
          background-size: cover;
          background-position: center;
        }
      `}</style>
    </div>
  );
};

export default Sports;