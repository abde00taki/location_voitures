const express = require('express');
const router = express.Router();
const db = require('../db');

// 🔷 GET all rents
router.get('/', (req, res) => {
  db.query(
    `
    SELECT 
      rent.*, 
      car.marque, 
      car.matricule, 
      users.name, 
      users.lastname, 
      users.email 
    FROM rent 
    JOIN car ON rent.id_car = car.id_car 
    JOIN users ON rent.id_user = users.id_user
    `,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(results);
    }
  );
});

// hna kanjib comond li allah wslat  
router.get('/pending', (req, res) => {
  db.query(
    `
    SELECT 
      rent.*, 
      car.marque, 
      car.matricule, 
      users.name, 
      users.lastname, 
      users.email 
    FROM rent 
    JOIN car ON rent.id_car = car.id_car 
    JOIN users ON rent.id_user = users.id_user
    WHERE rent.status = 'pending'
    `,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(results);
    }
  );
});
// hna kanjib comond li 9belt 
router.get('/accepted', (req, res) => {
  db.query(
    `
    SELECT 
      rent.*, 
      car.marque, 
      car.matricule, 
      users.name, 
      users.lastname, 
      users.email 
    FROM rent 
    JOIN car ON rent.id_car = car.id_car 
    JOIN users ON rent.id_user = users.id_user
    WHERE rent.status = 'accepted'
    `,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(results);
    }
  );
});
// hna kanjib comond li ma9beltch  
router.get('/rejected', (req, res) => {
  db.query(
    `
    SELECT 
      rent.*, 
      car.marque, 
      car.matricule, 
      users.name, 
      users.lastname, 
      users.email 
    FROM rent 
    JOIN car ON rent.id_car = car.id_car 
    JOIN users ON rent.id_user = users.id_user
    WHERE rent.status = 'rejected'
    `,
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(results);
    }
  );
});


// 🔷 POST new rent
router.post('/', (req, res) => {
  const { date_depart, date_fin, id_car, id_user } = req.body;

  if (!date_depart || !date_fin || !id_car || !id_user) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    `
    INSERT INTO rent (date_depart, date_fin, id_car, id_user, status)
    VALUES (?, ?, ?, ?, 'pending')
    `,
    [date_depart, date_fin, id_car, id_user],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      res.json({
        id_rent: result.insertId,
        date_depart,
        date_fin,
        id_car,
        id_user,
        status: 'pending'
      });
    }
  );
});

// 🔷 PUT update rent status
router.put('/:id', (req, res) => {
  const { status, idUser } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  // 🟢 Step 1: Update rent status
  db.query(
    `UPDATE rent SET status = ? WHERE id_rent = ?`,
    [status, req.params.id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Database error', details: err.message });
      }

      // 🟢 Step 2: Insert notification
      const message =
        status === 'accepted'
          ? 'Your reservation has been accepted'
          : 'Your reservation has been rejected';

      db.query(
        `INSERT INTO notifications (id_user, message) VALUES (?, ?)`,
        [idUser, message],
        (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to insert notification', details: err.message });
          }

          if (status === 'accepted') {
            // 🟢 Step 3: If accepted, mark car as rented
            db.query(
              `
              UPDATE car 
              SET status = 'rented'
              WHERE id_car = (
                SELECT id_car FROM rent WHERE id_rent = ?
              )
              `,
              [req.params.id],
              (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({ error: 'Failed to update car status', details: err.message });
                }

                res.json({ message: `Reservation accepted and user notified` });
              }
            );
          } else {
            res.json({ message: `Reservation rejected and user notified` });
          }
        }
      );
    }
  );
});

module.exports = router;
