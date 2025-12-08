import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const API = axios.create({
  baseURL,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
