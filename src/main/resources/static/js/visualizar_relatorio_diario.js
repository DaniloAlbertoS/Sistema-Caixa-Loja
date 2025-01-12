document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('.report-table tbody');


    // Função para obter a data atual no formato yyyy-MM-dd
    function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Função para carregar relatórios da API para a data atual
    async function fetchReportsForToday() {
        try {
            const today = getCurrentDate();
            const url = `/api/valores?filter=${today}`;
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
                row.innerHTML = `<td colspan="6" style="text-align: center;">Nenhum relatório encontrado para a data de hoje.</td>`;
                tableBody.appendChild(row);
                return;
            }

            // Preencher a tabela com os dados retornados
            reports.forEach(report => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${report.idvalores_casa}</td>
                    <td>${new Date(report.data).toLocaleDateString('pt-BR')}</td>
                    <td>${new Date(`1970-01-01T${report.hora}`).toLocaleTimeString('pt-BR')}</td>
                    <td>R$ ${report.valor_caixas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>R$ ${report.valor_cofre.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td>R$ ${report.valor_despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Erro ao carregar relatórios:', error.message);
            alert('Erro ao carregar relatórios. Verifique o console para mais detalhes.');
        }
    }

   /* // Função para atualizar a hora e data atual no menu lateral
    function updateDateTime() {
        const now = new Date();

        // Atualizar data no formato dd/MM/yyyy
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        currentDateSpan.textContent = `${day}/${month}/${year}`;

        // Atualizar hora no formato HH:mm:ss
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeSpan.textContent = `${hours}:${minutes}:${seconds}`;
    }*/

    // Inicializar
    fetchReportsForToday(); // Carregar relatórios da data atual
    /*fetchUserData(); // Carregar informações do usuário logado*/
    


});
