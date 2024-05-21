<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Chemin du fichier CSV des utilisateurs
    $fichier_csv = 'csv/user.csv';
    $erreur = "";
    
    // Récupérer les données du formulaire
    $pseudo = trim($_POST["username"]);
    $mot_de_passe = trim($_POST["password"]);
    
    // Variable pour vérifier si l'utilisateur est trouvé
    $utilisateur_trouve = false;

    // Lire le fichier CSV et vérifier l'identifiant et le mot de passe
    if (($fichier = fopen($fichier_csv, 'r')) !== false) {
        // Parcourir chaque ligne du fichier CSV
        while (($ligne = fgetcsv($fichier)) !== false) {
            // Vérifier si l'identifiant et le mot de passe correspondent
            if ($pseudo == trim($ligne[0]) && password_verify($mot_de_passe, trim($ligne[15]))) {
                // Identifiant et mot de passe corrects, stocker les informations de l'utilisateur dans la session
                $_SESSION['pseudo'] = $pseudo;
                $_SESSION['data'] = $ligne; // Stocke toute la ligne du CSV
                echo "correct";
                $utilisateur_trouve = true;
                fclose($fichier);
                exit; // Quittez la boucle une fois que l'utilisateur est trouvé
            } else {
                // Affichez un message de débogage pour chaque ligne d'utilisateur vérifiée
                echo "Utilisateur vérifié: " . implode(", ", $ligne) . "<br>";
                echo "Identifiant: " . $ligne[0] . ", Mot de passe: " . $ligne[15] . "<br>";
                var_dump($pseudo, $mot_de_passe, $ligne[0], $ligne[15]); // Ajoutez cette ligne pour le débogage
            }
        }
        fclose($fichier);
    } else {
        $erreur = "Erreur: Impossible d'ouvrir le fichier CSV.";
        echo $erreur;
        exit;
    }

    // Si l'utilisateur n'est pas trouvé, renvoyer une réponse HTTP avec le code de statut 401
    if (!$utilisateur_trouve) {
        http_response_code(401); // Définit le code de statut HTTP à 401 (non autorisé)
        echo "Identifiant ou mot de passe incorrect.";

        // Débogage
        echo "Identifiant saisi: " . $pseudo . "<br>";
        echo "Mot de passe saisi: " . $mot_de_passe . "<br>";
        echo "Utilisateur trouvé: " . ($utilisateur_trouve ? "Oui" : "Non") . "<br>";
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
