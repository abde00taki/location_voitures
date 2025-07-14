const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all rents
router.get('/', (req, res) => {
  db.query(
    `SELECT rent.*, car.marck, users.name 
     FROM rent 
     JOIN car ON rent.id_car = car.id_car 
     JOIN users ON rent.id_user = users.id_user`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// POST rent
router.post('/', (req, res) => {
  const { date_depar, date_fun, id_car, id_user } = req.body;
  db.query(
    'INSERT INTO rent (date_depar, date_fun, id_car, id_user) VALUES (?, ?, ?, ?)',
    [date_depar, date_fun, id_car, id_user],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, date_depar, date_fun, id_car, id_user });
    }
  );
});

module.exports = router;
