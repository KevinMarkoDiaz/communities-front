import axiosInstance from "./axiosInstance";

/**
 * Buscar globalmente en negocios, eventos y comunidades.
 * @param {string} termino - término de búsqueda
 * @returns {Promise<Array>} resultados [{ tipo, ...datos }]
 */
export async function fetchBusquedaGlobal(termino, coords = {}) {
  const { lat, lng } = coords || {};
  const res = await axiosInstance.get("/busqueda", {
    params: {
      q: termino,
      lat,
      lng,
    },
  });
  return res.data;
}
