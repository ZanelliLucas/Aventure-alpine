const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');

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

// Utiliser les routes API
app.use('/api', apiRoutes);

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'écoute sur le port ${PORT}`);
});