import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ManageNews() {
  const [news, setNews] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    source: ""
  });

  // ✅ LOAD NEWS
  const loadNews = useCallback(async () => {
    try {
      const url = showArchived ? "/news/archived" : "/news";
      const { data } = await API.get(url);
      setNews(data);
    } catch (err) {
      console.error("Load news error:", err);
    }
  }, [showArchived]);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // ✅ ADD or UPDATE NEWS
  const submitNews = async () => {
    try {
      if (editingId) {
        // ✅ UPDATE
        await API.put(`/news/${editingId}`, form);
      } else {
        // ✅ CREATE
        await API.post("/news", form);
      }

      setForm({
        title: "",
        description: "",
        image: "",
        source: ""
      });

      setEditingId(null);
      loadNews();
    } catch (err) {
      alert("Failed to save news");
      console.error(err);
    }
  };

  // ✅ START EDIT
  const startEdit = (n) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      description: n.description,
      image: n.image || "",
      source: n.source || ""
    });
  };

  // ✅ ARCHIVE
  const archiveNews = async (id) => {
    if (!window.confirm("Archive this news?")) return;
    await API.put(`/news/archive/${id}`);
    loadNews();
  };

  // ✅ RESTORE
  const restoreNews = async (id) => {
    await API.put(`/news/restore/${id}`);
    loadNews();
  };

  // ✅ DELETE
  const deleteNews = async (id) => {
    if (!window.confirm("Delete this news permanently?")) return;
    await API.delete(`/news/${id}`);
    loadNews();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Manage News</h2>

      {/* ✅ ACTIVE / ARCHIVED BUTTONS */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowArchived(false)}
        >
          Active News
        </button>

        <button
          className={`btn ${showArchived ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          Archived News
        </button>
      </div>

      {/* ✅ ADD / EDIT FORM (ONLY FOR ACTIVE) */}
      {!showArchived && (
        <div className="card p-3 mb-4 shadow">
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <input
            className="form-control mb-2"
            placeholder="Source (Twitter, Lab, etc)"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />

          <button className="btn btn-success" onClick={submitNews}>
            {editingId ? "Update News" : "Add News"}
          </button>

          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({
                  title: "",
                  description: "",
                  image: "",
                  source: ""
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* ✅ NEWS LIST */}
      {news.map((n) => (
        <div key={n.id} className="card p-3 mb-3 shadow">
          <h5>{n.title}</h5>
          <p>{n.description}</p>
          {n.source && <p className="text-muted">Source: {n.source}</p>}

          {!showArchived ? (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => startEdit(n)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => archiveNews(n.id)}
              >
                Archive
              </button>
            </>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreNews(n.id)}
            >
              Restore
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => deleteNews(n.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
