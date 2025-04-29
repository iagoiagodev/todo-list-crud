const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// GET all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { taskName, startDate, endDate, estimatedCost, taskStatus } = req.body;
  db.run(
    `INSERT INTO todos (taskName, startDate, endDate, estimatedCost, taskStatus) VALUES (?, ?, ?, ?, ?)`,
    [taskName, startDate, endDate, estimatedCost, taskStatus],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({
        id: this.lastID,
        taskName,
        startDate,
        endDate,
        estimatedCost,
        taskStatus,
      });
    }
  );
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
  const { taskName, startDate, endDate, estimatedCost, taskStatus } = req.body;
  db.run(
    `UPDATE todos SET taskName = ?, startDate = ?, endDate = ?, estimatedCost = ?, taskStatus = ? WHERE id = ?`,
    [taskName, startDate, endDate, estimatedCost, taskStatus, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully', deletedId: id });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// cd todo-list/backend
// npx json-server --watch db.json --port 3000
