<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $pseudo = $_POST['pseudonyme'];
    $age = $_POST['age'];
    $sexe = $_POST['sexe'];
    $date_naissance = $_POST['date_naissance'];
    $residence = $_POST['lieu de résidence'];
	$situation = $_POST['situation amoureuse'];
	$taille = $_POST['taille'];
	$poids = $_POST['poids'];
	$cheveux = $_POST['couleur des cheveux'];
	$yeux = $_POST['couleur des yeux'];
	$nom = $_POST['nom'];
	$adresse = $_POST['adresse'];
	$password = $_POST['mot de passe'];
	
	
    // Écrire les données dans le fichier CSV
    $fichier_csv = 'csv/user.csv';
    $nouvelle_ligne = "$pseudo,$age,$sexe,$date_naissance,$residence,$situation,$taille,$poids,$cheveux,$yeux,$nom,$adresse,$password\n";
    file_put_contents($fichier_csv, $nouvelle_ligne, FILE_APPEND);

    // Afficher un message de succès
    $message = "Utilisateur ajouté avec succès!";
}
?>
