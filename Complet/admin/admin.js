document.addEventListener('DOMContentLoaded', function() {
    console.log('Le DOM est chargé.');
    // Charger les utilisateurs
    fetch('get_users.php')
    .then(response => response.json())
    .then(data => {
        console.log('Données des utilisateurs reçues :', data);
        if (data.error) {
            console.error('Erreur lors du chargement des utilisateurs :', data.error);
        } else {
            const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
            
            data.forEach(user => {
                const row = userTable.insertRow();
                for (const key in user) {
                    const cell = row.insertCell();
                    if (key === 'photo') {
                        const img = document.createElement('img');
                        img.src = user[key];
                        img.alt = 'Photo de profil';
                        img.width = 50; // Ajuster la taille de l'image selon les besoins
                        cell.appendChild(img);
                        console.log('Clé:', key);
                    } else {
                        cell.textContent = user[key];
                        console.log('Clé:', key);
                    }
                }
                
                const editButton = document.createElement('button');
                editButton.textContent = 'Modifier';
                editButton.addEventListener('click', function() {
                    openEditForm(user);
                });
                row.insertCell().appendChild(editButton);

                const actionCell = row.insertCell();
                const banButton = document.createElement('button');
                banButton.textContent = 'Bannir';
                banButton.addEventListener('click', () => {
                    console.log('Bouton "Bannir" cliqué pour l\'utilisateur', user.pseudo);
                    adminAction(user.pseudo, 'ban_user');
                });
                actionCell.appendChild(banButton);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.addEventListener('click', () => {
                    console.log('Bouton "Supprimer" cliqué pour l\'utilisateur', user.pseudo);
                    adminAction(user.pseudo, 'delete_user');
                });
                actionCell.appendChild(deleteButton);
            });
        }
    })
    .catch(error => console.error('Error:', error));

    function hideEditForm() {
        document.getElementById('modifierProfilModal').style.display = 'none';
    }
    
    document.getElementById('closeForm').addEventListener('click', hideEditForm);


    
    function openEditForm(user) {
        // Remplir les champs du formulaire avec les données de l'utilisateur
        document.getElementById('pseudonymeID').value = user.pseudo;
        document.getElementById('ageInput').value = user.age;
        document.getElementById('sexeInput').value = user.sexe;
        document.getElementById('dateNaissanceInput').value = user.date_naissance;
        document.getElementById('paysInput').value = user.pays;
        document.getElementById('descriptionInput').value = user.description;
        document.getElementById('tailleInput').value = user.taille;
        document.getElementById('poidsInput').value = user.poids;
        document.getElementById('couleurCheveuxInput').value = user.couleur_cheveux;
        document.getElementById('interet1Input').value = user.interets;
        document.getElementById('sportInput').value = user.sports;
        const userImage = document.getElementById('image');
        userImage.src = user.photo;
        document.getElementById('nomCompletInput').value = user.nom;
        document.getElementById('adresseInput').value = user.adresse;
        document.getElementById('motDePasseInput').value = user.mot_de_passe;
        
        document.getElementById('modifierProfilModal').style.display = 'block';
    }
    
    

    function adminAction(pseudo, action) {
        var xhr = new XMLHttpRequest();
        var url = 'admin_action.php';

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // Traitement de la réponse
                    var response = JSON.parse(xhr.responseText);
                    console.log(response);
                } else {
                    console.error('Erreur de requête :', xhr.status);
                }
            }
        };

        var data = JSON.stringify({ action: action, pseudo: pseudo });
        xhr.send(data);
    }

    document.getElementById("modifierProfilForm").onsubmit = function(event) {
        event.preventDefault();
        console.log("Formulaire de modification soumis"); // Message de débogage

        var formData = new FormData(event.target);
        console.log("Données du formulaire :", formData); // Message de débogage

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../PHP/modifprofil.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                console.log("Réponse du serveur reçue"); // Message de débogage

                if (xhr.status === 200) {
                    console.log("Statut de la requête : 200 OK"); // Message de débogage

                    var response;
                    try {
                        response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        console.error("Erreur lors de l'analyse de la réponse JSON :", e);
                        return;
                    }

                    console.log("Réponse du serveur :", response); // Message de débogage

                    document.getElementById("erreurMessage").innerText = response.success ? response.success : response.error;
                    if (response.success) {
                        console.log("Modification du profil réussie"); // Message de débogage

                        modal.style.display = "none";
                        loadProfileData(); // Recharger les données du profil après modification
                    }
                } else {
                    console.error("Erreur de modification du profil."); // Message d'erreur
                    document.getElementById("erreurMessage").innerText = "Erreur de modification du profil.";
                }
            }
        };
        xhr.send(formData);
    };

});