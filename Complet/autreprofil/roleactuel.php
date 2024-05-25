<?php
session_start();

$userRole = $_SESSION['role'];

echo $userRole;
?>
