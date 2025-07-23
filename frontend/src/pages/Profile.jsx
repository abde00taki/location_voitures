import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaTrash } from "react-icons/fa";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setLastname(storedUser.lastname);
      setPreview(`http://localhost:8888/uploads/${storedUser.image}`);

      // جلب commandes ديال هاد المستخدم
      axios
        .get(`http://localhost:8888/rent`)
        .then((res) => {
          const myOrders = res.data.filter(
            (order) => order.id_user === storedUser.id_user
          );
          setOrders(myOrders);
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

  const handleDeleteOrder = (id_rent) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    axios
      .delete(`http://localhost:8888/rent/${id_rent}`)
      .then(() => {
        setOrders((prev) => prev.filter((o) => o.id_rent !== id_rent));
        alert("Order deleted.");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to delete order.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    if (image) formData.append("image", image);
    if (currentPassword) formData.append("currentPassword", currentPassword);
    if (newPassword) formData.append("newPassword", newPassword);

    axios
      .put(`http://localhost:8888/users/${user.id_user}`, formData)
      .then((res) => {
        alert(res.data.message || "Profile updated!");
        const updatedUser = {
          ...user,
          name,
          lastname,
          image: res.data.image || user.image,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setPreview(`http://localhost:8888/uploads/${updatedUser.image}`);
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Failed to update profile.");
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* icons dyal my comond */}
          <FaShoppingCart
            onClick={() => setShowOrders(!showOrders)}
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            title="My Orders"
          />
        </div>

        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {showOrders && (
          <div className="alert alert-info">
            <h6>My Orders</h6>
            {orders.length > 0 ? (
              <ul className="list-unstyled">
                {orders.map((order) => (
                  <li
                    key={order.id_rent}
                    className="d-flex justify-content-between align-items-center mb-1"
                  >
                    <span>
                      {order.marque} | {order.date_depart} → {order.date_fin} |{" "}
                      <strong>{order.status}</strong>
                    </span>
                    <button
                      onClick={() => handleDeleteOrder(order.id_rent)}
                      className="btn btn-sm btn-danger"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders yet.</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Lastname</label>
            <input
              type="text"
              className="form-control"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Update Profile
          </button>
        </form>

        <button onClick={handleSignOut} className="btn btn-danger w-100">
          Sign Out
        </button>
      </div>
    </div>
  );
}
