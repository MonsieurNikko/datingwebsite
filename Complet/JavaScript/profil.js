function validatePassword() {
    var password = document.getElementById("motDePasseInput").value.trim(); // Mettez à jour l'ID du champ mot de passe
    var confirmPassword = document.getElementById("confirmmotdepasseInput").value.trim(); // Mettez à jour l'ID du champ de confirmation du mot de passe
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

function toggleConfirmPasswordVisibility() {
    var confirmPasswordInput1 = document.getElementById("motDePasseInput");
    var confirmPasswordInput2 = document.getElementById("confirmmotdepasseInput");
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