// Função para exibir mensagens ao usuário
function exibirMensagem(texto, sucesso = true) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    mensagem.style.color = sucesso ? 'green' : 'red';
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}


document.addEventListener('DOMContentLoaded', () => {
    const telefoneInput = document.getElementById('telefone');
    const cnpjInput = document.getElementById('cnpj');
    telefoneInput.setAttribute('pattern', '\\(\\d{2}\\) \\d{4,5}-\\d{4}');
    cnpjInput.setAttribute('pattern', '\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}');
});

// Evento para o botão Salvar
document.getElementById('btn-salvar').addEventListener('click', () => {
    const nome = document.getElementById('nome_loja').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;

    if (!nome || !endereco || !telefone) {
        exibirMensagem('Preencha todos os campos obrigatórios.', false);
        return;
    }

    // Fazer a atualização no back-end
    const lojaAtualizada = {
        nome: nome,
        endereco: endereco,
        telefone: telefone
    };

    
    fetch(`/api/lojas/${document.getElementById('id_loja').value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lojaAtualizada)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            exibirMensagem('Alterações realizadas com sucesso!');
        } else {
            exibirMensagem('Erro ao salvar as alterações.', false);
        }
    })
    .catch(error => {
        exibirMensagem('Erro ao conectar com o servidor.', false);
    });
});

// Evento para o botão Limpar
document.getElementById('btn-limpar').addEventListener('click', () => {
    document.querySelectorAll('.form input').forEach(input => input.value = '');
    exibirMensagem('Campos limpos com sucesso!');
});

// Evento para o botão Cancelar
document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.location.href = 'tela_financeiro.html';
});

// Evento para o botão Pesquisar
document.getElementById('btn-pesquisar').addEventListener('click', () => {
    const idPesquisado = document.getElementById('pesquisar_id').value;

    // Buscar loja no banco de dados
    fetch(`/api/lojas/${idPesquisado}`)
    .then(response => response.json())
    .then(data => {
        if (data && data.loja) {
            document.getElementById('id_loja').value = data.loja.id;
            document.getElementById('numero_loja').value = data.loja.numero;
            document.getElementById('nome_loja').value = data.loja.nome;
            document.getElementById('endereco').value = data.loja.endereco;
            document.getElementById('cidade').value = data.loja.cidade;
            document.getElementById('telefone').value = data.loja.telefone;
            document.getElementById('email').value = data.loja.email;
            document.getElementById('funcionamento').value = data.loja.funcionamento;
            document.getElementById('cnpj').value = data.loja.cnpj;
            exibirMensagem('Dados carregados com sucesso!');
        } else {
            exibirMensagem('Loja não encontrada.', false);
        }
    })
    .catch(error => {
        exibirMensagem('Erro ao buscar a loja.', false);
    });
});
