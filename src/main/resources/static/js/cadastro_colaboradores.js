document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário para processar a validação

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const cpf = document.getElementById('cpf').value;
    const matricula = document.getElementById('matricula').value;
    const situacao = document.getElementById('situacao').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (nome && cargo && cpf && matricula && situacao) {
        try {
           
            fetch('/api/cadastrar-colaborador', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    cargo: cargo,
                    cpf: cpf,
                    matricula: matricula,
                    situacao: situacao,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Cadastro bem-sucedido
                    mostrarMensagem('Cadastro efetuado com sucesso!', 'sucesso');

                    // Após 3 segundos, redireciona para a página "Meu Gerência"
                    setTimeout(function() {
                        window.location.href = 'tela_cadastro_colaboradores.html';  // Substitua pelo caminho correto da sua página
                    }, 3000);
                } else {
                    // Erro no cadastro
                    mostrarMensagem('Erro: ' + data.message, 'erro');
                }
            })
            .catch(error => {
                // Caso haja erro na requisição ou no banco de dados
                mostrarMensagem('Erro ao conectar com o banco de dados. Tente novamente mais tarde.', 'erro');
            });
        } catch (error) {
            // Captura erros de execução do código
            mostrarMensagem('Erro inesperado: ' + error.message, 'erro');
        }
    } else {
        // Erro no cadastro
        mostrarMensagem('Erro: Preencha todos os campos obrigatórios.', 'erro');
    }
});

// Função para exibir a mensagem
function mostrarMensagem(mensagem, tipo) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = 'mensagem ' + tipo; 
    mensagemDiv.style.display = 'block'; // Exibe a mensagem

    // Remover a mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000)
}
