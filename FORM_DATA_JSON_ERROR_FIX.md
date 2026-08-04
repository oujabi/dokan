# 🚨 Résoudre l'erreur : "SyntaxError: Unexpected token 'E', 'Email sent...' is not valid JSON"

*Guide pour corriger l'erreur de parsing JSON lors de l'envoi de FormData vers ton backend Node.js.*

---

## ❌ **Problème identifié**

Lorsque tu envoies un **FormData** vers ton endpoint `/send-mail`, tu obtiens cette erreur dans la console :

```
Error: SyntaxError: Unexpected token 'E', "Email sent..." is not valid JSON
```

### **Explication du problème**

| Côté | Comportement | Problème |
|------|--------------|----------|
| **Serveur** | Renvoie `res.send('Email sent: ...')` | Envoie du **texte brut** |
| **Frontend** | Appelle `response.json()` | Essaye de parser du **JSON** |
| **Résultat** | ❌ `JSON.parse('Email sent: ...')` échoue | `Unexpected token 'E'` |

> **Pourquoi ?** `JSON.parse()` attend un format comme `{"success": true}`, mais reçoit du texte brut comme `"Email sent: ..."`.

---

## ✅ **3 Solutions Possibles**

---

### **Option 1 : Renvoyer du JSON depuis le serveur (⭐ Recommandé)**

Modifie ta route pour envoyer une **réponse structurée en JSON** :

```javascript
app.post('/send-mail', (req, res) => {
    const { to, subject, text } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: 'ton-email@gmail.com', pass: 'ton-app-password' }
    });

    const mailOptions = { from: 'ton-email@gmail.com', to, subject, text };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // ✅ Renvoie un objet JSON en cas d'erreur
            return res.status(500).json({
                success: false,
                error: error.toString()
            });
        }
        // ✅ Renvoie un objet JSON en cas de succès
        res.status(200).json({
            success: true,
            message: 'Email envoyé avec succès',
            info: info.response
        });
    });
});
```

**Avantages** :
- ✅ Structure claire pour le frontend
- ✅ Gestion des erreurs simplifiée
- ✅ Compatible avec tous les clients (Postman, frontend, mobile)

---

### **Option 2 : Parser la réponse en texte brut côté frontend**

Si tu veux **garder la réponse en texte brut** du serveur, modifie ton frontend pour ne **pas** utiliser `.json()` :

```javascript
fetch('http://localhost:3000/send-mail', {
    method: 'POST',
    body: formData
})
.then(response => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.text();  // ✅ Utilise .text() au lieu de .json()
})
.then(text => {
    console.log(text);  // Affiche "Email sent: ..."
    alert(text);
})
.catch(error => {
    console.error('Erreur:', error);
});
```

**Quand l'utiliser ?** :
- Si tu veux une réponse simple et rapide
- Si tu n'as pas besoin de structurer les données

---

### **Option 3 : Envoyer correctement le FormData**

Si tu utilises **FormData**, assure-toi de :
1. **Ne pas** utiliser `JSON.stringify`
2. **Ne pas** forcer le header `Content-Type: application/json`

```javascript
// ✅ Création du FormData
const formData = new FormData();
formData.append('to', 'client@example.com');
formData.append('subject', 'Test d\'email');
formData.append('text', 'Bonjour depuis Dokan !');

// ✅ Envoi sans JSON.stringify et sans header Content-Type
fetch('http://localhost:3000/send-mail', {
    method: 'POST',
    body: formData  // ✅ Pas de JSON.stringify !
    // ❌ Ne pas ajouter : headers: { 'Content-Type': 'application/json' }
})
.then(response => response.json())  // ✅ Fonctionne si le serveur renvoie du JSON
.then(data => {
    console.log(data);
    if (data.success) {
        alert('Email envoyé !');
    } else {
        alert('Erreur : ' + data.error);
    }
})
.catch(error => console.error(error));
```

> ⚠️ **Important** : Le navigateur **définit automatiquement** le bon `Content-Type` pour FormData (ex: `multipart/form-data`).

---

## 🏆 **Solution Complète Recommandée**

### **1. Backend (`server.js`)**

```javascript
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();

// Middlewares
app.use(cors({ origin: 'http://localhost:63342' }));
app.use(express.json());  // Pour parser le JSON
app.use(express.urlencoded({ extended: true }));  // Pour parser FormData

// Route d'envoi d'email
app.post('/send-mail', (req, res) => {
    const { to, subject, text } = req.body;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ton-email@gmail.com',
            pass: 'ton-app-password'
        }
    });
    
    const mailOptions = {
        from: 'ton-email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur Nodemailer:', error);
            return res.status(500).json({
                success: false,
                error: 'Erreur lors de l\'envoi de l\'email',
                details: error.toString()
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Email envoyé avec succès',
            info: info.response
        });
    });
});

app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
```

