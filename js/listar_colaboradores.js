// Dados fictícios de colaboradores
const colaboradores = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com', telefone: '(11) 99999-9999' },
    { id: 2, nome: 'Maria Santos', email: 'maria@email.com', telefone: '(11) 98888-8888' },
    { id: 3, nome: 'José Almeida', email: 'jose@email.com', telefone: '(21) 97777-7777' },
    // Adicione os 20 colaboradores restantes
    ...[...Array(20).keys()].map(i => ({
        id: i + 4,
        nome: `Pessoa ${i + 4}`,
        email: `pessoa${i + 4}@email.com`,
        telefone: `(00) 90000-${(i).toString().padStart(4, '0')}`
    }))
];


function preencherTabela() {
    const tbody = document.getElementById('collaborator-list');
    tbody.innerHTML = ''; 
    colaboradores.forEach(colaborador => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item"></td>
            <td>${colaborador.id}</td>
            <td>${colaborador.nome}</td>
            <td>${colaborador.email}</td>
            <td>${colaborador.telefone}</td>
        `;
        tbody.appendChild(tr);
    });
}

a
function filtrarTabela(event) {
    const termoBusca = event.target.value.toLowerCase();
    const tabela = colaboradores.filter(colaborador => 
        colaborador.nome.toLowerCase().includes(termoBusca) ||
        colaborador.email.toLowerCase().includes(termoBusca) ||
        colaborador.telefone.toLowerCase().includes(termoBusca)
    );
    
    const tbody = document.getElementById('collaborator-list');
    tbody.innerHTML = ''; 
    tabela.forEach(colaborador => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox" class="select-item"></td>
            <td>${colaborador.id}</td>
            <td>${colaborador.nome}</td>
            <td>${colaborador.email}</td>
            <td>${colaborador.telefone}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Chama a função para preencher a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    preencherTabela();

    // Adiciona o evento de filtragem
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filtrarTabela);
});

// Excluir itens selecionados
document.querySelector('.btn-delete').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select-item:checked');
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        row.remove(); // Remove a linha da tabela
    });
    alert('Itens selecionados foram excluídos.');
});

// Selecionar todos os checkboxes
document.getElementById('select-all').addEventListener('change', (event) => {
    const checkboxes = document.querySelectorAll('.select-item');
    checkboxes.forEach(checkbox => {
        checkbox.checked = event.target.checked;
    });
});

document.querySelector('.btn-delete').addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('.select-item:checked');
    checkboxes.forEach(checkbox => {
        const row = checkbox.closest('tr');
        const id = parseInt(row.children[1].textContent);
       
        const index = colaboradores.findIndex(colaborador => colaborador.id === id);
        if (index !== -1) colaboradores.splice(index, 1);
        row.remove();
    });
    alert('Itens selecionados foram excluídos.');
});

document.querySelector('.search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-input');
    filtrarTabela({ target: searchInput });
});

document.querySelectorAll('th').forEach((header, index) => {
    header.addEventListener('click', () => {
        colaboradores.sort((a, b) => {
            const field = Object.keys(colaboradores[0])[index - 1];
            return a[field] > b[field] ? 1 : -1;
        });
        preencherTabela();
    });
});


