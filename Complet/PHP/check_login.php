<?php
session_start();

header('Content-Type: application/json');

$response = array();

if (isset($_SESSION['pseudo'])) {
    $response['status'] = 'success';
    $response['username'] = $_SESSION['pseudo'];
} else {
    $response['status'] = 'error';
    $response['message'] = 'User not logged in';
}

echo json_encode($response);
?>
