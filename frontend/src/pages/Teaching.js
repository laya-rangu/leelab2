import { useEffect, useState } from "react";
import API from "../services/api";

export default function Teaching() {
  const [current, setCurrent] = useState([]);
  const [past, setPast] = useState([]);

  useEffect(() => {
    // ✅ Load current semester (active)
    API.get("/teaching").then(res => setCurrent(res.data));

    // ✅ Load past semester (archived)
    API.get("/teaching/archived").then(res => setPast(res.data));
  }, []);

  return (
    <div className="container mt-5">

      {/* ✅ CURRENT SEMESTER */}
      <h2 className="fw-bold mb-4">Current Semester</h2>
      <div className="row mb-5">
        {current.length === 0 && (
          <p className="text-muted">No current courses available.</p>
        )}

        {current.map((c) => (
          <div key={c.id} className="col-md-4 mb-3">
            <div className="card shadow h-100 p-3">
              <h5>{c.course_name}</h5>
              <p><b>Code:</b> {c.course_code}</p>
              <p><b>Time:</b> {c.time}</p>
              <p><b>Location:</b> {c.location}</p>
              <p>{c.description}</p>
              <p><b>Prerequisites:</b> {c.prerequisites}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PAST OFFERED COURSES */}
      <h2 className="fw-bold mb-4">Past Offered Courses</h2>
      <div className="row">
        {past.length === 0 && (
          <p className="text-muted">No past courses available.</p>
        )}

        {past.map((c) => (
          <div key={c.id} className="col-md-4 mb-3">
            <div className="card shadow h-100 p-3 border-secondary">
              <h5>{c.course_name}</h5>
              <p><b>Code:</b> {c.course_code}</p>
              <p><b>Time:</b> {c.time}</p>
              <p><b>Location:</b> {c.location}</p>
              <p>{c.description}</p>
              <p><b>Prerequisites:</b> {c.prerequisites}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
