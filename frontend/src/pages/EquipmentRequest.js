import { useState } from "react";
import API from "../services/api";

export default function EquipmentRequest() {
  const [form, setForm] = useState({
    itemName: "",
    quantity: 1,
    purpose: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/material-requests", form);
    alert("Request submitted!");
  };

  return (
    <>
      <h1 className="fw-bold mb-4">Request Lab Materials</h1>

      <form className="card p-4 shadow" onSubmit={submit}>
        <div className="mb-3">
          <label>Item Name</label>
          <input className="form-control" name="itemName" value={form.itemName} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input className="form-control" type="number" name="quantity" min={1} value={form.quantity} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Purpose</label>
          <textarea className="form-control" name="purpose" rows={3} value={form.purpose} onChange={handleChange} required />
        </div>

        <button className="btn btn-primary">Submit Request</button>
      </form>
    </>
  );
}
