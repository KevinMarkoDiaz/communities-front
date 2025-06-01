import axios from "axios";
import { API_BASE_URL } from "../config";


const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  // Si usás cookies o autenticación que lo requiera
});

export default axiosInstance;
