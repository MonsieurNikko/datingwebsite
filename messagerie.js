// Fonction pour obtenir le type d'abonnement de l'utilisateur actuellement connecté
function getTypeAbonnement(utilisateur) {
    return new Promise((resolve, reject) => {
        fetch('csv/user.csv')
            .then(response => response.text())
            .then(data => {
                const lignes = data.split('\n').map(ligne => ligne.split(','));
                const utilisateurTrouve = lignes.find(ligne => ligne[0].trim() === utilisateur);
                if (utilisateurTrouve) {
                    resolve(utilisateurTrouve[16].trim()); // L'index 16 correspond à la colonne du type d'abonnement dans user.csv
                } else {
                    reject("Utilisateur non trouvé");
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Fonction pour charger les messages existants
function chargerMessages(sender, recipient) {
    fetch(`get_messages.php?sender=${encodeURIComponent(sender)}&recipient=${encodeURIComponent(recipient)}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                afficherMessages(data.messages);
            } else {
                console.error('Erreur lors du chargement des messages:', data.error);
            }
        })
        .catch(error => {
            console.error('Erreur lors du chargement des messages:', error);
        });
}

// Fonction pour afficher les messages dans l'interface utilisateur
function afficherMessages(messages) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.innerHTML = '';

    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = msg;
        messageContainer.appendChild(messageElement);
    });
}

// Fonction pour charger la liste des amis depuis amis.csv
function chargerAmis(currentUser) {
    fetch('csv/amis.csv')
        .then(response => response.text())
        .then(data => {
            const amis = data.split('\n').map(line => line.split(',').map(item => item.trim()));
            const userAmis = amis.filter(relation => relation.includes(currentUser));
            const userFriends = userAmis.map(relation => (relation[0] === currentUser ? relation[1] : relation[0]));
            afficherAmis(userFriends);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des amis :', error);
        });
}

// Fonction pour afficher les amis dans le champ de recherche du destinataire
function afficherAmis(amis) {
    const recipientInput = document.getElementById('recipient');
    recipientInput.addEventListener('input', debounce(function() {
        const input = this.value.toLowerCase();
        const suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = '';

        if (input) {
            fetch(`search_users.php?query=${encodeURIComponent(input)}`)
                .then(response => response.json())
                .then(filteredFriends => {
                    suggestions.innerHTML = '';
                    filteredFriends.forEach(friend => {
                        const div = document.createElement('div');
                        div.textContent = friend;
                        div.classList.add('suggestion-item');
                        div.addEventListener('click', function() {
                            recipientInput.value = friend;
                            suggestions.innerHTML = '';
                            document.getElementById('message').disabled = false;
                        });
                        suggestions.appendChild(div);
                    });
                })
                .catch(error => console.error('Erreur lors de la recherche des utilisateurs :', error));
        }
    }, 300)); // Délais de 300ms pour le debounce
}

// Fonction de debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getCurrentUser() {
    console.log("Début de la récupération de l'utilisateur actuel...");
    return new Promise((resolve, reject) => {
        fetch('messegerieprofilactuel.php')
            .then(response => response.json())
            .then(data => {
                console.log("Données récupérées depuis le serveur:", data);
                if (data.pseudo) { // Utilisation de data.pseudo au lieu de data.username
                    console.log("Utilisateur actuel récupéré avec succès:", data.pseudo);
                    resolve(data.pseudo);
                } else {
                    console.log("Erreur lors de la récupération de l'utilisateur actuel.");
                    reject('Utilisateur non connecté');
                }
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de l'utilisateur actuel:", error);
                reject(error);
            });
    });
}

// Récupérer l'utilisateur actuel et initialiser l'application
getCurrentUser()
    .then(currentUser => {
        console.log("Utilisateur actuel:", currentUser);
        // Vérifier le type d'abonnement de l'utilisateur connecté et ajuster l'interface
        return getTypeAbonnement(currentUser).then(typeAbonnement => {
            console.log("Type d'abonnement de l'utilisateur:", typeAbonnement);
            if (typeAbonnement === "basic") {
                console.log("L'utilisateur a un abonnement basique.");
                document.getElementById('message').style.display = "none";
                document.getElementById('sendMessageButton').style.display = "none";
                document.getElementById('subscriptionMessage').style.display = "block";
            } else {
                console.log("L'utilisateur a un abonnement premium.");
                document.getElementById('message').style.display = "block";
                document.getElementById('sendMessageButton').style.display = "block";
                document.getElementById('subscriptionMessage').style.display = "none";
            }
            return currentUser;
        });
    })
    .then(currentUser => {
        console.log("Chargement de la liste des amis pour l'utilisateur:", currentUser);
        // Charger la liste des amis une fois que la page est chargée
        document.addEventListener('DOMContentLoaded', () => chargerAmis(currentUser));

        // Fonction pour gérer l'envoi de message
        document.getElementById('newConversationForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const recipient = document.getElementById('recipient').value.trim();
            const message = document.getElementById('message').value.trim();

            if (recipient === '' || message === '') {
                alert('Tous les champs sont obligatoires.');
                return;
            }

            fetch('send_message.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ sender: currentUser, recipient, message })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Message envoyé avec succès');
                    document.getElementById('recipient').value = '';
                    document.getElementById('message').value = '';
                    document.getElementById('message').disabled = true;
                    document.getElementById('sendMessageButton').disabled = true;
                } else {
                    alert('Erreur lors de l\'envoi du message.');
                }
            })
            .catch(error => console.error('Erreur lors de l\'envoi du message:', error));
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
    });

