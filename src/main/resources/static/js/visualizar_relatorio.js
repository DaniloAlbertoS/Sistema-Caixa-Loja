document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.report-table tbody');
    const filterInput = document.getElementById('filter');
    const deleteButton = document.querySelector('.btn-delete');
    const cancelButton = document.querySelector('.btn-cancel');
  

    // Função para normalizar o filtro (tratamento de data e valores)
    function normalizeFilter(filter) {
        const numericRegex = /^\d+(\.\d{2})?$/; // Verifica se é número (ex: 500.00)
        const compactDateRegex = /^\d{8}$/; // Verifica formato compacto yyyyMMdd
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // Verifica formato yyyy-MM-dd
        const specialCharsRegex = /[-/,.\s]/g; // Remove caracteres especiais
    
        // Remove caracteres especiais do filtro
        const sanitizedFilter = filter.replace(specialCharsRegex, '');
    
        if (numericRegex.test(sanitizedFilter)) {
            return sanitizedFilter; // Retorna valores numéricos diretamente
        } else if (dateRegex.test(filter)) {
            return filter; // Retorna se já está no formato yyyy-MM-dd
        } else if (compactDateRegex.test(sanitizedFilter)) {
            // Converte formato compacto yyyyMMdd para yyyy-MM-dd
            return `${sanitizedFilter.slice(0, 4)}-${sanitizedFilter.slice(4, 6)}-${sanitizedFilter.slice(6)}`;
        } else {
            // Tenta criar uma data válida
            const parsedDate = new Date(filter);
            if (!isNaN(parsedDate)) {
                const year = parsedDate.getFullYear();
                const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
                const day = String(parsedDate.getDate()).padStart(2, '0');
                return `${year}-${month}-${day}`; // Formata para yyyy-MM-dd
            }
        }
    
        return filter; // Retorna o filtro original se não for data ou número
    }

    // Função para carregar relatórios da API
    async function fetchReports(filter = '') {
        try {
            const formattedFilter = filter ? `?filter=${normalizeFilter(filter)}` : '';
            const url = `/api/valores${formattedFilter}`;
            console.log(`Chamando a API com URL: ${url}`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Erro ao buscar relatórios: ${response.status} - ${response.statusText}`);
            }

            const reports = await response.json();
            console.log('Dados recebidos da API:', reports);

            tableBody.innerHTML = ''; // Limpa a tabela

            if (reports.length === 0) {
                const row = document.createElement('tr');
                row.innerHTML = `<td colspan="6" style="text-align: center;">Nenhum relatório encontrado.</td>`;
                tableBody.appendChild(row);
                return;
            }

            // Preencher a tabela com os dados retornados
            reports.forEach(report => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td><input type="checkbox" class="select-row" data-id="${report.idvalores_casa}"></td>
                <td>${report.idvalores_casa}</td>
                <td>${report.data}</td>
                <td>${new Date(`1970-01-01T${report.hora}`).toLocaleTimeString('pt-BR')}</td>
                <td>R$ ${report.valor_caixas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>R$ ${report.valor_cofre.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td>R$ ${report.valor_despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
            `;
            
                row.setAttribute('data-id', report.idvalores_casa);
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar relatórios:', error.message);
            alert('Erro ao carregar relatórios. Verifique o console para mais detalhes.');
        }
    }

     
    /// Função para excluir relatórios selecionados
async function deleteReports() {
    // Coletar os checkboxes marcados
    const selectedRows = Array.from(document.querySelectorAll('.select-row:checked'));
    if (selectedRows.length === 0) {
        alert('Selecione ao menos um relatório para excluir.');
        return;
    }

    if (!confirm('Tem certeza de que deseja excluir os relatórios selecionados?')) {
        return;
    }

    // Obter os IDs dos checkboxes marcados
    const idsToDelete = selectedRows.map(row => parseInt(row.getAttribute('data-id')));

    try {
        console.log('IDs para excluir:', idsToDelete);

        const response = await fetch(`/api/valores`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idsToDelete), // Envia os IDs como JSON
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao excluir relatórios.');
        }

        alert('Relatórios excluídos com sucesso!');
        fetchReports(); // Atualiza a tabela após a exclusão
    } catch (error) {
        console.error('Erro ao excluir relatórios:', error);
        alert(`Erro ao excluir relatórios: ${error.message}`);
    }
}


    // Função para cancelar seleção
    function cancelSelection() {
        const rows = document.querySelectorAll('.report-table tbody tr');
        rows.forEach(row => row.classList.remove('selected'));
    }

    // Eventos
    fetchReports(); // Carregar relatórios ao iniciar

    // Atualizar a tabela dinamicamente conforme o usuário digita no filtro
    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.trim();
        fetchReports(filterValue);
    });

    deleteButton.addEventListener('click', deleteReports);
    cancelButton.addEventListener('click', cancelSelection);

    tableBody.addEventListener('click', (e) => {
        if (e.target.tagName === 'TD') {
            const row = e.target.parentNode;
            row.classList.toggle('selected');
        }
    });
});
