const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Get all cars with last rent status and order by star
router.get("/", (req, res) => {
  const sql = `
    SELECT c.*,
      r.status AS rent_status
    FROM car c
    LEFT JOIN rent r 
      ON c.id_car = r.id_car 
      AND r.id_rent = (
          SELECT MAX(id_rent) 
          FROM rent 
          WHERE id_car = c.id_car
      )
    ORDER BY c.star DESC, c.id_car DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching cars:", err);
      return res.status(500).send("Error fetching cars");
    }

    res.json(results);
  });
});

// hada li kaykon fi sef7a dyal home ou kaytle3 lwel 
router.get('/best', (req, res) => {
  db.query('SELECT * FROM car WHERE star > 3.5', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});
//  git car by id 
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM car WHERE id_car = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Car not found' });
    res.json(results[0]);
  });
});

// POST car with image
router.post('/', upload.single('image'), (req, res) => {
  const { marque, matricule, modele, price, fuel } = req.body;
  const image = req.file ? req.file.filename : null;

  db.query(
    'INSERT INTO car (marque, matricule, modele, price, fuel, image) VALUES ( ?, ?, ?, ?, ?, ?)',
    [marque, matricule, modele, price, fuel, image],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, marque, matricule, modele, price, fuel, image });
    }
  );
});

// PUT update car
router.put('/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { marque, matricule, modele, price, fuel } = req.body;
  const image = req.file ? req.file.filename : null;

  let query = 'UPDATE car SET marque=?, matricule=?, modele=?, price=?, fuel=?';
  const values = [marque, matricule, modele, price, fuel];

  if (image) {
    query += ', image=?';
    values.push(image);
  }

  query += ' WHERE id_car=?';
  values.push(id);

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car updated successfully' });

  });
});

// DELETE car
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM car WHERE id_car=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Car deleted successfully' });
  });
});

module.exports = router;
