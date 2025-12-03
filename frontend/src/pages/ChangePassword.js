import { useState } from "react";
import API from "../services/api";

export default function ChangePassword() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: ""
  });
  const [msg, setMsg] = useState("");

  const submit = async () => {
    try {
      await API.put("/auth/change-password", form);
      setMsg("✅ Password updated successfully");
      setForm({ oldPassword: "", newPassword: "" });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">

        <h4 className="fw-bold mb-3 text-center">Change Password</h4>

        <input
          type="password"
          className="form-control mb-2"
          placeholder="Old Password"
          value={form.oldPassword}
          onChange={(e) =>
            setForm({ ...form, oldPassword: e.target.value })
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="New Password"
          value={form.newPassword}
          onChange={(e) =>
            setForm({ ...form, newPassword: e.target.value })
          }
        />

        <button className="btn btn-primary w-100" onClick={submit}>
          Update Password
        </button>

        {msg && (
          <div className="alert alert-info mt-3 text-center">
            {msg}
          </div>
        )}

      </div>
    </div>
  );
}
