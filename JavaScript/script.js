document.addEventListener('DOMContentLoaded', function() {
    const connexionLink = document.getElementById('connexionlink');
    const connexionForm = document.getElementById('connexionform');
    const body = document.querySelector('body');

    connexionLink.addEventListener('click', function(event) {
        event.preventDefault();
        connexionForm.style.display = 'block';
        body.classList.add('overlay-active');
        document.getElementById('intro').style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("connexionForm").addEventListener("submit", function(event) {
        event.preventDefault();
        
        var formData = new FormData(this);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../PHP/connexion.php", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    window.location.href = "../HTML/accueil_apres_connexion.html";
                } 
                else if (xhr.status === 401) {
                    document.getElementById("erreurMessage").innerHTML = xhr.responseText;
                } 
                else {
                    document.getElementById("erreurMessage").innerHTML = "Une erreur s'est produite.";
                }
            }
        };
        xhr.send(formData);
    });
});
