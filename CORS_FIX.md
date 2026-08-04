# 🔓 Résoudre l'erreur CORS dans ton projet Dokan

*Guide pour autoriser les requêtes cross-origin entre ton frontend (WebStorm) et ton serveur Express.*

---

## ❌ **Problème : Erreur CORS dans Chrome**

```
Access to fetch at 'http://localhost:3000/send-email' from origin 'http://localhost:63342' 
has been blocked by CORS policy: 
Response to preflight request doesn't pass access control check: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### **Explication**
- Ton **frontend** (sur `http://localhost:63342`, port de WebStorm) essaie d'accéder à ton **API** (sur `http://localhost:3000`).
- Le navigateur **bloque** cette requête car les deux URLs n'ont pas la même **origine** (port différent = origine différente).
- C'est un mécanisme de **sécurité** pour éviter les requêtes malveillantes entre sites.

---

## ✅ **Solution : Configurer CORS dans Express**

### 1️⃣ **Installer le middleware `cors`**

Ouvre un terminal dans ton projet et exécute :
```bash
npm install cors
```

---

### 2️⃣ **Modifier ton `server.js`**

Ajoute le middleware CORS **au début** de ton fichier, juste après la déclaration de `app` :

```javascript
const express = require('express');
const cors = require('cors');  // ✅ 1. Importe le middleware
const app = express();

// ✅ 2. Active CORS pour toutes les routes
app.use(cors({
    origin: 'http://localhost:63342'  // Autorise uniquement ton frontend WebStorm
    // OU pour autoriser tous les origins (développement uniquement) :
    // origin: '*'
}));

// ✅ 3. Garde tes autres middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Tes routes (ex: /send-mail)
app.post('/send-mail', (req, res) => {
    const { to, subject, text } = req.body;
    // ... logique d'envoi d'email
});

// Démarre le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur http://localhost:3000');
});
```

---

## 📌 **Points critiques à vérifier**

### ⚠️ **1. Vérifie l'URL de ta route**
Dans ton formulaire frontend, assure-toi que l'URL correspond **exactement** à celle définie dans ton serveur :

```javascript
// ✅ Bon : correspond à app.post('/send-mail', ...)
fetch('http://localhost:3000/send-mail', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: 'client@example.com', subject: 'Test', text: 'Message' })
});

// ❌ Erreur : /send-email au lieu de /send-mail
fetch('http://localhost:3000/send-email', { ... });
```

> **Astuce** : Si tu as modifié la route dans `server.js`, mets à jour ton code frontend !

---

### ⚠️ **2. Vérifie le port de ton frontend**
- WebStorm utilise par défaut le port **`63342`** pour son serveur intégré.
- Si tu utilises un autre port (ex: `8080`), mets à jour l'`origin` dans `cors()` :
  ```javascript
  app.use(cors({
      origin: 'http://localhost:8080'  // Remplace par ton port
  }));
  ```

---

### ⚠️ **3. Redémarre ton serveur**
Après toute modification dans `server.js` :
1. Arrête le serveur avec **`Ctrl + C`** dans le terminal.
2. Relance-le :
   ```bash
   node server.js
   ```

---

## 🔄 **Alternative : Autoriser tous les origins (développement uniquement)**

Si tu veux autoriser **toutes les origines** (pratique en développement, mais **à éviter en production**) :

```javascript
app.use(cors({ origin: '*' }));
// OU encore plus simple :
app.use(cors());  // Autorise tous les origins par défaut
```

> ⚠️ **Attention** : Ne fais pas ça en production ! Utilise toujours des origines spécifiques.

---

## 🔥 **Test final**

1. **Redémarre ton serveur** (`Ctrl+C` puis `node server.js`).
2. **Rafraîchis ta page dans Chrome** (ou ouvre un nouvel onglet).
3. **Soumets ton formulaire** → L'erreur CORS devrait **disparaître** !

✅ **Résultat attendu** : 
- Pas d'erreur dans la console Chrome.
- Ton email est envoyé avec succès.

---

## 📚 **Pour aller plus loin**

### **Qu'est-ce que CORS ?**
- **CORS** = Cross-Origin Resource Sharing.
- C'est un mécanisme de sécurité **côté navigateur** qui bloque les requêtes HTTP entre des origines différentes (domaines ou ports différents).
- Exemple d'origines différentes :
  - `http://localhost:3000` ✅ (serveur)
  - `http://localhost:63342` ✅ (frontend)
  - → Ces deux URLs ont des **ports différents** → origine différente → **CORS bloque la requête**.

### **Headers CORS importants**
| Header | Rôle | Exemple |
|--------|------|---------|
| `Access-Control-Allow-Origin` | Autorise une origine spécifique | `http://localhost:63342` |
| `Access-Control-Allow-Methods` | Autorise certaines méthodes HTTP | `GET, POST, PUT, DELETE` |
| `Access-Control-Allow-Headers` | Autorise certains headers | `Content-Type, Authorization` |

Le middleware `cors()` ajoute automatiquement ces headers pour toi.

---

## ❓ **Problèmes courants et solutions**

| Problème | Cause | Solution |
|----------|-------|----------|
| **Erreur CORS persistante** | Le middleware `cors()` n'est pas utilisé | Vérifie que `app.use(cors())` est bien présent **avant** tes routes. |
| **404 après correction CORS** | L'URL de la route est incorrecte | Vérifie que `/send-mail` (backend) = `/send-mail` (frontend). |
| **Erreur 500** | Problème côté serveur (ex: Nodemailer) | Vérifie les logs du terminal où ton serveur tourne. |
| **Requête bloquée en production** | `origin: '*'` utilisé en production | Remplace par l'URL exacte de ton frontend (ex: `https://ton-site.com`). |

---

## 📌 **Résumé des étapes**

1. ✅ Installe `cors` : `npm install cors`
2. ✅ Importe et utilise `cors()` dans `server.js` **avant tes routes**
3. ✅ Vérifie que l'URL de la route est la même dans le frontend et le backend
4. ✅ Redémarre ton serveur
5. ✅ Teste ton formulaire

---

*Généré pour le projet Dokan - [Mistral Vibe](https://mistral.ai/)*
