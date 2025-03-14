const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Configuration de la connexion à la base de données
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'aventures_alpines',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Routes pour les activités
router.get('/activites', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activites');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/activites/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activites WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Activité non trouvée' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'activité:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/activites', async (req, res) => {
  try {
    const { nom, description, niveau_difficulte, image_url, saison_recommandee, type_activite_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO activites (nom, description, niveau_difficulte, image_url, saison_recommandee, type_activite_id) VALUES (?, ?, ?, ?, ?, ?)',
      [nom, description, niveau_difficulte, image_url, saison_recommandee, type_activite_id]
    );
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Activité créée avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'activité:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les sites d'escalade
router.get('/sites-escalade', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sites_escalade');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des sites d\'escalade:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/sites-escalade/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sites_escalade WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Site d\'escalade non trouvé' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération du site d\'escalade:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les stations de ski
router.get('/stations-ski', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stations_ski');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des stations de ski:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/stations-ski/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stations_ski WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Station de ski non trouvée' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la station de ski:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les itinéraires de randonnée
router.get('/itineraires-randonnee', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itineraires_randonnee');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des itinéraires de randonnée:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/itineraires-randonnee/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itineraires_randonnee WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Itinéraire de randonnée non trouvé' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'itinéraire de randonnée:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les articles de blog
router.get('/articles-blog', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, u.nom_utilisateur as auteur_nom 
      FROM articles_blog a 
      JOIN utilisateurs u ON a.auteur_id = u.id
      ORDER BY a.date_publication DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des articles de blog:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/articles-blog/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, u.nom_utilisateur as auteur_nom 
      FROM articles_blog a 
      JOIN utilisateurs u ON a.auteur_id = u.id
      WHERE a.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Article de blog non trouvé' });
    }
    
    // Récupérer les tags associés à l'article
    const [tags] = await pool.query(`
      SELECT t.nom
      FROM tags t
      JOIN article_tags at ON t.id = at.tag_id
      WHERE at.article_id = ?
    `, [req.params.id]);
    
    const article = rows[0];
    article.tags = tags.map(tag => tag.nom);
    
    res.json(article);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article de blog:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les vidéos
router.get('/videos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, u.nom_utilisateur as auteur_nom 
      FROM videos v 
      LEFT JOIN utilisateurs u ON v.auteur_id = u.id
      ORDER BY v.date_ajout DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/videos/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT v.*, u.nom_utilisateur as auteur_nom 
      FROM videos v 
      LEFT JOIN utilisateurs u ON v.auteur_id = u.id
      WHERE v.id = ?
    `, [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Vidéo non trouvée' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les partages d'expérience
router.get('/partages-experience', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, u.nom_utilisateur as auteur_nom 
      FROM partages_experience p 
      JOIN utilisateurs u ON p.utilisateur_id = u.id
      ORDER BY p.date_creation DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des partages d\'expérience:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.post('/partages-experience', async (req, res) => {
  try {
    const { titre, contenu, utilisateur_id, sport, lieu, date_experience, image_url } = req.body;
    const [result] = await pool.query(
      'INSERT INTO partages_experience (titre, contenu, utilisateur_id, sport, lieu, date_experience, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titre, contenu, utilisateur_id, sport, lieu, date_experience, image_url]
    );
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Expérience partagée avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors du partage d\'expérience:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les prestations
router.get('/prestations', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, a.nom as activite_nom 
      FROM prestations p 
      LEFT JOIN activites a ON p.activite_id = a.id
    `);
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des prestations:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les réservations
router.post('/reservations', async (req, res) => {
  try {
    const { date_debut, date_fin, nombre_personnes, prix_total, client_id, prestation_id } = req.body;
    const [result] = await pool.query(
      'INSERT INTO reservations (date_debut, date_fin, nombre_personnes, prix_total, client_id, prestation_id) VALUES (?, ?, ?, ?, ?, ?)',
      [date_debut, date_fin, nombre_personnes, prix_total, client_id, prestation_id]
    );
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Réservation créée avec succès' 
    });
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;