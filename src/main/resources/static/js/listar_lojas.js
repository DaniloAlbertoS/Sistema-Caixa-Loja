document.addEventListener('DOMContentLoaded', () => {
    carregarLojas(); // Carrega a tabela de lojas ao iniciar

    // Excluir lojas selecionadas
    document.querySelector('.btn-delete').addEventListener('click', excluirSelecionados);

    // Selecionar ou desmarcar todos os checkboxes
    document.getElementById('select-all').addEventListener('change', (event) => {
        const checkboxes = document.querySelectorAll('.select-item');
        checkboxes.forEach(checkbox => {
            checkbox.checked = event.target.checked;
        });
    });

    // Filtrar tabela
    document.getElementById('search-input').addEventListener('input', (event) => {
        const termoBusca = event.target.value.toLowerCase();
        filtrarTabela(termoBusca);
    });
});

// Função para carregar lojas
function carregarLojas() {
    fetch('/api/lojas') // Endpoint para buscar lojas
        .then(response => {
            if (!response.ok) throw new Error('Erro ao carregar lojas.');
            return response.json();
        })
        .then(lojas => {
            console.log('Lojas retornadas pela API:', lojas); // Log de depuração
            preencherTabela(lojas);
        })
        .catch(error => console.error('Erro ao carregar lojas:', error));
}

// Função para preencher a tabela com os dados das lojas
function preencherTabela(lojas) {
    const tbody = document.getElementById('store-list');
    tbody.innerHTML = ''; // Limpa a tabela

    lojas.forEach(loja => {
        console.log(`Número Loja: ${loja.numeroloja}, Nome: ${loja.nome}`); // Depuração adicional

        const numeroValido = loja.numeroloja ? loja.numeroloja : 'undefined';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item" data-numeroloja="${numeroValido}"></td>
            <td>${loja.numeroloja || 'Sem Número'}</td>
            <td>${loja.nome || 'Sem Nome'}</td>
            <td>${loja.endereco || 'Sem Endereço'}</td>
            <td>${loja.horario_funcionamento || 'Sem Horário'}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para filtrar os dados da tabela
function filtrarTabela(termoBusca) {
    const linhas = document.querySelectorAll('#store-list tr');
    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(termoBusca) ? '' : 'none';
    });
}

// Função para excluir lojas selecionadas
function excluirSelecionados() {
    const selecionados = document.querySelectorAll('.select-item:checked');

    if (selecionados.length === 0) {
        alert('Nenhuma loja selecionada para exclusão.');
        return;
    }

    selecionados.forEach(checkbox => {
        const numeroLoja = checkbox.getAttribute('data-numeroloja');
        console.log('Checkbox selecionado:', checkbox);
        console.log('Número da Loja capturado do data-numeroloja:', numeroLoja);

        if (!numeroLoja || isNaN(numeroLoja)) {
            console.error(`Número da Loja inválido: ${numeroLoja}`);
            alert(`Erro ao excluir loja. Número da Loja inválido: ${numeroLoja}`);
            return;
        }

        // Faz a requisição DELETE para o servidor
        fetch(`/api/lojas/${numeroLoja}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const row = checkbox.closest('tr');
                    row.remove(); // Remove a linha da tabela
                    console.log(`Loja com Número ${numeroLoja} excluída.`);
                    alert(`Loja com Número ${numeroLoja} excluída com sucesso.`);
                } else {
                    console.error(`Erro ao excluir loja com Número ${numeroLoja}`);
                    alert(`Erro ao excluir loja com Número ${numeroLoja}.`);
                }
            })
            .catch(error => {
                console.error('Erro ao excluir loja:', error);
                alert('Erro ao conectar ao servidor. Tente novamente.');
            });
    });
}
