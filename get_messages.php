<?php
// get_messages.php
header('Content-Type: application/json');

$sender = $_GET['sender'] ?? '';
$recipient = $_GET['recipient'] ?? '';

if ($sender === '' || $recipient === '') {
    echo json_encode(['success' => false, 'error' => 'Les champs sender et recipient sont obligatoires.']);
    exit;
}

// Déterminer le nom du fichier de conversation basé sur les utilisateurs
$conversationFile = 'conversations/' . (strcmp($sender, $recipient) < 0 ? "$sender-$recipient.txt" : "$recipient-$sender.txt");

if (!file_exists($conversationFile)) {
    echo json_encode(['success' => true, 'messages' => []]);
    exit;
}

// Lire le contenu du fichier de conversation
$messages = file($conversationFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
echo json_encode(['success' => true, 'messages' => $messages]);
?>
