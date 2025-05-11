// src/api/businessApi.js
import axiosInstance from "./axiosInstance"

/**
 * Crear un nuevo negocio.
 * @param {Object} data - Datos del negocio (name, description, category, etc.)
 * @param {string} token - JWT del usuario autenticado
 */
export async function createBusiness(data, token) {
  const response = await axiosInstance.post("/businesses", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

/**
 * Obtener todos los negocios (públicos o futuros filtrados).
 */
export async function getAllBusinesses() {
  const response = await axiosInstance.get("/businesses")
  return response.data
}

/**
 * Obtener un negocio específico por su ID.
 * @param {string} id - ID del negocio
 */
export async function getBusinessById(id) {
  const response = await axiosInstance.get(`/businesses/${id}`)
  return response.data
}

/**
 * Actualizar un negocio existente.
 * @param {string} id - ID del negocio
 * @param {Object} data - Datos actualizados
 * @param {string} token - JWT del usuario autenticado
 */
export async function updateBusiness(id, data, token) {
  const response = await axiosInstance.put(`/businesses/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

/**
 * Eliminar un negocio.
 * @param {string} id - ID del negocio
 * @param {string} token - JWT del usuario autenticado
 */
export async function deleteBusiness(id, token) {
  const response = await axiosInstance.delete(`/businesses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}
