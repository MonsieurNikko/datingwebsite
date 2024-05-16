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
        passwordError.innerHTML = `Le mot de passe doit contenir au moins :<br>- un chiffre,<br>- une lettre minuscule,<br>- une lettre majuscule,<br>- une longueur entre 12 et 27 caractères.`;
        return false;
    }
    
    

    passwordError.textContent = ""; // Efface le message d'erreur s'il n'y a pas d'erreur
    return true;
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
