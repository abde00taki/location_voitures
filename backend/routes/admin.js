// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // تأكد عندك db connection

// Get Admin Stats
router.get("/stats", (req, res) => {
  // 🔹 نجيب جميع الـ Stats + عدد الكراءات لكل يوم في آخر 7 أيام
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM car) AS cars,
      (SELECT COUNT(*) FROM rent WHERE status='pending') AS pending,
      (SELECT COUNT(*) FROM rent WHERE status='accepted') AS accepted,
      (SELECT COUNT(*) FROM rent WHERE status='rejected') AS rejected,
      (SELECT COUNT(*) FROM rent WHERE status='drop') AS dropped,
      (SELECT COUNT(*) FROM rent) AS total_rent
  `;

  db.query(sql, (err, statsResults) => {
    if (err) {
      console.error("Error fetching stats:", err);
      return res.status(500).send("Error fetching stats");
    }

    // 🔹 نجيب عدد الكراءات لكل يوم في آخر 7 أيام
    const sqlWeek = `
      SELECT DATE(created_at) AS day, COUNT(*) AS total
      FROM rent
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY day ASC
    `;

    db.query(sqlWeek, (err2, weekResults) => {
      if (err2) {
        console.error("Error fetching weekly stats:", err2);
        return res.status(500).send("Error fetching weekly stats");
      }

      res.json({
        ...statsResults[0],
        weekly: weekResults
      });
    });
  });
});

module.exports = router;
