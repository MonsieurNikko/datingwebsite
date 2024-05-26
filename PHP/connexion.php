<?php
// Ce script gère l'authentification des utilisateurs à partir d'un fichier CSV et la gestion de sessions.

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fichier_csv = '../csv/user.csv';
    $pseudo = trim($_POST["username"]);
    $mot_de_passe = trim($_POST["password"]);
    $utilisateur_trouve = false;

    if (($fichier = fopen($fichier_csv, 'r')) !== false) {
        while (($ligne = fgetcsv($fichier)) !== false) {
            if ($pseudo == trim($ligne[0]) && password_verify($mot_de_passe, trim($ligne[15]))) {
                $_SESSION['pseudo'] = $pseudo;
                $_SESSION['data'] = $ligne;
                $_SESSION['role'] = $ligne[16];
                echo "correct";
                $utilisateur_trouve = true;
                fclose($fichier);
                exit;
            }
        }
        fclose($fichier);
    } else {
        echo "Erreur: Impossible d'ouvrir le fichier CSV.";
        exit;
    }

    if (!$utilisateur_trouve) {
        http_response_code(401);
        echo "Identifiant ou mot de passe incorrect.";
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_SESSION['pseudo'])) {
        echo $_SESSION['pseudo'];
    } else {
        echo "Aucun pseudonyme trouvé.";
    }
}
?>
