// src/api/eventApi.js
import axiosInstance from "./axiosInstance"

/**
 * Crear un evento nuevo
 * @param {Object} data - Datos del evento
 * @param {string} token - JWT del usuario autenticado
 */
export async function createEvent(data, token) {
  const res = await axiosInstance.post("/events", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Obtener todos los eventos
 */
export async function getAllEvents() {
  const res = await axiosInstance.get("/events")
  return res.data
}

/**
 * Obtener un evento por su ID
 * @param {string} id - ID del evento
 */
export async function getEventById(id) {
  const res = await axiosInstance.get(`/events/${id}`)
  return res.data
}

/**
 * Actualizar un evento
 * @param {string} id - ID del evento
 * @param {Object} data - Datos actualizados
 * @param {string} token - JWT del usuario autenticado
 */
export async function updateEvent(id, data, token) {
  const res = await axiosInstance.put(`/events/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Eliminar un evento
 * @param {string} id - ID del evento
 * @param {string} token - JWT del usuario autenticado
 */
export async function deleteEvent(id, token) {
  const res = await axiosInstance.delete(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
