<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['pseudo']) && isset($_SESSION['data']) && isset($_SESSION['role'])) {
    // Récupérez les données de l'utilisateur
    $pseudo = $_SESSION['pseudo'];
    $data = $_SESSION['data'];
    $role = $_SESSION['role']; // Ajout du rôle de l'utilisateur
    echo json_encode(array('pseudo' => $pseudo, 'data' => $data, 'role' => $role));
} 
else {
    echo json_encode(array('error' => 'Utilisateur non connecté'));
}
?>
