<?php
// En supposant que le fichier CSV contient les données des utilisateurs avec le nom d'utilisateur en première colonne

// Vérifier si la méthode de la requête est POST et si le pseudo est présent dans les données POST
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['pseudo'])) {
    $pseudo = $_POST['pseudo'];

    // Chemin vers le fichier CSV
    $csvFile = "../csv/user.csv";

    // Ouvrir le fichier CSV en lecture
    $file = fopen($csvFile, "r");

    // Tableau pour stocker les données de profil de l'utilisateur
    $userData = null;

    // Parcourir le fichier CSV pour rechercher l'utilisateur
    while (($row = fgetcsv($file)) !== FALSE) {
        // Supposons que le pseudonyme est dans la première colonne (indice 0)
        if ($row[0] == $pseudo) {
            // Stocker les données de profil dans un tableau associatif
            $userData = [
                'pseudo' => $row[0],
                'age' => $row[1],
                'sexe' => $row[2],
                'dateNaissance' => $row[3],
                'pays' => $row[4],
                'description' => $row[5],
                'taille' => $row[6],
                'poids' => $row[7],
                'interet1' => $row[8],
                'sport' => $row[9],
                'couleurCheveux' => $row[10],
                'couleurYeux' => $row[11],
                'imagePath' => $row[12],
                'nom' => $row[13],
                'adresse' => $row[14],
            ];
            break; // Arrêtez la recherche une fois que l'utilisateur est trouvé
        }
    }

    // Fermer le fichier CSV
    fclose($file);

    // Vérifier si les données de profil ont été trouvées
    if ($userData) {
        // Envoyer les données de profil au format JSON
        header('Content-Type: application/json');
        echo json_encode($userData);
    } 
    else {
        // Envoyer une réponse 404 si l'utilisateur n'est pas trouvé
        http_response_code(404);
        echo json_encode(['message' => 'User not found']);
    }
} 
else {
    // Envoyer une réponse 400 si la requête est incorrecte ou si le pseudo est manquant
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request']);
}
?>
