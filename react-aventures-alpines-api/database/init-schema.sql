-- Création de la base de données
CREATE DATABASE IF NOT EXISTS aventures_alpines;
USE aventures_alpines;

-- Table des utilisateurs (pour l'authentification)
CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_utilisateur VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des activités
CREATE TABLE IF NOT EXISTS activites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  niveau_difficulte ENUM('debutant', 'intermediaire', 'avance', 'expert') NOT NULL,
  image_url VARCHAR(255),
  saison_recommandee VARCHAR(50),
  type_activite_id INT
);

-- Table des types d'activités
CREATE TABLE IF NOT EXISTS type_activite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  description TEXT
);

-- Ajout de la clé étrangère à la table activites
ALTER TABLE activites
ADD CONSTRAINT fk_activites_type
FOREIGN KEY (type_activite_id) REFERENCES type_activite(id);

-- Table des sites d'escalade
CREATE TABLE IF NOT EXISTS sites_escalade (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  niveau_difficulte ENUM('facile', 'moyen', 'difficile', 'experimente') NOT NULL,
  emplacement VARCHAR(255),
  image_url VARCHAR(255),
  temps_ascension VARCHAR(50)
);

-- Table des stations de ski
CREATE TABLE IF NOT EXISTS stations_ski (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  conditions_enneigement TEXT,
  emplacement VARCHAR(255),
  image_url VARCHAR(255),
  remontees_mecaniques BOOLEAN DEFAULT true,
  type_piste ENUM('verte', 'bleue', 'rouge', 'noire') NOT NULL
);

-- Table des itinéraires de randonnée
CREATE TABLE IF NOT EXISTS itineraires_randonnee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  region VARCHAR(100) NOT NULL,
  lieu_depart VARCHAR(255) NOT NULL,
  lieu_arrivee VARCHAR(255) NOT NULL,
  distance_km DECIMAL(5,2) NOT NULL,
  praticable_ete BOOLEAN DEFAULT true,
  praticable_hiver BOOLEAN DEFAULT false,
  guide_necessaire BOOLEAN DEFAULT false,
  guide_nom VARCHAR(100),
  guide_prenom VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255)
);

-- Table des articles de blog
CREATE TABLE IF NOT EXISTS articles_blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  date_publication DATETIME DEFAULT CURRENT_TIMESTAMP,
  auteur_id INT NOT NULL,
  image_url VARCHAR(255),
  categorie VARCHAR(50),
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id)
);

-- Table des vidéos
CREATE TABLE IF NOT EXISTS videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  url VARCHAR(255) NOT NULL,
  date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP,
  auteur_id INT,
  thumbnail VARCHAR(255),
  categorie VARCHAR(50),
  FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id)
);

-- Table des commentaires
CREATE TABLE IF NOT EXISTS commentaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contenu TEXT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  utilisateur_id INT NOT NULL,
  article_id INT,
  video_id INT,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id),
  FOREIGN KEY (article_id) REFERENCES articles_blog(id),
  FOREIGN KEY (video_id) REFERENCES videos(id)
);

-- Table des clients (pour réservations)
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  telephone VARCHAR(20),
  rue VARCHAR(255),
  cp VARCHAR(10),
  ville VARCHAR(100),
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des prestations
CREATE TABLE IF NOT EXISTS prestations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  prix DECIMAL(10,2) NOT NULL,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  activite_id INT,
  FOREIGN KEY (activite_id) REFERENCES activites(id)
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  nombre_personnes INT NOT NULL,
  prix_total DECIMAL(10,2) NOT NULL,
  client_id INT NOT NULL,
  prestation_id INT NOT NULL,
  date_reservation DATETIME DEFAULT CURRENT_TIMESTAMP,
  statut ENUM('en_attente', 'confirmee', 'annulee') DEFAULT 'en_attente',
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (prestation_id) REFERENCES prestations(id)
);

-- Table des partages d'expérience
CREATE TABLE IF NOT EXISTS partages_experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  utilisateur_id INT NOT NULL,
  sport VARCHAR(50) NOT NULL,
  lieu VARCHAR(100) NOT NULL,
  date_experience DATE NOT NULL,
  image_url VARCHAR(255),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Table des tags pour le contenu
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-- Table d'association entre les articles et les tags
CREATE TABLE IF NOT EXISTS article_tags (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles_blog(id),
  FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- Insérer des données de test

-- Utilisateurs
INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe) VALUES 
('admin', 'admin@aventuresalpines.fr', '$2y$10$SomeRandomHashedPasswordHere'),
('guide_montagne', 'guide@aventuresalpines.fr', '$2y$10$SomeRandomHashedPasswordHere');

-- Types d'activités
INSERT INTO type_activite (nom, description) VALUES 
('Loisir', 'Activités récréatives pour tous les niveaux'),
('Compétition', 'Activités compétitives pour les sportifs expérimentés');

-- Activités
INSERT INTO activites (nom, description, niveau_difficulte, image_url, saison_recommandee, type_activite_id) VALUES 
('Randonnée au Lac Blanc', 'Une randonnée magnifique avec vue sur le Mont Blanc', 'intermediaire', '/images/randonnee-lac-blanc.jpg', 'Été', 1),
('Escalade à Chamonix', 'Grimper sur les plus belles parois des Alpes', 'avance', '/images/escalade-chamonix.jpg', 'Été', 1),
('Ski à Val d\'Isère', 'Ski alpin sur l\'un des plus beaux domaines des Alpes', 'intermediaire', '/images/ski-val-disere.jpg', 'Hiver', 1);

