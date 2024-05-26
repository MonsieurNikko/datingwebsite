# Projet.Dating_website - Yacine KHELIL, HUYNH Duc Duy, SAIDJ Abdelah et AISSAOUI Ahmed

Projet Site de Rencontre fin de semestre 2 Pré-ing 2 MI 4

## Description

Cyan Love est un site de rencontre en ligne, conçu pour permettre aux utilisateurs de faire connaissance en fonction de différents critères et d'échanger entre eux via une messagerie privée. Le thème du site est centré sur des couleurs bleu et rose, évoquant l'univers romantique de Cupidon. Les visiteurs peuvent utiliser la fonctionnalité "Ask Cupid" pour explorer le site et s'inscrire.

Le site propose plusieurs types d'utilisateurs avec des accès différenciés : Visiteur, Utilisateur, Abonné, et Administrateur. Chaque type d'utilisateur dispose de fonctionnalités spécifiques pour améliorer l'expérience de rencontre en ligne.

## Fonctionnalités

| Module            | Fonctionnalité                                                         | Description                                                                                                            |
|-------------------|-----------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| **Visiteur**      | Free tour                                                             | Aperçu du site avec quelques photos d'utilisateurs pour attirer les visiteurs.                                          |
|                   | Page d'inscription et de connexion                                    | Permet aux visiteurs de s'inscrire ou de se connecter pour accéder aux fonctionnalités de base.                        |
| **Utilisateur**   | Gestion du profil : Création et modification                          | Les utilisateurs peuvent créer leur profil lors de l'inscription et le modifier ultérieurement.                        |
|                   |                                                                       | Les informations comprennent le pseudonyme, le sexe, la date de naissance, la profession, le lieu de résidence, etc.  |
|                   | Gestion du profil : Partie publique et privée                         | Le profil a une partie publique visible par les autres utilisateurs et une partie privée accessible uniquement par l'utilisateur, les abonnés et les administrateurs. |
|                   | Recherche de profils : Moteur de recherche                            | Permet de rechercher des profils en utilisant le nom d'utilisateur.                                                    |
|                   | Recherche de profils : Affichage des résultats                        | Affiche le profil correspondant (si existant), avec les informations de celui-ci.                                      |
|                   | Consultation des offres d'abonnement                                  | Les utilisateurs peuvent consulter différentes offres d'abonnement pour débloquer plus de fonctionnalités.             |
| **Abonné**        | Messagerie privée : Envoi et réception de messages                    | Permet aux abonnés d'envoyer et de recevoir des messages privés.                                                       |
|                   | Messagerie privée : Blocage d'utilisateurs                            | Possibilité de bloquer des utilisateurs indésirables via un administrateur.                                            |
|                   | Messagerie privée : Signalement de messages                           | Les abonnés peuvent signaler des messages suspects aux administrateurs.                                                |
| **Administrateur**| Gestion des utilisateurs : Liste des utilisateurs                    | Accès à la liste complète des utilisateurs enregistrés.                                                                |
|                   | Gestion des utilisateurs : Modification des profils                   | Possibilité de modifier les informations des profils.                                                                  |
|                   | Gestion des utilisateurs : Suppression et bannissement                | Les administrateurs peuvent supprimer des profils et bannir des utilisateurs en cas d'abus.                            |
|                   | Gestion des messages : Réception des signalements                     | Traitement des messages signalés par les utilisateurs.                                                                |
|                   | Gestion des messages : Accès à la messagerie                          | Accès complet aux messages envoyés et reçus par les utilisateurs.                                                      |
|                   | Gestion des messages : Suppression de messages                        | Possibilité de supprimer des messages inappropriés.                                                                    |

## Technologies Utilisées

### Front-End
- **HTML** : Utilisé pour structurer les pages web. Les fichiers HTML sont séparés pour chaque page ou composant majeur du site.
- **CSS** : Utilisé pour la mise en forme et le design des pages web. Des fichiers CSS séparés assurent la modularité et la maintenabilité du style.
- **JavaScript** : Utilisé pour les interactions dynamiques et le traitement côté client. Les scripts JavaScript sont séparés en fonction des fonctionnalités pour une meilleure organisation.
- **AJAX** : Utilisé pour la communication asynchrone entre le client et le serveur, permettant des mises à jour de page sans rechargement complet.

### Back-End
- **PHP** : Utilisé pour la gestion des requêtes côté serveur, la manipulation des fichiers et la gestion des sessions utilisateur.
  - **session_start()** : Utilisé au début de chaque script nécessitant une gestion des sessions pour maintenir les informations de session utilisateur.
  - **Manipulation des fichiers** : Lecture et écriture des fichiers CSV pour stocker les informations des utilisateurs et des fichiers TXT pour les messages.
- **JSON** : Format utilisé pour les réponses du serveur dans les requêtes AJAX, facilitant le traitement des données côté client.
- **Fichiers CSV** : Utilisés pour stocker les informations des utilisateurs de manière structurée.
- **Fichiers TXT** : Utilisés pour stocker les messages échangés entre utilisateurs, facilitant la gestion de la messagerie privée.

## Organisation du Code
- **Séparation des langages** : Chaque langage (HTML, CSS, JavaScript, PHP) est contenu dans des fichiers distincts pour une meilleure organisation et maintenabilité.
- **Requêtes POST et GET** : Les formulaires et les requêtes asynchrones utilisent les méthodes POST et GET pour envoyer et récupérer des données.
- **Serveur PHP** :
  - **session_start()** : Utilisé pour initier les sessions utilisateur et gérer l'authentification.
  - **Réponses JSON** : Les scripts PHP envoient des réponses au format JSON pour une intégration facile avec les appels AJAX.
  - **Manipulation de fichiers** : Utilisation de `fputcsv()` et `fgetcsv()` pour gérer les fichiers CSV et `file_get_contents()` et `file_put_contents()` pour les fichiers TXT.

## Partie administrateur
Pour avoir accès au compte admin, accédez à ces 4 comptes : 
- admin
- admin2
- admin3
- admin4
Mot de passe commun :
Azerty12345!

## Dépôt GitHub
Le projet est hébergé sur un dépôt GitHub où des commits réguliers sont effectués pour suivre l'évolution du développement. Les commits incluent des modifications de code, des ajouts de fonctionnalités et des corrections de bugs, garantissant une trace complète du développement.

## Contact
Pour toute question ou suggestion, veuillez contacter l'équipe de développement à [aissaouiah@cy-tech.fr](mailto:aissaouiah@cy-tech.fr)
