// src/api/promotionApi.js
import axiosInstance from "./axiosInstance";

/**
 * Crear una nueva promoción
 * @param {FormData} data - FormData con featuredImage y campos en data
 */
export async function createPromotion(data) {
  const res = await axiosInstance.post("/promotions", data);
  return res.data;
}

/**
 * Obtener todas las promociones (con filtros opcionales si luego querés)
 */
export async function getAllPromotions() {
  const res = await axiosInstance.get("/promotions");
  if (Array.isArray(res.data.promotions)) {
    return res.data.promotions;
  } else if (Array.isArray(res.data)) {
    return res.data;
  } else {
    console.warn("⚠️ Formato inesperado en /promotions:", res.data);
    return [];
  }
}

/**
 * Obtener promociones por comunidad
 * @param {string} communityId
 */
export async function getPromotionsByCommunity(communityId) {
  const res = await axiosInstance.get(`/promotions?community=${communityId}`);
  return res.data.promotions;
}

/**
 * Obtener una promoción por ID
 * @param {string} id
 */
export async function getPromotionById(id) {
  const res = await axiosInstance.get(`/promotions/${id}`);
  return res.data;
}

/**
 * Editar una promoción
 * @param {string} id
 * @param {FormData} data
 */
export async function updatePromotion(id, data) {
  const res = await axiosInstance.put(`/promotions/${id}`, data);
  return res.data;
}

/**
 * Eliminar promoción
 * @param {string} id
 */
export async function deletePromotion(id) {
  const res = await axiosInstance.delete(`/promotions/${id}`);
  return res.data;
}

/**
 * Obtener promociones del usuario autenticado
 */
export async function getMyPromotions() {
  const res = await axiosInstance.get("/promotions/mine");
  return res.data.promotions;
}

// promotionApi.js
export async function getPromotionsByBusiness(businessId) {
  const res = await axiosInstance.get(`/businesses/${businessId}/promotions`);
  return res.data;
}
