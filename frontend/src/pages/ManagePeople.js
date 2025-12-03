import { useEffect, useState } from "react";
import API from "../services/api";

export default function ManagePeople() {
  const [people, setPeople] = useState([]);
  const [activeTab, setActiveTab] = useState("student"); // student | faculty | alumni
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    role: "student",
    education: "",
    project: "",
    biography: "",
    photo: "",
    start_date: "",
    end_date: ""
  });

  // ✅ LOAD ALL ACTIVE PEOPLE
  const loadPeople = async () => {
    try {
      const { data } = await API.get("/people");
      setPeople(data);
    } catch (err) {
      console.error("Load people error:", err);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  // ✅ ADD OR UPDATE PERSON
  const submitPerson = async () => {
    try {
      if (editingId) {
        await API.put(`/people/${editingId}`, form);
      } else {
        await API.post("/people", form);
      }

      setForm({
        name: "",
        role: "student",
        education: "",
        project: "",
        biography: "",
        photo: "",
        start_date: "",
        end_date: ""
      });

      setEditingId(null);
      loadPeople();
    } catch (err) {
      alert("Failed to save person");
      console.error(err);
    }
  };

  // ✅ START EDIT
  const startEdit = (person) => {
    setEditingId(person.id);
    setForm({
      name: person.name,
      role: person.role,
      education: person.education,
      project: person.project,
      biography: person.biography,
      photo: person.photo,
      start_date: person.start_date || "",
      end_date: person.end_date || ""
    });
  };

  // ✅ ARCHIVE
  const archive = async (id) => {
    if (!window.confirm("Archive this person?")) return;
    await API.put(`/people/archive/${id}`);
    loadPeople();
  };

  // ✅ PROMOTE STUDENT → ALUMNI
  const promote = async (id) => {
    if (!window.confirm("Move this student to Alumni?")) return;
    await API.put(`/people/promote/${id}`);
    loadPeople();
    setActiveTab("alumni");
  };

  // ✅ FILTER BY BUTTON
  const filteredPeople = people.filter((p) => p.role === activeTab);

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-3">Manage People</h2>

      {/* ✅ ADD / EDIT FORM */}
      <div className="card p-3 mb-4 shadow">
        <div className="row g-2">

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-control"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="alumni">Alumni</option>
            </select>
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Education"
              value={form.education}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Project"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Photo URL"
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
            />
          </div>

          <div className="col-12">
            <textarea
              className="form-control"
              placeholder="Biography"
              value={form.biography}
              onChange={(e) => setForm({ ...form, biography: e.target.value })}
            />
          </div>

          {/* ✅ START DATE */}
          <div className="col-md-6">
            <label className="form-label fw-bold">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={form.start_date}
              onChange={(e) =>
                setForm({ ...form, start_date: e.target.value })
              }
            />
          </div>

          {/* ✅ END DATE ONLY FOR ALUMNI */}
          {form.role === "alumni" && (
            <div className="col-md-6">
              <label className="form-label fw-bold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={form.end_date}
                onChange={(e) =>
                  setForm({ ...form, end_date: e.target.value })
                }
              />
            </div>
          )}
        </div>

        <button className="btn btn-success mt-3" onClick={submitPerson}>
          {editingId ? "Update Person" : "Add Person"}
        </button>

        {editingId && (
          <button
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => {
              setEditingId(null);
              setForm({
                name: "",
                role: "student",
                education: "",
                project: "",
                biography: "",
                photo: "",
                start_date: "",
                end_date: ""
              });
            }}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* ✅ CATEGORY BUTTONS */}
      <div className="d-flex gap-2 mb-4">
        <button
          className={`btn ${activeTab === "faculty" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("faculty")}
        >
          Faculty
        </button>

        <button
          className={`btn ${activeTab === "student" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("student")}
        >
          Students
        </button>

        <button
          className={`btn ${activeTab === "alumni" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setActiveTab("alumni")}
        >
          Alumni
        </button>
      </div>

      {/* ✅ FILTERED PERSON LIST */}
      {filteredPeople.map((p) => (
        <div key={p.id} className="card p-3 mb-2 shadow-sm">

          <h5>{p.name} ({p.role})</h5>
          <p><b>Education:</b> {p.education}</p>
          <p><b>Project:</b> {p.project}</p>
          <p><b>Start:</b> {p.start_date || "N/A"}</p>
          {p.role === "alumni" && (
            <p><b>End:</b> {p.end_date || "N/A"}</p>
          )}

          <button
            className="btn btn-warning btn-sm"
            onClick={() => startEdit(p)}
          >
            Edit
          </button>

          {p.role === "student" && (
            <button
              className="btn btn-info btn-sm ms-2"
              onClick={() => promote(p.id)}
            >
              Push to Alumni
            </button>
          )}

          <button
            className="btn btn-danger btn-sm ms-2"
            onClick={() => archive(p.id)}
          >
            Archive
          </button>

        </div>
      ))}

    </div>
  );
}
