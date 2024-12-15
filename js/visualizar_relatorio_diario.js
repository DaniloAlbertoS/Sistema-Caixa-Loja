
// Função para selecionar e excluir itens da tabela
document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.report-table tbody');
    const btnDelete = document.querySelector('.btn-delete');
    
    // Evento de seleção de linha na tabela
    table.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
            const row = e.target.parentNode;
            row.classList.toggle('selected');
        }
    });

    // Evento para excluir os itens selecionados
    btnDelete.addEventListener('click', () => {
        const selectedRows = document.querySelectorAll('.report-table tbody .selected');
        if (selectedRows.length === 0) {
            alert('Selecione ao menos uma linha para excluir.');
            return;
        }
        
        // Excluindo as linhas selecionadas
        selectedRows.forEach(row => row.remove());
        alert('Linhas excluídas com sucesso.');
    });
});

// Função para buscar e filtrar dados da tabela
document.getElementById('filter').addEventListener('input', (e) => {
    const filterValue = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.report-table tbody tr');
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        let matches = false;

        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(filterValue)) {
                matches = true;
            }
        });

        row.style.display = matches ? '' : 'none';
    });
});


async function fetchData(filter = '') {
    const response = await fetch('https://sua-api-url.com/relatorios-diarios?filter=' + filter);
    const data = await response.json();

    const tableBody = document.querySelector('.report-table tbody');
    tableBody.innerHTML = ''; // Limpa a tabela antes de preencher com novos dados

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.data}</td>
            <td>${item.hora}</td>
            <td>${item.valor_caixa}</td>
            <td>${item.valor_cofre}</td>
            <td>${item.despesas}</td>
        `;
        tableBody.appendChild(row);
    });
}


fetchData();

