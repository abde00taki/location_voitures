import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaCalendarAlt, FaCar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import NavBar from "../components/NavBar";

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
    <>
      <div className="d-none d-lg-flex">
        <NavBar show={true} />
      </div>

      <div className="container mt-4 position-relative">
        <div className="mt-4 mb-4 text-center">
          <h2 className="fw-bold" style={{ color: "rgba(251,138,1,1)" }}>
            Mes Commandes
          </h2>
        </div>

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
          <p className="text-center text-secondary">Aucune commande trouvée.</p>
        ) : (
          rents.map((rent) => (
            <div
              key={rent.id_rent}
              className="card mb-3 p-3 shadow-sm border-0"
              style={{
                borderRadius: "12px",
                transition: "0.3s",
                backgroundColor: "#fff",
              }}
            >
              <h5 className="fw-bold text-dark d-flex align-items-center gap-2">
                <FaCar color="rgba(251,138,1,1)" /> {rent.marque} - {rent.matricule}
              </h5>
              <p className="mb-1 text-secondary d-flex align-items-center gap-2">
                <FaCalendarAlt color="rgba(251,138,1,1)" /> 
                <strong>Départ:</strong> {new Date(rent.date_depart).toLocaleDateString()}
              </p>
              <p className="mb-1 text-secondary d-flex align-items-center gap-2">
                <FaCalendarAlt color="rgba(251,138,1,1)" /> 
                <strong>Fin:</strong> {new Date(rent.date_fin).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge bg-${
                    rent.status === "accepted"
                      ? "success"
                      : rent.status === "rejected"
                      ? "danger"
                      : rent.status === "drop"
                      ? "secondary"
                      : "warning"
                  }`}
                  style={{ fontSize: "0.9rem" }}
                >
                  {rent.status}
                </span>
              </p>

              {/* Drop Button */}
              {rent.status !== "drop" && (
                <button
                  className="btn mt-2 d-flex align-items-center gap-2"
                  style={{
                    backgroundColor: "rgba(251,138,1,0.1)",
                    color: "rgba(251,138,1,1)",
                    border: "1px solid rgba(251,138,1,0.3)",
                  }}
                  onClick={() => handleDrop(rent.id_rent)}
                >
                  <MdCancel /> cancel
                </button>
              )}
            </div>
          ))
        )}

        {/* ✅ Inline style for alert */}
        <style>{`
        .custom-alert {
          position: fixed;
          justify-content: "center"
          background: white;
          padding: 12px 20px;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          z-index: 999;
          animation: fadeSlide 0.5s ease;
          height: "100%"
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
          font-size: 22px;
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
    </>
  );
}
