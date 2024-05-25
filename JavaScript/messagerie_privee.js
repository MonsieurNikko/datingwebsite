// Fonction pour récupérer le nom d'utilisateur connecté via AJAX
function getLoggedInUser() {
    $.get('../PHP/check_login.php', function(data) {
        $('#loggedInUser').text('Connecté en tant que : ' + data.username);
    });
}

$(document).ready(function() {
    // Appeler la fonction pour récupérer le nom d'utilisateur connecté
    getLoggedInUser();

    // Votre code JavaScript existant ici...
});


// Fonction utilitaire pour récupérer les paramètres de l'URL
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Fonction pour charger les messages avec le destinataire spécifié
function loadMessages(recipient) {
    // Charger les messages avec AJAX
    $.get('../PHP/get_messages.php', { recipient: recipient }, function(data) {
        // Afficher les messages dans le conteneur de message
        $('#messageContainer').html(data);
    });
}

$(document).ready(function() {
    // Récupérer le nom du destinataire depuis l'URL
    var recipient = getParameterByName('recipient');

    // Mettre à jour le titre avec le nom du destinataire
    $('#recipientHeader').text('Messagerie privée avec ' + recipient);

    // Charger les messages avec le destinataire spécifié
    loadMessages(recipient);

    // Récupérer le nom d'expéditeur depuis la session PHP
    var sender = "<?php echo $sender; ?>"; // Remplacer $sender par la variable contenant le nom d'expéditeur depuis la session PHP

    // Soumettre le formulaire pour envoyer un message
    $('#messageForm').submit(function(e) {
        e.preventDefault();
        var message = $('#messageInput').val().trim();
        if (message !== '') {
            // Envoyer le message à l'aide de AJAX à send_message.php
            $.post('../PHP/send_message.php', { sender: sender, recipient: recipient, message: message }, function(data) {
                console.log(data); // Afficher la réponse du serveur (facultatif)
                // Recharger les messages après l'envoi du message
                loadMessages(recipient);
                // Effacer le champ de saisie du message
                $('#messageInput').val('');
            });
        } else {
            alert('Veuillez saisir un message.');
        }
    });
});