---

### **2. Frontend (JavaScript)**

#### **Avec FormData (recommandé pour les formulaires HTML)**

```javascript
// Récupère les données du formulaire
const form = document.getElementById('monFormulaire');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Crée le FormData
    const formData = new FormData(form);
    
    try {
        const response = await fetch('http://localhost:3000/send-mail', {
            method: 'POST',
            body: formData  // ✅ Pas de JSON.stringify
        });
        
        const data = await response.json();  // ✅ Parse la réponse JSON
        
        if (data.success) {
            alert('✅ Email envoyé avec succès !');
        } else {
            alert('❌ Erreur : ' + data.error);
        }
    } catch (error) {
        console.error('Erreur réseau:', error);
        alert('⚠️ Erreur réseau. Vérifie la console.');
    }
});
```

#### **Avec JSON (alternative)**

```javascript
const form = document.getElementById('monFormulaire');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = {
        to: formData.get('to'),
        subject: formData.get('subject'),
        text: formData.get('text')
    };
    
    try {
        const response = await fetch('http://localhost:3000/send-mail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)  // ✅ JSON.stringify pour du JSON
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Email envoyé !');
        } else {
            alert('❌ Erreur : ' + result.error);
        }
    } catch (error) {
        console.error(error);
        alert('⚠️ Erreur.');
    }
});
```

---

## 📌 **Tableau récapitulatif des erreurs et solutions**

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Unexpected token 'E'` | Réponse serveur en texte brut, frontend attend du JSON | Utiliser `res.json()` côté serveur **OU** `response.text()` côté frontend |
| `415 Unsupported Media Type` | Header `Content-Type` manquant ou incorrect | Ne pas forcer le header pour FormData (le navigateur le gère) |
| `400 Bad Request` | Données mal formatées | Vérifier que `req.body` contient bien `to`, `subject`, `text` |
| `500 Invalid login` | Problème d'authentification Gmail | Utiliser un **App Password** (voir fichier `NODEMAILER_GMAIL_FIX.md`) |
| `CORS blocked` | Origines différentes | Ajouter le middleware `cors()` (voir fichier `CORS_FIX.md`) |

---

## 🔍 **Comment déboguer efficacement ?**

### **1. Vérifie la réponse du serveur**
Dans Chrome DevTools (**Onglet Network**) :
1. Soumets ton formulaire
2. Clique sur la requête `send-mail`
3. Vérifie l'onglet **Response** :
   - Si tu vois `"Email sent: ..."` → **Problème de parsing** (Solution 1 ou 2)
   - Si tu vois `{"success": true}` → **Frontend OK**
   - Si tu vois une erreur 500 → **Problème côté serveur**

### **2. Vérifie les headers**
Dans l'onglet **Request Headers** :
- `Content-Type` doit être :
  - `multipart/form-data` (si tu utilises FormData)
  - `application/json` (si tu utilises JSON.stringify)

### **3. Log les données côté serveur**
Ajoute un `console.log` dans ta route :
```javascript
app.post('/send-mail', (req, res) => {
    console.log('Requête reçue:', req.body);  // ✅ Log les données reçues
    console.log('Headers:', req.headers);    // ✅ Log les headers
    // ... reste du code
});
```

---

## 📚 **Bonnes pratiques**

1. **Toujours renvoyer du JSON** depuis ton API pour une meilleure compatibilité.
2. **Structurer tes réponses** :
   ```javascript
   // ✅ Bon
   res.json({ success: true, data: {...} });
   res.json({ success: false, error: 'Message d\'erreur' });
   
   // ❌ À éviter
   res.send('OK');
   res.send('Erreur');
   ```
3. **Gérer les erreurs** côté serveur avec des statuts HTTP appropriés :
   - `200` : Succès
   - `400` : Requête invalide
   - `500` : Erreur serveur
4. **Utiliser `try/catch`** côté frontend pour capturer les erreurs réseau.

---

## 🎯 **Résumé des étapes pour corriger ton erreur**

1. ✅ **Modifie ton serveur** pour renvoyer du JSON (`res.json()`)
2. ✅ **Vérifie ton frontend** :
   - Si FormData → pas de `JSON.stringify`
   - Si JSON → utilise `JSON.stringify` + header `Content-Type: application/json`
3. ✅ **Parse correctement la réponse** :
   - `.json()` si le serveur renvoie du JSON
   - `.text()` si le serveur renvoie du texte
4. ✅ **Redémarre ton serveur** et teste

---

*Généré pour le projet Dokan - [Mistral Vibe](https://mistral.ai/)*
