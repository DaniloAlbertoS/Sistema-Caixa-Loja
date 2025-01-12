document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-salvar').addEventListener('click', () => {
        console.log('Botão Salvar clicado');
    });
    
    // Evento para Limpar
    document.getElementById('btn-limpar').addEventListener('click', () => {
        console.log('Botão Limpar clicado');
        document.querySelectorAll('.form input').forEach(input => (input.value = ''));
        exibirMensagem('Campos limpos com sucesso!', true);
    });

    // Evento para Cancelar
    document.getElementById('btn-cancelar').addEventListener('click', () => {
        console.log('Botão Cancelar clicado');
        window.location.href = '/tela-financeiro';
    });
});


document.getElementById('btn-pesquisar').addEventListener('click', () => {
    const numeroLoja = document.getElementById('pesquisar_id').value;

    if (!numeroLoja) {
        exibirMensagem('Digite o número da loja para pesquisar.', false);
        return;
    }
    fetch(`/api/lojas/${numeroLoja}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Loja não encontrada.');
        }
        return response.json();
    })
    .then(data => {
        // Preenche os campos com os dados retornados
        document.getElementById('id_loja').value = data.idLoja || '';
        document.getElementById('numero_loja').value = data.numeroloja || ''; // Certifique-se de que este campo está sendo preenchido
        document.getElementById('nome_loja').value = data.nome || '';
        document.getElementById('endereco').value = data.endereco || '';
        document.getElementById('cidade').value = data.cidade || '';
        document.getElementById('telefone').value = data.telefone || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('funcionamento').value = data.horario_funcionamento || '';
        document.getElementById('cnpj').value = data.cnpj || '';

        exibirMensagem('Loja encontrada com sucesso!', true);
    })
    .catch(error => {
        exibirMensagem(error.message, false);
    });

});

document.getElementById('btn-salvar').addEventListener('click', () => {
    const numeroLoja = document.getElementById('numero_loja').value;

    if (!numeroLoja) {
        console.log('Erro: Número da loja não encontrado.');
        exibirMensagem('Pesquise uma loja antes de salvar as alterações.', false);
        return;
    }

    const lojaAtualizada = {
        nome: document.getElementById('nome_loja').value,
        endereco: document.getElementById('endereco').value,
        cidade: document.getElementById('cidade').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        horario_funcionamento: document.getElementById('funcionamento').value,
        cnpj: document.getElementById('cnpj').value
    };

    console.log('Dados para salvar:', lojaAtualizada);

    fetch(`/api/lojas/${numeroLoja}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(lojaAtualizada)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao salvar as alterações.');
            }
            return response.text();
        })
        .then(message => {
            console.log('Resposta do servidor:', message);
            exibirMensagem(message, true);
        })
        .catch(error => {
            console.error('Erro ao salvar:', error);
            exibirMensagem(error.message, false);
        });
});
function exibirMensagem(texto, sucesso = true) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    mensagem.style.color = sucesso ? 'green' : 'red';
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}

