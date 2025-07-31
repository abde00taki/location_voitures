const express = require('express');
const router = express.Router();
const db = require('../db');
const qr = require("qrcode");
const path = require("path");
const fs = require("fs");


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
// hna kanjib comond li rj3o talab  
router.get('/drop', (req, res) => {
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
    WHERE rent.status = 'drop'
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

      const id_rent = result.insertId;
      const qrText = `Reservation ID: ${id_rent} | Car: ${id_car} | User: ${id_user}`;
      const qrFilename = `qr_${id_rent}.png`;
      const qrPath = path.join(__dirname, "../uploads", qrFilename);

      // ⬇ إنشاء QR code وتخزينه كصورة
      qr.toFile(qrPath, qrText, {}, (qrErr) => {
        if (qrErr) {
          console.error(qrErr);
          return res.status(500).json({ error: "QR code generation failed" });
        }

        // ⬇ تحديث الداتابيز بالمسار ديال QR
        const qrDbPath = `/uploads/${qrFilename}`;
        db.query(
          "UPDATE rent SET qr_code = ? WHERE id_rent = ?",
          [qrDbPath, id_rent],
          (updateErr) => {
            if (updateErr) {
              console.error(updateErr);
              return res.status(500).json({ error: "Failed to save QR path" });
            }

            res.json({
              id_rent,
              date_depart,
              date_fin,
              id_car,
              id_user,
              status: 'pending',
              qr_code: qrDbPath
            });
          }
        );
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
          ? 'Your reservation has been accepted ✅'
          : 'Your reservation has been rejected ';

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

// ✅ GET rent by ID (with car info and user info)
// ✅ GET all rents of a specific user
router.get('/user/:id_user', (req, res) => {
  const { id_user } = req.params;

  const sql = `
    SELECT 
      rent.*, 
      car.marque, 
      car.matricule 
    FROM rent 
    JOIN car ON rent.id_car = car.id_car 
    WHERE rent.id_user = ?
    ORDER BY rent.date_depart DESC
  `;

  db.query(sql, [id_user], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error', details: err.message });
    }

    res.json(results);
  });
});


// ✅ PUT drop rent
router.put('/:id/drop', (req, res) => {
  const rentId = req.params.id;

  db.query(
    `UPDATE rent SET status = 'drop' WHERE id_rent = ?`,
    [rentId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to update rent status', details: err.message });
      }

      res.json({ message: 'Reservation dropped successfully' });
    }
  );
});
// ✅ Accept rent + generate QR بدون async
router.put("/:id/accept", (req, res) => {
  const id_rent = req.params.id;

  // 1️⃣ جلب بيانات الحجز
  const sql = `
    SELECT r.*, c.marque, c.matricule, u.name, u.email
    FROM rent r
    JOIN car c ON r.id_car = c.id_car
    JOIN users u ON r.id_user = u.id_user
    WHERE r.id_rent = ?
  `;
  db.query(sql, [id_rent], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching rent" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Rent not found" });
    }

    const rentData = results[0];

    // 2️⃣ إنشاء محتوى QR
    const qrData = {
      Car: `${rentData.marque} - ${rentData.matricule}`,
      "Start Date": rentData.date_depart,
      "End Date": rentData.date_fin,
      Client: rentData.name,
      Email: rentData.email,
    };

    // 3️⃣ توليد QR Code Base64
    QRCode.toDataURL(JSON.stringify(qrData), (qrErr, qrCodeImage) => {
      if (qrErr) {
        console.error(qrErr);
        return res.status(500).json({ message: "QR Generation Error" });
      }

      // 4️⃣ تحديث الحالة مع QR Code
      const updateSql = "UPDATE rent SET status='accepted', qr_code=? WHERE id_rent=?";
      db.query(updateSql, [qrCodeImage, id_rent], (updateErr) => {
        if (updateErr) {
          console.error(updateErr);
          return res.status(500).json({ message: "Error updating rent" });
        }
        res.json({ message: "Rent accepted successfully!", qr: qrCodeImage });
      });
    });
  });
});

module.exports = router;
