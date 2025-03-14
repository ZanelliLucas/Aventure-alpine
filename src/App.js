import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
// Importation correcte de Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Importation des composants
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Sports from './pages/Sports';
import Articles from './components/Articles/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Videos from './components/Videos/Videos';
import Randonnee from './components/Randonnee/Randonnee';
import Escalade from './components/Escalade/Escalade';
import Ski from './components/Ski/Ski';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import NotFound from './components/NotFound/NotFound';
import PartageExperience from './components/PartageExperience/PartageExperience';

// Ajout du composant pour gérer les activités
import Activites from './components/Activites/Activites';
import AjouterActivite from './components/Activites/AjouterActivite';

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
              <Route path="/activites/ajouter" element={<AjouterActivite />} /> 
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:id" element={<ArticleDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/randonnee" element={<Randonnee />} />
              <Route path="/randonnee/:id" element={<Randonnee />} />
              <Route path="/escalade" element={<Escalade />} />
              <Route path="/escalade/:id" element={<Escalade />} />
              <Route path="/ski" element={<Ski />} />
              <Route path="/ski/:id" element={<Ski />} />
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