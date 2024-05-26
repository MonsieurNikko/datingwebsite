<?php
session_start();

header('Content-Type: application/json');

// Vérifier si la requête provient du bouton "J'en veux plus !"
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = array('debug' => 'La requête provient du bouton "J\'en veux plus !"');
    
    if (isset($_SESSION['pseudo'])) {
        $response['debug'] = 'Utilisateur connecté';
        
        $_SESSION['role'] = 'premium';

        $file = '../csv/user.csv';

        // Lire le contenu du fichier dans un tableau
        $data = file($file);
        
        // Parcourir chaque ligne pour trouver l'utilisateur et mettre à jour son rôle
        foreach ($data as &$ligne) {
            $user = str_getcsv($ligne);
            if ($user[0] === $_SESSION['pseudo']) {
                $user[16] = 'premium'; // Mettre à jour le rôle
                $ligne = implode(',', $user) . PHP_EOL; // Reconstruire la ligne modifiée
                break; // Arrêter la boucle une fois que l'utilisateur est trouvé
            }
        }
        
        file_put_contents($file, $data);

        // Renvoyer les données mises à jour
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
    // Si la requête ne provient pas du bouton "J'en veux plus !", renvoyer les données de session actuelles
    if (isset($_SESSION['pseudo']) && isset($_SESSION['role'])) {
        // Récupérer les données de l'utilisateur
        $response['pseudo'] = $_SESSION['pseudo'];
        $response['role'] = $_SESSION['role'];
    } 
    else {
        $response['error'] = 'Utilisateur non connecté';
    }
    echo json_encode($response);
}

?>
