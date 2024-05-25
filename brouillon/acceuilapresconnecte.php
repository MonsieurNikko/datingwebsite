<?php
session_start();

$csvFile = 'csv/user.csv';
$users = [];

if (($fichier = fopen($csvFile, 'r')) !== false) {
    while (($ligne = fgetcsv($fichier)) !== false) {
        if ($ligne[0] !== 'admin' && $ligne[0] !== 'admin2' && $ligne[0] !== 'admin3' && $ligne[0] !== 'admin4' && $ligne[0] !== $_SESSION['pseudo']) {
            $users[] = [
                'pseudo' => $ligne[0], // pseudo
                'age' => $ligne[1], // age
                'hobbies' => explode(';', $ligne[8]), // hobby
                'sports' => explode(';', $ligne[9]), // sports
                'imagePath' => $ligne[12] // uploadFile (image path)
            ];
        }
    }
    fclose($fichier);
}

header('Content-Type: application/json');
echo json_encode($users);
?>
