// src/api/categoryApi.js
import axiosInstance from "./axiosInstance"

/**
 * Obtener todas las categorías
 */
export async function getAllCategories() {
  const res = await axiosInstance.get("/categories")
  return res.data
}

/**
 * Obtener una categoría por ID
 * @param {string} id
 */
export async function getCategoryById(id) {
  const res = await axiosInstance.get(`/categories/${id}`)
  return res.data
}

/**
 * Crear una categoría
 * @param {Object} data - { name, description, icon }
 * @param {string} token - JWT del admin
 */
export async function createCategory(data, token) {
  const res = await axiosInstance.post("/categories", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Actualizar una categoría
 * @param {string} id
 * @param {Object} data - Campos a actualizar
 * @param {string} token - JWT del admin
 */
export async function updateCategory(id, data, token) {
  const res = await axiosInstance.put(`/categories/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}

/**
 * Eliminar una categoría
 * @param {string} id
 * @param {string} token - JWT del admin
 */
export async function deleteCategory(id, token) {
  const res = await axiosInstance.delete(`/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
