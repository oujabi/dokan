# Git Stash - Guide Complet

*Comment lister, utiliser et gérer tes stash dans Git.*

---

## 📋 Lister les stash

### Commande de base
```bash
git stash list
```

### Exemple de sortie
```
stash@{0}: WIP on main: abc1234 Modifications en cours
stash@{1}: On feature/login: def5678 Correction bug formulaire
stash@{2}: WIP on dev: 890abcd Nouvelle fonctionnalité
```

---

## 📝 Explications des champs

| Élément | Description |
|---------|-------------|
| `stash@{0}` | Index du stash (0 = plus récent) |
| `WIP on main` | "Work In Progress" sur la branche `main` |
| `abc1234` | Hash raccourci du commit associé au stash |
| `Modifications en cours` | Message du dernier commit avant le stash |

---

## 🛠️ Commandes utiles pour gérer les stash

| Commande | Description | Exemple |
|----------|-------------|---------|
| `git stash` | Sauvegarde les modifications **non commitées** dans un nouveau stash | `git stash` |
| `git stash save "message"` | Sauvegarde avec un message personnalisé | `git stash save "Correction bug urgent"` |
| `git stash list` | **Liste tous les stash** | `git stash list` |
| `git stash show` | Affiche les fichiers modifiés du dernier stash | `git stash show` |
| `git stash show -p` | Affiche les **diffs complètes** du dernier stash | `git stash show -p` |
| `git stash show stash@{n}` | Affiche les fichiers modifiés d'un stash spécifique | `git stash show stash@{1}` |
| `git stash show -p stash@{n}` | Affiche les diffs complètes d'un stash spécifique | `git stash show -p stash@{1}` |
| `git stash apply` | Applique le dernier stash **sans le supprimer** | `git stash apply` |
| `git stash apply stash@{n}` | Applique un stash spécifique | `git stash apply stash@{2}` |
| `git stash pop` | Applique **et supprime** le dernier stash | `git stash pop` |
| `git stash pop stash@{n}` | Applique et supprime un stash spécifique | `git stash pop stash@{1}` |
| `git stash drop` | Supprime le dernier stash | `git stash drop` |
| `git stash drop stash@{n}` | Supprime un stash spécifique | `git stash drop stash@{2}` |
| `git stash clear` | ⚠️ **Supprime TOUS les stash** | `git stash clear` |
| `git stash branch nom_branche` | Crée une nouvelle branche à partir du stash | `git stash branch fix/bug-123` |

---

## 🎯 Cas d'usage courants

### 1. Sauvegarder ses modifications temporairement
```bash
# Tu es en train de travailler sur une fonctionnalité mais tu dois basculer sur une autre branche
git stash save "WIP: Nouvelle fonctionnalité utilisateur"
git checkout other-branch
```

### 2. Récupérer un stash spécifique
```bash
# Lister les stash disponibles
git stash list

# Appliquer le stash n°1
git stash apply stash@{1}
```

### 3. Supprimer un stash après l'avoir appliqué
```bash
# Si tu as utilisé apply et veux supprimer le stash
git stash drop stash@{1}

# Ou utilise pop pour faire les deux en une commande
git stash pop stash@{1}
```

### 4. Créer une branche à partir d'un stash
```bash
# Utile pour reprendre un travail sauvegardé dans une nouvelle branche
git stash branch feature/new-login stash@{0}
```

---

## ⚠️ Bonnes pratiques

- ✅ **Donne des noms explicites** à tes stash avec `git stash save "message"`
- ✅ **Vérifie tes stash régulièrement** avec `git stash list` pour éviter l'accumulation
- ✅ **Nettoie les vieux stash** avec `git stash drop` ou `git stash clear`
- ❌ **Évite de stasher des modifications non testées** (risque de conflits au retour)
- ❌ **Ne pas oublier les stash** : ils ne sont pas poussés sur le dépôt distant !

---

## 🔗 Ressources officielles
- [Documentation Git - git stash](https://git-scm.com/docs/git-stash)
- [GitHub - Stashing changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/about-stashes)
