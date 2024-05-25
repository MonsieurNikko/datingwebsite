<?php
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['pseudo'])) {
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit();
}

// Récupère l'expéditeur, le destinataire et le message à envoyer
$sender = $_SESSION['pseudo'];
$recipient = $_POST['recipient'];
$message = $_POST['message'];

// Vérifie si le message n'est pas vide
if (empty($message)) {
    echo json_encode(['error' => 'Le message est vide']);
    exit();
}

// Formatte l'heure et la date actuelles
$time = date('H:i:s d-m-Y');

// Formatte le message avec l'heure, l'expéditeur et le contenu
$formattedMessage = $time . '|' . $sender . '|' . $message . PHP_EOL;

// Stocke le message dans un fichier
$fileName = $sender . '_' . $recipient . '.txt';
$filePath = '../messages/' . $fileName;

file_put_contents($filePath, $formattedMessage, FILE_APPEND | LOCK_EX);

echo json_encode(['success' => true]);
?>


