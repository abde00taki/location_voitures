import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import NavBar from "../components/NavBar";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8888/users/login", {
        email,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      alert(" Login successful!");
      navigate("/"); 
    } catch (err) {
      console.error(err);
      alert(" Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100">
      <div className="d-none d-lg-flex">
        <NavBar show={true} />
      </div>

      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div
          className="card shadow-lg p-4"
          style={{ width: "350px", borderRadius: "12px" }}
        >
          <h3 className="text-center mb-4">Sign In</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                <FaLock className="me-2" />
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
