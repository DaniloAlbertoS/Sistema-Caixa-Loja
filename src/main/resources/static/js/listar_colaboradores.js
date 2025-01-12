

document.addEventListener('DOMContentLoaded', () => {
    const btnCancelar = document.querySelectorAll('.btn-cancel'); // Seleciona todos os botões com a classe

    btnCancelar.forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = '/tela-financeiro';
        });
    });
    carregarColaboradores('financeiro'); // Carrega tabela Financeiro por padrão

    // Troca entre tabelas
    document.getElementById('table-select').addEventListener('change', (event) => {
        const tabelaSelecionada = event.target.value.toLowerCase();
        carregarColaboradores(tabelaSelecionada);
    });

    // Filtrar tabela
    document.getElementById('search-input').addEventListener('input', (event) => {
        const termoBusca = event.target.value.toLowerCase();
        filtrarTabela(termoBusca);
    });

    // Excluir colaboradores selecionados
    document.querySelector('.btn-delete').addEventListener('click', excluirSelecionados);
});

// Função para carregar colaboradores
function carregarColaboradores(tabela) {
    fetch(`/api/${tabela}`)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar dados da tabela ${tabela}`);
            return response.json();
        })
        .then(colaboradores => preencherTabela(colaboradores))
        .catch(error => console.error('Erro ao carregar colaboradores:', error));
}

// Preencher a tabela com os dados corretos
function preencherTabela(colaboradores) {
    const tbody = document.getElementById('collaborator-list');
    tbody.innerHTML = ''; // Limpa a tabela

    colaboradores.forEach(colaborador => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item" data-id="${colaborador.idfinaceiro || colaborador.idgerencia}"></td>
            <td>${colaborador.nome}</td>
            <td>${colaborador.matricula}</td>
            <td>${colaborador.cargo || ''}</td>
            <td>${colaborador.cpf || ''}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Filtrar os colaboradores na tabela
function filtrarTabela(termoBusca) {
    const linhas = document.querySelectorAll('#collaborator-list tr');
    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(termoBusca) ? '' : 'none';
    });
}

// Função para excluir os colaboradores selecionados
function excluirSelecionados() {
    const selecionados = document.querySelectorAll('.select-item:checked');

    if (selecionados.length === 0) {
        alert('Nenhum colaborador selecionado para exclusão.');
        return;
    }

    // Determina a tabela atual
    const tabelaAtual = document.getElementById('table-select').value.toLowerCase();

    selecionados.forEach(checkbox => {
        const id = checkbox.getAttribute('data-id'); // Obtém o ID do atributo data-id

        if (!id || isNaN(id)) {
            console.error(`ID inválido: ${id}`);
            alert(`Erro ao excluir colaborador. ID inválido: ${id}`);
            return;
        }

        // Requisição DELETE para a tabela atual
        fetch(`/api/${tabelaAtual}/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    const row = document.querySelector(`.select-item[data-id="${id}"]`).closest('tr');
                    row.remove(); // Remove a linha da tabela
                    console.log(`Colaborador com ID ${id} excluído da tabela ${tabelaAtual}.`);
                    alert(`Colaborador com ID ${id} excluído com sucesso.`);
                } else {
                    console.error(`Erro ao excluir colaborador com ID ${id} na tabela ${tabelaAtual}`);
                    alert(`Erro ao excluir colaborador com ID ${id}.`);
                }
            })
            .catch(error => {
                console.error('Erro na exclusão:', error);
                alert('Erro ao conectar ao servidor. Tente novamente.');
            });
    });

    // Ação do botão "Cancelar"
    

}

