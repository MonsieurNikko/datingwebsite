<?php
session_start();

header('Content-Type: application/json'); // Définir le type de contenu de la réponse comme JSON

$response = array();

if(isset($_SESSION['role'])) {
    $response['role'] = $_SESSION['role']; // Ajouter le rôle de l'utilisateur à la réponse si défini
}

echo json_encode($response);
?>
