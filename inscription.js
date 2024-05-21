function countCharacters(event) {
    var maxLength = 200;
    var currentLength = event.target.value.length;
    var caracteresElement = document.querySelector('.caracteres');
    caracteresElement.textContent = currentLength + '/' + maxLength + ' caractères';
    
    if (currentLength > maxLength) {
        caracteresElement.style.color = 'red'; // Optionnel: changer la couleur du texte lorsque la limite est atteinte
    } 
    else {
        caracteresElement.style.color = '#888'; // Réinitialiser la couleur si le nombre de caractères est inférieur à la limite
    }
}

function validateForm() {
    var maxLength = 200;
    var currentLength = document.getElementById('situation_amoureuse').value.length;
    if (currentLength > maxLength) {
        alert('La limite de caractères a été dépassée pour la situation amoureuse.');
        return false; // Annuler l'envoi du formulaire si la limite est dépassée
    }
    return true; // Permettre l'envoi du formulaire si la limite n'est pas dépassée
}

function displaySelectedPhotos() {
    var selectedPhotosDiv = document.getElementById('selected-photos');
    selectedPhotosDiv.innerHTML = ''; // Clear previous selected photos

    var files = document.getElementById('photos').files;
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /^image\//;

        if (!imageType.test(file.type)) {
            continue; // Skip non-image files
        }

        var img = document.createElement('img');
        img.classList.add('selected-photo');
        img.file = file;
        selectedPhotosDiv.appendChild(img);

        var reader = new FileReader();
        reader.onload = (function(aImg) {
            return function(e) {
                aImg.src = e.target.result;
            };
        })(img);
        reader.readAsDataURL(file);
    }
}


function validatePassword() {
    var password = document.getElementById("mot_de_passe").value.trim();
    var confirmPassword = document.getElementById("confirm_mot_de_passe").value.trim();
    var passwordError = document.getElementById("password_error");

    // Vérifie si les champs du mot de passe et de sa confirmation sont vides
    if (password === "" || confirmPassword === "") {
        passwordError.textContent = "Veuillez saisir votre mot de passe et le confirmer.";
        return false;
    }

    // Vérifier si les mots de passe correspondent
    if (password !== confirmPassword) {
        passwordError.textContent = "Les mots de passe ne correspondent pas. Veuillez réessayer.";
        return false;
    }

    // Vérifier la complexité du mot de passe
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{12,27}$/;
    
    if (!passwordRegex.test(password)) {
        passwordError.innerHTML = `Le mot de passe doit contenir au moins :<br>- un chiffre,<br>- une lettre minuscule,<br>- une lettre majuscule,<br>- un caractère spécial,<br>- une longueur entre 12 et 27 caractères.`;
        return false;
    }
    passwordError.textContent = ""; // Efface le message d'erreur s'il n'y a pas d'erreur
    return true;
}

function validateSection3() {
    const couleurCheveux = document.getElementById('couleur_cheveux').value;
    const couleurYeux = document.getElementById('couleur_yeux').value;
    const hobbies = document.getElementById('hobbies').value;
    const sports = document.getElementById('sports').value;

    if (couleurCheveux === 'couleur_cheveux' || couleurYeux === 'couleur_yeux' || hobbies === 'hobbies' || sports === 'sports') {
        return false; // Retourne false pour indiquer que la validation a échoué
    }
    return true; // Retourne true si tous les champs requis sont remplis
}

// Initialisation de la première section
let currentSection = 1;
const sections = document.getElementsByClassName('section');

function nextSection() {
    // Valider le pseudonyme
    var pseudonyme = document.getElementById("pseudonyme").value;
    if (pseudonyme.trim() === "") {
        alert("Veuillez saisir un pseudonyme.");
        return; // Arrêter la fonction si le pseudonyme est vide
    }

    // Valider l'âge
    var age = parseInt(document.getElementById("age").value);
    if (isNaN(age) || age < 18 || age > 100) {
        alert("Veuillez saisir un âge valide entre 18 et 100 ans.");
        return; // Arrêter la fonction si l'âge n'est pas valide
    }
    
    // Valider la date de naissance si elle est saisie
    var dateNaissance = document.getElementById("date_naissance").value;
    if (dateNaissance.trim() !== "") {
        var selectedDate = new Date(dateNaissance);
        var minDate = new Date("1924-01-01");
        var maxDate = new Date("2006-12-31");

        if (selectedDate < minDate || selectedDate > maxDate) {
            alert("Veuillez sélectionner une date de naissance valide entre le 01/01/1924 et le 31/12/2006.");
            return; // Arrêter la fonction si la date n'est pas valide
        }
    } 
    else {
        // Si la date de naissance n'est pas saisie, afficher un message et arrêter la fonction
        alert("Veuillez saisir votre date de naissance.");
        return;
    }

    // Valide le formulaire avant de passer à la section suivante
    if (currentSection === 2 && !validateForm()) return; // Valide le formulaire de la première section
    
    if (currentSection === 3){
    // Valider la taille
      var taille = document.getElementById("taille").value.trim();
      if (taille === "") {
          alert("Veuillez saisir votre taille.");
          return; // Arrêter la fonction si la taille n'est pas saisie
      }
      taille = parseInt(taille);
      if (isNaN(taille) || taille < 100 || taille > 250) {
          alert("Veuillez saisir une taille valide entre 100 et 250 cm.");
          return; // Arrêter la fonction si la taille n'est pas valide
      }

      // Valider le poids
      var poids = document.getElementById("poids").value.trim();
      if (poids === "") {
          alert("Veuillez saisir votre poids.");
          return; // Arrêter la fonction si le poids n'est pas saisi
      }
      poids = parseInt(poids);
      if (isNaN(poids) || poids < 20 || poids > 300) {
          alert("Veuillez saisir un poids valide entre 20 et 300 kg.");
          return; // Arrêter la fonction si le poids n'est pas valide
      }

      // Valide les options de sélection avant de passer à la section suivante
      if (!validateSection3()) {
        alert('Veuillez sélectionner une option valide pour toutes les listes déroulantes.');
        return;
    }
    }
    
    if (currentSection === 4 && !validatePassword()) return; // Valide le mot de passe lors du passage à la quatrième section
        currentSection++;

    // Passe à la section suivante
    var currentSectionElement = document.querySelector(".section:not([style='display: none;'])");
    currentSectionElement.style.display = 'none'; // Masque la section actuelle
    var nextSection = currentSectionElement.nextElementSibling;
    if (nextSection) {
        nextSection.style.display = 'block'; // Affiche la section suivante
    } 
    else {
        document.getElementById('submitBtn').style.display = 'block'; // Affiche le bouton de soumission
    }
}

