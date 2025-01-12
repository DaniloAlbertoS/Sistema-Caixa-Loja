/*document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const message = await response.text();
        alert(message);

        if (message.includes('financeiro')) {
            window.location.href = '/menu-financeiro';
        } else if (message.includes('gerência')) {
            window.location.href = '/menu-gerencia';
        }
    } else {
        alert('Usuário não encontrado ou senha incorreta.');
    }
});*/

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const matricula = document.getElementById('matricula').value;
        const cpf = document.getElementById('cpf').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matricula, cpf }), // Envia os dados como JSON
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer login. Verifique suas credenciais.');
            }

            const userData = await response.json();
            console.log('Usuário logado:', userData);

            // Salva os dados do usuário no localStorage
            localStorage.setItem('user', JSON.stringify(userData));

            // Redireciona para a página correta
            if (userData.tipoUsuario === 'Financeiro') {
                window.location.href = '/tela-financeiro';
            } else if (userData.tipoUsuario === 'Gerencia') {
                window.location.href = '/menu-gerencia';
            } else {
                alert('Tipo de usuário desconhecido.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
            alert(error.message);
        }
    });
});





