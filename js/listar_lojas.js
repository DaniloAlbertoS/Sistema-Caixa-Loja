// Dados fictícios de lojas
const lojas = [
    { id: 1, nome: 'Loja A', endereco: 'Rua 1, 123', funcionamento: '08:00 - 18:00' },
    { id: 2, nome: 'Loja B', endereco: 'Rua 2, 456', funcionamento: '09:00 - 19:00' },
    { id: 3, nome: 'Loja C', endereco: 'Rua 3, 789', funcionamento: '10:00 - 20:00' },
    // Adicione mais lojas conforme necessário
    ...[...Array(20).keys()].map(i => ({
        id: i + 4,
        nome: `Loja ${String.fromCharCode(65 + (i % 26))}`,
        endereco: `Rua ${i + 4}, ${100 + i}`,
        funcionamento: `${8 + (i % 10)}:00 - ${18 + (i % 6)}:00`
    }))
];

// Função para preencher a tabela com os dados das lojas
function preencherTabela() {
    const tbody = document.getElementById('store-list');
    tbody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados
    lojas.forEach(loja => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item"></td>
            <td>${loja.id}</td>
            <td>${loja.nome}</td>
            <td>${loja.endereco}</td>
            <td>${loja.funcionamento}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para filtrar as lojas com base no valor da pesquisa
function filtrarTabela(event) {
    const termoBusca = event.target.value.toLowerCase();
    const tabela = lojas.filter(loja => 
        loja.nome.toLowerCase().includes(termoBusca) ||
        loja.endereco.toLowerCase().includes(termoBusca) ||
        loja.funcionamento.toLowerCase().includes(termoBusca)
    );

    const tbody = document.getElementById('store-list');
    tbody.innerHTML = ''; 
    tabela.forEach(loja => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item"></td>
            <td>${loja.id}</td>
            <td>${loja.nome}</td>
            <td>${loja.endereco}</td>
            <td>${loja.funcionamento}</td>
        `;
        tbody.appendChild(tr);
    });
}


document.querySelector('.btn-delete').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select-item:checked');
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const id = parseInt(row.children[1].textContent);
        // Remove do array de lojas
        const index = lojas.findIndex(loja => loja.id === id);
        if (index !== -1) lojas.splice(index, 1);
        row.remove();
    });
    alert('Itens selecionados foram excluídos.');
});


document.getElementById('select-all').addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.select-item');
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
});


document.querySelector('.btn-cancel').addEventListener('click', () => {
    preencherTabela();
    alert('Alterações canceladas e tabela original restaurada.');
});


document.addEventListener('DOMContentLoaded', () => {
    preencherTabela();

    // Adiciona o evento de filtragem
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filtrarTabela);

   
    document.querySelectorAll('th').forEach((header, index) => {
        header.addEventListener('click', () => {
            if (index === 0) return; // Ignorar checkbox
            const field = ['id', 'nome', 'endereco', 'funcionamento'][index - 1];
            lojas.sort((a, b) => a[field] > b[field] ? 1 : -1);
            preencherTabela();
        });
    });
});
