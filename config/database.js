const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./tracker.db', (err) => {
if (err) console.error(err.message);
console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS applications (
id INTEGER PRIMARY KEY AUTOINCREMENT,
university TEXT,
course TEXT,
status TEXT
)`);

module.exports = db;