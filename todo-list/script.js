const modalForm = document.getElementById('form');
const taskNameInput = document.getElementById('taskName');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const estimatedCostInput = document.getElementById('estimatedCost');
const taskStatusSelect = document.getElementById('taskStatus');
const addTaskButton = document.getElementById('add');
const closeButton = document.getElementById('close');
const tasksContainer = document.getElementById('tasks');

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

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

    // Fechar o modal programaticamente
    const modalInstance = bootstrap.Modal.getInstance(modalForm);
    if (modalInstance) {
      modalInstance.hide();
    }
  }
};

let data = [];

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
};

let createTasks = () => {
  tasks.innerHTML = '';
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.taskName}</span>
            <span class="small text-secondary">${x.startDate} - ${x.endDate}</span>
            <p>Custo Estimado (R$): ${x.estimatedCost}</p>
            <p>Status da Tarefa: ${x.taskStatus}</p>
  
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
  });

  resetForm();
};

// Initialize Bootstrap tooltips (example of Bootstrap initialization)
document.addEventListener('DOMContentLoaded', () => {
  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});
