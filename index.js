const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Connect to the SQL database (this automatically creates a 'tracker.db' file)
const db = new sqlite3.Database('./tracker.db', (err) => {
if (err) console.error(err.message);
console.log('Connected to the SQLite database.');
});

// 2. Create the table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS applications (
id INTEGER PRIMARY KEY AUTOINCREMENT,
university TEXT,
course TEXT,
status TEXT
)`);

// 3. GET Route: Fetch all rows from the SQL table
app.get('/applications', (req, res) => {
db.all("SELECT * FROM applications", [], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows); // Send the database rows to Postman
});
});

// 4. POST Route: Insert a new row into the SQL table
app.post('/applications', (req, res) => {
const { university, course, status } = req.body;
const sqlQuery = "INSERT INTO applications (university, course, status) VALUES (?, ?, ?)";

// The '?' are placeholders to protect against SQL injection security risks
db.run(sqlQuery, [university, course, status], function(err) {
if (err) return res.status(500).json({ error: err.message });

// Send back the newly created row ID
res.status(201).json({ id: this.lastID, university, course, status });
});
});

app.listen(PORT, () => {
console.log(`Server is listening on http://localhost:${PORT}`);
});

// 5. PUT Route: Update an application (e.g., changing status to "Accepted")
app.put('/applications/:id', (req, res) => {
const { university, course, status } = req.body;
const applicationId = req.params.id; // Extracts the ID from the URL

const sqlQuery = "UPDATE applications SET university = ?, course = ?, status = ? WHERE id = ?";

db.run(sqlQuery, [university, course, status, applicationId], function(err) {
if (err) return res.status(500).json({ error: err.message });

// this.changes tells us how many rows were updated
if (this.changes === 0) return res.status(404).json({ error: "Application not found" });

res.json({ message: "Application updated successfully", id: applicationId, status });
});
});

// 6. DELETE Route: Remove an application
app.delete('/applications/:id', (req, res) => {
const applicationId = req.params.id;

const sqlQuery = "DELETE FROM applications WHERE id = ?";

db.run(sqlQuery, [applicationId], function(err) {
if (err) return res.status(500).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: "Application not found" });

res.json({ message: "Application deleted successfully", id: applicationId });
});
});