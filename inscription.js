// Sélectionnez l'élément de l'introduction
const introduction = document.getElementById('introduction');

// Définissez le point de déclenchement (par exemple, 1000 pixels de défilement)
const triggerPoint = 1000;

// Fonction pour vérifier le défilement
function checkScroll() {
    if (window.scrollY > triggerPoint) {
        // Ajoutez la classe "visible" pour afficher l'introduction
        introduction.classList.add('visible');
    } else {
        // Retirez la classe "visible" pour cacher l'introduction
        introduction.classList.remove('visible');
    }
}

// Ajoutez un écouteur d'événement de défilement
window.addEventListener('scroll', checkScroll);


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

        var formData = new FormData(this); // Récupère les données du formulaire

        // Envoie des données du formulaire à connexion.php via une requête AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "connexion.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Vérifiez si le statut HTTP est 200 (OK)
                if (xhr.status === 200) {
                    // Affiche la réponse du serveur dans le div d'erreurMessage
                    document.getElementById("erreurMessage").innerHTML = xhr.responseText;
                } else {
                    // Affiche une erreur générique si le statut HTTP n'est pas 200
                    document.getElementById("erreurMessage").innerHTML = "Une erreur s'est produite.";
                }
            }
        };
        xhr.send(formData);
    });
});


const header = document.querySelector('header');

let prevscroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentscroll = window.scrollY;

    if (currentscroll > prevscroll){
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }

    prevscroll = currentscroll;
});




let image = document.getElementById('userImage');
let images = ['imagevisiteur.png', 'imagevisiteur2.png', 'imagevisiteur3.png', 'imagevisiteur4.png'];
let currentIndex = 0;

function changeImage() {
    // Réduit l'opacité de l'image à zéro pour l'effet de transition sortant
    image.style.opacity = 0;

    // Utilise setTimeout pour changer l'image et remonter l'opacité après un court délai
    setTimeout(() => {
        // Change l'image source
        image.src = images[currentIndex];
        
        // Remonte l'opacité à 1 pour l'effet de transition entrant
        image.style.opacity = 1;

        // Met à jour l'index pour la prochaine image
        currentIndex = (currentIndex + 1) % images.length;
    }, 500); // Délai égal à la durée de la transition d'opacité
}

// Appelle changeImage toutes les 1600 ms
setInterval(changeImage, 3000);
