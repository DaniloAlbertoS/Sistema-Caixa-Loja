
// Função para salvar os dados do formulário
document.addEventListener('DOMContentLoaded', () => {
    const btnSave = document.querySelector('.form-buttons button:first-child'); // Botão "Salvar"
    const btnClear = document.querySelector('.form-buttons button:last-child'); // Botão "Limpar"

    // Função para limpar os campos do formulário
    btnClear.addEventListener('click', () => {
        document.getElementById('valor-caixa').value = '';
        document.getElementById('valor-cofre').value = '';
        document.getElementById('valor-despesas').value = '';
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
            valor_caixa: valorCaixa,
            valor_cofre: valorCofre,
            valor_despesas: valorDespesas
        };

        try {
            
            const response = await fetch('https://sua-api-url.com/salvar-relatorio', {
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
            alert('Erro na comunicação com o servidor. Tente novamente.');
        }
    });
});

