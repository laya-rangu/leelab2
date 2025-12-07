import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ManagePublications() {
  const [items, setItems] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    authors: "",
    year: "",
    link: ""
  });

  const loadItems = useCallback(async () => {
    const url = showArchived ? "/publications/archived" : "/publications";
    const { data } = await API.get(url);
    setItems(data);
  }, [showArchived]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ✅ ADD or UPDATE
  const submitItem = async () => {
    if (editingId) {
      await API.put(`/publications/${editingId}`, form);
    } else {
      await API.post("/publications", form);
    }

    setForm({
      title: "",
      authors: "",
      year: "",
      link: ""
    });

    setEditingId(null);
    loadItems();
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      authors: p.authors,
      year: p.year,
      link: p.link
    });
  };

  const archiveItem = async (id) => {
    await API.put(`/publications/archive/${id}`);
    loadItems();
  };

  const restoreItem = async (id) => {
    await API.put(`/publications/restore/${id}`);
    loadItems();
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this publication?")) return;
    await API.delete(`/publications/${id}`);
    loadItems();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Manage Publications</h2>

      {/* ✅ TWO BUTTONS */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowArchived(false)}
        >
          Active Publications
        </button>

        <button
          className={`btn ${showArchived ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          Archived Publications
        </button>
      </div>

      {/* ✅ ADD / EDIT ONLY IN ACTIVE */}
      {!showArchived && (
        <div className="card p-3 mb-3">
          {Object.keys(form).map((k) => (
            <input
              key={k}
              className="form-control mb-2"
              placeholder={k.toUpperCase()}
              value={form[k]}
              onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            />
          ))}

          <button className="btn btn-success" onClick={submitItem}>
            {editingId ? "Update Publication" : "Add Publication"}
          </button>

          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  authors: "",
                  year: "",
                  link: ""
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* ✅ LIST */}
      {items.map((p) => (
        <div key={p.id} className="card p-3 mb-2 shadow">

          <h5>{p.title}</h5>
          <p><b>Authors:</b> {p.authors}</p>
          <p><b>Year:</b> {p.year}</p>

          <a href={p.link} target="_blank" rel="noreferrer">
            Publication Link
          </a>
          <div className="d-flex gap-2 flex-wrap mt-2">
          {!showArchived ? (
            <>
                         
              <button
                className="btn btn-warning btn-sm"
                onClick={() => startEdit(p)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => archiveItem(p.id)}
              >
                Archive
              </button>
            </>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreItem(p.id)}
            >
              Restore
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => deleteItem(p.id)}
          >
            Delete
          </button>
        </div> 
        </div>
        
      ))}
    </div>
  );
}
