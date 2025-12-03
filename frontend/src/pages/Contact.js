import { useState } from "react";
import API from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <h1 className="fw-bold mb-4">Contact the Lab</h1>

      <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label>Message</label>
          <textarea className="form-control" name="message" rows={4} value={form.message} onChange={handleChange} required />
        </div>

        <button className="btn btn-primary">Send</button>
      </form>
    </>
  );
}
