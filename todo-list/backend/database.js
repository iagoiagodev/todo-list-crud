const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('todos.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    taskName TEXT NOT NULL,
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    estimatedCost REAL NOT NULL CHECK(estimatedCost >= 0),
    taskStatus TEXT NOT NULL CHECK(taskStatus IN ('Concluída', 'Em Andamento', 'Pendente'))
  )`);
});

module.exports = db;
