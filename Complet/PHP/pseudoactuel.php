<?php
session_start();

// Si l'utilisateur est connecté, afficher son pseudo
if (isset($_SESSION['pseudo'])) {
    $username = $_SESSION['pseudo'];
    echo $username;
}
?>
