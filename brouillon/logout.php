<?php
session_start();
session_unset();
session_destroy();
header('Location: page_d\'accueil.html');
exit();
?>