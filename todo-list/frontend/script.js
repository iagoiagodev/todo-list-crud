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

// Dados
let data = [];
let currentEditIndex = null;

// ========== Validação do Formulário ==========
modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  validateForm();
});

const validateForm = () => {
  const existingMsg = taskNameInput.parentNode.querySelector('.error-message');
  if (existingMsg) existingMsg.remove();

  if (taskNameInput.value === '') {
    const msg = document.createElement('div');
    msg.className = 'error-message';
    msg.style.color = 'red';
    msg.style.fontSize = '12px';
    msg.innerHTML = 'O nome da tarefa não pode estar em branco';
    taskNameInput.parentNode.insertBefore(msg, taskNameInput.nextSibling);
  } else {
    handleFormData();
    addTaskButton.setAttribute('data-bs-dismiss', 'modal');
    addTaskButton.click();

    (() => {
      addTaskButton.setAttribute('data-bs-dismiss', '');
    })();
  }
};

// ========== Manipulação do Formulário ==========
const resetForm = () => {
  taskNameInput.value = '';
  startDateInput.value = '';
  endDateInput.value = '';
  estimatedCostInput.value = '';
  taskStatusSelect.value = '';
};

const handleFormData = () => {
  const newTask = {
    taskName: taskNameInput.value,
    startDate: startDateInput.value,
    endDate: endDateInput.value,
    estimatedCost: estimatedCostInput.value,
    taskStatus: taskStatusSelect.value,
  };

  if (currentEditIndex !== null) {
    // Atualizar tarefa existente
    const taskId = data[currentEditIndex].id;

    fetch(`http://localhost:3000/todos/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then(() => {
        loadTasks();
        currentEditIndex = null;
      })
      .catch((error) => console.error('Erro ao editar:', error));
  } else {
    // Criar nova tarefa
    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((createdTask) => {
        console.log('Adicionado:', createdTask);
        loadTasks();
      })
      .catch((error) => console.error('Erro ao adicionar:', error));
  }

  resetForm();
};

// ========== Listar Tarefas ==========
const createTasks = () => {
  tasksContainer.innerHTML = '';

  data.forEach((task, index) => {
    tasksContainer.innerHTML += `
      <div id="${task.id}" class="task-item">
        <div class="task-header d-flex justify-content-between align-items-center" style="cursor: pointer;">
          <span class="fw-bold">${task.taskName}</span>
          <i class="bi bi-chevron-down"></i>
        </div>
        <div class="task-details" style="display: none; margin-top: 10px;">
          <span class="small text-secondary">${task.startDate} - ${task.endDate}</span>
          <p>Custo Estimado (R$): ${task.estimatedCost}</p>
          <p>Status da Tarefa: ${task.taskStatus}</p>
          <span class="options">
            <button class="edit-btn me-2" onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" style="background-color: orange; color: white;">
              <i class="bi bi-pencil-square me-1"></i><span>Editar</span>
            </button>
            <button class="delete-btn" onClick="deleteTask(this)" style="background-color: red; color: white;">
              <i class="bi bi-trash-fill me-1"></i><span>Deletar</span>
            </button>
          </span>
        </div>
      </div>
    `;
  });

  // Mostrar/Esconder detalhes
  const taskHeaders = document.querySelectorAll('.task-header');
  taskHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const details = header.nextElementSibling;
      const icon = header.querySelector('i');
      if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
        icon.classList.replace('bi-chevron-down', 'bi-chevron-up');
      } else {
        details.style.display = 'none';
        icon.classList.replace('bi-chevron-up', 'bi-chevron-down');
      }
    });
  });
};

// ========== Editar ==========
const editTask = (index) => {
  currentEditIndex = index;
  const task = data[index];

  taskNameInput.value = task.taskName;
  startDateInput.value = task.startDate;
  endDateInput.value = task.endDate;
  estimatedCostInput.value = task.estimatedCost;
  taskStatusSelect.value = task.taskStatus;
};

// ========== Deletar ==========
const deleteTask = (e) => {
  if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
    const id = e.closest('.task-item').id;

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        loadTasks();
      })
      .catch((error) => console.error('Erro ao deletar:', error));
  }
};

// ========== Carregar ==========
const loadTasks = () => {
  fetch('http://localhost:3000/todos')
    .then((response) => response.json())
    .then((todos) => {
      data = todos;
      createTasks();
    })
    .catch((error) => console.error('Erro ao carregar tarefas:', error));
};

// ========== Inicialização ==========
(() => {
  loadTasks();
})();
