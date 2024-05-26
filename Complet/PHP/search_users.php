<?php
// search_users.php
header('Content-Type: application/json'); // Définir le type de contenu de la réponse comme JSON

$query = isset($_GET['query']) ? trim($_GET['query']) : ''; // Récupérer la requête de recherche depuis les paramètres GET

if ($query === '') {
    echo json_encode([]);
    exit;
}

$file = fopen('../csv/user.csv', 'r');
$results = [];

// Parcourir chaque ligne du fichier CSV pour trouver les pseudos qui correspondent à la requête
while (($line = fgetcsv($file)) !== FALSE) {
    $pseudo = $line[0];
    if (stripos($pseudo, $query) !== FALSE) {
        $results[] = $pseudo;
    }
}

fclose($file);
echo json_encode($results);
?>
