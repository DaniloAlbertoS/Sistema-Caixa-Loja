document.addEventListener('DOMContentLoaded', () => {
    // Seletores para os elementos de data e hora
    const currentDateSpan = document.getElementById('current-date');
    const currentTimeSpan = document.getElementById('current-time');

    // Função para obter a data atual no formato dd/MM/yyyy
    function getCurrentDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Função para obter a hora atual no formato HH:mm:ss
    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }

    // Função para atualizar os elementos de data e hora
    function updateDateTime() {
        if (currentDateSpan) {
            currentDateSpan.textContent = getCurrentDate();
        }
        if (currentTimeSpan) {
            currentTimeSpan.textContent = getCurrentTime();
        }
    }

    // Inicializar data e hora
    updateDateTime();

    // Atualizar hora a cada segundo
    setInterval(updateDateTime, 1000);
});
