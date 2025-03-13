const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

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

// Tester la connexion à la base de données
async function testDBConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Connexion à la base de données établie avec succès');
    connection.release();
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
  }
}

testDBConnection();

// Routes pour les activités
app.get('/api/activites', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM activites');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des activités:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/activites/:id', async (req, res) => {
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

app.post('/api/activites', async (req, res) => {
  try {
    const { nom, description, niveau_difficulte, image_url, saison_recommandee } = req.body;
    const [result] = await pool.query(
      'INSERT INTO activites (nom, description, niveau_difficulte, image_url, saison_recommandee) VALUES (?, ?, ?, ?, ?)',
      [nom, description, niveau_difficulte, image_url, saison_recommandee]
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
app.get('/api/sites-escalade', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM sites_escalade');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des sites d\'escalade:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/sites-escalade/:id', async (req, res) => {
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
app.get('/api/stations-ski', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM stations_ski');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des stations de ski:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/stations-ski/:id', async (req, res) => {
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

// Routes pour les articles de blog
app.get('/api/articles-blog', async (req, res) => {
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

app.get('/api/articles-blog/:id', async (req, res) => {
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
    res.json(rows[0]);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article de blog:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Routes pour les itinéraires de randonnée
app.get('/api/itineraires-randonnee', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM itineraires_randonnee');
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des itinéraires de randonnée:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.get('/api/itineraires-randonnee/:id', async (req, res) => {
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

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});