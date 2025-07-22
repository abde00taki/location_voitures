const express = require('express');
const router = express.Router();
const db = require('../db');

// 📥 Get all notifications for a user
router.get('/notifications/:id_user', (req, res) => {
  db.query(
    'SELECT * FROM notifications WHERE id_user = ? ORDER BY created_at DESC',
    [req.params.id_user],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});

// 📝 Admin updates rent status + add notification
router.put('/rent/:id_rent', (req, res) => {
  const { status, id_user } = req.body;

  if (!['pending', 'accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  db.query(
    'UPDATE rent SET status = ? WHERE id_rent = ?',
    [status, req.params.id_rent],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // 📩 Add notification for the user
      db.query(
        'INSERT INTO notifications (id_user, message) VALUES (?, ?)',
        [id_user, `Your reservation was ${status}`],
        (err2) => {
          if (err2) return res.status(500).json({ error: err2.message });

          res.json({ message: `Reservation updated and user notified: ${status}` });
        }
      );
    }
  );
});

module.exports = router;
