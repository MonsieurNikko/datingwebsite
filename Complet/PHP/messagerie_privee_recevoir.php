<?php
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['pseudo'])) {
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit();
}

// Récupère le destinataire des messages
$recipient = $_POST['recipient'];
$sender = $_SESSION['pseudo'];

// Chargement des messages du fichier de conversation de l'expéditeur vers le destinataire
$senderRecipientFile = '../messages/' . $sender . '_' . $recipient . '.txt';
$recipientSenderFile = '../messages/' . $recipient . '_' . $sender . '.txt';

$messages = [];

if (file_exists($senderRecipientFile)) {
    $senderRecipientMessages = file($senderRecipientFile, FILE_IGNORE_NEW_LINES);
    foreach ($senderRecipientMessages as $message) {
        list($time, $msgSender, $content) = explode('|', $message);
        $messages[] = ['time' => $time, 'sender' => $msgSender, 'content' => $content];
    }
}

// Si le fichier de conversation inverse existe, ajout des messages
if (file_exists($recipientSenderFile)) {
    $recipientSenderMessages = file($recipientSenderFile, FILE_IGNORE_NEW_LINES);
    foreach ($recipientSenderMessages as $message) {
        list($time, $msgSender, $content) = explode('|', $message);
        $messages[] = ['time' => $time, 'sender' => $msgSender, 'content' => $content];
    }
}

// Tri des messages par heure
usort($messages, function($a, $b) {
    return strtotime($a['time']) - strtotime($b['time']);
});

echo json_encode(['messages' => $messages]);
?>
