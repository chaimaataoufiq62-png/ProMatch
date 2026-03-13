-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: talynx
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidat`
--

DROP TABLE IF EXISTS `candidat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `dateNaissance` date DEFAULT NULL,
  `ecole` varchar(150) DEFAULT NULL,
  `diplome` varchar(150) DEFAULT NULL,
  `specialite` varchar(150) DEFAULT NULL,
  `niveauEtude` varchar(50) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `profilValide` tinyint(1) DEFAULT 0,
  `utilisateur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_candidat_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidat`
--

LOCK TABLES `candidat` WRITE;
/*!40000 ALTER TABLE `candidat` DISABLE KEYS */;
INSERT INTO `candidat` VALUES (1,'Amir','Youssef','0600000001',NULL,'2000-05-10',NULL,NULL,NULL,NULL,NULL,0,1),(2,'Haddad','Sara','0600000002',NULL,'1999-03-22',NULL,NULL,NULL,NULL,NULL,0,2),(3,'Benali','Nabil','0600000003',NULL,'2001-01-11',NULL,NULL,NULL,NULL,NULL,0,3),(4,'Azzam','Lina','0600000004',NULL,'1998-11-30',NULL,NULL,NULL,NULL,NULL,0,4),(5,'Amir','Radia','0600000000','Marrakech','2004-06-15','ENSA Marrakech','Ingénierie','Génie Informatique','Bac+5','Étudiante en ingénierie informatique.',0,11),(6,'AMIR','Radia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,13),(7,'chacha','RORO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,14),(8,'chocho','roro',NULL,'lyon',NULL,'ENSIAS','Master','Data science','Bac+5','ingénieur',0,15),(9,'Durand','Alice',NULL,'Paris',NULL,'Epitech','Master','Développement Logiciel','Bac+5','Passionnée par le développement web et les architectures modernes.',0,20),(10,'Lefebvre','Bob',NULL,'Lyon',NULL,'HEC','Master','Marketing','Bac+5','Spécialiste du marketing digital avec un goût pour le design.',0,21),(13,'El Amrani','Yassine',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,27);
/*!40000 ALTER TABLE `candidat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `candidat_competence`
--

DROP TABLE IF EXISTS `candidat_competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidat_competence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidat_id` int(11) DEFAULT NULL,
  `competence_id` int(11) DEFAULT NULL,
  `niveau` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_candidat_competence` (`candidat_id`,`competence_id`),
  KEY `competence_id` (`competence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidat_competence`
--

LOCK TABLES `candidat_competence` WRITE;
/*!40000 ALTER TABLE `candidat_competence` DISABLE KEYS */;
INSERT INTO `candidat_competence` VALUES (1,1,1,5),(2,1,2,4),(3,1,3,3),(4,1,4,4),(5,2,5,5),(6,2,6,4),(7,2,2,3),(8,2,11,4),(9,3,8,5),(10,3,9,4),(11,3,11,4),(12,3,12,3),(13,4,1,3),(14,4,6,4),(15,4,10,4),(16,4,11,5),(17,5,1,4),(18,5,2,3),(19,5,3,5),(20,8,3,5),(21,8,11,3),(22,8,19,5),(23,8,17,4),(24,9,21,5),(25,9,22,4),(26,9,23,4),(27,10,28,5),(28,10,26,3),(29,9,35,5),(30,9,36,4),(31,10,39,5);
/*!40000 ALTER TABLE `candidat_competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titre` varchar(200) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `niveau` varchar(50) DEFAULT NULL,
  `dateDebut` date DEFAULT NULL,
  `dateFin` date DEFAULT NULL,
  `entreprise_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_challenge_entreprise` (`entreprise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (1,'AI Prediction System','Build a predictive ML model using real datasets','advanced','2026-04-01','2026-04-15',1),(2,'Data Cleaning Challenge','Prepare and analyze a messy dataset','intermediate','2026-04-05','2026-04-18',2),(3,'Cyber Attack Simulation','Detect and mitigate simulated cyber attacks','advanced','2026-04-07','2026-04-20',3),(4,'Fullstack Web Platform','Create a web platform using React and Node','intermediate','2026-04-10','2026-04-25',4),(5,'Challenge React avancé','Créer une interface React responsive avec composants réutilisables','avance','2026-03-20','2026-03-30',5),(6,'Fullstack React/Node Developer','Développement d\'un dashboard analytique temps réel.','Intermédiaire',NULL,NULL,9),(7,'Backend Engineer - Scalability','Optimisation des performances de l\'architecture microservices.','Avancé',NULL,NULL,9),(8,'UI/UX Design Challenge','Refonte de l\'interface utilisateur d\'une application mobile.','Débutant',NULL,NULL,10),(9,'Fullstack React/Node Developer','Développement d\'un dashboard analytique temps réel.','Intermédiaire',NULL,NULL,9),(10,'UI/UX Design Challenge','Refonte de l\'interface utilisateur d\'une application mobile.','Débutant',NULL,NULL,10),(11,'Développer une interface React de gestion des candidatures','Créer un dashboard web permettant de consulter et filtrer les candidatures.\nCompétences requises :\n\nReact, JavaScript, CSS, API REST','Intermédiaire','2026-03-13','2026-03-14',13);
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_competence`
--

DROP TABLE IF EXISTS `challenge_competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_competence` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_id` int(11) DEFAULT NULL,
  `competence_id` int(11) DEFAULT NULL,
  `poids` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_challenge_competence` (`challenge_id`,`competence_id`),
  KEY `competence_id` (`competence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_competence`
--

LOCK TABLES `challenge_competence` WRITE;
/*!40000 ALTER TABLE `challenge_competence` DISABLE KEYS */;
INSERT INTO `challenge_competence` VALUES (1,1,1,5),(2,1,3,5),(3,1,4,3),(4,2,2,4),(5,2,4,5),(6,2,1,3),(7,3,8,5),(8,3,9,5),(9,3,11,3),(10,4,5,5),(11,4,6,5),(12,4,11,3),(13,5,1,3),(14,5,2,4),(15,5,3,2),(16,6,22,5),(17,6,23,5),(18,6,25,5),(19,7,23,5),(20,7,31,5),(21,7,25,5),(22,8,26,5),(23,9,35,5),(24,9,36,5),(25,9,38,5),(26,10,39,5);
/*!40000 ALTER TABLE `challenge_competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `challenge_eligibilite`
--

DROP TABLE IF EXISTS `challenge_eligibilite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_eligibilite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `challenge_id` int(11) NOT NULL,
  `type_critere` varchar(50) NOT NULL,
  `valeur` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_challenge_eligibilite_challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_eligibilite`
--

LOCK TABLES `challenge_eligibilite` WRITE;
/*!40000 ALTER TABLE `challenge_eligibilite` DISABLE KEYS */;
INSERT INTO `challenge_eligibilite` VALUES (1,5,'ville','marrakech'),(2,5,'specialite','génie informatique');
/*!40000 ALTER TABLE `challenge_eligibilite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competence`
--

DROP TABLE IF EXISTS `competence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competence` (
  `id` int(11) NOT NULL DEFAULT 0,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competence`
--

LOCK TABLES `competence` WRITE;
/*!40000 ALTER TABLE `competence` DISABLE KEYS */;
INSERT INTO `competence` VALUES (4,'Data Analysis'),(8,'Cybersecurity'),(9,'Network Security'),(11,'Git'),(16,'MySQL'),(18,'API REST'),(19,'HTML'),(20,'CSS'),(34,'JavaScript'),(35,'React'),(36,'Node.js'),(37,'Python'),(38,'SQL'),(39,'UI/UX Design'),(40,'Project Management'),(41,'Marketing Digital'),(42,'Java'),(43,'C++'),(44,'Docker'),(45,'AWS'),(46,'Machine Learning');
/*!40000 ALTER TABLE `competence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entreprise`
--

DROP TABLE IF EXISTS `entreprise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entreprise` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nomEntreprise` varchar(150) DEFAULT NULL,
  `secteur` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `telephone` varchar(30) DEFAULT NULL,
  `siteWeb` varchar(150) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_entreprise_utilisateur` (`utilisateur_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entreprise`
--

LOCK TABLES `entreprise` WRITE;
/*!40000 ALTER TABLE `entreprise` DISABLE KEYS */;
INSERT INTO `entreprise` VALUES (1,'TechCorp','Artificial Intelligence',NULL,NULL,NULL,'www.techcorp.com',5),(2,'DataVision','Data Science',NULL,NULL,NULL,'www.datavision.com',6),(3,'CyberSecure','Cybersecurity',NULL,NULL,NULL,'www.cybersecure.com',7),(4,'WebSolutions','Software Development',NULL,NULL,NULL,'www.websolutions.com',8),(5,'Talynx','Technologie','Plateforme de matching entre candidats et entreprises.','Casablanca','0522000000','https://talynx.com',10),(6,'Talynx',NULL,NULL,NULL,NULL,NULL,12),(7,'TechCorp',NULL,NULL,NULL,NULL,NULL,16),(8,'TechCorp',NULL,NULL,NULL,NULL,NULL,17),(9,'TechCorp Solutions','Technologie','Une entreprise leader en solutions cloud et IA.','Paris',NULL,NULL,18),(10,'Creative Agency','Marketing & Design','Agence de communication innovante.','Lyon',NULL,NULL,19),(13,'Atlas Digital Solutions',NULL,NULL,NULL,NULL,NULL,26);
/*!40000 ALTER TABLE `entreprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation_challenge`
--

DROP TABLE IF EXISTS `evaluation_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation_challenge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `soumission_id` int(11) NOT NULL,
  `entreprise_id` int(11) NOT NULL,
  `note_finale` decimal(5,2) NOT NULL,
  `commentaire` text DEFAULT NULL,
  `est_qualifie` tinyint(1) DEFAULT 0,
  `date_evaluation` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_evaluation_soumission` (`soumission_id`),
  KEY `fk_evaluation_entreprise` (`entreprise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation_challenge`
--

LOCK TABLES `evaluation_challenge` WRITE;
/*!40000 ALTER TABLE `evaluation_challenge` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matching_resultat`
--

DROP TABLE IF EXISTS `matching_resultat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matching_resultat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidat_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `score` decimal(5,2) NOT NULL DEFAULT 0.00,
  `eligible` tinyint(1) NOT NULL DEFAULT 0,
  `date_matching` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_matching_resultat` (`candidat_id`,`challenge_id`),
  KEY `fk_matching_challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matching_resultat`
--

LOCK TABLES `matching_resultat` WRITE;
/*!40000 ALTER TABLE `matching_resultat` DISABLE KEYS */;
INSERT INTO `matching_resultat` VALUES (1,5,5,76.00,1,'2026-03-12 00:48:00'),(2,5,4,0.00,1,'2026-03-12 00:48:00'),(3,5,3,0.00,1,'2026-03-12 00:48:00'),(4,5,2,40.00,1,'2026-03-12 00:48:00'),(5,5,1,69.00,1,'2026-03-12 00:48:00'),(11,8,5,22.00,0,'2026-03-13 18:37:33'),(12,8,4,14.00,1,'2026-03-13 18:37:33'),(13,8,3,14.00,1,'2026-03-13 18:37:33'),(14,8,2,0.00,0,'2026-03-13 18:37:33'),(15,8,1,38.00,1,'2026-03-13 18:37:33'),(121,13,11,0.00,0,'2026-03-13 19:19:36'),(122,13,10,0.00,0,'2026-03-13 19:19:36'),(123,13,9,0.00,0,'2026-03-13 19:19:36'),(124,13,8,0.00,0,'2026-03-13 19:19:36'),(125,13,7,0.00,0,'2026-03-13 19:19:36'),(126,13,6,0.00,0,'2026-03-13 19:19:36'),(127,13,5,0.00,0,'2026-03-13 19:19:36'),(128,13,4,0.00,0,'2026-03-13 19:19:36'),(129,13,3,0.00,0,'2026-03-13 19:19:36'),(130,13,2,0.00,0,'2026-03-13 19:19:36'),(131,13,1,0.00,0,'2026-03-13 19:19:36');
/*!40000 ALTER TABLE `matching_resultat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `est_lue` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `utilisateur_id` (`utilisateur_id`),
  CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `soumission_challenge`
--

DROP TABLE IF EXISTS `soumission_challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `soumission_challenge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `candidat_id` int(11) NOT NULL,
  `challenge_id` int(11) NOT NULL,
  `contenu_reponse` text DEFAULT NULL,
  `fichier_reponse` varchar(255) DEFAULT NULL,
  `lien_github` varchar(255) DEFAULT NULL,
  `date_soumission` timestamp NOT NULL DEFAULT current_timestamp(),
  `statut` enum('soumis','corrige') DEFAULT 'soumis',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_soumission` (`candidat_id`,`challenge_id`),
  KEY `fk_soumission_challenge` (`challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `soumission_challenge`
--

LOCK TABLES `soumission_challenge` WRITE;
/*!40000 ALTER TABLE `soumission_challenge` DISABLE KEYS */;
/*!40000 ALTER TABLE `soumission_challenge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type` enum('candidat','entreprise') NOT NULL,
  `dateInscription` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `uq_utilisateur_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'','','youssef.amir@mail.com','1234','candidat','2026-03-06 00:48:02'),(2,'','','sara.haddad@mail.com','1234','candidat','2026-03-06 00:48:02'),(3,'','','nabil.benali@mail.com','1234','candidat','2026-03-06 00:48:02'),(4,'','','lina.azzam@mail.com','1234','candidat','2026-03-06 00:48:02'),(5,'','','hr@techcorp.com','1234','entreprise','2026-03-06 00:48:02'),(6,'','','careers@datavision.com','1234','entreprise','2026-03-06 00:48:02'),(7,'','','jobs@cybersecure.com','1234','entreprise','2026-03-06 00:48:02'),(8,'','','talent@websolutions.com','1234','entreprise','2026-03-06 00:48:02'),(9,'','','test@mail.com','$2b$10$hLnt5k8bIlLR2o4neNhBtuiy4Kms82L3w4httrYO19BfNCLPPU2sO','candidat','2026-03-06 01:24:03'),(10,'','','entreprise@test.com','$2b$10$qB2eC3r2/m0VLAzHPOHuMuTMoIXuMMWcmLrpTav/dOgxO.B5pfZZy','entreprise','2026-03-11 22:36:41'),(11,'','','candidat@test.com','$2b$10$RjxOTg0Bpgz4PptFAnkzc.c/EU5btn0.TX5EFpEDb6UvaBvXDInV.','candidat','2026-03-11 22:40:30'),(12,'','','entreprise1@test.com','$2b$10$hfyeHrj5fWI5k9EjJvtiMeZ8llLFow70gkzLueEIQL2StoiFVFeWi','entreprise','2026-03-11 22:42:59'),(13,'','','ra@gmail.com','$2b$10$XyfZIDwVuHB76GyJYOcGsem18g9Wxrcc8EcdgC4D3i.a2I9khovRW','candidat','2026-03-13 18:01:05'),(14,'','','r2@gmail.com','$2b$10$uHt7wMK5NsBEIYpAtCuOV./CwafC9F/c313RRGoMpPjbIeP69nPKq','candidat','2026-03-13 18:08:09'),(15,'','','r3@gmail.com','$2b$10$B/L5btt2A6D8slbTGH3xc.sqln9pjqbrbp0hASYQ0ViWpMPhVO4ym','candidat','2026-03-13 18:09:30'),(16,'','','techcorp@gmail.com','$2b$10$6XNGvs5Dxt4r3mGlTOwa8ekE3.52xJr9.1n4FNb.sydSly1aSnNvu','entreprise','2026-03-13 18:31:35'),(17,'','','r4@gmail.com','$2b$10$j91OseeJdV2G0uwToTqy1uxcJodLB16jEqfMe4SJW2HfCNIq0lFtW','entreprise','2026-03-13 18:32:45'),(18,'','','demo_techcorp@example.com','$2b$10$.s7uWtRIYErTlA4HBg2ZieddEAZMEl4VSNFD2X4uaSVoUXTHK0jLa','entreprise','2026-03-13 18:53:40'),(19,'','','demo_creative@example.com','$2b$10$.s7uWtRIYErTlA4HBg2ZieddEAZMEl4VSNFD2X4uaSVoUXTHK0jLa','entreprise','2026-03-13 18:53:40'),(20,'','','demo_alice@example.com','$2b$10$.s7uWtRIYErTlA4HBg2ZieddEAZMEl4VSNFD2X4uaSVoUXTHK0jLa','candidat','2026-03-13 18:53:40'),(21,'','','demo_bob@example.com','$2b$10$.s7uWtRIYErTlA4HBg2ZieddEAZMEl4VSNFD2X4uaSVoUXTHK0jLa','candidat','2026-03-13 18:53:40'),(26,'','','contact@atlas-digital-demo.ma','$2b$10$q6t/UCvtxOqDAgsUqA9PWOv8TIM5HXnox.Uplx7h1i5ijyL7/yM36','entreprise','2026-03-13 19:15:38'),(27,'','','yassine.elamrani.demo@gmail.com','$2b$10$Xp3tXWJog8QGanCKle.wK.AR4JFLKcRhKQwu/B1Ss/CjnCixvbgha','candidat','2026-03-13 19:19:16');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-13 19:56:13
