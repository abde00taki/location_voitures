import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setLastname(storedUser.lastname);
      setEmail(storedUser.email);
      setPreview(`http://localhost:8888/uploads/${storedUser.image}`);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastname", lastname);
    formData.append("email", email);
    if (image) formData.append("image", image);

    axios
      .put(`http://localhost:8888/users/${user.id_user}`, formData)
      .then((res) => {
        alert("Profile updated!");
        const updatedUser = { ...user, ...res.data };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setPreview(`http://localhost:8888/uploads/${res.data.image}`);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update profile.");
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
        <h3 className="text-center mb-4">My Profile</h3>
        <div className="text-center mb-3">
          <img
            src={preview}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
        </div>
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
