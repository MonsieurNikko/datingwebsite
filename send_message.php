<?php
// send_message.php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$sender = $data['sender'] ?? '';
$recipient = $data['recipient'] ?? '';
$message = $data['message'] ?? '';

if ($sender === '' || $recipient === '' || $message === '') {
    echo json_encode(['success' => false, 'error' => 'Tous les champs sont obligatoires.']);
    exit;
}

// Déterminer le nom du fichier de conversation basé sur les utilisateurs
$conversationFile = 'conversations/' . (strcmp($sender, $recipient) < 0 ? "$sender-$recipient.txt" : "$recipient-$sender.txt");

// Format du message : expediteur - destinataire - heure - date - message
$date = new DateTime();
$formattedMessage = sprintf(
    "%s - %s - %s - %s - %s\n",
    $sender,
    $recipient,
    $date->format('H:i:s'),
    $date->format('Y-m-d'),
    $message
);

// Ajouter le message au fichier de conversation
if (file_put_contents($conversationFile, $formattedMessage, FILE_APPEND)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'envoi du message.']);
}
?>
