import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth(); // ✅ USE CONTEXT LOGIN
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form.email, form.password); // ✅ USE CONTEXT LOGIN
      navigate("/"); // ✅ Redirect after success
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            name="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
