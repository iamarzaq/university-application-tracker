const db = require('../config/database');

exports.getAllApplications = (req, res) => {
db.all("SELECT * FROM applications", [], (err, rows) => {
if (err) return res.status(500).json({ error: err.message });
res.json(rows);
});
};

exports.createApplication = (req, res) => {
const { university, course, status } = req.body;
const sqlQuery = "INSERT INTO applications (university, course, status) VALUES (?, ?, ?)";

db.run(sqlQuery, [university, course, status], function(err) {
if (err) return res.status(500).json({ error: err.message });
res.status(201).json({ id: this.lastID, university, course, status });
});
};

exports.updateApplication = (req, res) => {
const { university, course, status } = req.body;
const sqlQuery = "UPDATE applications SET university = ?, course = ?, status = ? WHERE id = ?";

db.run(sqlQuery, [university, course, status, req.params.id], function(err) {
if (err) return res.status(500).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: "Application not found" });
res.json({ message: "Application updated successfully", id: req.params.id, status });
});
};

exports.deleteApplication = (req, res) => {
const sqlQuery = "DELETE FROM applications WHERE id = ?";
db.run(sqlQuery, [req.params.id], function(err) {
if (err) return res.status(500).json({ error: err.message });
if (this.changes === 0) return res.status(404).json({ error: "Application not found" });
res.json({ message: "Application deleted successfully", id: req.params.id });
});
};

const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
// Mock user data payload
const user = { username: "arzaqul" };

// Generates a digital key valid for 1 hour
const token = jwt.sign(user, "my_super_secret_key", { expiresIn: '1h' });
res.json({ token });
};