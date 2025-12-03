import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ViewForms() {
  const [items, setItems] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Load contact forms (active or archived)
  const loadItems = useCallback(async () => {
    try {
      const url = showArchived
        ? "/contact?archived=true"
        : "/contact";

      const { data } = await API.get(url);
      setItems(data);
    } catch (err) {
      console.error("Load contact forms error:", err);
    }
  }, [showArchived]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ✅ Update admin note or responded
  const updateForm = async (id, admin_note, responded) => {
    try {
      await API.put(`/contact/${id}`, {
        admin_note: admin_note || "",
        responded: responded === true
      });

      setStatus("✅ Updated successfully");
      loadItems();
    } catch (err) {
      console.error("Update contact error:", err);
      setStatus("❌ Update failed");
    }
  };

  // ✅ Archive contact
  const archiveForm = async (id) => {
    if (!window.confirm("Archive this contact?")) return;
    try {
      await API.put(`/contact/archive/${id}`);
      loadItems();
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  // ✅ Restore contact
  const restoreForm = async (id) => {
    try {
      await API.put(`/contact/restore/${id}`);
      loadItems();
    } catch (err) {
      console.error("Restore error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Contact Requests (Admin)</h2>

      {/* ✅ ✅ TWO SEPARATE BUTTONS */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowArchived(false)}
        >
          View Active Requests
        </button>

        <button
          className={`btn ${showArchived ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          View Archived Requests
        </button>
      </div>

      {status && <div className="alert alert-info">{status}</div>}

      {items.length === 0 && (
        <p className="text-muted">No requests found.</p>
      )}

      {items.map((i) => (
        <div key={i.id} className="card p-3 mb-3 shadow">

          <h5>{i.name}</h5>
          <p><b>Email:</b> {i.email}</p>
          <p><b>Message:</b> {i.message}</p>

          {/* ✅ ACTIVE MODE CONTROLS */}
          {!showArchived && (
            <>
              {/* ✅ RESPONDED CHECKBOX */}
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={i.responded === true}
                  onChange={(e) =>
                    updateForm(i.id, i.admin_note || "", e.target.checked)
                  }
                />
                <label className="form-check-label fw-bold">
                  Mark as Responded
                </label>
              </div>

              {/* ✅ ADMIN NOTE */}
              <textarea
                className="form-control mb-2"
                placeholder="Admin private note..."
                value={i.admin_note || ""}
                onChange={(e) =>
                  updateForm(i.id, e.target.value, i.responded)
                }
              />

              {/* ✅ ARCHIVE BUTTON */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => archiveForm(i.id)}
              >
                Archive
              </button>
            </>
          )}

          {/* ✅ ARCHIVED MODE CONTROLS */}
          {showArchived && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreForm(i.id)}
            >
              Restore
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
