import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "Priyanshu" && password === "12345") {
      localStorage.setItem("admin_token", "some-token");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-white px-3 py-5">
      <div className="position-relative w-100" style={{ maxWidth: "420px" }}>
        {/* Gradient Blur Background */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
          style={{
            background: "linear-gradient(to right, #d946ef, #6366f1, #06b6d4)",
            opacity: 0.5,
            filter: "blur(30px)",
            zIndex: 1,
          }}
        ></div>

        <div className="position-relative bg-white border border-light rounded-4 shadow-lg p-4" style={{ zIndex: 10 }}>
          <div className="d-flex justify-content-center mb-4">
            <ShieldCheck size={56} className="text-primary" />
          </div>
          <h1 className="text-center fw-bold fs-3 mb-2 text-dark">Admin Portal</h1>
          <p className="text-center text-muted mb-4">Sign in to continue</p>

          <div className="mb-3">
            <input
              type="text"
              className="form-control py-2"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control py-2 pe-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="btn position-absolute top-50 end-0 translate-middle-y pe-3 text-muted"
              aria-label={showPassword ? "Hide password" : "Show password"}
              style={{ background: "none", border: "none" }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 mt-3 py-2"
          >
            <span>Login</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
