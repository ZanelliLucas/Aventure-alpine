-- Création de la base de données
CREATE DATABASE IF NOT EXISTS aventures_alpines;
USE aventures_alpines;

-- Table des visiteurs
CREATE TABLE IF NOT EXISTS visiteur (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_visite DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table des clients
CREATE TABLE IF NOT EXISTS client (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  rue VARCHAR(255),
  cp VARCHAR(10),
  ville VARCHAR(100),
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

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
  type_activite_id INT,
  FOREIGN KEY (type_activite_id) REFERENCES type_activite(id)
);

-- Table des types d'activités
CREATE TABLE IF NOT EXISTS type_activite (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  description TEXT
);

-- Table des niveaux
CREATE TABLE IF NOT EXISTS type_niveau (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  description TEXT
);

-- Table des sports
CREATE TABLE IF NOT EXISTS type_sport (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL,
  description TEXT
);

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

-- Table des prestations
CREATE TABLE IF NOT EXISTS prestation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  activite_id INT,
  FOREIGN KEY (activite_id) REFERENCES activites(id)
);

-- Table des réservations
CREATE TABLE IF NOT EXISTS reservation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  nombre_personnes INT NOT NULL,
  prix DECIMAL(10,2) NOT NULL,
  client_id INT NOT NULL,
  prestation_id INT NOT NULL,
  date_reservation DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES client(id),
  FOREIGN KEY (prestation_id) REFERENCES prestation(id)
);

-- Table des partages d'expérience
CREATE TABLE IF NOT EXISTS partage_experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  contenu TEXT NOT NULL,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  utilisateur_id INT NOT NULL,
  image_url VARCHAR(255),
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Table des tags de contenu
CREATE TABLE IF NOT EXISTS contenu_tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-- Table d'association entre les articles et les tags
CREATE TABLE IF NOT EXISTS article_tag (
  article_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY (article_id, tag_id),
  FOREIGN KEY (article_id) REFERENCES articles_blog(id),
  FOREIGN KEY (tag_id) REFERENCES contenu_tags(id)
);

-- Exemples d'insertions de données
-- Insérer des types d'activités
INSERT INTO type_activite (nom, description) VALUES 
('Loisir', 'Activités récréatives pour tous les niveaux'),
('Compétition', 'Activités compétitives pour les sportifs expérimentés');

-- Insérer des niveaux
INSERT INTO type_niveau (nom, description) VALUES 
('Famille', 'Adapté à tous les âges et niveaux'),
('Expérimenté', 'Pour les personnes ayant déjà pratiqué l\'activité'),
('Sensation forte', 'Pour les amateurs de sensations fortes et de défis');

-- Insérer des sports
INSERT INTO type_sport (nom, description) VALUES 
('Ski', 'Sport de glisse sur neige'),
('Randonnée', 'Promenade à pied en montagne'),
('Escalade', 'Grimper sur des parois rocheuses');

-- Insérer des utilisateurs
INSERT INTO utilisateurs (nom_utilisateur, email, mot_de_passe, date_inscription) VALUES 
('admin', 'admin@aventuresalpines.com', '$2a$10$Hj1yBJX7qVv1Wj.TpX1S9eGYfG9ZtH.wOIEO.5OmKJ5LZGIPrPnfO', NOW()),
('guide_montagne', 'guide@aventuresalpines.com', '$2a$10$QcX5yL.K3Eh/L5NhfBF1ZODHxy1yPV1S1U9tysF/sA5glwO9ErXHq', NOW());

-- Insérer des activités
INSERT INTO activites (nom, description, niveau_difficulte, image_url, saison_recommandee, type_activite_id) VALUES 
('Ski alpin aux Alpes', 'Profitez des pistes enneigées des Alpes françaises', 'intermediaire', '/images/ski-alpin.jpg', 'Hiver', 1),
('Randonnée au Mont Blanc', 'Une randonnée spectaculaire avec vue sur le Mont Blanc', 'avance', '/images/mont-blanc.jpg', 'Été', 1),
('Escalade à Chamonix', 'Escaladez les falaises de Chamonix avec nos guides experts', 'expert', '/images/escalade-chamonix.jpg', 'Été', 2);

-- Insérer des sites d'escalade
INSERT INTO sites_escalade (nom, description, niveau_difficulte, emplacement, image_url, temps_ascension) VALUES 
('Falaises de Chamonix', 'Les célèbres falaises de Chamonix offrent des défis pour tous les niveaux', 'moyen', 'Chamonix, France', '/images/falaises-chamonix.jpg', '2-3 heures'),
('Aiguille du Midi', 'Une ascension spectaculaire avec des vues imprenables', 'experimente', 'Chamonix, France', '/images/aiguille-midi.jpg', '5-6 heures');

-- Insérer des stations de ski
INSERT INTO stations_ski (nom, description, conditions_enneigement, emplacement, image_url, remontees_mecaniques, type_piste) VALUES 
('Val d\'Isère', 'Une des meilleures stations de ski des Alpes françaises', 'Excellentes conditions de décembre à avril', 'Val d\'Isère, France', '/images/val-disere.jpg', true, 'rouge'),
('Les Arcs', 'Une station familiale avec des pistes pour tous les niveaux', 'Bonnes conditions de décembre à mars', 'Bourg-Saint-Maurice, France', '/images/les-arcs.jpg', true, 'bleue');

-- Insérer des itinéraires de randonnée
INSERT INTO itineraires_randonnee (nom, region, lieu_depart, lieu_arrivee, distance_km, praticable_ete, praticable_hiver, guide_necessaire, guide_nom, guide_prenom, description, image_url) VALUES 
('Tour du Mont Blanc', 'Alpes', 'Chamonix', 'Chamonix', 170, true, false, true, 'Dupont', 'Jean', 'Le célèbre tour du Mont Blanc, une randonnée de plusieurs jours autour du plus haut sommet des Alpes', '/images/tour-mont-blanc.jpg'),
('Lac Blanc', 'Alpes', 'Chamonix', 'Lac Blanc', 12, true, false, false, NULL, NULL, 'Une randonnée accessible offrant une vue spectaculaire sur le massif du Mont Blanc', '/images/lac-blanc.jpg');

-- Insérer des articles de blog
INSERT INTO articles_blog (titre, contenu, auteur_id, image_url) VALUES 
('Les meilleurs spots d\'escalade des Alpes', 'Découvrez notre sélection des meilleurs spots d\'escalade dans les Alpes françaises...', 1, '/images/escalade-alpes.jpg'),
('Préparer son sac pour une randonnée de plusieurs jours', 'Voici nos conseils pour bien préparer votre sac à dos pour une randonnée de plusieurs jours en montagne...', 2, '/images/sac-randonnee.jpg');

-- Insérer des prestations
INSERT INTO prestation (nom, description, date_debut, date_fin, activite_id) VALUES 
('Stage d\'escalade débutant', 'Un stage de 3 jours pour apprendre les bases de l\'escalade', '2023-07-01', '2023-07-03', 3),
('Séjour ski tout compris', 'Un séjour d\'une semaine avec hébergement, forfait et cours de ski', '2023-01-15', '2023-01-22', 1);
