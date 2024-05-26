<?php
// Démarrer la session pour récupérer le nom de l'utilisateur
session_start();

// Récupérer le nom de l'expéditeur à partir de la session PHP
$sender = $_SESSION['username'] ?? '';

// Vérifier si le nom de l'expéditeur est vide
if (empty($sender)) {
    // Répondre avec erreur si le nom de l'expéditeur est vide
    echo json_encode(['success' => false, 'error' => 'Nom d\'expéditeur introuvable dans la session.']);
    exit; // Terminer le script
}

// Vérifier si les données sont correctement reçues
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Récupérer les données du formulaire
    $recipient = $_POST['recipient'] ?? '';
    $message = $_POST['message'] ?? '';

    // Vérifier si les données sont valides
    if ($recipient && $message) {
        // Créer le nom du fichier de conversation
        $conversationFile = "messages/" . $recipient . ".txt";
        
        // Enregistrer le message dans le fichier de conversation
        $messageData = date('Y-m-d H:i:s') . " - " . $sender . " - " . $recipient . " - " . $message . "\n";
        file_put_contents($conversationFile, $messageData, FILE_APPEND);

        // Répondre avec succès
        echo json_encode(['success' => true]);
    } 
    else {
        // Répondre avec erreur si des données sont manquantes
        echo json_encode(['success' => false, 'error' => 'Tous les champs sont obligatoires.']);
    }
} 
else {
    // Répondre avec erreur si la méthode de requête est incorrecte
    echo json_encode(['success' => false, 'error' => 'Méthode de requête non autorisée.']);
}
?>
