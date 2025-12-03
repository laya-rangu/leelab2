import { useEffect, useState } from "react";
import API from "../services/api";
import "./People.css";

export default function People() {
  const [faculty, setFaculty] = useState([]);
  const [students, setStudents] = useState([]);
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    const { data } = await API.get("/people");

    setFaculty(data.filter(p => p.role === "faculty"));
    setStudents(data.filter(p => p.is_current));
    setAlumni(data.filter(p => p.is_alumni));
  };

  return (
    <div className="people-container">

      <Section title="Faculty" data={faculty} />
      <Section title="Current Lab Members" data={students} />
      <Section title="Alumni" data={alumni} />

    </div>
  );
}

function Section({ title, data }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="people-grid">
        {data.map(p => (
          <div className="person-card" key={p.id}>
            <img src={p.photo} alt={p.name} />
            <h3>{p.name}</h3>
            <p><b>{p.education}</b></p>
            <p>{p.project}</p>
            <p>{p.bio}</p>
          </div>
        ))}
      </div>
    </>
  );
}
