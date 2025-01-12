document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cargo = document.getElementById('cargo').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const matricula = document.getElementById('matricula').value.trim();
    const situacao = document.getElementById('situacao').value;

    // Define o tipo de usuário com base na URL
    const tipo = window.location.pathname.includes('financeiro') ? 'financeiro' : 'gerencia';

    if (nome && cargo && cpf && matricula && situacao) {
        fetch(`/api/usuarios/${tipo}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, cargo, cpf, matricula, situacao }),
        })
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    return response.text().then(errorMessage => {
                        throw new Error(errorMessage);
                    });
                }
            })
            .then(message => {
                mostrarMensagem(message, 'sucesso');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch(error => {
                mostrarMensagem(`Erro: ${error.message}`, 'erro');
            });
    } else {
        mostrarMensagem('Preencha todos os campos obrigatórios.', 'erro');
    }
});

function mostrarMensagem(mensagem, tipo) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = 'block';

    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);
}
