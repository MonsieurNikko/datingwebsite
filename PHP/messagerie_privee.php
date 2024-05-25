<?php
session_start();
// Vérifier si l'utilisateur est connecté
if(isset($_SESSION['username'])) {
    // Récupérer le nom d'utilisateur de la session
    $sender = $_SESSION['username'];

    // Afficher un message indiquant que l'utilisateur est connecté en tant que
    echo "<p>Connecté en tant que : $sender</p>";

    // Récupérer le destinataire de l'URL
    $recipient = isset($_GET['recipient']) ? htmlspecialchars($_GET['recipient']) : '';

    // Vérifier si un destinataire a été spécifié
    if ($recipient !== '') {
        // Afficher le nom du destinataire
        echo "<h1>Messagerie privée avec $recipient</h1>";
    } else {
        // Si aucun destinataire n'est spécifié, afficher un message d'erreur   
        echo "<p>Destinataire non spécifié.</p>";
    }

    // Fonction pour envoyer un message
    function envoyerMessage($expediteur, $destinataire, $message) {
        // Créer le nom du fichier de conversation
        $conversationFile = "messages/" . $expediteur . "-" . $destinataire . ".txt";
        
        // Vérifier si le fichier de conversation existe déjà
        if (!file_exists($conversationFile)) {
            // Créer le fichier s'il n'existe pas
            file_put_contents($conversationFile, '');
        }

        // Enregistrer le message dans le fichier de conversation
        $messageData = date('Y-m-d H:i:s') . " - $expediteur : $message\n";
        file_put_contents($conversationFile, $messageData, FILE_APPEND);
    }
} else {
    // Rediriger l'utilisateur vers la page de connexion s'il n'est pas connecté
    header("Location: ../PHP/login.php");
    exit();
}

?>
