<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $message = $_POST['message'];
    $timestamp = date('Y-m-d H:i:s');

    // Path to the user CSV file
    $userFile = 'user.csv';

    // Check if the username exists in the user CSV file
    $userExists = false;
    if (($handle = fopen($userFile, 'r')) !== FALSE) {
        while (($data = fgetcsv($handle, 1000, ',')) !== FALSE) {
            if ($data[0] == $username) { // Assuming the username is in the first column
                $userExists = true;
                break;
            }
        }
        fclose($handle);
    }

    if ($userExists) {
        // Path to the report CSV file
        $reportFile = 'rapport.csv';

        // Create a CSV row
        $reportData = array($username, $timestamp, $message);

        // Write the row to the report CSV file
        if (($handle = fopen($reportFile, 'a')) !== FALSE) {
            fputcsv($handle, $reportData);
            fclose($handle);
            echo "Rapport soumis avec succès!";
        } else {
            echo "Erreur lors de la soumission du rapport.";
        }
    } else {
        // Redirect to the form with an error message
        header("Location: index.html?error=Nom d'utilisateur non trouvé.");
        exit();
    }
}
?>
