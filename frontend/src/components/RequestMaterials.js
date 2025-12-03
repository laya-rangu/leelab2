import { useEffect, useState } from "react";
import API from "../services/api";

export default function RequestMaterials() {
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const [form, setForm] = useState({
    student_name: "",
    student_email: "",
    project: "",
  });

  const [status, setStatus] = useState("");

  // ✅ Load equipment list from DB (for dropdown)
  useEffect(() => {
    API.get("/equipment").then((res) => setEquipmentList(res.data));
  }, []);

  // ✅ Handle base form
  const handleBaseChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ When student selects equipment
  const addEquipment = (e) => {
    const name = e.target.value;
    if (!name) return;

    // Avoid duplicates
    if (selectedEquipment.find((x) => x.name === name)) return;

    setSelectedEquipment([
      ...selectedEquipment,
      {
        name,
        reason: "",
        datetime: ""
      }
    ]);
  };

  // ✅ Update per-equipment details
  const updateEquipment = (index, field, value) => {
    const copy = [...selectedEquipment];
    copy[index][field] = value;
    setSelectedEquipment(copy);
  };

  // ✅ Remove selected equipment
  const removeEquipment = (index) => {
    const copy = [...selectedEquipment];
    copy.splice(index, 1);
    setSelectedEquipment(copy);
  };

  // ✅ Submit full request
  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/materials", {
        ...form,
        equipment: selectedEquipment // ✅ send structured data
      });

      setStatus("✅ Request submitted successfully!");

      setForm({
        student_name: "",
        student_email: "",
        project: ""
      });

      setSelectedEquipment([]);
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("❌ Failed to submit request");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-3">Lab Equipment Request (Students Only)</h2>

      {status && <div className="alert alert-info">{status}</div>}

      <form onSubmit={submit} className="card p-4 shadow">

        {/* ✅ Student Info */}
        <input
          name="student_name"
          className="form-control mb-3"
          placeholder="Your Full Name"
          value={form.student_name}
          onChange={handleBaseChange}
          required
        />

        <input
          name="student_email"
          type="email"
          className="form-control mb-3"
          placeholder="Your Email"
          value={form.student_email}
          onChange={handleBaseChange}
          required
        />

        <input
          name="project"
          className="form-control mb-3"
          placeholder="Project Name"
          value={form.project}
          onChange={handleBaseChange}
          required
        />

        {/* ✅ Equipment Dropdown */}
        <label className="fw-bold">Select Equipment</label>
        <select className="form-control mb-3" onChange={addEquipment}>
          <option value="">-- Choose Equipment --</option>
          {equipmentList.map((eq) => (
            <option key={eq.id} value={eq.name}>
              {eq.name}
            </option>
          ))}
        </select>

        {/* ✅ Selected Equipment Dynamic Section */}
        {selectedEquipment.map((eq, index) => (
          <div key={index} className="border p-3 mb-3 rounded shadow-sm">
            <h5>{eq.name}</h5>

            <textarea
              className="form-control mb-2"
              placeholder="Reason for request"
              value={eq.reason}
              onChange={(e) =>
                updateEquipment(index, "reason", e.target.value)
              }
              required
            />

            <label className="form-label">Date & Time Needed</label>
            <input
              type="datetime-local"
              className="form-control mb-2"
              value={eq.datetime}
              onChange={(e) =>
                updateEquipment(index, "datetime", e.target.value)
              }
              required
            />

            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => removeEquipment(index)}
            >
              Remove
            </button>
          </div>
        ))}

        <button className="btn btn-primary w-100 mt-3">
          Submit Request
        </button>
      </form>
    </div>
  );
}
