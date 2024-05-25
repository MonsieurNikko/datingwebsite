$(document).ready(function() {
    function updateUsername() {
        $.ajax({
            url: '../PHP/check_login.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                console.log(response); // Pour déboguer la réponse AJAX
                if (response.status === 'success') {
                    $('#username-display').text('Connecté en tant que ' + response.username);
                } else {
                    $('#username-display').text('');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur AJAX:', textStatus, errorThrown); // Pour déboguer les erreurs AJAX
                console.log('Response:', jqXHR.responseText); // Afficher la réponse brute pour le débogage
            }
        });
    }

    updateUsername();
});

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

// Déclarer la variable utilisateurs en dehors de la fonction chargerUtilisateursInscrits
let utilisateurs = [];

// Fonction pour charger la liste des utilisateurs inscrits
async function chargerUtilisateursInscrits() {
    console.log("Chargement des utilisateurs inscrits");

    try {
        const response = await fetch('../csv/user.csv');
        const data = await response.text();
        const lignes = data.split('\n').map(ligne => ligne.split(',').map(item => item.trim()));
        utilisateurs = lignes.map(ligne => ligne[0]); // Mettre à jour la variable utilisateurs avec les données récupérées
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs inscrits :', error);
    }
}

// Appeler la fonction de chargement des utilisateurs inscrits
chargerUtilisateursInscrits();

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Affichage des utilisateurs inscrits");

    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');

    recipientInput.addEventListener('input', debounce(function() {
        const searchTerm = recipientInput.value.trim().toLowerCase();
        const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
            utilisateur.toLowerCase().includes(searchTerm) && utilisateur !== getUsername()
        );

        if (filteredUtilisateurs.length === 0) {
            suggestions.innerHTML = '<div>Aucun résultat trouvé</div>';
            // Désactiver l'événement de soumission du formulaire lorsque aucun résultat n'est trouvé
            document.getElementById('newConversationForm').removeEventListener('submit', handleFormSubmission);
        } else {
            afficherSuggestionsUtilisateurs(filteredUtilisateurs);
            // Activer l'événement de soumission du formulaire lorsque des résultats sont trouvés
            document.getElementById('newConversationForm').addEventListener('submit', handleFormSubmission);
        }
    }, 300)); // Délai de debounce de 300ms

    // Fonction pour gérer la soumission du formulaire
    function handleFormSubmission(event) {
        event.preventDefault();
        // Autres actions à effectuer lors de la soumission du formulaire
    }
});

// Fonction pour afficher les suggestions d'utilisateurs lors de la recherche
function afficherSuggestionsUtilisateurs(utilisateurs) {
    console.log("Affichage des suggestions d'utilisateurs :", utilisateurs);
    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    utilisateurs.forEach(utilisateur => {
        if (utilisateur !== getUsername()) { // Exclure le nom d'utilisateur actuel
            const div = document.createElement('div');
            div.textContent = utilisateur;
            div.classList.add('suggestion-item');
            div.addEventListener('click', function() {
                recipientInput.value = utilisateur;
                suggestions.innerHTML = '';
                document.getElementById('message').disabled = false;
            });
            suggestions.appendChild(div);
        }
    });
}

// Fonction pour récupérer le nom d'utilisateur connecté
async function getUsername() {
    try {
        const response = await $.ajax({
            url: '../PHP/pseudoactuel.php',
            method: 'GET',
            dataType: 'text'
        });

        console.log("Nom d'utilisateur récupéré :", response);
        return response;
    } catch (error) {
        console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération du nom d\'utilisateur');
    }
}



// Ajouter l'événement pour la touche "Entrée" une fois que le document est chargé
document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('recipient').addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée" dans le formulaire

            const recipient = this.value.trim(); // Récupère la valeur du destinataire
            console.log("Destinataire entré :", recipient);

            // Vérifie si le destinataire est dans la liste des utilisateurs inscrits
            const isRecipientValid = utilisateurs.includes(recipient);
            console.log("Destinataire valide :", isRecipientValid);

            try {
                var username = await getUsername();
                console.log("Username :", username);

                if (recipient !== '') {
                    if (recipient === username) {
                        alert("Vous ne pouvez pas vous envoyer un message à vous-même.");
                    } else if (!isRecipientValid) {
                        alert("Destinataire introuvable parmi les utilisateurs inscrits.");
                    } else {
                        // Redirige vers l'interface de messagerie privée avec le destinataire spécifié
                        window.location.href = `../HTML/messagerie_privee.html?recipient=${encodeURIComponent(recipient)}`;

                    }
                } else {
                    // Affiche un message d'erreur si aucun destinataire n'est spécifié
                    alert('Veuillez saisir un destinataire.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
                // Gérer l'erreur si la récupération du nom d'utilisateur échoue
            }
        }
    });
});

