<?php
/*
Ce script PHP charge les messages pour un destinataire spécifié. Il récupère le destinataire de l'URL,
vérifie l'existence du fichier de conversation, et affiche son contenu ou un message invitant à démarrer la conversation.
*/

$recipient = isset($_GET['recipient']) ? htmlspecialchars($_GET['recipient']) : '';

if ($recipient !== '') {
    $conversationFile = "messages/" . $recipient . ".txt";
    if (file_exists($conversationFile)) {
        echo file_get_contents($conversationFile);
    } else {
        echo "Démarrez la conversation avec $recipient !";
    }
} else {
    echo "Destinataire non spécifié.";
}
?>
