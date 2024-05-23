<?php
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
?>
