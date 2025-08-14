// src/api/adsApi.js
import axiosInstance from "./axiosInstance";

// ⬇️ NUEVO: envío por usuario (ruta pública autenticada)
export async function submitAdBanner(formData) {
  const res = await axiosInstance.post("ads/banners/submit", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

// Admin (ya tenías list)
export async function listAdBanners({ placement, q, activeOnly, status } = {}) {
  const res = await axiosInstance.get("ads/banners", {
    params: { placement, q, activeOnly, status },
  });
  return res.data;
}

// ⬇️ NUEVO: mis banners (requiere endpoint en back: GET /ads/my-banners)
export async function getMyAdBanners() {
  const res = await axiosInstance.get("ads/my-banners", {
    headers: { "Cache-Control": "no-cache" },
  });
  return res.data; // { banners: [...] }
}

// ⬇️ NUEVO: admin actions
export async function approveAdBanner(id) {
  const res = await axiosInstance.post(`ads/banners/${id}/approve`);
  return res.data;
}
export async function rejectAdBanner(id, reason = "") {
  const res = await axiosInstance.post(`ads/banners/${id}/reject`, { reason });
  return res.data;
}

// ⬇️ NUEVO: checkout (owner o admin)
export async function createAdCheckout(id) {
  const { data } = await axiosInstance.post(`ads/banners/${id}/checkout`);
  return data; // { url }
}

// (legacy) — si quieres mantener compatibilidad admin:
export async function createAdBanner(formData) {
  const res = await axiosInstance.post("ads/banners", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}
