# ProMatch – Plateforme de Matching pour le Recrutement

## 📌 Présentation du projet

ProMatch est une plateforme web qui vise à faciliter et optimiser le processus de recrutement en mettant en relation les candidats et les entreprises grâce à un système de matching basé sur les compétences.

Les candidats peuvent créer un profil contenant leurs informations personnelles, leur formation, leurs compétences et leurs expériences professionnelles.
Les entreprises peuvent consulter les profils des candidats ou proposer des challenges techniques privés afin d’identifier les profils les plus qualifiés.

L’objectif principal de ProMatch est de réduire la durée du processus de recrutement tout en permettant aux entreprises d’identifier rapidement les talents correspondant à leurs besoins.

---

## 🎯 Objectifs

* Faciliter la mise en relation entre candidats et entreprises
* Réduire la durée du processus de recrutement
* Permettre aux entreprises d’identifier les talents via des challenges techniques
* Offrir aux candidats une meilleure visibilité auprès des entreprises

---

## ⚙️ Fonctionnalités principales

### Fonctionnalités côté candidat

* Inscription et connexion
* Création et gestion du profil
* Ajout de compétences et expériences
* Accès aux challenges ou opportunités proposés

### Fonctionnalités côté entreprise

* Création de compte entreprise
* Consultation des profils des candidats
* Publication de challenges techniques privés
* Recherche et filtrage des candidats selon leurs compétences

---

## 🛠️ Technologies utilisées

### Frontend

* React
* Vite
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Base de données

* MySQL

### Authentification

* JSON Web Token (JWT)

### Outils

* Git
* GitHub
* Thunder Client (tests API) integré dans VS Code

---

## 📂 Structure du projet

```
promatch/
│
├── frontend/
│   ├── 
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### 1. Cloner le repository

```
git clone https://github.com/votre-username/promatch.git
```

### 2. Accéder au dossier du projet

```
cd promatch
```

### 3. Installer les dépendances du backend

```
cd backend
npm install
```

### 4. Installer les dépendances du frontend

```
cd ../frontend
npm install
```

---

## ▶️ Lancer le projet

### Lancer le backend

```
cd backend
npm start
```

### Lancer le frontend

```
cd frontend
npm run dev
```

L’application sera ensuite accessible depuis votre navigateur en local.

---

## 🔐 Authentification

La plateforme utilise **JWT (JSON Web Token)** pour sécuriser l’authentification.

Lorsqu’un utilisateur se connecte :

1. Le serveur vérifie les identifiants
2. Un token JWT est généré
3. Ce token permet d’accéder aux routes protégées de l’application

---

## 🔗 Exemples de routes API

| Méthode | Route              | Description                        |
| ------- | ------------------ | ---------------------------------- |
| POST    | /api/auth/register | Création d’un compte utilisateur   |
| POST    | /api/auth/login    | Authentification utilisateur       |
| GET     | /api/candidates    | Récupération des profils candidats |
| POST    | /api/challenges    | Création d’un challenge technique  |

---

## 👥 Équipe

Projet réalisé dans le cadre d’un projet académique.

* AMEKHCHOUNE Ibtissam
* AMIR Radia
* TAOUFIQ Chaimaa

---

## 📈 Améliorations futures

* Système de recommandation basé sur l’IA
* Messagerie entre candidats et entreprises
* Système de filtrage avancé
* Tableau de bord pour les entreprises
* Intégration d’un environnement de challenge technique

---

## 📄 Statut du projet

Projet académique en cours de développement.
