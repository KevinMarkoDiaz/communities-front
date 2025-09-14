// src/api/businessApi.js
import axiosInstance from "./axiosInstance";

/**
 * Crear un nuevo negocio (con soporte para FormData).
 * @param {FormData} formData - FormData con datos + archivos
 */
export async function createBusiness(formData) {
  const response = await axiosInstance.post("/businesses", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });
  return response.data;
}

/* ────────────────────────────────────────────────────────────
   UPDATE (id o slug) – función nueva y la vieja redirige a esta
   ──────────────────────────────────────────────────────────── */
export async function updateBusinessByIdOrSlug(idOrSlug, formData) {
  const response = await axiosInstance.put(
    `/businesses/${idOrSlug}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
}

// Compat: la versión antigua ahora delega a la nueva
export async function updateBusiness(id, formData) {
  return updateBusinessByIdOrSlug(id, formData);
}

/* ────────────────────────────────────────────────────────────
   LISTADOS / BÚSQUEDAS
   ──────────────────────────────────────────────────────────── */

/**
 * Obtener todos los negocios (públicos o con filtros).
 */
export const getAllBusinesses = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/businesses?${query}`);
  return res.data;
};

/* ────────────────────────────────────────────────────────────
   DETALLE (id o slug) – función nueva y alias de compat
   ──────────────────────────────────────────────────────────── */
export async function getBusinessByIdOrSlug(idOrSlug) {
  const response = await axiosInstance.get(`/businesses/${idOrSlug}`);
  return response.data;
}

// Compat: la versión antigua ahora delega a la nueva
export async function getBusinessById(id) {
  return getBusinessByIdOrSlug(id);
}

/* ────────────────────────────────────────────────────────────
   DELETE (id o slug) – función nueva y la vieja delega
   ──────────────────────────────────────────────────────────── */
export async function deleteBusinessByIdOrSlug(idOrSlug) {
  const response = await axiosInstance.delete(`/businesses/${idOrSlug}`);
  return response.data;
}

// Compat: la versión antigua ahora delega a la nueva
export async function deleteBusiness(id) {
  return deleteBusinessByIdOrSlug(id);
}

/**
 * Obtener negocios con paginación y búsqueda opcional.
 */
export async function getBusinessesPaginated({
  page = 1,
  limit = 6,
  search = "",
}) {
  const response = await axiosInstance.get("/businesses", {
    params: { page, limit, search },
  });
  return response.data;
}

/**
 * Obtener negocios del usuario autenticado (admin o business_owner).
 */
export async function getMyBusinesses() {
  const response = await axiosInstance.get("/businesses/mine");
  return response.data;
}

export async function searchUsersByName(name) {
  const response = await axiosInstance.get(`/users/search`, {
    params: { name },
  });
  return response.data.users;
}

export async function contarNegocios() {
  const res = await axiosInstance.get("/businesses/mine");
  return res.data.businesses.length;
}

/**
 * Negocios por comunidad (usa communityId – si migras comunidades a slug, puedes crear otra función)
 */
export const getAllBusinessesByCommunity = async (communityId) => {
  const res = await axiosInstance.get(`/businesses/community/${communityId}`);
  return res.data.businesses;
};

/**
 * Negocios para mapa por coordenadas
 */
export const getAllBusinessesForMap = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/businesses/map?${query}`);
  return res.data.businesses;
};

/**
 * Negocios para mapa por comunidad (communityId) + coords
 */
export const getBusinessesForMapByCommunity = async (
  communityId,
  params = {}
) => {
  const query = new URLSearchParams({ ...params, _: Date.now() }).toString(); // rompe caché
  const { data } = await axiosInstance.get(
    `/businesses/map/${communityId}?${query}`,
    {
      headers: { "Cache-Control": "no-cache", Pragma: "no-cache" },
    }
  );
  return data.businesses;
};
