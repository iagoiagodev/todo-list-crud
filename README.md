# Task Management Application

## English

This project is a simple task management application built with HTML, CSS, and JavaScript, integrated with a Node.js backend using SQLite for data persistence. It allows users to create, edit, and delete tasks, with data stored in a database for better reliability and scalability.

### Live Demo

You can see a live demonstration of the application at the following link:  
[Task Management App Demo](https://iagoiago-todo.netlify.app)

### Features

- **Frontend**:

  - Add new tasks with details such as name, start date, end date, estimated cost, and status.
  - Edit existing tasks to update their information.
  - Delete tasks that are no longer needed.
  - Responsive design for better usability on different devices.

- **Backend**:

  - Built with Node.js and Express.js.
  - SQLite database for storing tasks persistently.
  - RESTful API endpoints for CRUD operations:
    - `GET /todos`: Retrieve all tasks.
    - `POST /todos`: Add a new task.
    - `PUT /todos/:id`: Update an existing task.
    - `DELETE /todos/:id`: Delete a task.

- **Integration**:

  - The frontend communicates with the backend using `fetch` API for all CRUD operations.
  - Tasks are dynamically loaded from the backend and displayed in the frontend.
  - Real-time updates to the task list after adding, editing, or deleting tasks.

  ### How to Install Dependencies

Before running the project, make sure to install the required dependencies.

1. **Initialize the project**:

   ```bash
   npm init -y
   ```

2. **Install backend dependencies**:

   ```bash
   npm install express sqlite3 cors json-server && npm install --save-dev nodemon
   ```

3. **Add scripts to `package.json`**:
   Add the following scripts to your `package.json`:
   ```json
   "scripts": {
     "start": "nodemon server.js",
     "dev": "json-server --watch db.json --port 3000"
   }
   ```

Now you're ready to run the project!

### How to Run

1. **Backend**:

   - Navigate to the `backend` folder: `cd todo-list/backend`.
   - Start the server using server.js:
     ```bash
     node server.j
     ```

2. **Frontend**:

   - Open the `index.html` file in a browser.

3. **Database**:
   - The SQLite database (`todos.db`) is automatically created and managed by the backend.

---

## Português

Este projeto é uma aplicação simples de gerenciamento de tarefas desenvolvida com HTML, CSS e JavaScript, integrada a um backend em Node.js utilizando SQLite para persistência de dados. Ele permite que os usuários criem, editem e excluam tarefas, com os dados armazenados em um banco de dados para maior confiabilidade e escalabilidade.

### Demonstração

Você pode ver uma demonstração ao vivo da aplicação no seguinte link:  
[Demo do Gerenciador de Tarefas](https://iagoiago-todo.netlify.app)

### Funcionalidades

- **Frontend**:

  - Adicionar novas tarefas com detalhes como nome, data de início, data de conclusão, custo estimado e status.
  - Editar tarefas existentes para atualizar suas informações.
  - Excluir tarefas que não são mais necessárias.
  - Design responsivo para melhor usabilidade em diferentes dispositivos.

- **Backend**:

  - Construído com Node.js e Express.js.
  - Banco de dados SQLite para armazenar tarefas de forma persistente.
  - Endpoints RESTful para operações CRUD:
    - `GET /todos`: Recuperar todas as tarefas.
    - `POST /todos`: Adicionar uma nova tarefa.
    - `PUT /todos/:id`: Atualizar uma tarefa existente.
    - `DELETE /todos/:id`: Excluir uma tarefa.

- **Integração**:

  - O frontend se comunica com o backend usando a API `fetch` para todas as operações CRUD.
  - As tarefas são carregadas dinamicamente do backend e exibidas no frontend.
  - Atualizações em tempo real na lista de tarefas após adicionar, editar ou excluir tarefas.

  ### Como Instalar as Dependências

Antes de executar o projeto, certifique-se de instalar as dependências necessárias.

1. **Inicialize o projeto**:

   ```bash
   npm init -y
   ```

2. **Instale as dependências do backend**:
   Execute o seguinte comando para instalar todas as dependências de uma vez:

   ```bash
   npm install express sqlite3 cors json-server && npm install --save-dev nodemon
   ```

3. **Adicione scripts ao `package.json`**:
   Adicione os seguintes scripts ao seu `package.json`:
   ```json
   "scripts": {
     "start": "nodemon server.js",
     "dev": "json-server --watch db.json --port 3000"
   }
   ```

Agora você está pronto para executar o projeto!

### Como Executar

1. **Backend**:

   - Navegue até a pasta `backend`: `cd todo-list/backend`.
   - Inicie o servidor usando o server.js:
     ```bash
     node server.js
     ```

2. **Frontend**:

   - Abra o arquivo `index.html` em um navegador.

3. **Banco de Dados**:
   - O banco de dados SQLite (`todos.db`) é criado e gerenciado automaticamente pelo backend.
