<?php
session_start();
session_unset();
session_destroy();
header('Location: ../HTML/page_d\'accueil.html');
exit();
?>