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
                    if (xhr.responseText.trim() === "Mot de passe incorrect." || xhr.responseText.trim() === "Identifiant non trouvé.") {
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







