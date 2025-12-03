import { useEffect, useState } from "react";
import API from "../services/api";

export default function Research() {
  const [current, setCurrent] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    API.get("/research").then(res => setCurrent(res.data));
    API.get("/research/archived").then(res => setPast(res.data));
  }, []);

  return (
    <div className="container mt-5">

      {/* ✅ CURRENT / ONGOING */}
      <h2 className="fw-bold mb-4">Ongoing Research</h2>
      <div className="row mb-5">
        {current.length === 0 && <p className="text-muted">No ongoing research.</p>}

        {current.map((r) => (
          <div key={r.id} className="col-md-4 mb-3">
            <div className="card shadow h-100 p-3">
              <h5>{r.name}</h5>
              <p>{r.description}</p>
              <p><b>People:</b> {r.people_involved}</p>
              <p><b>Links:</b> {r.links}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PAST RESEARCH */}
      <h2 className="fw-bold mb-4">Past Research</h2>
      <div className="row">
        {past.length === 0 && <p className="text-muted">No past research.</p>}

        {past.map((r) => (
          <div key={r.id} className="col-md-4 mb-3">
            <div className="card shadow h-100 p-3 border-secondary">
              <h5>{r.name}</h5>
              <p>{r.description}</p>
              <p><b>People:</b> {r.people_involved}</p>
              <p><b>Links:</b> {r.links}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
