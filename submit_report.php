<?php
// Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $username = trim($_POST['username']);
    $message = trim($_POST['message']);

    // Vérifier si les champs ne sont pas vides
    if (!empty($username) && !empty($message)) {
        // Lire le fichier CSV des utilisateurs
        $users = array_map('str_getcsv', file('user.csv'));

        // Vérifier si l'utilisateur existe dans la base de données
        $userExists = false;
        foreach ($users as $user) {
            if ($user[0] === $username) {
                $userExists = true;
                break;
            }
        }

        // Si l'utilisateur existe, rediriger vers la page d'accueil et enregistrer dans rapport.csv
        if ($userExists) {
            // Enregistrer les informations dans le fichier rapport.csv
            $data = array($username, date('Y-m-d H:i:s'), $message);
            $handle = fopen('rapport.csv', 'a');
            fputcsv($handle, $data);
            fclose($handle);

            // Rediriger vers la page d'accueil
            header("Location: index.html");
            exit();
        } else {
            // Sinon, afficher un message d'erreur
            echo "<script>alert('Nom d'utilisateur invalide.'); window.history.back();</script>";
            exit();
        }
    } else {
        // Si un champ est vide, afficher un message d'erreur
        echo "<script>alert('Veuillez remplir tous les champs.'); window.history.back();</script>";
        exit();
    }
} else {
    // Si le formulaire n'a pas été soumis via POST, rediriger vers la page d'accueil
    header("Location: index.html");
    exit();
}
?>
