import { useEffect, useState } from "react";
import API from "../services/api";

export default function Publications() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/publications").then(res => setList(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">Publications</h2>

      <div className="row">
        {list.map((p) => (
          <div key={p.id} className="col-md-6 mb-3">
            <div className="card shadow p-3">
              <h5>{p.title}</h5>
              <p>{p.authors} — {p.year}</p>
              <a href={p.link} target="_blank" rel="noreferrer">
                View Paper
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
