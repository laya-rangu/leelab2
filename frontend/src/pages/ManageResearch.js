import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ManageResearch() {
  const [items, setItems] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    people_involved: "",
    links: ""
  });

  const loadItems = useCallback(async () => {
    const url = showArchived ? "/research/archived" : "/research";
    const { data } = await API.get(url);
    setItems(data);
  }, [showArchived]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ✅ ADD or UPDATE
  const submitItem = async () => {
    if (editingId) {
      await API.put(`/research/${editingId}`, form);
    } else {
      await API.post("/research", form);
    }

    setForm({
      name: "",
      description: "",
      people_involved: "",
      links: ""
    });

    setEditingId(null);
    loadItems();
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      description: item.description,
      people_involved: item.people_involved,
      links: item.links
    });
  };

  const archiveItem = async (id) => {
    await API.put(`/research/archive/${id}`);
    loadItems();
  };

  const restoreItem = async (id) => {
    await API.put(`/research/restore/${id}`);
    loadItems();
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this research?")) return;
    await API.delete(`/research/${id}`);
    loadItems();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Manage Research</h2>

      {/* ✅ TWO BUTTONS */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowArchived(false)}
        >
          Ongoing Research
        </button>

        <button
          className={`btn ${showArchived ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          Past Research
        </button>
      </div>

      {/* ✅ ADD / EDIT FORM (ONLY ACTIVE) */}
      {!showArchived && (
        <div className="card p-3 mb-3">
          {Object.keys(form).map((k) => (
            <input
              key={k}
              className="form-control mb-2"
              placeholder={k.replace("_", " ").toUpperCase()}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}

          <button className="btn btn-success" onClick={submitItem}>
            {editingId ? "Update Research" : "Add Research"}
          </button>

          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({
                  name: "",
                  description: "",
                  people_involved: "",
                  links: ""
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* ✅ RESEARCH LIST */}
      {items.map((r) => (
        <div key={r.id} className="card p-3 mb-2 shadow">

          <h5>{r.name}</h5>
          <p>{r.description}</p>
          <p><b>People:</b> {r.people_involved}</p>
          <p><b>Links:</b> {r.links}</p>

          {!showArchived ? (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => startEdit(r)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => archiveItem(r.id)}
              >
                Archive
              </button>
            </>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreItem(r.id)}
            >
              Restore
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => deleteItem(r.id)}
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}
