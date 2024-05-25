<?php
session_start();

header('Content-Type: application/json');

// Vérifie si la requête est une requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifiez si l'utilisateur est un administrateur
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(array('error' => 'Vous n\'avez pas la permission d\'effectuer cette action.'));
        exit;
    }

    // Récupérer les données JSON envoyées depuis JavaScript
    $input = json_decode(file_get_contents('php://input'), true);

    // Vérifier si les données nécessaires sont présentes
    if (!isset($input['action']) || !isset($input['pseudo'])) {
        http_response_code(400);
        echo json_encode(array('error' => 'Action ou pseudo non spécifié.'));
        exit;
    }

    $action = trim($input['action']);
    $pseudo = trim($input['pseudo']);

    // Lire le fichier CSV
    $rows = [];
    if (($handle = fopen('../csv/user.csv', 'r')) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            $rows[] = $data;
        }
        fclose($handle);
    }

    // Créer un tableau pour stocker les lignes modifiées
    $newRows = [];

    // Parcourir les lignes d'origine
    foreach ($rows as &$row) {
        if ($row[0] === $pseudo) {
            // Si c'est l'utilisateur à modifier, effectuer les modifications nécessaires
            if ($action === 'ban_user') {
                $row[17] = 'banned'; // Marquer comme banni
            } elseif ($action === 'delete_user') {
                // Ne rien faire pour marquer pour suppression
                continue; // Passe à la prochaine itération sans ajouter cette ligne au nouveau tableau
            }
        }
        // Ajouter la ligne (modifiée ou non) au nouveau tableau
        $newRows[] = $row;
    }

    // Écrire les modifications dans le fichier CSV
    $handle = fopen('../csv/user.csv', 'w');
    foreach ($newRows as $row) {
        if ($row !== null) {
            fputcsv($handle, $row);
        }
    }
    fclose($handle);

    echo json_encode(array('message' => "L'action '$action' a été effectuée sur l'utilisateur '$pseudo'.", 'success' => true));
} else {
    // Si la requête n'est pas une requête POST, renvoyer une erreur
    http_response_code(405); // Méthode non autorisée
    echo json_encode(array('error' => 'Seules les requêtes POST sont autorisées.'));
}
?>
