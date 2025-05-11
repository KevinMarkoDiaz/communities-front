// src/api/eventApi.js

import eventos from "../data/eventosData" // mock de eventos

/**
 * Crear un evento nuevo (no funcional en mock)
 * @param {Object} data
 * @param {string} token
 */
export async function createEvent(data, token) {
  console.warn("createEvent() solo está disponible con la API real.");
  return Promise.reject("No disponible en mock");
}

/**
 * Obtener todos los eventos desde el mock
 */
export async function getAllEvents() {
  return eventos
}

/**
 * Obtener un evento por ID desde el mock
 * @param {string} id
 */
export async function getEventById(id) {
  const evento = eventos.find((e) => String(e.id) === String(id))
  if (!evento) throw new Error("Mock: evento no encontrado")
  return evento
}

/**
 * Actualizar evento (no funcional en mock)
 */
export async function updateEvent(id, data, token) {
  console.warn("updateEvent() solo está disponible con la API real.");
  return Promise.reject("No disponible en mock");
}

/**
 * Eliminar evento (no funcional en mock)
 */
export async function deleteEvent(id, token) {
  console.warn("deleteEvent() solo está disponible con la API real.");
  return Promise.reject("No disponible en mock");
}
