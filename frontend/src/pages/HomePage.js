/*port { useEffect, useState } from "react";
import API from "../services/api";

export default function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    API.get("/carousel").then((res) => setImages(res.data));
  }, []);

  return (
    <>
      
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {images.map((img, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={img.id}>
              <img
                src={img.image_url}
                className="d-block w-100"
                style={{ height: "550px", objectFit: "cover" }}
                alt="carousel"
              />
            </div>
          ))}

        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}
*/
import { useEffect, useState } from "react";
import API from "../services/api";

export default function HomePage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const res = await API.get("/carousel");   // ✅ MUST MATCH BACKEND
        console.log("CAROUSEL IMAGES:", res.data); // ✅ DEBUG LINE
        setImages(res.data);
      } catch (err) {
        console.error("Carousel load error:", err);
      }
    };

    loadImages();
  }, []);

  return (
    <>
      <div id="carousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">

          {images.length === 0 && (
            <div className="text-center p-5 fw-bold">
              No carousel images found
            </div>
          )}

          {images.map((img, index) => (
            <div
              key={img.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={img.image_url}
                className="d-block w-100"
                style={{ height: "550px", objectFit: "cover" }}
                alt="carousel"
              />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </>
  );
}
