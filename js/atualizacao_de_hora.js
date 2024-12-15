 // Atualiza a data e a hora atuais
 document.addEventListener('DOMContentLoaded', () => {
    // Função para formatar a data e hora
    function updateDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('pt-BR');  // Formato de data: dd/mm/aaaa
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); // Formato de hora: hh:mm

        document.getElementById('current-date').textContent = date;
        document.getElementById('current-time').textContent = time;
    }

    // Atualiza data e hora a cada 60 segundos
    updateDateTime();
    setInterval(updateDateTime, 60000); // Atualiza a cada minuto
});