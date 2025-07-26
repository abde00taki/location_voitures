import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function Comond() {
  const { id } = useParams();
  const [rents, setRents] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchRents();
  }, [id]);

  const fetchRents = () => {
    axios
      .get("http://localhost:8888/rent/user/" + id)
      .then((res) => setRents(res.data))
      .catch((err) => console.error(err));
  };

  const handleDrop = (id_rent) => {
    axios
      .put(`http://localhost:8888/rent/${id_rent}/drop`, {
        status: "drop",
        idUser: id,
      })
      .then(() => {
        fetchRents();
        showAlert("Commande annulée avec succès!", "error");
      })
      .catch((err) => console.error(err));
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="container mt-4 position-relative">
      <h2 className="mb-4">Commandes de l'utilisateur</h2>

      {/* ✅ Custom Alert */}
      {alert && (
        <div
          className={`custom-alert ${alert.type === "success" ? "success" : "error"}`}
        >
          {alert.type === "success" ? (
            <FaCheckCircle className="icon" />
          ) : (
            <FaTimesCircle className="icon" />
          )}
          <span>{alert.message}</span>
        </div>
      )}

      {rents.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        rents.map((rent) => (
          <div key={rent.id_rent} className="card mb-3 p-3 shadow">
            <h5>{rent.marque} - {rent.matricule}</h5>
            <p><strong>Départ:</strong> {new Date(rent.date_depart).toLocaleDateString()}</p>
            <p><strong>Fin:</strong> {new Date(rent.date_fin).toLocaleDateString()}</p>
            <p><strong>Status:</strong> 
              <span className={`badge bg-${rent.status === "accepted" ? "success" : rent.status === "rejected" ? "danger" : rent.status === "drop" ? "secondary" : "warning"}`}>
                {rent.status}
              </span>
            </p>

            {/* Drop Button */}
            {rent.status !== "drop" && (
              <button
                className="btn btn-outline-danger mt-2"
                onClick={() => handleDrop(rent.id_rent)}
              >
                Annuler
              </button>
            )}
          </div>
        ))
      )}

      {/* ✅ Inline style for alert */}
      <style>{`
        .custom-alert {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          z-index: 999;
          animation: fadeSlide 0.5s ease;
        }

        .custom-alert.success {
          border-left: 6px solid green;
          color: green;
        }

        .custom-alert.error {
          border-left: 6px solid red;
          color: red;
        }

        .custom-alert .icon {
          font-size: 20px;
        }

        @keyframes fadeSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
