<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   // Récupérer les données du formulaire
$pseudo = $_POST['pseudonyme'];
$age = $_POST['age'];
$sexe = $_POST['sexe'];
$date_naissance = $_POST['date_naissance'];
$pays = $_POST['pays'];
$situation_amoureuse = $_POST['situation_amoureuse'];
$taille = $_POST['taille'];
$poids = $_POST['poids'];
$hobby = $_POST['hobbies'];
$sports = $_POST['sports'];
$couleur_cheveux = $_POST['couleur_cheveux'];
$couleur_yeux = $_POST['couleur_yeux'];
$uploadDir = 'photo_profile/'; // Répertoire où stocker les fichiers téléchargés
$extension = pathinfo($_FILES['photos']['name'], PATHINFO_EXTENSION);
$uploadFile = $uploadDir . $pseudo . '.' . $extension;

if (move_uploaded_file($_FILES['photos']['tmp_name'], $uploadFile)) {
    echo "Le fichier est valide et a été téléchargé avec succès.\n";
} else {
    echo "Une erreur s'est produite lors du téléchargement du fichier.\n";
}

$nom = $_POST['nom'];
$adresse = $_POST['adresse'];
$mot_de_passe = password_hash($_POST['mot_de_passe'], PASSWORD_BCRYPT); // Hacher le mot de passe

// Nouvel utilisateur avec abonnement "basic" par défaut
$abonnement = "basic";

// Écrire les données dans le fichier CSV
$fichier_csv = 'csv/user.csv';
$nouvelle_ligne = "$pseudo,$age,$sexe,$date_naissance,$pays, $situation_amoureuse, $taille, $poids, $hobby, $sports, $couleur_cheveux, $couleur_yeux, $uploadFile, $nom, $adresse, $mot_de_passe, $abonnement\n";
file_put_contents($fichier_csv, $nouvelle_ligne, FILE_APPEND);

header("location: page_d'accueil.html");
exit; // Assurez-vous de terminer le script après la redirection
?>
