const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');

const router = express.Router();


// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


router.get('/cars', (req, res) => {
  db.query('SELECT * FROM car', (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// 🔷 POST new car + image
router.post('/cars', upload.single('image'), (req, res) => {
  const { marque, matricule, modele, status, price, fuel } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    'INSERT INTO car (marque, matricule, modele, status, price, fuel, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [marque, matricule, modele, status, price, fuel, image],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body, image });
    }
  );
});

// 🔷 PUT update car + optional image
router.put('/cars/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;

  const carData = {
    ...req.body
  };

  if (req.file) {
    carData.image = req.file.filename;
  }

  db.query('UPDATE car SET ? WHERE id_car = ?', [carData, id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Car updated' });
  });
});

// 🔷 DELETE car
router.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM car WHERE id_car = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Car deleted' });
  });
});

module.exports = router;
