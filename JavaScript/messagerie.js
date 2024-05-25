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

// Fonction pour charger la liste des utilisateurs inscrits
async function chargerUtilisateursInscrits() {
    console.log("Chargement des utilisateurs inscrits");

    try {
        const response = await fetch('../csv/user.csv');
        const data = await response.text();
        const lignes = data.split('\n').map(ligne => ligne.split(',').map(item => item.trim()));
        const utilisateurs = lignes.map(ligne => ligne[0]); // Récupère les utilisateurs dans la première colonne
        return utilisateurs;
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs inscrits :', error);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Affichage des utilisateurs inscrits");

    const utilisateurs = await chargerUtilisateursInscrits();

    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');

    recipientInput.addEventListener('input', debounce(function() {
        const searchTerm = recipientInput.value.trim().toLowerCase();
        const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
            utilisateur.toLowerCase().includes(searchTerm)
        );

        if (filteredUtilisateurs.length === 0) {
            suggestions.innerHTML = '<div>Aucun résultat trouvé</div>';
        } else {
            afficherSuggestionsUtilisateurs(filteredUtilisateurs);
        }
    }, 300)); // Délai de debounce de 300ms
});

// Fonction pour afficher les suggestions d'utilisateurs lors de la recherche
function afficherSuggestionsUtilisateurs(utilisateurs) {
    console.log("Affichage des suggestions d'utilisateurs :", utilisateurs);
    const recipientInput = document.getElementById('recipient');
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    utilisateurs.forEach(utilisateur => {
        const div = document.createElement('div');
        div.textContent = utilisateur;
        div.classList.add('suggestion-item');
        div.addEventListener('click', function() {
            recipientInput.value = utilisateur;
            suggestions.innerHTML = '';
            document.getElementById('message').disabled = false;
        });
        suggestions.appendChild(div);
    });
}

// Fonction pour vérifier le destinataire lors de la soumission du formulaire
document.getElementById('newConversationForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const recipient = document.getElementById('recipient').value.trim();
    if (recipient !== '') {
        checkRecipient(recipient);
    } else {
        alert('Veuillez sélectionner un destinataire.');
    }
});

// Fonction pour vérifier si le destinataire existe
function checkRecipient(recipient) {
    chargerUtilisateursInscrits()
        .then(utilisateurs => {
            if (utilisateurs.includes(recipient)) {
                window.location.href = `../PHP/messagerie_privee.php?recipient=${encodeURIComponent(recipient)}`;
            } else {
                alert('Utilisateur introuvable.');
            }
        })
        .catch(error => {
            console.error('Erreur lors de la vérification du destinataire :', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
}

// Fonction pour gérer l'événement lorsque l'utilisateur appuie sur la touche "Entrée"
document.getElementById('recipient').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le comportement par défaut de la touche "Entrée" dans le formulaire

        const recipient = this.value.trim(); // Récupère la valeur du destinataire
        if (recipient !== '') {
            // Redirige vers l'interface de messagerie privée avec le destinataire spécifié
            window.location.href = `messagerie_privee.html?recipient=${encodeURIComponent(recipient)}`;
        } else {
            // Affiche un message d'erreur si aucun destinataire n'est spécifié
            alert('Veuillez saisir un destinataire.');
        }
    }
});
