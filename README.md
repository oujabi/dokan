# Dokan - Site Vitrine du Club d'Aikido

Site web statique avec backend Node.js pour le club d'Aikido Dokan. Le site présente les activités du dojo, les stages, les informations pratiques et permet l'inscription via un formulaire avec envoi d'email.

---

## Structure du Projet

```
dokan/
├── assets/                          # Ressources multimédias
│   ├── illustrations/              # Illustrations (katana, samourai, etc.)
│   ├── landing-page/               # Images de la page d'accueil
│   ├── logos/                      # Logos (dokan, partenaires, réseaux sociaux)
│   ├── pictures/                   # Photos du dojo et de la pratique
│   ├── portraits/                  # Portraits
│   ├── stages/                     # Affiches des stages
│   └── videos/                     # Vidéos de démonstration
├── css/                            # Feuilles de style
│   ├── desktop.css                 # Styles pour desktop
│   ├── mobile.css                  # Styles pour mobile
│   └── tablet.css                  # Styles pour tablette
├── fonts/                          # Polices personnalisées
│   ├── Junge-Regular.ttf
│   └── Roboto-Regular.ttf
├── js/                             # Scripts JavaScript
│   ├── inscription-form/           # Gestion du formulaire d'inscription
│   │   ├── eventInscriptionFormValidation.js
│   │   ├── formInscriptionValidity.js
│   │   └── sendMail.js
│   ├── mobile-nav.js               # Navigation mobile
│   └── toggle-bar/                 # Barre de basculement des médias
│       ├── eventToggleMedias.js
│       └── toggleMedias.js
├── pages/                          # Pages HTML du site
│   ├── contact.html                # Page de contact
│   ├── dokan.html                  # Page du dojo
│   ├── infos-pratiques.html        # Informations pratiques
│   ├── medias.html                 # Galerie médias
│   └── stages.html                 # Liste des stages
├── .gitignore
├── index.html                      # Page d'accueil
├── main.css                        # Styles principaux
├── main.js                         # Script principal
├── package-lock.json
├── package.json                    # Dépendances Node.js
├── server.js                       # Serveur Express
└── README.md
```

---

## Prérequis

- [Node.js](https://nodejs.org/) (version 18+ recommandée)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)
- Un éditeur de code (VS Code, WebStorm, etc.)

---

## Installation

### 1. Cloner le dépôt

```bash
cd /chemin/vers/votre/dossier
git clone https://github.com/votre-utilisateur/dokan.git
cd dokan
```

### 2. Installer les dépendances

```bash
git checkout dev
npm install
```

Cette commande installe toutes les dépendances listées dans `package.json` :
- **express** (5.2.1) - Framework web pour Node.js
- **cors** (2.8.6) - Middleware pour CORS
- **dotenv** (17.4.2) - Chargement des variables d'environnement
- **nodemailer** (9.0.3) - Envoi d'emails
- **the-new-css-reset** (1.11.3) - Reset CSS moderne

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet avec les variables suivantes :

```env
# Configuration du serveur
SERVER_PORT=3000
ROOT=http://localhost:3000

# Configuration SMTP pour l'envoi d'emails
SMTP_HOST=smtp.votre-fournisseur.com
SMTP_PORT=587
SMTP_USER=votre@email.com
SMTP_PASS=votre-mot-de-passe
SMTP_MAIL_TO=destinataire@email.com
```

> **Note** : Pour les tests locaux, vous pouvez utiliser un service comme [Mailtrap](https://mailtrap.io/) ou [Ethereal](https://ethereal.email/) pour simuler l'envoi d'emails.

---

## Lancement

### Mode développement

```bash
node server.js
```

Le serveur démarrera sur le port spécifié dans `.env` (par défaut 3000).
Ouvrez votre navigateur à l'adresse : [http://localhost:3000](http://localhost:3000)

### Mode production

Pour une exécution en production, utilisez un process manager comme PM2 :

```bash
npm install -g pm2
pm2 start server.js --name dokan
pm2 save
pm2 start
```

---

## Configuration

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `SERVER_PORT` | Port du serveur Express | 3000 |
| `ROOT` | URL racine du site | http://localhost:3000 |
| `SMTP_HOST` | Hôte SMTP | smtp.gmail.com |
| `SMTP_PORT` | Port SMTP | 587 |
| `SMTP_USER` | Utilisateur SMTP | votre@email.com |
| `SMTP_PASS` | Mot de passe SMTP | ******** |
| `SMTP_MAIL_TO` | Email destinataire | contact@dokan.com |

---

### ecosystem.config.js
En production appliquer les variables du fichier .env dans l'objet env du fichier ecosystem.config.js

## Fonctionnalités

- **Pages statiques** : Accueil, Dojo, Stages, Médias, Contact, Infos pratiques
- **Design responsive** : Adapté mobile, tablette et desktop
- **Formulaire d'inscription** : Validation côté client et envoi par email
- **Gestion des médias** : Affichage conditionnel des images/vidéos
- **Navigation mobile** : Menu adaptatif pour les petits écrans

---

## Développement

### Structure des URLs

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/dokan` | Page du dojo |
| `/stages` | Liste des stages |
| `/medias` | Galerie médias |
| `/contact` | Formulaire de contact |
| `/infos-pratiques` | Informations pratiques |
| `/send-email` (POST) | Endpoint pour l'envoi d'email |
| `/config` (GET) | Récupération de la configuration frontend |

### Organisation du code

- **Backend** (`server.js`) : Routes Express et configuration du serveur
- **Frontend** : HTML/CSS/JS statique avec interaction via fetch API
- **Assets** : Organisation par catégorie pour une meilleure maintenance

---

## Technologies utilisées

| Catégorie | Technologies |
|-----------|--------------|
| Backend | Node.js, Express, Nodemailer |
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Build | Aucune (statique) |
| Déploiement | Compatible avec tout hébergeur Node.js |

---

## License

Ce projet est sous licence privée. Toutes les ressources (images, vidéos, logos) appartiennent au club d'Aikido Dokan.
