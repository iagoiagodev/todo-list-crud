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
  const { title } = req.body;
  db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, done: 0 });
  });
});

// PUT update todo status
app.put('/todos/:id', (req, res) => {
  const { done } = req.body;
  db.run(
    'UPDATE todos SET done = ? WHERE id = ?',
    [done, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// cd todo-list/backend
// npx json-server --watch db.json --port 3000
