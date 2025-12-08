// import { useState } from "react";
// import API from "../services/api";

// export default function Contact() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post("/contact", form);
//     alert("Message sent!");
//     setForm({ name: "", email: "", message: "" });
//   };

//   return (
//     <>
//       <h1 className="fw-bold mb-4">Contact the Lab</h1>

//       <form className="card shadow-sm p-4" onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Email</label>
//           <input className="form-control" type="email" name="email" value={form.email} onChange={handleChange} required />
//         </div>

//         <div className="mb-3">
//           <label>Message</label>
//           <textarea className="form-control" name="message" rows={4} value={form.message} onChange={handleChange} required />
//         </div>

//         <button className="btn btn-primary">Send</button>
//       </form>
//     </>
//   );
// }

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
    await API.post("/contact", form); // ⬅️ unchanged backend call
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* Top heading */}
      <h1 className="fw-bold mb-4 text-center">Send Us A Message</h1>

      {/* MAIN CARD: Map + Form */}
      <div
        className="card shadow-lg border-0 mb-5 mx-auto"
        style={{
          borderRadius: "24px",
          maxWidth: "1100px",
          backgroundColor: "#ffffff",
        }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="row g-4 align-items-start">
            {/* MAP */}
            <div className="col-lg-6">
              <div
                className="rounded-4 overflow-hidden shadow-sm"
                style={{ minHeight: "260px" }}
              >
                <iframe
                  title="Lee Lab Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2940.442054235023!2d-71.3325885228294!3d42.653410921792566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e3a48cd5e8875f%3A0x9bcd60698d05a995!2sOlsen%20Hall%2C%20198%20Riverside%20St%2C%20Lowell%2C%20MA%2001854!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* FORM */}
            <div className="col-lg-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Your Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    name="message" // 👈 still `message` for backend
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Message"
                  />
                </div>

                <button
                  type="submit"
                  className="btn fw-bold w-100"
                  style={{ backgroundColor: "#0b3b6a", color: "#fff" }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* INFO CARDS ROW */}
      <div
        className="card shadow-sm border-0 mx-auto mb-5"
        style={{ borderRadius: "24px", maxWidth: "1100px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="row text-center g-4">
            {/* Email */}
            <div className="col-md-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#e6f1ff",
                }}
              >
                <span className="fs-3">📧</span>
              </div>
              <h6 className="fw-semibold mb-1">Email</h6>
              <p className="mb-0 small">teresa@leewormlab.org</p>
            </div>

            {/* Twitter / Bluesky */}
            <div className="col-md-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#e6f1ff",
                }}
              >
                <span className="fs-3">🐦</span>
              </div>
              <h6 className="fw-semibold mb-1">Twitter / Bluesky</h6>
              <p className="mb-0 small">@snickclunk</p>
            </div>

            {/* Location */}
            <div className="col-md-4">
              <div
                className="d-inline-flex align-items-center justify-content-center mb-3"
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#e6f1ff",
                }}
              >
                <span className="fs-3">📍</span>
              </div>
              <h6 className="fw-semibold mb-1">Location</h6>
              <p className="mb-0 small">
                Department of Biological Sciences
                <br />
                612 Olsen Hall
                <br />
                Lowell, MA 01854
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
