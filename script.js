document.addEventListener('DOMContentLoaded', function() {
    const connexionLink = document.getElementById('connexionlink');
    const connexionForm = document.getElementById('connexionform');
    const body = document.querySelector('body');

    // Lorsque le formulaire de connexion est affiché
    connexionLink.addEventListener('click', function(event) {
        event.preventDefault();
        connexionForm.style.display = 'block'; // Affiche le formulaire de connexion
        body.classList.add('overlay-active'); // Ajoute la classe pour assombrir l'arrière-plan
        document.getElementById('intro').style.display = 'none';
    });
});


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("connexionForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        console.log("Formulaire soumis"); // Message de débogage

        var formData = new FormData(this); // Récupère les données du formulaire

        // Envoie des données du formulaire à connexion.php via une requête AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "connexion.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log("Réponse reçue du serveur"); // Message de débogage

                // Vérifiez si le statut HTTP est 200 (OK)
                if (xhr.status === 200) {
                    console.log("Statut HTTP 200"); // Message de débogage

                    // Redirige vers la page d'accueil après connexion réussie
                    window.location.href = "acceuilapresconnecte.html";
                } else if (xhr.status === 401) {
                    console.log("Statut HTTP 401"); // Message de débogage

                    // Affiche la réponse du serveur dans le div d'erreurMessage
                    document.getElementById("erreurMessage").innerHTML = xhr.responseText;
                } else {
                    // Le traitement pour les autres erreurs HTTP
                    console.log("Erreur HTTP: " + xhr.status); // Message de débogage
                    document.getElementById("erreurMessage").innerHTML = "Une erreur s'est produite.";
                }
            }
        };
        xhr.send(formData);
    });
});

// Fonction pour obtenir le type d'abonnement de l'utilisateur actuellement connecté
function getTypeAbonnement(utilisateur) {
    return new Promise((resolve, reject) => {
        fetch('user.csv')
            .then(response => response.text())
            .then(data => {
                const lignes = data.split('\n').map(ligne => ligne.split(','));
                const utilisateurTrouve = lignes.find(ligne => ligne[0] === utilisateur);
                if (utilisateurTrouve) {
                    resolve(utilisateurTrouve[16]); // L'index 16 correspond à la colonne du type d'abonnement dans user.csv
                } else {
                    reject("Utilisateur non trouvé");
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

 getTypeAbonnement(utilisateurConnecte)
        .then(typeAbonnement => {
            if (typeAbonnement === "basic") {
                document.getElementById('message').style.display = "none";
                document.getElementById('sendMessageButton').style.display = "none";
                document.getElementById('subscriptionMessage').style.display = "block";
            }
        })
        .catch(error => {
            console.error("Erreur lors de la récupération du type d'abonnement :", error);
        });

function chargerAmis() {
    fetch('amis.csv')
        .then(response => response.text())
        .then(data => {
            const amis = data.split('\n').map(line => line.split(','));
            const userAmis = amis.filter(relation => relation.includes(currentUser));
            const userFriends = userAmis.map(relation => {
                return relation[0] === currentUser ? relation[1] : relation[0];
            });
            afficherAmis(userFriends);
        })
        .catch(error => {
            console.error('Erreur lors du chargement des amis :', error);
        });
}

// Fonction pour afficher les amis dans le champ de recherche du destinataire
function afficherAmis(amis) {
    const recipientInput = document.getElementById('recipient');
    recipientInput.addEventListener('input', function() {
        const input = this.value.toLowerCase();
        const suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = '';

        if (input) {
            const filteredFriends = amis.filter(friend => friend.toLowerCase().includes(input));
            filteredFriends.forEach(friend => {
                const div = document.createElement('div');
                div.textContent = friend;
                div.addEventListener('click', function() {
                    document.getElementById('recipient').value = friend;
                    suggestions.innerHTML = '';
                });
                suggestions.appendChild(div);
            });
        }
    });
}

// Définir l'utilisateur actuel (à remplacer par la manière dont vous stockez l'utilisateur actuellement connecté)
const currentUser = "Alice"; // Par exemple, en dur pour les besoins de la démo

// Charger la liste des amis une fois que la page est chargée
document.addEventListener('DOMContentLoaded', chargerAmis);
