require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Routes pour les pages
app.get('/aikido', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'aikido.html'));
});

app.get('/dokan', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'dokan.html'));
});

app.get('/eurasia', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'eurasia.html'));
});

app.get('/infos-pratiques', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'infos-pratiques.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Gestion des erreurs
process.on('uncaughtException', (err) => {
    console.error('Erreur non capturée :', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Promesse rejetée non capturée :', err);
    process.exit(1);
});

app.use((req, res) => {
    res.status(404).send('404 - Page non trouvée');
});

// Démarrer le serveur
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur démarré sur ${process.env.ROOT}`);
});