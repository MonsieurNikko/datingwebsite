<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['pseudo'])) {
    $pseudo = $_POST['pseudo'];

    $file = fopen("../csv/user.csv", "r");
    $userData = null;

    while (($row = fgetcsv($file)) !== FALSE) {
        // Supposons que le pseudonyme est dans la première colonne (indice 0)
        if ($row[0] == $pseudo) {
            $userData = [
                'pseudo' => $row[0],
                'age' => $row[1],
                'sexe' => $row[2],
                'dateNaissance' => $row[3],
                'pays' => $row[4],
                'description' => $row[5],
                'taille' => $row[6],
                'poids' => $row[7],
                'interet1' => $row[8],
                'sport' => $row[9],
                'couleurCheveux' => $row[10],
                'couleurYeux' => $row[11],
                'imagePath' => $row[12],
                'nom' => $row[13],
                'adresse' => $row[14],
            ];
            break;
        }
    }

    fclose($file);

    if ($userData) {
        echo json_encode($userData);
    } else {
        http_response_code(404);
        echo json_encode(['message' => 'User not found']);
    }
} else {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}


?>
