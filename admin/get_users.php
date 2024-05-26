<?php
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['role'])) {
    http_response_code(403);
    echo json_encode(array('error' => 'Vous n\'êtes pas connecté.'));
    exit;
}

// Récupérer le rôle de l'utilisateur
$role = $_SESSION['role'];

// Vérifier si l'utilisateur est administrateur
if (trim($role) !== 'admin') {
    http_response_code(403);
    echo json_encode(array('error' => 'Vous n\'avez pas la permission d\'effectuer cette action.', 'role' => $role));
    exit;
}

$users = [];
if (($handle = fopen('../csv/user.csv', 'r')) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
        $users[] = array(
            'pseudo' => $data[0],
            'age' => $data[1],
            'sexe' => $data[2],
            'date_naissance' => $data[3],
            'pays' => $data[4],
            'description' => $data[5],
            'taille' => $data[6],
            'poids' => $data[7],
            'interets' => $data[8],
            'sports' => $data[9],
            'couleur_cheveux' => $data[10],
            'couleur_yeux' => $data[11],
            'photo' => trim($data[12]),
            'nom' => $data[13],
            'adresse' => $data[14],
            'mot_de_passe' => $data[15],
            'role' => $data[16],
            'statut' => $data[17],
        );
    }
    fclose($handle);
}

echo json_encode($users);
?>
