import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setLastname(storedUser.lastname);
      setPreview(`http://localhost:8888/uploads/${storedUser.image}`);

      axios
        .get(`http://localhost:8888/notifications/${storedUser.id_user}`)
        .then((res) => {
          setNotifications(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [navigate]);

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
        <NavLink to={'/comond/'+user.id_user}><FaRegAddressCard size={34}/></NavLink>

          <div className="position-relative mt-1">
            <FaBell
              onClick={() => setShowNotifications(!showNotifications)}
              style={{ cursor: "pointer", fontSize: "1.5rem" }}
            />
            {notifications.length > 0 && (
              <span
                className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: "0.75rem" }}
              >
                {notifications.length}
              </span>
            )}
          </div>
        </div>

        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>

        {showNotifications && (
          <div className="alert alert-info">
            <h6>Notifications</h6>
            <ul className="list-unstyled">
              {notifications.map((n) => (
                <li key={n.id_notification}>• {n.message}</li>
              ))}
            </ul>
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

          <button type="submit" className="btn  w-100 mb-2">
           <RxUpdate size={33} color="rgba(251, 138, 1, 1)" />
          </button>
        </form>

        <button onClick={handleSignOut} className="btn btn-danger w-100 d-none">
          Sign Out
        </button>
      </div>
    </div>
  );
}
