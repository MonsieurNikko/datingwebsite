<?php
/*
Ce script PHP gère l'envoi de messages entre utilisateurs connectés. Il vérifie d'abord si un utilisateur est connecté en vérifiant la session. Ensuite, il récupère l'expéditeur, le destinataire et le message à envoyer à partir des données POST reçues. Après avoir vérifié si le message n'est pas vide, il formate l'heure et la date actuelles, puis formate le message avec l'heure, l'expéditeur et le contenu. Enfin, il stocke le message dans un fichier spécifique correspondant à la conversation entre l'expéditeur et le destinataire.

Le nom du fichier est construit en concaténant le nom de l'expéditeur et du destinataire avec une extension .txt. Par exemple, pour une conversation entre l'expéditeur "Alice" et le destinataire "Bob", le fichier sera nommé "Alice_Bob.txt".

Ce fichier vise à faciliter la communication privée entre utilisateurs, en enregistrant les échanges dans des fichiers texte pour référence ultérieure.
*/

session_start();

if (!isset($_SESSION['pseudo'])) {
    echo json_encode(['error' => 'Utilisateur non connecté']);
    exit();
}

$sender = $_SESSION['pseudo'];
$recipient = $_POST['recipient'];
$message = $_POST['message'];

if (empty($message)) {
    echo json_encode(['error' => 'Le message est vide']);
    exit();
}

$time = date('H:i:s d-m-Y');

$formattedMessage = $time . '|' . $sender . '|' . $message . PHP_EOL;

$fileName = $sender . '_' . $recipient . '.txt';
$filePath = '../messages/' . $fileName;

file_put_contents($filePath, $formattedMessage, FILE_APPEND | LOCK_EX);

echo json_encode(['success' => true]);
?>
