const sqlite3 = require('sqlite3').verbose();
const path = require('path');


const db = new sqlite3.Database(path.resolve(__dirname, 'myorg.db'), (err) => {
  if (err) console.error('Failed to connect to DB:', err.message);
  else console.log('Connected to SQLite database.');
});


db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    complete INTEGER DEFAULT 0
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    description TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS planner (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hour INTEGER UNIQUE NOT NULL,
    note TEXT DEFAULT ''
  )`);
});

module.exports = db;
