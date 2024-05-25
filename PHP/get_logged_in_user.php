<?php
session_start();

// Vérifier si l'utilisateur est connecté
if(isset($_SESSION['username'])) {
    // Récupérer le nom d'utilisateur de la session
    $username = $_SESSION['username'];
    
    // Répondre avec le nom d'utilisateur au format JSON
    echo json_encode(['username' => $username]);
} else {
    // Répondre avec une erreur si l'utilisateur n'est pas connecté
    echo json_encode(['error' => 'Utilisateur non connecté']);
}
?>
