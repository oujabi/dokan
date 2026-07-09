# 📱 Résolution d'écran en JavaScript

*Comment obtenir la résolution de l'écran, la taille de la fenêtre et la densité de pixels en JS (navigateur).*

---

## 🔹 **1. Résolution totale de l'écran**
Obtient la **largeur et hauteur totales** de l'écran en pixels (inclut la barre des tâches).

```javascript
// Largeur et hauteur totales de l'écran (en pixels)
const screenWidth = screen.width;    // Ex: 1920
const screenHeight = screen.height;  // Ex: 1080

console.log(`Résolution écran: ${screenWidth} × ${screenHeight}`);
```

---

## 🔹 **2. Résolution disponible**
Obtient la résolution **hors barre des tâches/dock** (espace utilisable).

```javascript
const availWidth = screen.availWidth;    // Ex: 1920
const availHeight = screen.availHeight;  // Ex: 1040

console.log(`Résolution disponible: ${availWidth} × ${availHeight}`);
```

---

## 🔹 **3. Taille de la fenêtre du navigateur**
Obtient la taille **de la fenêtre du navigateur** (hors barres d'outils).

```javascript
const windowWidth = window.innerWidth;    // Ex: 1200
const windowHeight = window.innerHeight;  // Ex: 800

console.log(`Taille fenêtre: ${windowWidth} × ${windowHeight}`);
```

---

## 🔹 **4. Résolution physique (avec DPI)**
Pour les écrans **Retina/HD**, où 1 pixel CSS ≠ 1 pixel physique.

```javascript
const pixelRatio = window.devicePixelRatio;  // Ex: 1 (standard) ou 2 (Retina)
const physicalWidth = screen.width * pixelRatio;
const physicalHeight = screen.height * pixelRatio;

console.log(`Résolution physique: ${physicalWidth} × ${physicalHeight}`);
```

---

## 🔹 **5. Toutes les infos en une seule fois**
Exemple complet pour récupérer toutes les données.

```javascript
const screenInfo = {
  resolution: `${screen.width} × ${screen.height}`,
  availResolution: `${screen.availWidth} × ${screen.availHeight}`,
  windowSize: `${window.innerWidth} × ${window.innerHeight}`,
  pixelRatio: window.devicePixelRatio,
  colorDepth: screen.colorDepth,       // Profondeur de couleur (ex: 24 bits)
  orientation: screen.orientation.type, // "portrait-primary" ou "landscape-primary"
};

console.log(screenInfo);
```

---

## 📌 **Exemple HTML complet**
Affiche les infos directement dans une page web.

```html
<!DOCTYPE html>
<html>
<body>
  <h1>📱 Infos écran</h1>
  <div id="screen-info"></div>

  <script>
    const info = document.getElementById("screen-info");
    info.innerHTML = `
      <p><strong>Résolution écran:</strong> ${screen.width} × ${screen.height}</p>
      <p><strong>Résolution disponible:</strong> ${screen.availWidth} × ${screen.availHeight}</p>
      <p><strong>Taille fenêtre:</strong> ${window.innerWidth} × ${window.innerHeight}</p>
      <p><strong>Ratio DPI:</strong> ${window.devicePixelRatio}</p>
      <p><strong>Orientation:</strong> ${screen.orientation.type}</p>
    `;
  </script>
</body>
</html>
```

---

## ⚠️ **Remarques importantes**

| Propriété | Description | Exemple de valeur |
|-----------|-------------|-------------------|
| `screen.width` | Largeur totale de l'écran | `1920` |
| `screen.height` | Hauteur totale de l'écran | `1080` |
| `screen.availWidth` | Largeur disponible (sans barre des tâches) | `1920` |
| `window.innerWidth` | Largeur de la fenêtre du navigateur | `1200` |
| `window.devicePixelRatio` | Ratio pour écrans Retina | `1` ou `2` |
| `screen.orientation.type` | Orientation de l'écran | `"portrait-primary"` |

> ✅ **Compatible tous navigateurs** (Chrome, Firefox, Safari, Edge).
> ❌ **Non disponible en Node.js** (uniquement en front-end).
> 🔄 **Écoute les changements d'orientation** :
> ```javascript
> window.addEventListener("orientationchange", () => {
>   console.log("Orientation changée !", screen.width, screen.height);
> });
> ```
---
**Tags:** `#JavaScript` `#Web` `#Frontend` `#Notion`