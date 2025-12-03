import { useEffect, useState } from "react";
import API from "../services/api";

export default function ManageEquipment() {
  const [equipment, setEquipment] = useState([]);
  const [newName, setNewName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadEquipment();
  }, []);

  // ✅ Load all equipment
  const loadEquipment = async () => {
    try {
      const { data } = await API.get("/equipment");
      setEquipment(data);
    } catch (err) {
      console.error("Load equipment error:", err);
    }
  };

  // ✅ Add new equipment
  const addEquipment = async () => {
    if (!newName.trim()) {
      setStatus("❌ Equipment name cannot be empty");
      return;
    }

    try {
      await API.post("/equipment", { name: newName });
      setNewName("");
      setStatus("✅ Equipment added");
      loadEquipment();
    } catch (err) {
      console.error("Add equipment error:", err);
      setStatus("❌ Failed to add equipment");
    }
  };

  // ✅ Delete equipment
  const deleteEquipment = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      await API.delete(`/equipment/${id}`);
      setStatus("✅ Equipment removed");
      loadEquipment();
    } catch (err) {
      console.error("Delete equipment error:", err);
      setStatus("❌ Failed to delete equipment");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Manage Equipment (Admin)</h2>

      {status && <div className="alert alert-info">{status}</div>}

      {/* ✅ Add New Equipment */}
      <div className="card p-3 mb-4 shadow">
        <div className="d-flex">
          <input
            className="form-control me-2"
            placeholder="Enter new equipment name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button className="btn btn-success" onClick={addEquipment}>
            Add
          </button>
        </div>
      </div>

      {/* ✅ Equipment List */}
      <div className="card p-3 shadow">
        <h5 className="mb-3">Current Equipment List</h5>

        {equipment.length === 0 && (
          <p className="text-muted">No equipment added yet.</p>
        )}

        {equipment.map((item) => (
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
          >
            <span>{item.name}</span>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteEquipment(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
