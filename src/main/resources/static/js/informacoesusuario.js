document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('user-name');
    const userMatSpan = document.getElementById('user-mat');

    // Recuperar dados do usuário do localStorage
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
        userNameSpan.textContent = userData.nome || 'Desconhecido';
        userMatSpan.textContent = userData.matricula || 'Não informado';
    } else {
        alert('Usuário não logado. Redirecionando para a tela de login.');
        window.location.href = '/';
    }
});
