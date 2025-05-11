// src/api/authApi.js
//import axiosInstance from "./axiosInstance"

// Simulación temporal de login
export async function loginUser(credentials) {
  // Reemplazá esto con la llamada real cuando tengas tu API:
  // const response = await axiosInstance.post("/auth/login", credentials)
  // return response.data

  return {
    name: "Kevin",
    email: credentials.email,
    role: "user",
    profileImage: "https://ui-avatars.com/api/?name=Kevin",
    isVerified: true,
    community: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

// Simulación temporal de registro
export async function registerUser(data) {
  // Reemplazá esto con la llamada real cuando tengas tu API:
  // const response = await axiosInstance.post("/auth/register", data)
  // return response.data

  return {
    ...data,
    isVerified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
