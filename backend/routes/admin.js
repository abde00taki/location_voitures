const express = require("express");
const router = express.Router();
const db = require("../db"); 

// Route: GET /admin/stats
router.get("/stats", async (req, res) => {
  try {
    const [users] = await db.query("SELECT COUNT(*) AS total FROM users");
    const [cars] = await db.query("SELECT COUNT(*) AS total FROM car");
    const [rents] = await db.query("SELECT COUNT(*) AS total FROM rent");
    const [demandes] = await db.query("SELECT COUNT(*) AS total FROM notifications");
    const [accepted] = await db.query(
      "SELECT COUNT(*) AS total FROM notifications WHERE status = 'accepted'"
    );
    const [rejected] = await db.query(
      "SELECT COUNT(*) AS total FROM notifications WHERE status = 'rejected'"
    );

    res.json({
      users: users[0].total,
      cars: cars[0].total,
      rents: rents[0].total,
      demandes: demandes[0].total,
      accepted: accepted[0].total,
      rejected: rejected[0].total,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

module.exports = router;
