<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['pseudo']) && isset($_SESSION['data'])) {
    // Récupérez les données de l'utilisateur
    $pseudo = $_SESSION['pseudo'];
    $data = $_SESSION['data'];
    echo json_encode(array('pseudo' => $pseudo, 'data' => $data));
} else {
    // Si l'utilisateur n'est pas connecté, retournez une réponse JSON avec un message d'erreur
    echo json_encode(array('error' => 'Utilisateur non connecté'));
}
?>

