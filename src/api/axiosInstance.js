// src/api/axiosInstance.js

import axios from "axios"

// ⚠️ Cambiá esto por la URL real de tu backend cuando esté listo
const BASE_URL = "https://api.communities.com"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
