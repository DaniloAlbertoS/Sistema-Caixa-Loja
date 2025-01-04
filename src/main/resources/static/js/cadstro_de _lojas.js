document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Captura os valores dos campos
    const numero_loja = document.getElementById('numero_loja').value;
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const cidade = document.getElementById('cidade').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const funcionamento = document.getElementById('funcionamento').value;
    const cnpj = document.getElementById('cnpj').value;

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (numero_loja && nome && endereco && cidade && telefone && email && cnpj) {
        try {
           
            fetch('/api/cadastrar-loja', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    numero_loja: numero_loja,
                    nome: nome,
                    endereco: endereco,
                    cidade: cidade,
                    telefone: telefone,
                    email: email,
                    funcionamento: funcionamento,
                    cnpj: cnpj,
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Cadastro bem-sucedido
                    mostrarMensagem('Loja cadastrada com sucesso!', 'sucesso');

                    
                    setTimeout(function() {
                        window.location.href = 'listar_lojas.html';  
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
    const mensagemDiv = document.createElement('div');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = 'mensagem ' + tipo; 
    document.body.appendChild(mensagemDiv);  
    mensagemDiv.style.display = 'block'; // Exibe a mensagem

    // Remover a mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);
}
