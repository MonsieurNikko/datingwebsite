<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Chemin du fichier CSV des utilisateurs
    $fichier_csv = 'csv/user.csv';
    $erreur = "";
    
    // Lire le fichier CSV et stocker les données dans un tableau associatif
    $utilisateurs = [];
    if (($fichier = fopen($fichier_csv, 'r')) !== false) {
        while (($ligne = fgetcsv($fichier)) !== false) {
            // Vérifie si la ligne contient au moins 13 colonnes (identifiant et mot de passe)
            if (count($ligne) >= 15) {
                // Stocke l'identifiant comme clé et le mot de passe comme valeur dans le tableau $utilisateurs
                $utilisateurs[trim($ligne[0])] = trim($ligne[15]); // 1ère colonne (index 0) pour l'identifiant, 13ème colonne (index 12) pour le mot de passe
            } else {
                // Gérer le cas où la ligne ne contient pas suffisamment de colonnes
                $erreur = "Erreur: La ligne ne contient pas suffisamment de colonnes.";
                echo $erreur;
                exit;
            }
        }
        fclose($fichier);
    } else {
        $erreur = "Erreur: Impossible d'ouvrir le fichier CSV.";
        echo $erreur;
        exit;
    }

    // Récupérer les données du formulaire
    $pseudo = trim($_POST["username"]);
    $mot_de_passe = trim($_POST["password"]);
    
    // Vérifie si l'utilisateur existe dans le tableau des utilisateurs et si le mot de passe correspond
    if (isset($utilisateurs[$pseudo])) {
        // Vérifie si le mot de passe correspond
        if ($utilisateurs[$pseudo] === $mot_de_passe) {
            $_SESSION['pseudo'] = $pseudo;
            echo "correct";
        } else {
            // Mot de passe incorrect
            $erreur = "Mot de passe incorrect.". $utilisateurs[$pseudo];
            echo $erreur;
        }
    } else {
        // Identifiant non trouvé
        $erreur = "Identifiant non trouvé.";
        echo $erreur;
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Si une session est déjà en cours et que le pseudo est stocké, renvoie le pseudo
    if (isset($_SESSION['pseudo'])) {
        echo $_SESSION['pseudo'];
    } else {
        echo "Aucun pseudonyme trouvé.";
    }
}


?>
