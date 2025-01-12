document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('user'); // Remove os dados do usuário
    window.location.href = '/'; // Redireciona para a tela de login
});
