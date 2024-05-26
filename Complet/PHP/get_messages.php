<?php
// Récupérer le destinataire de l'URL
$recipient = isset($_GET['recipient']) ? htmlspecialchars($_GET['recipient']) : '';

// Charger les messages pour le destinataire spécifié
if ($recipient !== '') {
    $conversationFile = "messages/" . $recipient . ".txt";
    if (file_exists($conversationFile)) {
        echo file_get_contents($conversationFile);
    } 
    else {
        echo "Demarrez la conversation avec $recipient !";
    }
} 
else {
    echo "Destinataire non spécifié.";
}
?>
