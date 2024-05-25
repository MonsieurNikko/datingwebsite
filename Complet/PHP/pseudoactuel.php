<?php
session_start();

if (isset($_SESSION['pseudo'])) {
    $username = $_SESSION['pseudo'];
    echo $username;
}
?>
