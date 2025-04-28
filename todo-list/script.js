// Elementos do DOM
const modalForm = document.getElementById('form');
const taskNameInput = document.getElementById('taskName');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const estimatedCostInput = document.getElementById('estimatedCost');
const taskStatusSelect = document.getElementById('taskStatus');
const addTaskButton = document.getElementById('add');
const closeButton = document.getElementById('close');
const tasksContainer = document.getElementById('tasks');

// Evento de envio do formulário
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

// Validação do formulário
let formValidation = () => {
  const existingMsg = taskNameInput.parentNode.querySelector('.error-message');
  if (existingMsg) {
    existingMsg.remove();
  }
  if (taskNameInput.value === '') {
    console.log('error');
    const msg = document.createElement('div');
    msg.className = 'error-message';
    msg.style.color = 'red';
    msg.style.fontSize = '12px';
    msg.innerHTML = 'O nome da tarefa não pode estar em branco';
    taskNameInput.parentNode.insertBefore(msg, taskNameInput.nextSibling);
  } else {
    console.log('success');
    acceptdData();
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();

    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
};

// Armazenamento de dados
let data = [];

// Resetar formulário
let resetForm = () => {
  taskNameInput.value = '';
  startDateInput.value = '';
  endDateInput.value = '';
  estimatedCostInput.value = '';
  taskStatusSelect.value = '';
};

// Aceitar e armazenar dados
let acceptdData = () => {
  data.push({
    taskName: taskNameInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    estimatedCost: estimatedCostInput.value,
    taskStatus: taskStatusSelect.value,
  });
  localStorage.setItem('tasks', JSON.stringify(data));
  console.log(data);
  createTasks();
  resetForm();
};

// Criar tarefas
let createTasks = () => {
  tasks.innerHTML = '';
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y} class="task-item">
        <div class="task-header d-flex justify-content-between align-items-center" style="cursor: pointer;">
          <span class="fw-bold">${x.taskName}</span>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div class="task-details" style="display: none; margin-top: 10px;">
          <span class="small text-secondary">${x.startDate} - ${x.endDate}</span>
          <p>Custo Estimado (R$): ${x.estimatedCost}</p>
          <p>Status da Tarefa: ${x.taskStatus}</p>
          <span class="options">
            <button class="edit-btn me-2" onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" style="background-color: orange; color: white;">
              <i class="bi bi-pencil-square me-1"></i><span>Editar</span>
            </button>
            <button class="delete-btn" onClick="deleteTask(this);createTasks()" style="background-color: red; color: white;">
              <i class="bi bi-trash-fill me-1"></i><span>Deletar</span>
            </button>
          </span>
        </div>
      </div>
    `);
  });

  // Adicionar funcionalidade de exibir/esconder detalhes
  const taskHeaders = document.querySelectorAll('.task-header');
  taskHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const details = header.nextElementSibling;
      const icon = header.querySelector('i');
      if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        icon.classList.remove('bi-chevron-down');
        icon.classList.add('bi-chevron-up');
      } else {
        details.style.display = 'none';
        icon.classList.remove('bi-chevron-up');
        icon.classList.add('bi-chevron-down');
      }
    });
  });
};

// Excluir tarefa
let deleteTask = (e) => {
  if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem('tasks', JSON.stringify(data));
    console.log(data);
  }
};

// Editar tarefa
let editTask = (e) => {
  const taskElement = e.parentElement.parentElement;
  taskNameInput.value = taskElement.children[0].innerHTML;
  startDateInput.value = taskElement.children[1].innerHTML.split(' - ')[0];
  endDateInput.value = taskElement.children[1].innerHTML.split(' - ')[1];
  estimatedCostInput.value = taskElement.children[2].innerHTML.replace(
    'Custo Estimado (R$): ',
    ''
  );
  taskStatusSelect.value = taskElement.children[3].innerHTML.replace(
    'Status da Tarefa: ',
    ''
  );
  taskElement.remove();
  data.splice(taskElement.id, 1);
  localStorage.setItem('tasks', JSON.stringify(data));
};

// Inicializar tarefas do localStorage
(() => {
  data = JSON.parse(localStorage.getItem('tasks')) || [];
  console.log(data);
  createTasks();
})();
