// src/api/eventApi.js
import axiosInstance from "./axiosInstance";

/**
 * Crear un evento nuevo
 * @param {Object} data - Datos del evento
 */
export async function createEvent(data) {
  const res = await axiosInstance.post("/events", data, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Obtener todos los eventos
 */
export async function getAllEvents() {
  const res = await axiosInstance.get("/events", {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Obtener un evento por ID
 * @param {string} id
 */
export async function getEventById(id) {
  const res = await axiosInstance.get(`/events/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Actualizar evento
 * @param {string} id
 * @param {Object} data
 */
export async function updateEvent(id, data) {
  const res = await axiosInstance.put(`/events/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Eliminar evento
 * @param {string} id
 */
export async function deleteEvent(id) {
  const res = await axiosInstance.delete(`/events/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Obtener eventos creados por el usuario autenticado
 */
export async function getMyEvents() {
  const res = await axiosInstance.get("/events/mine", {
    withCredentials: true,
  });
  return res.data.events;
}
