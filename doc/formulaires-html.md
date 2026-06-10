# Guide Complet : Formulaires HTML

---

## Table des Matières
1. [Lier un Input à son Label](#lier-un-input-à-son-label)
2. [Créer des Blocs d'Input](#créer-des-blocs-dinput)
3. [Bonnes Pratiques](#bonnes-pratiques)
4. [Exemples Complets](#exemples-complets)
5. [Accessibilité](#accessibilité)
6. [Validation](#validation)
7. [CSS Recommandé](#css-recommandé)
8. [Erreurs à Éviter](#erreurs-à-éviter)
9. [Checklist](#checklist)

---

## Lier un Input à son Label

Pour lier un `<input>` à son `<label>`, il existe **2 méthodes** :

### Méthode 1 : `for` + `id` (recommandée)
```html
<label for="nom">Nom :</label>
<input type="text" id="nom" name="nom">
```
- Le `for` du `<label>` doit correspondre à l'`id` de l'`<input>`.

### Méthode 2 : Imbriquée (sans `id`)
```html
<label>
    Nom :
    <input type="text" name="nom">
</label>
```
- Le `<input>` est **enfant** du `<label>`.
- Cliquer sur le label active l'input.

### Bonnes pratiques
- **Accessibilité** : Les deux méthodes fonctionnent avec les lecteurs d'écran.
- **Style** : Pour styliser le label quand l'input est coché/focus :
  ```css
  input:focus + label { color: blue; }
  input:checked ~ label { font-weight: bold; }
  ```
- **Cas particuliers** :
  - Pour les `radio/checkbox`, les deux méthodes fonctionnent.
  - Pour les `file`, utiliser la méthode `for` + `id`.

---

## Créer des Blocs d'Input

### Structure de Base (Recommandée)
```html
<form>
  <!-- Bloc 1 : Nom -->
  <div class="form-group">
    <label for="nom">Nom complet</label>
    <input type="text" id="nom" name="nom" required aria-describedby="nom-help">
    <small id="nom-help">Entrez votre nom et prénom</small>
  </div>

  <!-- Bloc 2 : Email -->
  <div class="form-group">
    <label for="email">Adresse email</label>
    <input type="email" id="email" name="email" required>
    <small class="error-message" aria-live="polite"></small>
  </div>
</form>
```

### Pourquoi cette approche ?
- `<div class="form-group">` : Conteneur logique pour le styling CSS
- `<label for="id">` : Liaison explicite avec l'input (accessibilité)
- `<input id="...">` : Correspond au `for` du label
- `<small>` : Texte d'aide ou message d'erreur
- `aria-describedby` : Lie l'input à son texte d'aide pour les lecteurs d'écran
- `required` : Validation HTML5 native

---

## Comparatif des Méthodes

| Méthode | Avantages | Inconvénients | Note |
|---------|-----------|--------------|------|
| `<div class="form-group">` | Flexible, stylable, accessible | Pas de sémantique native | Recommandé |
| `<fieldset><legend>` | Sémantique forte, groupement logique | Style par défaut difficile | Pour groupes liés (ex: adresse) |
| `<p>` ou `<section>` | Simple | Peu flexible pour le CSS | À éviter |
| Sans conteneur | Aucun | Inmaintenable, pas stylable | À bannir |

---

## Exemples Complets

### Formulaire d'inscription
```html
<form class="form">
  <!-- Bloc : Informations personnelles -->
  <fieldset class="form-section">
    <legend>Informations personnelles</legend>

    <div class="form-group">
      <label for="prenom">Prénom <span class="required">*</span></label>
      <input type="text" id="prenom" name="prenom" required>
    </div>

    <div class="form-group">
      <label for="nom">Nom <span class="required">*</span></label>
      <input type="text" id="nom" name="nom" required>
    </div>
  </fieldset>

  <!-- Bloc : Contact -->
  <fieldset class="form-section">
    <legend>Coordonnées</legend>

    <div class="form-group">
      <label for="email">Email <span class="required">*</span></label>
      <input type="email" id="email" name="email" required>
      <small>Format : exemple@domaine.com</small>
    </div>

    <div class="form-group">
      <label for="tel">Téléphone</label>
      <input type="tel" id="tel" name="tel" pattern="[0-9]{10}">
    </div>
  </fieldset>

  <!-- Bloc : Préferences -->
  <div class="form-group">
    <span class="form-label">Niveau en Aikido</span>
    <div class="radio-group">
      <input type="radio" id="niveau-debutant" name="niveau" value="debutant">
      <label for="niveau-debutant">Débutant</label>

      <input type="radio" id="niveau-intermediaire" name="niveau" value="intermediaire">
      <label for="niveau-intermediaire">Intermédiaire</label>

      <input type="radio" id="niveau-avance" name="niveau" value="avance">
      <label for="niveau-avance">Avancé</label>
    </div>
  </div>

  <button type="submit" class="btn">S'inscrire</button>
</form>
```

### Exemple : Checkbox avec Label Imbriqué
```html
<label>
  <input type="checkbox" name="newsletter" value="oui">
  S'abonner à la newsletter
</label>
```

### Exemple : Select avec Label
```html
<div class="form-group">
  <label for="pays">Pays</label>
  <select id="pays" name="pays" required>
    <option value="" selected disabled>Sélectionnez un pays</option>
    <option value="fr">France</option>
    <option value="be">Belgique</option>
    <option value="ch">Suisse</option>
  </select>
</div>
```

### Exemple : Textarea avec Label
```html
<div class="form-group">
  <label for="message">Message</label>
  <textarea id="message" name="message" rows="5" required></textarea>
  <small>Maximum 500 caractères</small>
</div>
```

---

## Accessibilité

### Règles Fondamentales
1. **Toujours** lier `<label>` et `<input>` avec `for` + `id`
2. Utiliser `aria-label` si le label visible est insuffisant :
   ```html
   <input type="search" aria-label="Rechercher un stage">
   ```
3. `aria-required="true"` pour les champs obligatoires (en plus de `required`)
4. Pour les groupes de champs (radio/checkbox) :
   ```html
   <fieldset>
     <legend>Choisissez votre créneau</legend>
     <input type="radio" id="matin" name="creneau" value="matin">
     <label for="matin">Matin</label>
     <input type="radio" id="apres-midi" name="creneau" value="apres-midi">
     <label for="apres-midi">Après-midi</label>
   </fieldset>
   ```

### Attributs ARIA Utiles
| Attribut | Description | Exemple |
|----------|-------------|---------|
| `aria-label` | Remplace le label pour les lecteurs d'écran | `<input aria-label="Recherche">` |
| `aria-describedby` | Lie à un élément de description | `<input aria-describedby="help-text">` |
| `aria-required` | Indique si le champ est obligatoire | `<input aria-required="true">` |
| `aria-invalid` | Indique si le champ est invalide | `<input aria-invalid="true">` |
| `aria-live` | Annonce les mises à jour dynamiques | `<small aria-live="polite"></small>` |

---

## Validation

### Validation HTML5 Native
| Attribut | Description | Exemple |
|----------|-------------|---------|
| `required` | Champ obligatoire | `<input required>` |
| `type="email"` | Valide le format email | `<input type="email">` |
| `type="url"` | Valide le format URL | `<input type="url">` |
| `type="number"` | Valide un nombre | `<input type="number" min="0" max="100">` |
| `type="password"` | Masque le texte | `<input type="password">` |
| `minlength` | Longueur minimale | `<input minlength="8">` |
| `maxlength` | Longueur maximale | `<input maxlength="50">` |
| `min` | Valeur minimale | `<input type="number" min="0">` |
| `max` | Valeur maximale | `<input type="number" max="100">` |
| `pattern` | Expression régulière | `<input pattern="[A-Za-z]+">` |

### Exemples de Patterns
```html
<!-- Code postal français -->
<input type="text" pattern="[0-9]{5}" title="5 chiffres">

<!-- Téléphone français -->
<input type="tel" pattern="[0-9]{10}" title="10 chiffres">

<!-- Mot de passe fort (8+ caractères, majuscule, chiffre) -->
<input type="password" pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}" title="8+ caractères, 1 majuscule, 1 chiffre">
```

---

## CSS Recommandé

### Structure de Base
```css
/* Conteneur principal */
.form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
}

/* Groupe de champs */
.form-group {
  margin-bottom: 1.5rem;
}

/* Label */
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

/* Input, Select, Textarea */
.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #c41e3a;
  box-shadow: 0 0 0 2px rgba(196, 30, 58, 0.2);
}

/* Texte d'aide */
small {
  display: block;
  margin-top: 0.25rem;
  color: #666;
  font-size: 0.875rem;
}
```

### Style pour Fieldset
```css
.form-section {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-section legend {
  font-size: 1.25rem;
  font-weight: 600;
  padding: 0 0.5rem;
  color: #333;
}
```

### Style pour Radio/Checkbox
```css
.radio-group,
.checkbox-group {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.radio-group label,
.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: normal;
}

/* Style personnalisé pour checkbox/radio */
input[type="radio"],
input[type="checkbox"] {
  margin: 0;
  accent-color: #c41e3a; /* Couleur du point de cocotte pour les checkboxes */
}
```

### Style pour les Champs Invalides
```css
input:invalid,
select:invalid,
textarea:invalid {
  border-color: #ff4444;
}

input:invalid:focus,
select:invalid:focus,
textarea:invalid:focus {
  border-color: #ff4444;
  box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.2);
}

.error-message {
  color: #ff4444;
}
```

### Style pour les Champs Obligatoires
```css
.required {
  color: #ff4444;
  margin-left: 0.25rem;
}

.form-group label .required {
  color: #ff4444;
}
```

---

## Erreurs à Éviter

| Erreur | Pourquoi c'est mauvais | Correction |
|--------|----------------------|------------|
| `<input type="text" placeholder="Nom">` | Pas de label visible pour les lecteurs d'écran | Toujours utiliser un `<label>` visible |
| `<label>Nom<input type="text"></label>` | Manque l'id et le for | Ajouter `id` et `for` |
| `<div><input></div><label>Nom</label>` | Pas de liaison entre label et input | Lier avec `for` + `id` |
| `<p><label>...</label><input></p>` | Structure peu flexible pour le CSS | Utiliser des `<div class="form-group">` |
| Oublier `name` sur les inputs | Les données ne seront pas envoyées avec le formulaire | Toujours inclure l'attribut `name` |
| Utiliser le même `id` pour plusieurs éléments | ID doit être unique dans la page | Utiliser des IDs uniques |
| Oublier `type` sur les inputs | Moins bonne UX sur mobile | Toujours spécifier le `type` |

---

## Checklist pour un Formulaire Parfait

### Structure
- [ ] Chaque input a un `<label>` associé
- [ ] Chaque label est lié à son input (`for` + `id` ou imbriqué)
- [ ] Les inputs sont regroupés dans des conteneurs logiques (`<div>`, `<fieldset>`)
- [ ] Chaque input a un `name` unique
- [ ] Les champs obligatoires ont `required`

### Accessibilité
- [ ] Tous les inputs ont un label visible
- [ ] Les groupes de radio/checkbox sont dans un `<fieldset>` avec `<legend>`
- [ ] Utilisation de `aria-*` si nécessaire
- [ ] Les messages d'erreur sont accessibles
- [ ] L'ordre de tabulation est logique

### Validation
- [ ] Les champs obligatoires ont `required`
- [ ] Les types d'input sont appropriés (`email`, `tel`, `number`, etc.)
- [ ] Les validations spécifiques sont ajoutées (`pattern`, `minlength`, etc.)
- [ ] Les messages d'erreur sont clairs

### CSS
- [ ] Styling cohérent pour tous les inputs
- [ ] États focus visibles
- [ ] États invalides visibles
- [ ] Responsive (s'adapte aux mobiles)

### Bonus
- [ ] Autocomplete activé (`autocomplete="name"`, `autocomplete="email"`, etc.)
- [ ] Placeholder utilisé comme complément (pas comme remplacement du label)
- [ ] Icônes ajoutées si nécessaire (avec `aria-hidden="true"`)

---

## Types d'Input HTML5

| Type | Description | Exemple |
|------|-------------|---------|
| `text` | Texte standard | `<input type="text">` |
| `email` | Adresse email | `<input type="email">` |
| `password` | Mot de passe masqué | `<input type="password">` |
| `number` | Nombre | `<input type="number">` |
| `tel` | Téléphone | `<input type="tel">` |
| `url` | URL | `<input type="url">` |
| `search` | Recherche | `<input type="search">` |
| `date` | Date (sélecteur de date) | `<input type="date">` |
| `time` | Heure | `<input type="time">` |
| `datetime-local` | Date et heure | `<input type="datetime-local">` |
| `month` | Mois | `<input type="month">` |
| `week` | Semaine | `<input type="week">` |
| `color` | Sélecteur de couleur | `<input type="color">` |
| `range` | Curseur | `<input type="range">` |
| `file` | Téléchargement de fichier | `<input type="file">` |
| `checkbox` | Case à cocher | `<input type="checkbox">` |
| `radio` | Bouton radio | `<input type="radio">` |
| `submit` | Bouton de soumission | `<input type="submit">` |
| `reset` | Bouton de réinitialisation | `<input type="reset">` |
| `button` | Bouton standard | `<input type="button">` |
| `hidden` | Champ caché | `<input type="hidden">` |
| `image` | Bouton image | `<input type="image">` |

---

## Attributs Utiles pour les Formulaires

### Attributs Globaux
| Attribut | Description | Valeurs |
|----------|-------------|---------|
| `name` | Nom du champ (utilisé pour l'envoi) | Texte |
| `id` | Identifiant unique | Texte |
| `class` | Classe CSS | Texte |
| `disabled` | Désactive le champ | booléen |
| `readonly` | Lecture seule | booléen |
| `required` | Champ obligatoire | booléen |
| `autofocus` | Focus automatique au chargement | booléen |
| `tabindex` | Ordre de tabulation | Nombre |
| `placeholder` | Texte placeholder | Texte |
| `value` | Valeur par défaut | Texte |

### Attributs Spécifiques
| Attribut | Applicable à | Description |
|----------|--------------|-------------|
| `min` | number, date, range | Valeur minimale |
| `max` | number, date, range | Valeur maximale |
| `step` | number, range | Incrément |
| `minlength` | text, email, password | Longueur minimale |
| `maxlength` | text, email, password | Longueur maximale |
| `pattern` | text, email, password | Expression régulière |
| `multiple` | email, file | Accepte plusieurs valeurs |
| `accept` | file | Types de fichiers acceptés |
| `checked` | radio, checkbox | Coché par défaut |
| `selected` | option | Sélectionné par défaut |
| `size` | text, email, password | Largeur visible |
| `rows` | textarea | Nombre de lignes |
| `cols` | textarea | Nombre de colonnes |
| `wrap` | textarea | Retour à la ligne |

### Attributs d'Autocomplete
| Attribut | Valeurs Possibles | Exemple |
|----------|-------------------|---------|
| `autocomplete` | off, on, name, email, tel, url, address, etc. | `<input autocomplete="email">` |

---

## Exemple : Formulaire de Contact Complet

```html
<form class="contact-form" action="/send" method="POST">
  <div class="form-group">
    <label for="fullname">Nom complet <span class="required">*</span></label>
    <input 
      type="text" 
      id="fullname" 
      name="fullname" 
      required 
      autocomplete="name"
      minlength="2"
      maxlength="100"
    >
  </div>

  <div class="form-group">
    <label for="email">Email <span class="required">*</span></label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      required 
      autocomplete="email"
      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    >
    <small>Format : exemple@domaine.com</small>
  </div>

  <div class="form-group">
    <label for="subject">Sujet <span class="required">*</span></label>
    <select id="subject" name="subject" required>
      <option value="" selected disabled>Sélectionnez un sujet</option>
      <option value="question">Question</option>
      <option value="inscription">Inscription</option>
      <option value="autre">Autre</option>
    </select>
  </div>

  <div class="form-group">
    <label for="message">Message <span class="required">*</span></label>
    <textarea 
      id="message" 
      name="message" 
      required 
      rows="5" 
      minlength="10"
      maxlength="1000"
    ></textarea>
    <small>10 à 1000 caractères</small>
  </div>

  <div class="form-group">
    <fieldset>
      <legend>Préférences de contact</legend>
      <div class="checkbox-group">
        <input type="checkbox" id="pref-email" name="pref-contact" value="email" checked>
        <label for="pref-email">Email</label>
        
        <input type="checkbox" id="pref-tel" name="pref-contact" value="tel">
        <label for="pref-tel">Téléphone</label>
      </div>
    </fieldset>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary">Envoyer</button>
    <button type="reset" class="btn btn-secondary">Réinitialiser</button>
  </div>
</form>
```

---

## Ressources Utiles

- [MDN : Formulaires HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form)
- [MDN : Input HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element/input)
- [MDN : Accessibilité des formulaires](https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/forms)
- [W3C : Formulaires accessibles](https://www.w3.org/WAI/tutorials/forms/)
- [HTML5 Validation](https://developer.mozilla.org/fr/docs/Web/HTML/Constraint_validation)

---

*Document généré pour le projet Dokan - Club d'Aïkidô*