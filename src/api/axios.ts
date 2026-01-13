import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Attach token globally
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers["access-token"] = token;
  }
  return config;
});

// Handle expired session
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.data?.status === 1002) {
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
