const express = require("express");
const router = express.Router();
const db = require("../db");

// 🔷 GET all rents
router.get("/", (req, res) => {
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
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }
      res.json(results);
    }
  );
});

// 🔷 POST new rent
router.post("/", (req, res) => {
  const { dateDepart, dateFin, idCar, idUser } = req.body;

  if (!dateDepart || !dateFin || !idCar || !idUser) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    `
    INSERT INTO rent (date_depart, date_fin, id_car, id_user, status)
    VALUES (?, ?, ?, ?, 'pending')
    `,
    [dateDepart, dateFin, idCar, idUser],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      res.json({
        idRent: result.insertId,
        dateDepart,
        dateFin,
        idCar,
        idUser,
        status: "pending",
      });
    }
  );
});

// 🔷 PUT update rent status (admin)
router.put("/:idRent", (req, res) => {
  const { status, idUser } = req.body;

  if (!["pending", "accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  // ✅ update rent status
  db.query(
    `
    UPDATE rent SET status = ? WHERE id_rent = ?
    `,
    [status, req.params.idRent],
    (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Database error", details: err.message });
      }

      // ✅ if accepted => update car & add notification
      if (status === "accepted") {
        db.query(
          `
          UPDATE car 
          SET status = 'rented' 
          WHERE id_car = (
            SELECT id_car FROM rent WHERE id_rent = ?
          )
          `,
          [req.params.idRent],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Failed to update car status",
                details: err.message,
              });
            }

            // ✅ insert notification
            db.query(
              `
              INSERT INTO notifications (id_user, message) 
              VALUES (?, ?)
              `,
              [idUser, "Your reservation has been accepted ✅"],
              (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).json({
                    error: "Failed to create notification",
                    details: err.message,
                  });
                }

                res.json({
                  message: "Reservation accepted, car rented & user notified",
                });
              }
            );
          }
        );
      } else if (status === "rejected") {
        // ✅ insert notification rejected
        db.query(
          `
          INSERT INTO notifications (id_user, message) 
          VALUES (?, ?)
          `,
          [idUser, "Your reservation has been rejected ❌"],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Failed to create notification",
                details: err.message,
              });
            }

            res.json({ message: "Reservation rejected & user notified" });
          }
        );
      } else {
        res.json({ message: `Reservation updated to ${status}` });
      }
    }
  );
});

module.exports = router;
