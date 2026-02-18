import axios from "axios";

const host = window.location.hostname;

let baseURL;

if (host === "localhost" || host.startsWith("192.168.")) {
  baseURL = `http://${host}:5000`;
} else {
  baseURL = import.meta.env.VITE_API_BACKEND_URL;
}

const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});

export default axiosInstance;

