// Referências aos elementos
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

// Função para exibir e ocultar mensagem
function exibirMensagem(mensagem, tipo) {
    // Limpa mensagens anteriores
    mensagemDiv.textContent = '';
    mensagemDiv.style.display = 'none';

    // Define o texto e o estilo da mensagem
    mensagemDiv.textContent = mensagem;
    mensagemDiv.className = `mensagem ${tipo}`;
    mensagemDiv.style.display = 'block';

    // Esconde a mensagem após 3 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000); // 3000 ms = 3 segundos
}

// Ação do botão "Pesquisar"
btnPesquisar.addEventListener('click', () => {
    const matricula = matriculaInput.value.trim();

    if (!matricula) {
        exibirMensagem('Por favor, insira a matrícula para pesquisar.', 'erro');
        return;
    }

    // Chamada para o backend
    fetch(`/api/funcionarios/matricula/${matricula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Funcionário não encontrado.');
            }
            return response.json();
        })
        .then(funcionario => {
            // Preenche os campos do formulário
            nomeInput.value = funcionario.nome;
            cargoInput.value = funcionario.cargo;
            cpfInput.value = funcionario.cpf;
            situacaoSelect.value = funcionario.ativo ? 'ativo' : 'inativo';

            exibirMensagem('Dados carregados com sucesso!', 'sucesso');
        })
        .catch(error => {
            exibirMensagem(error.message, 'erro');
        });
});

// Ação do botão "Salvar"
btnSalvar.addEventListener('click', () => {
    const matricula = matriculaInput.value.trim();

    if (!matricula) {
        exibirMensagem('Por favor, pesquise um colaborador antes de salvar.', 'erro');
        return;
    }

    const funcionarioAtualizado = {
        nome: nomeInput.value.trim(),
        cargo: cargoInput.value.trim(),
        cpf: cpfInput.value.trim(),
        ativo: situacaoSelect.value === 'ativo',
    };

    fetch(`/api/funcionarios/matricula/${matricula}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionarioAtualizado),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao salvar as alterações. Código: ${response.status}`);
            }
            return response.text(); // Servidor retorna mensagem como texto
        })
        .then(data => {
            console.log('Resposta do servidor:', data);

            // Verifica se a matrícula atualizada é do usuário logado
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            if (userData.matricula === matricula) {
                atualizarMenuUsuarioLogado(matricula);
            }

            // Exibir mensagem de sucesso
            exibirMensagem('Colaborador atualizado com sucesso.', 'sucesso');
        })
        .catch(error => {
            console.error('Erro ao salvar as alterações:', error);
            exibirMensagem('Erro ao salvar as alterações.', 'erro');
        });
});

// Função para atualizar o menu do usuário logado
function atualizarMenuUsuarioLogado(matricula) {
    // Busca os dados atualizados do usuário logado no backend
    fetch(`/api/funcionarios/matricula/${matricula}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados atualizados do usuário logado.');
            }
            return response.json();
        })
        .then(usuarioAtualizado => {
            // Atualiza o menu com os dados mais recentes
            const userNameSpan = document.getElementById('user-name');
            const userMatSpan = document.getElementById('user-mat');
            if (userNameSpan && userMatSpan) {
                userNameSpan.textContent = usuarioAtualizado.nome || 'Desconhecido';
                userMatSpan.textContent = usuarioAtualizado.matricula || 'Não informado';
            }

            // Atualiza os dados no localStorage
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            userData.nome = usuarioAtualizado.nome;
            userData.matricula = usuarioAtualizado.matricula;
            localStorage.setItem('user', JSON.stringify(userData));
        })
        .catch(error => {
            console.error('Erro ao atualizar o menu do usuário logado:', error);
        });
}

// Ação do botão "Limpar"
btnLimpar.addEventListener('click', () => {
    limparFormulario();
    exibirMensagem('Formulário limpo.', 'sucesso');
});

// Ação do botão "Cancelar"
btnCancelar.addEventListener('click', () => {
    window.location.href = '/tela-financeiro';
});

// Função para limpar o formulário
function limparFormulario() {
    matriculaInput.value = '';
    nomeInput.value = '';
    cargoInput.value = '';
    cpfInput.value = '';
    situacaoSelect.value = 'ativo';
    mensagemDiv.style.display = 'none';
}
