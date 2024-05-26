<?php
/*
Ce script PHP charge les messages entre utilisateurs connectés. Il vérifie la session,
récupère le destinataire des messages et charge les messages à partir des fichiers de conversation correspondants.
Les messages sont triés par heure et renvoyés au format JSON pour affichage côté client.

Les fichiers de conversation sont nommés "expéditeur_destinataire.txt".
Si un utilisateur A envoie des messages à un utilisateur B, ils seront chargés depuis "A_B.txt",
et les messages de B à A seront également inclus.

*/

session_start();

if (!isset($_SESSION['pseudo'])) {
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit();
}

$recipient = $_POST['recipient'];
$sender = $_SESSION['pseudo'];

$messages = [];

$senderRecipientFile = '../messages/' . $sender . '_' . $recipient . '.txt';
$recipientSenderFile = '../messages/' . $recipient . '_' . $sender . '.txt';

// Chargement des messages de l'expéditeur vers le destinataire
if (file_exists($senderRecipientFile)) {
    $senderRecipientMessages = file($senderRecipientFile, FILE_IGNORE_NEW_LINES);
    foreach ($senderRecipientMessages as $message) {
        list($time, $msgSender, $content) = explode('|', $message);
        $messages[] = ['time' => $time, 'sender' => $msgSender, 'content' => $content];
    }
}

// Chargement des messages du destinataire vers l'expéditeur
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
