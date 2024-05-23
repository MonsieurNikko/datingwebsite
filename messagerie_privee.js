<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Messagerie privée</title>
    <link rel="stylesheet" href="styles.css"> <!-- Ajoutez ici le lien vers votre feuille de style CSS -->
</head>
<body>
    <h1 id="recipientHeader"></h1>
    <div id="messageContainer"></div>
    <form id="messageForm">
        <textarea id="messageInput" placeholder="Entrez votre message ici..."></textarea>
        <button type="submit">Envoyer</button>
    </form>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="messagerie_privee.js"></script>
</body>
</html>