// Referências aos elementos da página
const matriculaInput = document.getElementById('matriculaPesquisar');
const btnPesquisar = document.getElementById('pesquisar');
const btnSalvar = document.getElementById('btnSalvar');
const btnLimpar = document.getElementById('btnLimpar');
const btnCancelar = document.getElementById('btnCancelar');

// Inputs do formulário
const nomeInput = document.getElementById('nome');
const cargoInput = document.getElementById('cargo');
const cpfInput = document.getElementById('cpf');
const situacaoSelect = document.getElementById('situacao');

// Mensagem de status
const mensagemDiv = document.getElementById('mensagem');

// Simulação de um banco de dados (apenas para fins de exemplo)
const colaboradores = [
    { matricula: '123', nome: 'João Silva', cargo: 'Gerente', cpf: '123.456.789-00', situacao: 'ativo' },
    { matricula: '456', nome: 'Maria Oliveira', cargo: 'Analista', cpf: '987.654.321-00', situacao: 'inativo' },
];

// Função para buscar os dados do colaborador
function buscarColaborador(matricula) {
    return colaboradores.find(colab => colab.matricula === matricula);
}

// Ação do botão "Pesquisar"
btnPesquisar.addEventListener('click', () => {
    const matricula = matriculaInput.value.trim();

    if (!matricula) {
        mensagemDiv.textContent = 'Por favor, insira a matrícula para pesquisar.';
        mensagemDiv.style.display = 'block';
        return;
    }

    const colaborador = buscarColaborador(matricula);

    if (colaborador) {
        nomeInput.value = colaborador.nome;
        cargoInput.value = colaborador.cargo;
        cpfInput.value = colaborador.cpf;
        situacaoSelect.value = colaborador.situacao;

        mensagemDiv.textContent = 'Dados carregados com sucesso!';
        mensagemDiv.style.display = 'block';
    } else {
        mensagemDiv.textContent = 'Colaborador não encontrado.';
        mensagemDiv.style.display = 'block';
    }
});

// Ação do botão "Salvar"
btnSalvar.addEventListener('click', () => {
    const matricula = matriculaInput.value.trim();

    if (!matricula) {
        mensagemDiv.textContent = 'Por favor, pesquise um colaborador antes de salvar.';
        mensagemDiv.style.display = 'block';
        return;
    }

    const colaborador = buscarColaborador(matricula);

    if (colaborador) {
        colaborador.nome = nomeInput.value.trim();
        colaborador.cargo = cargoInput.value.trim();
        colaborador.cpf = cpfInput.value.trim();
        colaborador.situacao = situacaoSelect.value;

        mensagemDiv.textContent = 'Alterações salvas com sucesso!';
        mensagemDiv.style.display = 'block';
    } else {
        mensagemDiv.textContent = 'Colaborador não encontrado para salvar alterações.';
        mensagemDiv.style.display = 'block';
    }
});

// Ação do botão "Limpar"
btnLimpar.addEventListener('click', () => {
    matriculaInput.value = '';
    nomeInput.value = '';
    cargoInput.value = '';
    cpfInput.value = '';
    situacaoSelect.value = 'ativo';

    mensagemDiv.style.display = 'none';
});

// Ação do botão "Cancelar"
btnCancelar.addEventListener('click', () => {
    window.location.href = 'tela_financeiro.html'; // Redireciona para a tela financeira
});
