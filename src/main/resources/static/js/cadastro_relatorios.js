document.addEventListener('DOMContentLoaded', () => {
    // Seletores dos elementos
    const btnSave = document.querySelector('.form-buttons button:first-child'); // Botão "Salvar"
    const btnClear = document.querySelector('.form-buttons button:last-child'); // Botão "Limpar"

    // Função para limpar os campos do formulário
    btnClear.addEventListener('click', () => {
        document.getElementById('valor-caixa').value = '';
        document.getElementById('valor-cofre').value = '';
        document.getElementById('valor-despesas').value = '';
        alert('Campos limpos com sucesso!');
    });

    // Função para enviar os dados do formulário para o backend
    btnSave.addEventListener('click', async () => {
        const valorCaixa = document.getElementById('valor-caixa').value.trim();
        const valorCofre = document.getElementById('valor-cofre').value.trim();
        const valorDespesas = document.getElementById('valor-despesas').value.trim();

        // Validação simples dos campos
        if (!valorCaixa || !valorCofre || !valorDespesas) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Cria um objeto com os dados do formulário
        const data = {
            data: new Date().toISOString().split('T')[0], // Data atual
            hora: new Date().toISOString(),              // Hora atual
            valor_caixas: parseFloat(valorCaixa),
            valor_cofre: parseFloat(valorCofre),
            valor_despesa: parseFloat(valorDespesas)
        };

        try {
            // Envia os dados para o backend
            const response = await fetch('/api/valores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Relatório cadastrado com sucesso!');
            } else {
                alert('Erro ao cadastrar relatório: ' + result.message);
            }
        } catch (error) {
            console.error('Erro na comunicação com o servidor:', error);
            alert('Erro na comunicação com o servidor. Tente novamente.');
        }
    });
});
