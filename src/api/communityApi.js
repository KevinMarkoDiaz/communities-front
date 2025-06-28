import axiosInstance from "./axiosInstance";

/**
 * Obtener todas las comunidades
 */
export async function getAllCommunities() {
  const res = await axiosInstance.get("/communities");
  return res.data;
}

/**
 * Obtener una comunidad por ID
 */
export async function getCommunityById(id) {
  const res = await axiosInstance.get(`/communities/${id}`);
  return res.data;
}

/**
 * Crear una comunidad
 */
export async function createCommunity(formData) {
  const res = await axiosInstance.post("/communities", formData);
  return res.data;
}

/**
 * Actualizar una comunidad
 */
export async function updateCommunity(id, data) {
  const res = await axiosInstance.put(`/communities/${id}`, data);
  return res.data;
}

/**
 * Eliminar una comunidad
 */
export async function deleteCommunity(id) {
  const res = await axiosInstance.delete(`/communities/${id}`);
  return res.data;
}

/**
 * Obtener solo las comunidades del usuario autenticado
 */
export async function getMyCommunities() {
  const res = await axiosInstance.get("/communities/mine");
  return res.data;
}

/**
 * Contar solo las comunidades del usuario autenticado
 */
export async function contarComunidades() {
  const res = await axiosInstance.get("/communities/mine");
  return res.data.communities.length;
}

export async function getCommunityBySlug(slug) {
  const res = await axiosInstance.get(`/communities/slug/${slug}`);
  return res.data;
}
