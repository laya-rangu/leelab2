import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ViewMaterialRequests() {
  const [items, setItems] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [status, setStatus] = useState("");

  // ✅ Load requests (active or archived)
  const loadItems = useCallback(async () => {
    try {
      const url = showArchived
        ? "/materials?archived=true"
        : "/materials";

      const { data } = await API.get(url);
      setItems(data);
    } catch (err) {
      console.error("Load material requests error:", err);
    }
  }, [showArchived]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // ✅ Update note or responded
  const updateRequest = async (id, admin_note, responded) => {
    try {
      await API.put(`/materials/${id}`, {
        admin_note: admin_note || "",
        responded: responded === true
      });

      setStatus("✅ Updated");
      loadItems();
    } catch (err) {
      console.error("Update error:", err);
      setStatus("❌ Update failed");
    }
  };

  // ✅ Archive request
  const archiveRequest = async (id) => {
    if (!window.confirm("Archive this request?")) return;

    try {
      await API.put(`/materials/archive/${id}`);
      loadItems();
    } catch (err) {
      console.error("Archive error:", err);
    }
  };

  // ✅ Restore request
  const restoreRequest = async (id) => {
    try {
      await API.put(`/materials/restore/${id}`);
      loadItems();
    } catch (err) {
      console.error("Restore error:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Material Requests (Admin)</h2>

      {/* ✅ ✅ ✅ TWO BUTTONS: ACTIVE & ARCHIVED */}
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

          <h5>{i.student_name}</h5>
          <p><b>Email:</b> {i.student_email}</p>
          <p><b>Project:</b> {i.project}</p>

          <b>Requested Equipment:</b>
          <ul>
            {Array.isArray(i.equipment) &&
              i.equipment.map((eq, idx) => (
                <li key={idx}>
                  <b>{eq.name}</b> → {eq.datetime}
                  <br />
                  <small>{eq.reason}</small>
                </li>
              ))}
          </ul>

          {/* ✅ ACTIVE REQUEST CONTROLS */}
          {!showArchived && (
            <>
              {/* ✅ RESPONDED CHECKBOX */}
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={i.responded === true}
                  onChange={(e) =>
                    updateRequest(i.id, i.admin_note || "", e.target.checked)
                  }
                />
                <label className="form-check-label fw-bold">
                  Mark as Responded
                </label>
              </div>

              {/* ✅ ADMIN NOTE */}
              <textarea
                className="form-control mb-2"
                placeholder="Admin private notes..."
                value={i.admin_note || ""}
                onChange={(e) =>
                  updateRequest(i.id, e.target.value, i.responded)
                }
              />

              {/* ✅ ARCHIVE BUTTON */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => archiveRequest(i.id)}
              >
                Archive
              </button>
            </>
          )}

          {/* ✅ ARCHIVED REQUEST CONTROLS */}
          {showArchived && (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreRequest(i.id)}
            >
              Restore
            </button>
          )}

        </div>
      ))}
    </div>
  );
}
