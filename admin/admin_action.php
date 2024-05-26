<?php
session_start();

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(array('error' => 'Vous n\'avez pas la permission d\'effectuer cette action.'));
        exit;
    }

    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['action']) || !isset($input['pseudo'])) {
        http_response_code(400);
        echo json_encode(array('error' => 'Action ou pseudo non spécifié.'));
        exit;
    }

    $action = trim($input['action']);
    $pseudo = trim($input['pseudo']);

    $rows = [];
    if (($handle = fopen('../csv/user.csv', 'r')) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            $rows[] = $data;
        }
        fclose($handle);
    }

    $newRows = [];

    foreach ($rows as &$row) {
        if ($row[0] === $pseudo) {
            if ($action === 'ban_user') {
                $row[17] = 'banned';
            } 
            elseif ($action === 'delete_user') {
                continue;
            }
        }
        $newRows[] = $row;
    }

    $handle = fopen('../csv/user.csv', 'w');
    foreach ($newRows as $row) {
        if ($row !== null) {
            fputcsv($handle, $row);
        }
    }
    fclose($handle);

    echo json_encode(array('message' => "L'action '$action' a été effectuée sur l'utilisateur '$pseudo'.", 'success' => true));
} 
else {
    http_response_code(405); 
    echo json_encode(array('error' => 'Seules les requêtes POST sont autorisées.'));
}
?>
