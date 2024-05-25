<?php
session_start();

header('Content-Type: application/json');

$response = array();

if(isset($_SESSION['role'])) {
    $response['role'] = $_SESSION['role'];
}

echo json_encode($response);
?>