<?php
session_start();

function updateCsv($filename, $pseudo, $newData) {
    $file = fopen($filename, 'r+');

    if (!$file) {
        return ['error' => 'Erreur lors de l\'ouverture du fichier CSV.'];
    }

    $updatedContent = [];
    $pseudoExists = false;

    while (!feof($file) && ($line = fgetcsv($file)) !== false) {
        if (trim($line[0]) === trim($pseudo)) {
            for ($i = 0; $i < count($newData); $i++) {
                $line[$i] = $newData[$i];
            }
            $updatedContent[] = $line;
        } 
        else {
            $updatedContent[] = $line;
        }

        if (trim($line[0]) === trim($newData[0]) && trim($line[0]) !== trim($pseudo)) {
            $pseudoExists = true;
        }
    }

    if ($pseudoExists) {
        fclose($file);
        return ['error' => 'Le pseudo existe déjà.'];
    }

    rewind($file);

    foreach ($updatedContent as $line) {
        fputcsv($file, $line);
    }

    fclose($file);

    return ['success' => 'Profil mis à jour avec succès'];
}

header('Content-Type: application/json');

if (isset($_SESSION['pseudo'])) {
    $pseudo = $_SESSION['pseudo'];

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $newData = array_fill(0, 15, null);

        $newData[0] = $_POST['pseudonyme'];
        $newData[1] = $_POST['age'];
        $newData[2] = $_POST['sexe'];
        $newData[3] = $_POST['date_naissance'];
        $newData[4] = $_POST['pays'];
        $newData[5] = $_POST['situation_amoureuse'];
        $newData[6] = $_POST['taille'];
        $newData[7] = $_POST['poids'];
        $newData[8] = $_POST['hobbies'];
        $newData[9] = $_POST['sports'];
        $newData[10] = $_POST['couleur_cheveux'];
        $newData[11] = $_POST['couleur_yeux'];
        $newData[13] = $_POST['nom'];
        $newData[14] = $_POST['adresse'];
        $newData[15] = password_hash($_POST['mot_de_passe'], PASSWORD_BCRYPT);

        if (isset($_FILES['photos']) && $_FILES['photos']['error'] === UPLOAD_ERR_OK) {
            if (!empty($_SESSION['data'][12]) && file_exists($_SESSION['data'][12])) {
                unlink($_SESSION['data'][12]);
            }
            
            $existingPhotos = glob("photo_profile/{$pseudo}.*");
            foreach ($existingPhotos as $existingPhoto) {
                if (file_exists($existingPhoto)) {
                    unlink($existingPhoto);
                }
            }

            $uploadDir = 'photo_profile/';
            $extension = pathinfo($_FILES['photos']['name'], PATHINFO_EXTENSION);
            $uploadFile = $uploadDir . $pseudo . '.' . $extension;

            if (move_uploaded_file($_FILES['photos']['tmp_name'], $uploadFile)) {
                $newData[12] = $uploadFile;
            } 
            else {
                echo json_encode(['error' => 'Une erreur s\'est produite lors du téléchargement de l\'image.']);
                exit;
            }
        }
    }

    $_SESSION['data'] = $newData;

    $result = updateCsv('../csv/user.csv', $pseudo, $newData);

    if (isset($result['error'])) {
        echo json_encode(['error' => $result['error']]);
    } 
    else {
        $_SESSION['pseudo'] = $_POST['pseudonyme'];
        echo json_encode(['success' => $result['success']]);
    }
} 
else {
    echo json_encode(['error' => 'Utilisateur non connecté']);
}
?>
