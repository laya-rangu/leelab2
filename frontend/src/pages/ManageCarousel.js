import { useState, useEffect } from "react";
import API from "../services/api";

export default function ManageCarousel() {
  const [images, setImages] = useState([]);
  const [imageURL, setImageURL] = useState("");

  const loadImages = async () => {
    const { data } = await API.get("/carousel");
    setImages(data);
  };

  const addImage = async () => {
    if (!imageURL) return alert("Enter image URL");
    await API.post("/carousel", { image_url: imageURL });
    setImageURL("");
    loadImages();
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await API.delete(`/carousel/${id}`);
    loadImages();
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold">Manage Carousel Images</h2>

      <div className="card p-3 mb-3">
        <input
          className="form-control mb-2"
          placeholder="Enter image URL"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addImage}>
          Add Image
        </button>
      </div>

      <div className="row g-3">
        {images.map((img) => (
          <div key={img.id} className="col-md-4">
            <div className="card shadow p-2">
              <img src={img.image_url} className="img-fluid" />
              <button
                className="btn btn-danger mt-2"
                onClick={() => deleteImage(img.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
