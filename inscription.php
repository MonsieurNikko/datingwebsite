<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $pseudo = $_POST['pseudonyme'];
    $age = $_POST['age'];
    $sexe = $_POST['sexe'];
    $date_naissance = $_POST['date_naissance'];
    $profession = $_POST['profession'];

    // Écrire les données dans le fichier CSV
    $fichier_csv = 'csv/user.csv';
    $nouvelle_ligne = "$pseudo,$age,$sexe,$date_naissance,$profession\n";
    file_put_contents($fichier_csv, $nouvelle_ligne, FILE_APPEND);

    // Afficher un message de succès
    $message = "Utilisateur ajouté avec succès!";
}
?>
