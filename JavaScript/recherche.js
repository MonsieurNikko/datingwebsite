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
const utilisateursInterdits = ["admin", "admin2", "admin3", "admin4"];

async function chargerUtilisateursInscrits() {
    try {
        const response = await fetch('../csv/user.csv');
        const data = await response.text();
        const lignes = data.split('\n').map(ligne => ligne.split(',').map(item => item.trim()));
        utilisateurs = lignes.map(ligne => ligne[0]).filter(utilisateur => !utilisateursInterdits.includes(utilisateur));

        // Ajoutez cette ligne pour afficher les utilisateurs chargés
        console.log('Utilisateurs chargés :', utilisateurs);
    } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs inscrits :', error);
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await chargerUtilisateursInscrits();

    const searchInput = document.getElementById('search');
    const suggestions = document.getElementById('suggestions');

    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredUtilisateurs = utilisateurs.filter(utilisateur =>
            utilisateur.toLowerCase().includes(searchTerm)
        );

        if (filteredUtilisateurs.length === 0) {
            suggestions.innerHTML = '<div>Aucun résultat trouvé</div>';
        } else {
            afficherSuggestionsUtilisateurs(filteredUtilisateurs);
        }
    }, 300));

    searchInput.addEventListener('keypress', async function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const recipient = this.value.trim();

            const isRecipientValid = utilisateurs.includes(recipient);

            if (recipient !== '') {
                if (!isRecipientValid) {
                    afficherMessage("Profil introuvable parmi les utilisateurs inscrits.");
                } else {
                    const formData = new FormData();
                    formData.append('pseudo', recipient);

                    const response = await fetch('../autreprofil/autreprofil.php', {
                        method: 'POST',
                        body: formData
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        console.log("Données du profil :", userData);

                        localStorage.setItem('userProfile', JSON.stringify(userData));

                        window.location.href = '../autreprofil/autreprofil.html';
                    } else {
                        const errorData = await response.json();
                        afficherMessage(errorData.message || "Erreur lors de la récupération du profil.");
                    }
                }
            } else {
                afficherMessage('Veuillez saisir un profil à rechercher.');
            }
        }
    });
});

function afficherSuggestionsUtilisateurs(utilisateurs) {
    const searchInput = document.getElementById('search');
    const suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = '';

    utilisateurs.forEach(utilisateur => {
        const div = document.createElement('div');
        div.textContent = utilisateur;
        div.classList.add('suggestion-item');
        div.addEventListener('click', async function() {
            searchInput.value = utilisateur;
            suggestions.innerHTML = '';

            const formData = new FormData();
            formData.append('pseudo', utilisateur);

            try {
                const response = await fetch('../autreprofil/autreprofil.php', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log("Données du profil :", userData);

                    localStorage.setItem('userProfile', JSON.stringify(userData));

                    window.location.href = '../autreprofil/autreprofil.html';
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Erreur lors de la récupération du profil.");
                }
            } catch (error) {
                afficherMessage(error.message || "Erreur lors de la récupération du profil.");
            }
        });
        suggestions.appendChild(div);
    });
}

function afficherMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
}
