import axiosInstance from "./axiosInstance";

/**
 * Crear un evento nuevo
 */
export async function createEvent(data) {
  const res = await axiosInstance.post("/events", data, {
    withCredentials: true,
  });
  return res.data;
}

export async function getAllEvents({ lat, lng, page = 1, limit = 15 } = {}) {
  const params = {};

  if (lat && lng) {
    params.lat = lat;
    params.lng = lng;
  }

  params.page = page;
  params.limit = limit;

  const res = await axiosInstance.get("/events", {
    params,
    withCredentials: true,
  });

  return res.data; // { events, totalPages, currentPage, totalResults }
}

/**
 * Obtener un evento por ID
 */
export async function getEventById(id) {
  const res = await axiosInstance.get(`/events/${id}`, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Actualizar evento
 */
export async function updateEvent(id, data) {
  const res = await axiosInstance.put(`/events/${id}`, data, {
    withCredentials: true,
  });
  return res.data;
}

/**
 * Eliminar evento
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

export async function contarEventos() {
  const res = await axiosInstance.get("/events/mine");
  return res.data.events.length;
}
