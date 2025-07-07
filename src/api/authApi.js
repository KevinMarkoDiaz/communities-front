// src/api/authApi.js
import axiosInstance from "./axiosInstance";

/**
 * Login: envía credenciales, backend responde seteando cookie HttpOnly.
 */
export async function loginUser(credentials) {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data.user;
}

/**
 * Registro de usuario
 */
export async function registerUser(data) {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data.user;
}

/**
 * Logout: elimina cookie en backend
 */
export async function logoutUser() {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

/**
 * Obtener perfil del usuario logueado (/auth/profile)
 */
export async function getUserProfile() {
  const response = await axiosInstance.get("/auth/profile");
  return response.data.user;
}

/**
 * Obtener perfil actual (/auth/me)
 */
export async function getCurrentUser() {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
}

/**
 * Actualizar datos de usuario
 */
export async function updateUserApi(userId, data) {
  const response = await axiosInstance.put(`/users/${userId}`, data);
  return response.data.user;
}
