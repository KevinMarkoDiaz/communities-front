import axiosInstance from "./axiosInstance";

/**
 * Crear un nuevo negocio.
 * @param {Object} data - Datos del negocio (name, description, category, etc.)
 */
export async function createBusiness(data) {
  console.log("Valores a enviar al backend:", data);

  const response = await axiosInstance.post("/businesses", data);
  return response.data;
}

/**
 * Obtener todos los negocios (públicos o futuros filtrados).
 */
export async function getAllBusinesses() {
  const response = await axiosInstance.get("/businesses");
  return response.data;
}

/**
 * Obtener un negocio específico por su ID.
 * @param {string} id - ID del negocio
 */
export async function getBusinessById(id) {
  const response = await axiosInstance.get(`/businesses/${id}`);
  return response.data;
}

/**
 * Actualizar un negocio existente.
 * @param {string} id - ID del negocio
 * @param {Object} data - Datos actualizados
 */
export async function updateBusiness(id, data) {
  const response = await axiosInstance.put(`/businesses/${id}`, data);
  return response.data;
}

/**
 * Eliminar un negocio.
 * @param {string} id - ID del negocio
 */
export async function deleteBusiness(id) {
  const response = await axiosInstance.delete(`/businesses/${id}`);
  return response.data;
}

/**
 * Obtener negocios con paginación y búsqueda opcional.
 * @param {Object} params - Parámetros de consulta (page, limit, search)
 * @returns {Promise<Object>} - { data: [], total, page, pages }
 */
export async function getBusinessesPaginated({ page = 1, limit = 6, search = "" }) {
  const response = await axiosInstance.get("/businesses", {
    params: {
      page,
      limit,
      search,
    },
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
  const res = await axiosInstance.get("/businesses/mine"); // si es por usuario
  return res.data.businesses.length;
}