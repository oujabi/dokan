require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const nodemailer = require('nodemailer');

// Configuration CORS
app.use(cors({
    origin: process.env.ROOT,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Routes pour les pages sans extension
app.get('/aikido', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'aikido.html'));
})

// app.get('/dokan', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pages', 'dokan.html'));
// });
//
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'contact.html'));
});

app.get('/infos-pratiques', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages', 'infos-pratiques.html'));
});

// app.get('/medias', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pages', 'medias.html'));
// });
//
// app.get('/stages', (req, res) => {
//     res.sendFile(path.join(__dirname, 'pages', 'stages.html'));
// });

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route de configuration
app.get('/config', async (req, res) => {
    console.log('Config request - ROOT:', process.env.ROOT, 'SMTP_MAIL_TO:', process.env.SMTP_MAIL_TO);
    
    if (!process.env.ROOT || !process.env.SMTP_MAIL_TO) {
        console.error('Configuration manquantes:', {
            ROOT: process.env.ROOT,
            SMTP_MAIL_TO: process.env.SMTP_MAIL_TO
        });
        return res.status(500).json({
            error: 'Configuration serveur incomplète',
            missing: {
                root: !process.env.ROOT,
                smtpMailTo: !process.env.SMTP_MAIL_TO
            }
        });
    }
    
    res.json({
        root: process.env.ROOT,
        smtpMailTo: process.env.SMTP_MAIL_TO
    });
});

// Route pour /send-email
app.post('/send-email', async (req, res) => {
    try {
        const { to, from, subject, text } = req.body;
        if (!to || !from || !subject || !text) {
            return res.status(400).json({ success: false, error: "Champs manquants" });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const mailOptions = { from, to, subject, text };
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email envoyé !", info });
    } catch (error) {
        console.error("Erreur SMTP :", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.use((req, res) => {
    res.status(404).send('404 - Page non trouvée');
});

// Gestion des erreurs non capturées
process.on('uncaughtException', (err) => {
    console.error('Erreur non capturée :', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Promesse rejetée non capturée :', err);
    process.exit(1);
});

// Démarrer le serveur
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Serveur démarré sur ` + process.env.ROOT + ` }`);
});



