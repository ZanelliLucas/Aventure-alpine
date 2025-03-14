import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importation des composants
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Videos from './pages/Videos';
import Randonnee from './pages/Randonnee';
import Escalade from './pages/Escalade';
import Ski from './pages/Ski';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PartageExperience from './pages/PartageExperience';

// Ajout du composant pour gérer les activités
import Activites from './components/Activites/Activites';
import AjouterActivite from './components/Activites/AjouterActivite'; // Importez le nouveau composant

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sports" element={<Sports />} />
              <Route path="/activites" element={<Activites />} />
              <Route path="/activites/ajouter" element={<AjouterActivite />} /> {/* Nouvelle route */}
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/randonnee" element={<Randonnee />} />
              <Route path="/escalade" element={<Escalade />} />
              <Route path="/ski" element={<Ski />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/partage-experience" element={<PartageExperience />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;