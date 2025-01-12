document.getElementById('formCadastro').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Captura os valores dos campos
    const loja = {
        numeroloja: document.getElementById('numero_loja').value,
        nome: document.getElementById('nome').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        horario_funcionamento: document.getElementById('funcionamento').value,
        cnpj: document.getElementById('cnpj').value
    };

    // Verifica campos obrigatórios
    if (loja.numeroloja && loja.nome && loja.endereco && loja.cidade && loja.telefone && loja.email && loja.cnpj) {
        fetch('/api/lojas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loja),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(err => {
                        throw new Error(err);
                    });
                }
                return response.text();
            })
            .then(() =>{
                exibirMensagem('Loja cadastrada com sucesso.', 'sucesso');
                setTimeout(() => {
                    window.location.href = '/cadastro-lojas'; // Redireciona após 3s
                }, 3000);
            })
            .catch(error => {
                exibirMensagem( 'erro ao cadastrar loja');
            });
    } else {
        exibirMensagem('Preencha todos os campos obrigatórios.', 'erro');
    }
});

function exibirMensagem(mensagem, tipo) {
    const mensagemDiv = document.getElementById('mensagem');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = 'mensagem ' + tipo;
    mensagemDiv.style.display = 'block';
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);
}
