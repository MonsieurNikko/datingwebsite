/*
document.addEventListener("DOMContentLoaded", function() {
    var loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(event) {
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            event.preventDefault(); // Empêche l'envoi du formulaire
            alert("Votre mot de passe n'est pas confirmé. Veuillez réessayer.");
        }
    });
});
*/

function countCharacters(event) {
    var maxLength = 200;
    var currentLength = event.target.value.length;
    var caracteresElement = document.querySelector('.caracteres');
    caracteresElement.textContent = currentLength + '/' + maxLength + ' caractères';
    
    if (currentLength > maxLength) {
        caracteresElement.style.color = 'red'; // Optionnel: changer la couleur du texte lorsque la limite est atteinte
    } else {
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
            continue;
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

function validateMdp() {
    var password = document.getElementById("mot_de_passe").value;
    var confirmPassword = document.getElementById("confirm_mot_de_passe").value;

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas. Veuillez réessayer.");
        return false;
    }
    return true;
}
