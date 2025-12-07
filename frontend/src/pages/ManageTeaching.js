import { useEffect, useState, useCallback } from "react";
import API from "../services/api";

export default function ManageTeaching() {
  const [courses, setCourses] = useState([]);
  const [showArchived, setShowArchived] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    course_name: "",
    course_code: "",
    time: "",
    location: "",
    description: "",
    prerequisites: ""
  });

  const loadCourses = useCallback(async () => {
    const url = showArchived ? "/teaching/archived" : "/teaching";
    const { data } = await API.get(url);
    setCourses(data);
  }, [showArchived]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  // ✅ ADD or UPDATE
  const submitCourse = async () => {
    if (editingId) {
      // ✅ UPDATE
      await API.put(`/teaching/${editingId}`, form);
    } else {
      // ✅ CREATE
      await API.post("/teaching", form);
    }

    setForm({
      course_name: "",
      course_code: "",
      time: "",
      location: "",
      description: "",
      prerequisites: ""
    });

    setEditingId(null);
    loadCourses();
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setForm({
      course_name: course.course_name,
      course_code: course.course_code,
      time: course.time,
      location: course.location,
      description: course.description,
      prerequisites: course.prerequisites
    });
  };

  const archiveCourse = async (id) => {
    await API.put(`/teaching/archive/${id}`);
    loadCourses();
  };

  const restoreCourse = async (id) => {
    await API.put(`/teaching/restore/${id}`);
    loadCourses();
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    await API.delete(`/teaching/${id}`);
    loadCourses();
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Manage Teaching</h2>

      {/* ✅ TWO BUTTONS */}
      <div className="mb-3 d-flex gap-2">
        <button
          className={`btn ${!showArchived ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setShowArchived(false)}
        >
          Active Semester
        </button>

        <button
          className={`btn ${showArchived ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={() => setShowArchived(true)}
        >
          Archived Semester
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

          <button className="btn btn-success" onClick={submitCourse}>
            {editingId ? "Update Course" : "Add Course"}
          </button>

          {editingId && (
            <button
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingId(null);
                setForm({
                  course_name: "",
                  course_code: "",
                  time: "",
                  location: "",
                  description: "",
                  prerequisites: ""
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      )}

      {/* ✅ COURSE LIST */}
      {courses.map((c) => (
        <div key={c.id} className="card p-3 mb-2 shadow">

          <h5>{c.course_name} ({c.course_code})</h5>
          <p><b>Time:</b> {c.time}</p>
          <p><b>Location:</b> {c.location}</p>
          <p><b>Description:</b> {c.description}</p>
          <p><b>Prerequisites:</b> {c.prerequisites}</p>
          <div className="d-flex gap-2 flex-wrap mt-2">
          {!showArchived ? (
            <>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => startEdit(c)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm ms-2"
                onClick={() => archiveCourse(c.id)}
              >
                Archive
              </button>
            </>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => restoreCourse(c.id)}
            >
              Restore
            </button>
          )}

          <button
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={() => deleteCourse(c.id)}
          >
            Delete
          </button>
        </div>
        </div>
      ))}
    </div>
  );
}
