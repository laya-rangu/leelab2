import { useEffect, useState } from "react";
import API from "../services/api";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardAdmin() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Dashboard load error:", err));
  }, []);

  if (!stats) return <div className="text-center mt-5">Loading Dashboard...</div>;

  // ✅ BAR CHART DATA
  const barData = {
    labels: ["News", "Publications", "Research", "Teaching"],
    datasets: [
      {
        label: "Website Content",
        data: [
          stats.news,
          stats.publications,
          stats.research,
          stats.teaching,
        ],
        backgroundColor: ["#0d6efd", "#198754", "#ffc107", "#dc3545"],
      },
    ],
  };

  // ✅ DOUGHNUT DATA
  const doughnutData = {
    labels: ["Users", "People", "Alumni"],
    datasets: [
      {
        data: [stats.users, stats.people, stats.alumni],
        backgroundColor: ["#0dcaf0", "#6f42c1", "#fd7e14"],
      },
    ],
  };

  return (
    <div className="container mt-4">

      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      {/* ✅ INFO CARDS */}
      <div className="row g-3 mb-4">

        {[
          ["Users", stats.users, "primary"],
          ["People", stats.people, "success"],
          ["Alumni", stats.alumni, "warning"],
          ["News", stats.news, "info"],
          ["Publications", stats.publications, "secondary"],
          ["Research", stats.research, "dark"],
          ["Teaching", stats.teaching, "danger"],
          ["Material Requests", stats.materials, "success"],
          ["Contact Forms", stats.contacts, "primary"],
        ].map(([label, value, color], i) => (
          <div key={i} className="col-md-4 col-lg-3">
            <div className={`card text-bg-${color} shadow p-3`}>
              <h6>{label}</h6>
              <h2 className="fw-bold">{value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ GRAPHS */}
      <div className="row">

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5 className="fw-bold text-center">Website Content Overview</h5>
            <Bar data={barData} />
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow">
            <h5 className="fw-bold text-center">Users & Lab Members</h5>
            <Doughnut data={doughnutData} />
          </div>
        </div>

      </div>
    </div>
  );
}
