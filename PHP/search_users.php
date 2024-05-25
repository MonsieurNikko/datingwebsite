<?php
// search_users.php
header('Content-Type: application/json');

$query = isset($_GET['query']) ? trim($_GET['query']) : '';

if ($query === '') {
    echo json_encode([]);
    exit;
}

$file = fopen('../csv/user.csv', 'r');
$results = [];

while (($line = fgetcsv($file)) !== FALSE) {
    $pseudo = $line[0];
    if (stripos($pseudo, $query) !== FALSE) {
        $results[] = $pseudo;
    }
}

fclose($file);
echo json_encode($results);
?>
