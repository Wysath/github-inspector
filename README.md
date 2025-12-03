# GitHub Inspector

Projet de développement web réalisé dans le cadre du cours de JavaScript. L'application permet de rechercher des utilisateurs GitHub, de consulter leur profil et d'explorer l'historique des commits de leurs dépôts.

## 🚀 Fonctionnalités

- **Recherche d'utilisateurs** : Recherche en temps réel via l'API GitHub.
- **Profil détaillé** : Affichage des informations de l'utilisateur (avatar, bio, statistiques abonnés/abonnements).
- **Exploration des dépôts** : Liste des dépôts publics avec statistiques (étoiles, forks, langage).
- **Historique des commits** : Consultation des derniers commits pour un dépôt donné.
- **Navigation fluide** : Système de fil d'ariane (Breadcrumbs) pour naviguer aisément.
- **Interface Responsive** : Design inspiré du thème sombre de GitHub, adapté aux mobiles et desktops.

## 🛠 Stack Technique

- **Vanilla JavaScript (ES6+)** : Pas de framework JS, utilisation native des modules ES.
- **Vite** : Bundler rapide pour le développement et la production.
- **CSS Moderne** : Utilisation de variables CSS, Flexbox et Grid.
- **ESLint** : Linting strict pour garantir la qualité du code.

## 🏗 Architecture et Choix Techniques

Le projet suit une architecture modulaire inspirée du modèle **MVC (Modèle-Vue-Contrôleur)** pour assurer une séparation claire des responsabilités :

- **`/src/services` (Modèle)** : Gestion des appels API (fetch) vers GitHub.
- **`/src/views` (Vue)** : Fonctions de rendu HTML et logique d'attachement des événements.
- **`/src/components`** : Composants UI réutilisables (fonctions pures retournant des chaînes HTML).
- **`/src/main.js` (Contrôleur)** : Point d'entrée, orchestration de l'application et gestion de l'état global.

## 📦 Installation et Lancement

1. **Cloner le projet**
   ```bash
   git clone https://github.com/Wysath/github-inspector.git
   cd github-inspector
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer en mode développement**
   ```bash
   npm run dev
   ```

4. **Linter le code**
   ```bash
   npm run lint
   ```

## 👤 Auteur

**Louna Petitfils**

---
*Ce projet utilise l'API publique de GitHub. Les limites de taux (rate limits) s'appliquent.*
