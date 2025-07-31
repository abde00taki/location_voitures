import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import NavBar from "../components/NavBar";
import PageWrapper from "../components/PageWrapper";
import Sidebar from "../components/SideBar";

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
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageWrapper >
        <div className="d-none d-lg-flex">
          <NavBar show={true} />
        </div>
        <div className="d-flex d-lg-none">
          <Sidebar />
        </div>

        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f2f5" }}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="card shadow-lg p-4"
            style={{
              width: "400px",
              borderRadius: "20px",
              border: "1px solid rgba(251, 138, 1, 0.3)",
              boxShadow: "0 4px 16px rgba(251, 138, 1, 0.3)",
              backgroundColor: "white",
            }}
          >
            <h3 className="text-center mb-4" style={{ color: "rgba(251, 138, 1, 1)" }}>Sign In</h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">
                  <FaEnvelope className="me-2 text-primary" />
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
                <label className="form-label fw-bold">
                  <FaLock className="me-2 text-primary" />
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
                className="btn w-100 mt-3 fw-bold"
                style={{
                  backgroundColor: "rgba(251, 138, 1, 1)",
                  border: "none",
                  color: "white",
                }}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="text-center mt-3">
                <small>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "rgba(251, 138, 1, 1)", textDecoration: "underline" }}>
                    Create one
                  </Link>
                </small>
              </div>
            </form>
          </motion.div>
        </div>
      </PageWrapper>
    </>
  );
}
