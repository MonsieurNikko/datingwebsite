<?php
// Ce script vérifie si des données les reports ont été soumises via la méthode POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['username']) && isset($_POST['message'])) {
        $username = $_POST['username'];
        $message = $_POST['message'];

        $currentDateTime = date('Y-m-d H:i:s');

        $file = '../reports/reports.txt';
        $content = "Date et heure : $currentDateTime\nUtilisateur: $username\nMessage: $message\n\n";
        file_put_contents($file, $content, FILE_APPEND);

        echo "Rapport soumis avec succès !";
    } else {
        http_response_code(400);
        echo "Tous les champs requis ne sont pas fournis.";
    }
} else {
    http_response_code(405);
    echo "Méthode non autorisée.";
}
?>

