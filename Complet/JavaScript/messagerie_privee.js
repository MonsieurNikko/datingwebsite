document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const recipient = params.get('recipient');

    // Utiliser le nom d'utilisateur du destinataire pour configurer l'interface de messagerie
    document.getElementById('recipient-display').textContent = `Messagerie avec : ${recipient}`;
});



