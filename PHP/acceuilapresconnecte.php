<?php
// Ce script récupère les informations des utilisateurs d'un fichier CSV, en excluant les administrateurs et l'utilisateur connecté.

session_start();

$csvFile = '../csv/user.csv';
$users = [];

if (($fichier = fopen($csvFile, 'r')) !== false) {
    while (($ligne = fgetcsv($fichier)) !== false) {
        if (!in_array($ligne[0], ['admin', 'admin2', 'admin3', 'admin4', $_SESSION['pseudo']])) {
            $users[] = [
                'pseudo' => $ligne[0],
                'age' => $ligne[1],
                'hobbies' => explode(';', $ligne[8]),
                'sports' => explode(';', $ligne[9]),
                'imagePath' => $ligne[12]
            ];
        }
    }
    fclose($fichier);
}

header('Content-Type: application/json');
echo json_encode($users);
?>
