const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Get all employees
router.get('/', (req, res) => {
    console.log("running get all employees");
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get one employee
router.get('/:id', (req, res) => {
  db.get('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

// Add employee
router.post('/', (req, res) => {
  const { name, department, designation, project, type, status } = req.body;
  const sql = `INSERT INTO employees (name, department, designation, project, type, status) VALUES (?, ?, ?, ?, ?, ?)`;
  db.run(sql, [name, department, designation, project, type, status], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// Update employee
router.put('/:id', (req, res) => {
  const { name, department, designation, project, type, status } = req.body;
  const sql = `
    UPDATE employees SET name = ?, department = ?, designation = ?, project = ?, type = ?, status = ?
    WHERE id = ?
  `;
  db.run(sql, [name, department, designation, project, type, status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

// Delete employee
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