-- Sites d'escalade
INSERT INTO sites_escalade (nom, description, niveau_difficulte, emplacement, image_url, temps_ascension) VALUES 
('Les Drus', 'Montagnes emblématiques du massif du Mont-Blanc', 'experimente', 'Chamonix, France', '/images/drus.jpg', '6-8 heures'),
('Aiguille du Midi', 'Un sommet accessible par téléphérique avec des voies d\'escalade variées', 'difficile', 'Chamonix, France', '/images/aiguille-midi.jpg', '4-5 heures');

-- Stations de ski
INSERT INTO stations_ski (nom, description, conditions_enneigement, emplacement, image_url, remontees_mecaniques, type_piste) VALUES 
('Val d\'Isère', 'Station renommée offrant un vaste domaine skiable', 'Excellentes de décembre à avril', 'Val d\'Isère, France', '/images/val-disere.jpg', true, 'rouge'),
('Les Arcs', 'Station familiale avec des pistes pour tous les niveaux', 'Bonnes de décembre à mars', 'Bourg-Saint-Maurice, France', '/images/les-arcs.jpg', true, 'bleue');

-- Itinéraires de randonnée
INSERT INTO itineraires_randonnee (nom, region, lieu_depart, lieu_arrivee, distance_km, praticable_ete, praticable_hiver, guide_necessaire, guide_nom, guide_prenom, description, image_url) VALUES 
('Tour du Mont Blanc', 'Alpes', 'Chamonix', 'Chamonix', 170, true, false, true, 'Dupont', 'Jean', 'Un trek emblématique autour du plus haut sommet des Alpes', '/images/tour-mont-blanc.jpg'),
('Lac Blanc', 'Alpes', 'Flégère', 'Lac Blanc', 7, true, false, false, NULL, NULL, 'Une randonnée accessible avec une vue exceptionnelle sur le massif du Mont-Blanc', '/images/lac-blanc.jpg');

-- Articles de blog
INSERT INTO articles_blog (titre, contenu, auteur_id, image_url, categorie) VALUES 
('Les 10 plus belles randonnées des Alpes', 'Contenu détaillé sur les randonnées...', 1, '/images/randonnees-alpes.jpg', 'Randonnée'),
('Débuter en escalade: guide complet', 'Tout ce que vous devez savoir pour commencer l\'escalade en toute sécurité...', 2, '/images/debuter-escalade.jpg', 'Escalade'),
('Préparer son matériel de ski pour l\'hiver', 'Comment entretenir et préparer votre équipement avant la saison...', 1, '/images/materiel-ski.jpg', 'Ski alpin');

-- Vidéos
INSERT INTO videos (titre, description, url, auteur_id, thumbnail, categorie) VALUES 
('Technique de descente en ski alpin', 'Apprenez les techniques essentielles pour améliorer votre descente en ski alpin', 'https://www.youtube.com/watch?v=example1', 2, '/images/video-ski.jpg', 'Ski alpin'),
('Astuces pour l\'escalade en extérieur', 'Conseils de sécurité et techniques pour l\'escalade en milieu naturel', 'https://www.youtube.com/watch?v=example2', 1, '/images/video-escalade.jpg', 'Escalade');

-- Tags
INSERT INTO tags (nom) VALUES 
('débutant'), ('expert'), ('sécurité'), ('matériel'), ('famille');

-- Association articles-tags
INSERT INTO article_tags (article_id, tag_id) VALUES 
(1, 1), (1, 5), (2, 1), (2, 3), (3, 4);

-- Clients
INSERT INTO clients (nom, prenom, email, telephone, rue, cp, ville) VALUES 
('Martin', 'Sophie', 'sophie.martin@email.com', '0123456789', '15 rue des Alpes', '74000', 'Annecy'),
('Durand', 'Thomas', 'thomas.durand@email.com', '0987654321', '8 avenue de la Montagne', '73000', 'Chambéry');

-- Prestations
INSERT INTO prestations (nom, description, prix, date_debut, date_fin, activite_id) VALUES 
('Week-end Randonnée au Lac Blanc', 'Un week-end guidé pour découvrir le Lac Blanc et ses environs', 150.00, '2023-07-15', '2023-07-16', 1),
('Stage d\'escalade initiation', 'Stage de 3 jours pour apprendre les bases de l\'escalade en sécurité', 280.00, '2023-08-10', '2023-08-12', 2),
('Semaine ski tout compris à Val d\'Isère', 'Forfait ski, hébergement et cours inclus', 890.00, '2024-01-20', '2024-01-27', 3);

-- Réservations
INSERT INTO reservations (date_debut, date_fin, nombre_personnes, prix_total, client_id, prestation_id, statut) VALUES 
('2023-07-15', '2023-07-16', 2, 300.00, 1, 1, 'confirmee'),
('2023-08-10', '2023-08-12', 1, 280.00, 2, 2, 'confirmee');

-- Partages d'expérience
INSERT INTO partages_experience (titre, contenu, utilisateur_id, sport, lieu, date_experience, image_url) VALUES 
('Mon ascension du Mont Blanc', 'Récit de mon expérience inoubliable lors de l\'ascension du plus haut sommet des Alpes...', 2, 'Alpinisme', 'Chamonix, France', '2023-06-20', '/images/experience-mont-blanc.jpg'),
('Week-end de ski à La Plagne', 'Superbes conditions et pistes exceptionnelles lors de notre séjour à La Plagne...', 1, 'Ski', 'La Plagne, France', '2023-02-15', '/images/experience-la-plagne.jpg');

-- Commentaires
INSERT INTO commentaires (contenu, utilisateur_id, article_id) VALUES 
('Article très instructif, merci pour ces conseils !', 2, 1),
('J\'ai essayé ces techniques et elles m\'ont vraiment aidé.', 1, 2);