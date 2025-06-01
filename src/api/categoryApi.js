import axiosInstance from "./axiosInstance";

/**
 * Obtener todas las categorías (público)
 */
export async function getAllCategories() {
  const res = await axiosInstance.get("/categories");
  return res.data;
}

/**
 * Obtener una categoría por ID (público)
 * @param {string} id
 */
export async function getCategoryById(id) {
  const res = await axiosInstance.get(`/categories/${id}`);
  return res.data;
}

/**
 * Crear una categoría (requiere cookie de token)
 * @param {Object} data - { name, description, icon }
 */
export async function createCategory(data) {
  const res = await axiosInstance.post("/categories", data);
  return res.data;
}

/**
 * Actualizar una categoría
 * @param {string} id
 * @param {Object} data - Campos a actualizar
 */
export async function updateCategory(id, data) {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  return res.data;
}

/**
 * Eliminar una categoría
 * @param {string} id
 */
export async function deleteCategory(id) {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
}
