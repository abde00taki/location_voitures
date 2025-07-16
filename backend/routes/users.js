const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt')

// GET all users
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST user
router.post('/', async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if(!name || !lastname || !email || !password){
    return res.status(400).send('invalid inouts')
  }

  // Crypted Password
  const cryptedPassword = await bcrypt.hash(password, 10)
  db.query(
    'INSERT INTO users (name, lastname, email, password) VALUES (?, ?, ?, ?)',
    [name, lastname, email, cryptedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, lastname, email });
    }
  );
});

// DELETE user
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM users WHERE id_user=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'user deleted successfully' });
  });
});

module.exports = router;
