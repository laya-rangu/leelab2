import { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  // ✅ Load users
  const loadUsers = async () => {
    try {
      const { data } = await API.get("/auth/users");
      setUsers(data);
    } catch (err) {
      console.error("Load users error:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // ✅ Add OR Update User
  const submitUser = async () => {
    try {
      if (editingId) {
        // ✅ UPDATE
        await API.put(`/auth/users/${editingId}`, {
          name: form.name,
          email: form.email,
          role: form.role
        });
      } else {
        // ✅ CREATE
        await API.post("/auth/register", form);
      }

      setForm({
        name: "",
        email: "",
        password: "",
        role: "student"
      });

      setEditingId(null);
      loadUsers();
    } catch (err) {
      alert("Failed to save user");
      console.error(err);
    }
  };

  // ✅ Start Edit
  const startEdit = (u) => {
    setEditingId(u.id);
    setForm({
      name: u.name,
      email: u.email,
      password: "",
      role: u.role
    });
  };

  // ✅ Delete
  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await API.delete(`/auth/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-3">Manage Users</h2>

      {/* ✅ ADD / EDIT FORM */}
      <div className="card p-3 mb-4 shadow">
        <div className="row g-2">

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {!editingId && (
            <div className="col-md-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />
            </div>
          )}

          <div className="col-md-2">
            <select
              className="form-control"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>

        <button className="btn btn-success mt-3" onClick={submitUser}>
          {editingId ? "Update User" : "Add User"}
        </button>

        {editingId && (
          <button
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                email: "",
                password: "",
                role: "student"
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* ✅ USER LIST */}
      <div className="row">
        {users.map((u) => (
          <div key={u.id} className="col-md-4 mb-3">
            <div className="card p-3 shadow-sm h-100">

              <h5>{u.name}</h5>
              <p>{u.email}</p>
              <p><b>Role:</b> {u.role}</p>

              <button
                className="btn btn-warning btn-sm"
                onClick={() => startEdit(u)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
