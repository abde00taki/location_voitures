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

// POST user  Sign Up
router.post('/', async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if(!name || !lastname || !email || !password){
    return res.status(400).send('invalid ipouts')
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


// POST user  Sign In
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ message: "Data required!" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email.trim().toLowerCase()], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (!result.length) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result[0];
    const isEqual = bcrypt.compareSync(password, user.password);

    if (!isEqual) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  });
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
