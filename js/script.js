document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    // Coleta os dados do formulário
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

   /* // Valida os campos
    if (!usuario || !senha) {
        alert('Por favor, preencha todos os campos!');
        return;
    }*/

    // Simula um login bem-sucedido
    alert('Login realizado com sucesso!');
    window.location.href = 'tela_financeiro.html'; // Redireciona para outra página
});

