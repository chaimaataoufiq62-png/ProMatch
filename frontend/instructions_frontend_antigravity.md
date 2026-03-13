# Instructions pour Antigravity : Développement du Frontend Talynx

**Contexte pour l'Agent IA :**
Tu vas construire le frontend complet d'une application web nommée **Talynx**. C'est une plateforme de mise en relation entre des candidats et des entreprises via des challenges techniques. Le backend (Node.js/Express/MySQL) est déjà terminé et expose une API REST. 
**Important :** Il s'agit d'un **site web (responsive)** et non d'une application mobile webview. Utilise les standards et bonnes pratiques du web.

---

## 1. Stack Technique Requise
- **Framework :** React (via Vite)
- **Routage :** React Router DOM v6
- **Style :** CSS pur ou Tailwind CSS (respecter scrupuleusement le Design System ci-dessous)
- **Appels API :** Axios (avec un intercepteur pour injecter le JWT `Bearer token` stocké en `localStorage`)
- **Icônes :** React Icons ou Lucide React

---

## 2. Design System & UI/UX (Critique)
Le site doit avoir un rendu **Premium, Moderne et Flat Design** (Pas d'effet Glassmorphism).

- **Couleurs Principales :** 
  - Dégradé identitaire fort : `Sky Blue` vers `Lilac/Purple` doux (ex: `linear-gradient(to right, #00B4DB, #B06AB3)` - à ajuster pour un rendu tech/vibrant).
  - Ce dégradé doit être utilisé pour les boutons principaux, les bordures actives des formulaires, les jauges de compétences, et les diviseurs (dividers).
- **Fonds (Backgrounds) :**
  - Fond de base de la page : Gris très clair / Off-white (ex: `#f7f9fc`).
  - Conteneurs/Cartes : **Blanc uni et propre** (`#ffffff`) avec des ombres très légères et douces (`box-shadow: 0 4px 6px rgba(0,0,0,0.05)`).
- **Typographie :**
  - Titres et Labels : Une police large, technique et "futuriste" mais lisible (ex: `Orbitron`, `Montserrat`, `Syncopate` ou une géométrique sans-serif).
  - Texte courant : `Inter`, `Roboto` ou `Open Sans` de couleur sombre (Navy / Gris très foncé).
- **Compétences (Skills) :** Les compétences techniques doivent être affichées avec des badges visuels et une jauge/étoiles de niveau (1 à 5) utilisant le dégradé de la marque.

---

## 3. Structure des API du Backend (Endpoint de base : `/api`)

### Authentification (Public)
- `POST /auth/register` : `{ email, password, type ('candidat' ou 'entreprise'), nom, prenom, nomEntreprise }`
- `POST /auth/login` : `{ email, password }` -> Retourne `{ token, utilisateur: { id, type, profile } }`

### Espace Candidat (Header: Authorization Bearer)
- `GET /candidate/profile` & `PUT /candidate/profile`
- `GET /candidate/skills` & `POST /candidate/skills` (Tableau de compétences avec IDs et niveaux)
- `GET /candidate/matches` (Filtres optionnels : `?minScore=X`)
- `GET /candidate/submissions` (Défis soumis par le candidat)
- `POST /candidate/challenges/:id/submit` (FormData: `contenu_reponse`, `lien_github`, [file](file:///c:/Users/Ramir/OneDrive/Desktop/documents%20projet%20web/ProMatch/backend/middlewares/uploadSubmissionMiddleware.js#15-24))

### Espace Entreprise (Header: Authorization Bearer)
- `GET /company/profile` & `PUT /company/profile`
- `GET /company/challenges` & `POST /company/challenges`
- `PUT /company/challenges/:id` & `DELETE /company/challenges/:id`
- `POST /company/challenges/:id/skills` & `POST /company/challenges/:id/eligibility`
- `GET /company/challenges/:id/matches` (Liste des candidats matchés pour CE défi)
- `GET /company/challenges/:id/submissions` (Liste des réponses reçues)
- `POST /company/submissions/:id/evaluate` : `{ note_finale (0-100), commentaire, est_qualifie (boolean) }`

### Shared / Global
- `GET /competences` : Récupère le dictionnaire global des compétences disponibles.
- `GET /notifications` & `GET /notifications/unread-count` & `PUT /notifications/read-all`

---

## 4. Pages à Développer

**1. Flux Public**
- Page d'accueil (Landing page très basique présentant Talynx)
- Page Login
- Page Inscription (Formulaire dynamique selon le type choisi)

**2. Layout Connecté**
- **Navbar :** Logo à gauche, liens de navigation au centre, cloche de notifications et profil à droite.
- **Sidebar (optionnelle) ou Menu Haut :** Navigation adaptée selon le rôle (`candidat` vs `entreprise`).

**3. Pages Candidat**
- **Dashboard :** Statistiques clés et derniers matchs.
- **Mon Profil :** Grand formulaire 2 colonnes (Infos Perso vs Éducation/Compétences). Bouton "Ajouter compétence" et "Sauvegarder" en dégradé.
- **Trouver des opportunités (Matchs) :** Liste des défis éligibles où le score est ≥ 30%.
- **Détail d'un Défi & Soumission :** Formulaire pour uploader un ZIP/PDF ou mettre un lien GitHub.
- **Mes candidatures :** Suivi des soumissions et notes reçues.

**4. Pages Entreprise**
- **Dashboard :** Résumé des défis actifs et candidats qualifiés.
- **Mon Profil Entreprise :** Édition des infos de la boîte.
- **Gestion des Défis :** Liste, création de défis (titre, description, dates, compétences requises, critères de filtrage).
- **Voir les Candidats (Matching) :** Classement des meilleurs candidats pour un défi avec leur barre de compatibilité (Score 0-100%).
- **Évaluer les réponses :** Interface pour lire la soumission, télécharger le fichier joint, et entrer une note sur 100.

---

## 5. Plan d'Action Demandé à l'Agent
1. Initialise le projet React/Vite (`npm create vite@latest frontend -- --template react`).
2. Mets en place le routeur (React Router v6) avec des routes publiques et des routes protégées (`ProtectedRoute` basées sur le rôle).
3. Crée le Design System (variables CSS pour les dégradés, polices, et ombres).
4. Développe les formulaires d'auth et l'intégration Axios.
5. Commence par développer l'Espace Candidat (Profil + Compétences), car son UI est la plus complexe. Fais bien attention aux indications de style.
