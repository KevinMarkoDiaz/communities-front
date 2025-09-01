import axiosInstance from "./axiosInstance";

/**
 * Crear un nuevo negocio (con soporte para FormData).
 * @param {FormData} formData - FormData con datos + archivos
 */
export async function createBusiness(formData) {
  const response = await axiosInstance.post("/businesses", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // si usás cookies
  });

  return response.data;
}

/**
 * Actualizar un negocio existente.
 * @param {string} id - ID del negocio
 * @param {FormData} formData - FormData con datos actualizados + archivos
 */
export async function updateBusiness(id, formData) {
  const response = await axiosInstance.put(`/businesses/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
}

/**
 * Obtener todos los negocios (públicos o futuros filtrados).
 */
export const getAllBusinesses = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/businesses?${query}`);
  return res.data;
};

/**
 * Obtener un negocio específico por su ID.
 * @param {string} id - ID del negocio
 */
export async function getBusinessById(id) {
  const response = await axiosInstance.get(`/businesses/${id}`);
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
export async function getBusinessesPaginated({
  page = 1,
  limit = 6,
  search = "",
}) {
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

export const getAllBusinessesByCommunity = async (communityId) => {
  const res = await axiosInstance.get(`/businesses/community/${communityId}`);
  return res.data.businesses;
};

export const getAllBusinessesForMap = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/businesses/map?${query}`);
  return res.data.businesses;
};

export const getBusinessesForMapByCommunity = async (
  communityId,
  params = {}
) => {
  const query = new URLSearchParams({
    ...params,
    _: Date.now(), // ← rompe caché de navegador/CDN
  }).toString();

  const { data } = await axiosInstance.get(
    `/businesses/map/${communityId}?${query}`,
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    }
  );

  return data.businesses;
};
