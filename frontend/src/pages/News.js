import { useEffect, useState } from "react";
import API from "../services/api";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get("/news").then(res => setNews(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h1>Lab News</h1>

      {news.map(n => (
        <div key={n.id} className="card p-3 mb-3 shadow">
          <h4>{n.title}</h4>
          <p>{n.description}</p>

          {n.image && (
           <img
  src={n.image}
  alt={n.title || "News image"}
  style={{ maxWidth: "300px", borderRadius: "8px" }}
/>

          )}

          {n.source && <small>Source: {n.source}</small>}
        </div>
      ))}
    </div>
  );
}
