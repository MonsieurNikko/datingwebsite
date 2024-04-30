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

