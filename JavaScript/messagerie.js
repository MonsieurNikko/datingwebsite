$(document).ready(function() {
    function updateUsername() {
        $.ajax({
            url: '../PHP/check_login.php',
            method: 'GET',
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    $('#username-display').text('Connecté en tant que ' + response.username);
                } 
                else {
                    $('#username-display').text('');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Erreur AJAX:', textStatus, errorThrown);
                console.log('Response:', jqXHR.responseText);
            }
        });
    }
    updateUsername();
});

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

let utilisateurs = [];

async function chargerUtilisateursInscrits() {
    try {
        const response = await fetch('../csv/user.csv');
        const data = await response.text();
        const lignes = data.split('\n').map(ligne => ligne.split(',').map(item => item.trim()));
        utilisateurs = lignes.map(ligne => ligne[0]);
    } 
    catch (error) {
        console.error('Erreur lors du chargement des utilisateurs inscrits :', error);
    }
}

chargerUtilisateursInscrits();

document.addEventListener('DOMContentLoaded', async () => {
    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');

    recipientInput.addEventListener('input', debounce(function() {
        const searchTerm = recipientInput.value.trim().toLowerCase();
        const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
            utilisateur.toLowerCase().includes(searchTerm) && utilisateur !== getUsername()
        );

        if (filteredUtilisateurs.length === 0) {
            suggestions.innerHTML = '<div>Aucun résultat trouvé</div>';
            document.getElementById('newConversationForm').removeEventListener('submit', handleFormSubmission);
        } 
        else {
            afficherSuggestionsUtilisateurs(filteredUtilisateurs);
            document.getElementById('newConversationForm').addEventListener('submit', handleFormSubmission);
        }
    }, 300));

    function handleFormSubmission(event) {
        event.preventDefault();
    }
});

function afficherSuggestionsUtilisateurs(utilisateurs) {
    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    utilisateurs.forEach(utilisateur => {
        if (utilisateur !== getUsername()) {
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

async function getUsername() {
    try {
        const response = await $.ajax({
            url: '../PHP/pseudoactuel.php',
            method: 'GET',
            dataType: 'text'
        });

        console.log("Nom d'utilisateur récupéré :", response);
        return response;
    } 
    catch (error) {
        console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
        throw new Error('Erreur lors de la récupération du nom d\'utilisateur');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('recipient').addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const recipient = this.value.trim();

            const isRecipientValid = utilisateurs.includes(recipient);

            try {
                var username = await getUsername();

                if (recipient !== '') {
                    if (recipient === username) {
                        alert("Vous ne pouvez pas vous envoyer un message à vous-même.");
                    } 
                    else if (!isRecipientValid) {
                        alert("Destinataire introuvable parmi les utilisateurs inscrits.");
                    } 
                    else {
                        window.location.href = `../HTML/messagerie_privee.html?recipient=${encodeURIComponent(recipient)}`;
                    }
                } 
                else {
                    alert('Veuillez saisir un destinataire.');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
            }
        }
    });
});
