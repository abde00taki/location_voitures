const express = require("express");
const router = express.Router();
const db = require("../db"); // اتصال بقاعدة البيانات

// تسجيل أو تعديل تقييم
router.post("/", (req, res) => {
  const { id_car, id_user, star } = req.body;

  if (!id_car || !id_user || typeof star !== 'number' || star < 0 || star > 5) {
    return res.status(400).json({ error: "Invalid or missing fields" });
  }

  const checkQuery = "SELECT * FROM car_ratings WHERE id_car = ? AND id_user = ?";
  db.query(checkQuery, [id_car, id_user], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length > 0) {
      const updateQuery = "UPDATE car_ratings SET star = ? WHERE id_car = ? AND id_user = ?";
      db.query(updateQuery, [star, id_car, id_user], (err2) => {
        if (err2) return res.status(500).json({ error: "Failed to update rating" });
        updateCarAverage(id_car, res);
      });
    } else {
      const insertQuery = "INSERT INTO car_ratings (id_car, id_user, star) VALUES (?, ?, ?)";
      db.query(insertQuery, [id_car, id_user, star], (err3) => {
        if (err3) return res.status(500).json({ error: "Failed to insert rating" });
        updateCarAverage(id_car, res);
      });
    }
  });
});

// حساب المتوسط وتحديث جدول السيارة
function updateCarAverage(id_car, res) {
  const avgQuery = "SELECT AVG(star) AS avg_star FROM car_ratings WHERE id_car = ?";
  db.query(avgQuery, [id_car], (err, results) => {
    if (err) return res.status(500).json({ error: "Failed to calculate average" });

    const avgStar = results[0].avg_star || 0;

    const updateCar = "UPDATE car SET star = ? WHERE id_car = ?";
    db.query(updateCar, [avgStar, id_car], (err2) => {
      if (err2) return res.status(500).json({ error: "Failed to update car" });

      res.status(200).json({ message: "Rating saved and average updated", avg: avgStar });
    });
  });
}

// Route: جلب المتوسط فقط
router.get("/:id_car", (req, res) => {
  const { id_car } = req.params;

  const avgQuery = "SELECT AVG(star) AS avg_star FROM car_ratings WHERE id_car = ?";
  db.query(avgQuery, [id_car], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const avg = results[0].avg_star || 0;
    res.json({ average: avg });
  });
});

module.exports = router;
