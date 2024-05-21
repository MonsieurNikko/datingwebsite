<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Chemin du fichier CSV des utilisateurs
    $fichier_csv = 'csv/user.csv';
    $pseudo = $_SESSION['pseudo'];
    $nouveaux_donnees = [
        $pseudo,
        trim($_POST["age"]),
        trim($_POST["sexe"]),
        trim($_POST["dateNaissance"]),
        trim($_POST["pays"]),
        trim($_POST["description"]),
        trim($_POST["taille"]),
        trim($_POST["poids"]),
        trim($_POST["interet1"]),
        trim($_POST["sport"]),
        trim($_POST["couleurCheveux"]),
        trim($_POST["couleurYeux"]),
        $_SESSION['data'][12], // Garder le chemin de l'image inchangé
        trim($_POST["nomComplet"]),
        trim($_POST["adresse"]),
        trim($_POST["motDePasse"])
    ];

    // Lire le fichier CSV et mettre à jour les données de l'utilisateur
    $lignes = [];
    $utilisateur_trouve = false;
    if (($fichier = fopen($fichier_csv, 'r')) !== false) {
        while (($ligne = fgetcsv($fichier)) !== false) {
            if ($ligne[0] === $pseudo) {
                $lignes[] = $nouveaux_donnees;
                $utilisateur_trouve = true;
            } else {
                $lignes[] = $ligne;
            }
        }
        fclose($fichier);
    }

    if ($utilisateur_trouve) {
        if (($fichier = fopen($fichier_csv, 'w')) !== false) {
            foreach ($lignes as $ligne) {
                fputcsv($fichier, $ligne);
            }
            fclose($fichier);
            $_SESSION['data'] = $nouveaux_donnees;
            echo "Profil mis à jour avec succès.";
        } else {
            http_response_code(500);
            echo "Erreur: Impossible d'ouvrir le fichier CSV pour écriture.";
        }
    } else {
        http_response_code(404);
        echo "Erreur: Utilisateur non trouvé.";
    }
} else {
    http_response_code(405);
    echo "Méthode non autorisée.";
}
?>