document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('recipient');

    // Utiliser le nom d'utilisateur du destinataire pour configurer l'interface de messagerie
    document.getElementById('recipient-display').textContent = `Messagerie avec : ${recipient}`;
});


        document.addEventListener('DOMContentLoaded', () => {
            // Récupérer le paramètre 'recipient' de l'URL
            const params = new URLSearchParams(window.location.search);
            const recipient = params.get('recipient');
            console.log('Recipient from URL params:', recipient);

            // Utiliser le nom d'utilisateur du destinataire pour configurer l'interface de messagerie
            document.getElementById('recipientHeader').textContent = `Messagerie avec : ${recipient}`;
            loadMessages(recipient);

            // Écouter l'événement de soumission du formulaire
            document.getElementById('messageForm').addEventListener('submit', sendMessage);

            // Vérifier et afficher le rôle de l'utilisateur
            checkUserRole();
        });

        function checkUserRole() {
            $.ajax({
                url: '../autreprofil/roleactuel.php', // Assurez-vous que ce fichier renvoie le rôle actuel de l'utilisateur
                method: 'GET',
                success: function(role) {
                    localStorage.setItem('userRole', role);
                    if (role === 'basic') {
                        let messageCount = localStorage.getItem('messageCount') || 0;
                        localStorage.setItem('messageCount', messageCount);
                    }
                },
                error: function() {
                    console.error('Erreur lors de la vérification du rôle de l\'utilisateur');
                }
            });
        }

        // Fonction pour charger les messages de la conversation avec le destinataire
        function loadMessages(recipient) {
            if (!recipient) {
                console.error('Recipient is null. Cannot load messages.');
                return;
            }

            // Effectuer une requête AJAX pour récupérer les messages de la conversation
            $.ajax({
                url: '../PHP/messagerie_privee_recevoir.php',
                method: 'POST',
                dataType: 'json',
                data: { recipient: recipient },
                success: function(response) {
                    displayMessages(response.messages);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Erreur lors du chargement des messages :', textStatus, errorThrown);
                    alert('Erreur lors du chargement des messages. Veuillez réessayer.');
                }
            });
        }

        // Fonction pour afficher les messages dans le conteneur
        function displayMessages(messages) {
            const messageContainer = document.getElementById('messageContainer');
            messageContainer.innerHTML = ''; // Efface le contenu précédent

            messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.textContent = message.sender + ': ' + message.content;
                messageContainer.appendChild(messageElement);
            });
        }

        // Fonction pour envoyer un message
        function sendMessage(event) {
            event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

            const recipient = document.getElementById('recipientHeader').textContent.split(': ')[1].trim();
            const sender = document.getElementById('senderInput').value;
            const message = document.getElementById('messageInput').value.trim();

            if (message === '') {
                alert('Veuillez saisir un message.');
                return;
            }

            // Vérifier le rôle de l'utilisateur et le compteur de messages
            const userRole = localStorage.getItem('userRole');
            let messageCount = parseInt(localStorage.getItem('messageCount'), 10);

            if (userRole === 'basic' && messageCount >= 10) {
                alert('Pour envoyer plus de messages, veuillez passer à un compte premium.');
                return;
            }

            // Effectuer une requête AJAX pour envoyer le message
            $.ajax({
                url: '../PHP/messagerie_privee_envoyer.php',
                method: 'POST',
                dataType: 'json',
                data: {
                    sender: sender,
                    recipient: recipient,
                    message: message
                },
                success: function(response) {
                    if (response.success) {
                        // Message envoyé avec succès, actualiser l'affichage des messages
                        loadMessages(recipient);
                        // Effacer le champ de saisie du message après l'envoi
                        document.getElementById('messageInput').value = '';

                        // Augmenter le compteur de messages pour les utilisateurs basiques
                        if (userRole === 'basic') {
                            messageCount++;
                            localStorage.setItem('messageCount', messageCount);
                        }
                    } else {
                        alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('Erreur lors de l\'envoi du message :', textStatus, errorThrown);
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer.');
                }
            });
        }




