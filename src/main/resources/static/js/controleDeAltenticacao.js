document.addEventListener('DOMContentLoaded', () => {
    // Verifica se o usuário está logado
    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '/'; // Redireciona para a tela de login
        return; // Para evitar executar o restante do código
    }

    // Configura o tempo máximo de inatividade (10 minutos)
    let timeout;

    // Função para redirecionar após inatividade
    const redirecionarPorInatividade = () => {
        alert('Sessão expirada. Você será redirecionado para a tela de login.');
        localStorage.removeItem('user'); // Remove os dados do usuário do localStorage
        window.location.href = '/'; // Redireciona para a tela de login
    };

    // Função para reiniciar o cronômetro de inatividade
    const reiniciarCronometro = () => {
        clearTimeout(timeout); // Limpa o cronômetro anterior
        timeout = setTimeout(redirecionarPorInatividade, 1 * 60 * 1000); // 10 minutos
    };

    // Adiciona eventos para detectar atividades do usuário
    ['mousemove', 'keydown', 'click'].forEach(event => {
        window.addEventListener(event, reiniciarCronometro);
    });

    // Inicia o cronômetro de inatividade
    reiniciarCronometro();
});
