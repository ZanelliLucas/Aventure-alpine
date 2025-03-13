import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  // Fonction pour vérifier si le lien est actif
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img 
                src="/logo.svg" 
                alt="Aventures Alpines Logo" 
                className="navbar-logo" 
              />
              Aventures Alpines
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link className={isActive('/') ? 'active' : ''}>Accueil</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/activites">
                <Nav.Link className={isActive('/activites') ? 'active' : ''}>Activités</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/randonnee">
                <Nav.Link className={isActive('/randonnee') ? 'active' : ''}>Randonnée</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/escalade">
                <Nav.Link className={isActive('/escalade') ? 'active' : ''}>Escalade</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/ski">
                <Nav.Link className={isActive('/ski') ? 'active' : ''}>Ski</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/blog">
                <Nav.Link className={isActive('/blog') ? 'active' : ''}>Blog</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/partage-experience">
                <Nav.Link className={isActive('/partage-experience') ? 'active' : ''}>Partage d'expérience</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/contact">
                <Nav.Link className={isActive('/contact') ? 'active' : ''}>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;