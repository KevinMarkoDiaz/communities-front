// src/api/communityApi.js
import axiosInstance from "./axiosInstance"

/**
 * Obtener todas las comunidades
 */
export async function getAllCommunities() {
  const res = await axiosInstance.get("/communities")
  return res.data
}

/**
 * Obtener una comunidad por su ID
 * @param {string} id
 */
export async function getCommunityById(id) {
  const res = await axiosInstance.get(`/communities/${id}`)
  return res.data
}

/**
 * Crear una comunidad
 * @param {Object} data - { name, flagImage, description, language }
 * @param {string} token - JWT del usuario
 */
export async function createCommunity(data, token) {
  const res = await axiosInstance.post("/communities", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Actualizar una comunidad
 * @param {string} id
 * @param {Object} data - Campos actualizados
 * @param {string} token
 */
export async function updateCommunity(id, data, token) {
  const res = await axiosInstance.put(`/communities/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Eliminar una comunidad
 * @param {string} id
 * @param {string} token
 */
export async function deleteCommunity(id, token) {
  const res = await axiosInstance.delete(`/communities/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
export async function contarComunidades() {
  const res = await axiosInstance.get("/communities");
  return res.data.communities.length;
}