const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = 3000;
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Servir les fichiers statiques (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
    origin: 'http://localhost:63342'
}));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Dokan API!' });
});

app.post('/send-email', (req, res) => {
    const to = "test@dokan.com";
    const { from, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "acdcc46aada10b",
            pass: "5b7c996edb894a"
        }
    });

    const mailOptions = { from: from, to, subject, text };

    // transporter.sendMail({
    //     from: "Private Person <from@example.com>",
    //     to: "A Test User <to@example.com>",
    //     subject: "Hello from Mailtrap",
    //     text: "This is a test e-mail message."
    // }, (error, info) => {x
    //     if (error) {
    //         return console.log(error);
    //     }
    //     console.log("Message sent: %s", info.messageId);
    // });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({success: false, error: error.toString()});
        }
        res.status(200).json({
            success: true,
            message: 'Email envoyé avec succès',
            info: info.response
        });
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});



