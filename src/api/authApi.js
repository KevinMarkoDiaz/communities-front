// src/api/authApi.js
import axiosInstance from "./axiosInstance";

/**
 * Login: envía credenciales, backend responde seteando cookie HttpOnly.
 * El token NO se maneja en JS, solo recibimos datos usuario.
 */
export async function loginUser(credentials) {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data.user; // Solo la info del usuario, sin token
}

/**
 * Registro de usuario
 */
export async function registerUser(data) {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data.user; // Info del usuario creado
}

/**
 * Logout: elimina cookie en backend
 */
export async function logoutUser() {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
}

/**
 * Obtener perfil del usuario logueado (usa cookie para auth)
 */
export async function getUserProfile() {
  const response = await axiosInstance.get("/auth/profile");
  return response.data.user;
}
/**
 * Actualizar datos de usuario (PUT o PATCH /users/:id)
 * @param {string} userId - ID del usuario a actualizar
 * @param {object} data - Datos a actualizar
 */
export async function updateUserApi(userId, data) {
  const response = await axiosInstance.put(`/users/${userId}`, data);
  return response.data.user;
}