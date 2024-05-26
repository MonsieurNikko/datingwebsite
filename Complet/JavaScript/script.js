document.addEventListener('DOMContentLoaded', function() {
    const connexionLink = document.getElementById('connexionlink');
    const connexionForm = document.getElementById('connexionform');
    const body = document.querySelector('body');

    // Lorsque le formulaire de connexion est affiché
    connexionLink.addEventListener('click', function(event) {
        event.preventDefault();
        connexionForm.style.display = 'block'; // Affiche le formulaire de connexion
        body.classList.add('overlay-active'); // Ajoute la classe pour assombrir l'arrière-plan
        document.getElementById('intro').style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("connexionForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Empêche l'envoi du formulaire par défaut
        
        var formData = new FormData(this); // Récupère les données du formulaire

        // Envoie des données du formulaire à connexion.php via une requête AJAX
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../PHP/connexion.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                // Vérifiez si le statut HTTP est 200 (OK)
                if (xhr.status === 200) {
                    // Redirige vers la page d'accueil après connexion réussie
                    window.location.href = "../HTML/accueil_apres_connexion.html";
                } 
                else if (xhr.status === 401) {
                    // Affiche la réponse du serveur dans le div d'erreurMessage
                    document.getElementById("erreurMessage").innerHTML = xhr.responseText;
                } 
                else {
                    // Le traitement pour les autres erreurs HTTP
                    document.getElementById("erreurMessage").innerHTML = "Une erreur s'est produite.";
                }
            }
        };
        xhr.send(formData);
    });
});
