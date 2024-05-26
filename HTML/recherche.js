<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche d'utilisateurs</title>
    <style>
        .suggestion-item {
            cursor: pointer;
            padding: 5px;
            border-bottom: 1px solid #ccc;
        }
        .suggestion-item:hover {
            background-color: #f0f0f0;
        }
        #message {
            display: none;
            color: red;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div>
        <h1>Recherche d'utilisateurs</h1>
        <input type="text" id="search" placeholder="Rechercher un utilisateur">
        <div id="suggestions"></div>
        <div id="message"></div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>

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
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs inscrits :', error);
        }
    }

    chargerUtilisateursInscrits();

    document.addEventListener('DOMContentLoaded', async () => {
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

                    window.location.href = '../HTML/autreprofil.html';
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

    </script>
</body>
</html>
