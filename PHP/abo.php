<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = array('debug' => 'La requête provient du bouton "J\'en veux plus !"');
    
    if (isset($_SESSION['pseudo'])) {
        $response['debug'] = 'Utilisateur connecté';
        
        $_SESSION['role'] = 'premium';

        $file = '../csv/user.csv';

        $data = file($file);
        
        foreach ($data as &$ligne) {
            $user = str_getcsv($ligne);
            if ($user[0] === $_SESSION['pseudo']) {
                $user[16] = 'premium';
                $ligne = implode(',', $user) . PHP_EOL;
                break;
            }
        }
        
        file_put_contents($file, $data);

        $response['pseudo'] = $_SESSION['pseudo'];
        $response['role'] = $_SESSION['role'];
    } 
    else {
        $response['error'] = 'Utilisateur non connecté';
    }
    echo json_encode($response);
} 
else {
    $response = array('debug' => 'La requête ne provient pas du bouton "J\'en veux plus !"');
    
    if (isset($_SESSION['pseudo']) && isset($_SESSION['role'])) {
        $response['pseudo'] = $_SESSION['pseudo'];
        $response['role'] = $_SESSION['role'];
    } 
    else {
        $response['error'] = 'Utilisateur non connecté';
    }
    echo json_encode($response);
}
?>
