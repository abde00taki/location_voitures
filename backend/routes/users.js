const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST user
router.post('/', (req, res) => {
  const { name, lastname, email, password, role } = req.body;
  db.query(
    'INSERT INTO users (name, lastname, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [name, lastname, email, password, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, lastname, email, role });
    }
  );
});

module.exports = router;
