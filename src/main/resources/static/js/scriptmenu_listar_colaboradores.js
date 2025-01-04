// Seleciona os botões pelos seus IDs
const cancelButton = document.getElementById('cancelButton');
const deleteButton = document.getElementById('deleteButton');

// Evento para o botão de Cancelar
cancelButton.addEventListener('click', function () {
    const confirmCancel = confirm('Você tem certeza que deseja cancelar?');
    if (confirmCancel) {
        alert('Operação cancelada.');
       
    }
});

// Evento para o botão de Excluir
deleteButton.addEventListener('click', function () {
    const itemCheckboxes = document.querySelectorAll('.select-item');
    const selectedItems = Array.from(itemCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.closest('tr'));
    
    if (selectedItems.length === 0) {
        alert('Nenhum item selecionado!');
        return;
    }

    if (confirm(`Você realmente deseja excluir ${selectedItems.length} item(s)?`)) {
        selectedItems.forEach(row => row.remove());
    }
});


const selectAllCheckbox = document.getElementById('select-all');


selectAllCheckbox.addEventListener('change', function () {
    const itemCheckboxes = document.querySelectorAll('.select-item');
    itemCheckboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
});

// Atualizar "selecionar todos" se um dos itens for desmarcado
document.querySelectorAll('.select-item').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        selectAllCheckbox.checked = [...document.querySelectorAll('.select-item')].every(cb => cb.checked);
    });
});