function prevSection() {
    if (currentSection === 1) return; // Arrête la fonction si nous sommes déjà à la première section
    sections[currentSection - 1].style.display = 'none'; // Masque la section actuelle
    currentSection--; // Décrémente la section actuelle
    sections[currentSection - 1].style.display = 'block'; // Affiche la section précédente
}


document.addEventListener('DOMContentLoaded', function() {
    const connexionLink = document.getElementById('connexionlink');
    const connexionForm = document.getElementById('connexionform');
    const body = document.querySelector('body');

    // Lorsque le formulaire de connexion est affiché
    connexionLink.addEventListener('click', function(event) {
        event.preventDefault();
        connexionForm.style.display = 'block'; // Affiche le formulaire de connexion
        body.classList.add('overlay-active'); // Ajoute la classe pour assombrir l'arrière-plan
        document.getElementById('inscription').style.display = 'none'; // Masque la zone d'inscription
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

                    // Vérifie si la réponse du serveur contient une redirection
                    if (xhr.responseText.trim() === "Mot de passe incorrect." || xhr.responseText.trim() === "Identifiant non trouvé." || xhr.responseText.trim() === "Erreur: La ligne ne contient pas suffisamment de colonnes." || xhr.responseText.trim() === "Erreur: Impossible d'ouvrir le fichier CSV.") {
                        console.log("Affichage de la réponse du serveur dans le div erreurMessage"); // Message de débogage

                        // Affiche la réponse du serveur dans le div d'erreurMessage
                        document.getElementById("erreurMessage").innerHTML = xhr.responseText;
                    } else {
                        console.log("Redirection vers la page d'accueil"); // Message de débogage

                        // Redirige vers la page d'accueil après connexion réussie
                        window.location.href = "acceuilapresconnecte.html";
                    }
                } else {
                    // Affiche une erreur générique si le statut HTTP n'est pas 200
                    console.log("Erreur HTTP: " + xhr.status); // Message de débogage
                    document.getElementById("erreurMessage").innerHTML = "Une erreur s'est produite.";
                }
            }
        };
        xhr.send(formData);
    });
});





function toggleConfirmPasswordVisibility() {
    var confirmPasswordInput1 = document.getElementById("mot_de_passe");
    var confirmPasswordInput2 = document.getElementById("confirm_mot_de_passe");
    var checkbox = document.getElementById("showConfirmPasswordCheckbox");

    if (checkbox.checked) {
        confirmPasswordInput1.type = "text";
        confirmPasswordInput2.type = "text";
    } 
    else {
        confirmPasswordInput1.type = "password";
        confirmPasswordInput2.type = "password";
    }

}


var pseudonymeInput = document.getElementById("pseudonyme");

function verifierPseudonyme() {
    var pseudonyme = pseudonymeInput.value;

    fetch('csv/user.csv')
        .then(response => response.text())
        .then(data => {
            const lignes = data.split('\n');
            for (let i = 0; i < lignes.length; i++) {
                const colonnes = lignes[i].split(',');
                const pseudoExistant = colonnes[0].trim();

                if (pseudoExistant === pseudonyme) {
                    document.getElementById('messagePseudonyme').innerText = "Ce pseudonyme est déjà utilisé. Veuillez en choisir un autre.";
                    return; // Arrêter la vérification
                }
            }
            
            // Si le pseudonyme n'existe pas encore, effacer le message d'erreur
            document.getElementById('messagePseudonyme').innerText = "";
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération du fichier CSV :', error);
            document.getElementById('messagePseudonyme').innerText = "Une erreur s'est produite lors de la vérification du pseudonyme. Veuillez réessayer.";
        });
}

pseudonymeInput.addEventListener('blur', verifierPseudonyme);
