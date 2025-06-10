import axiosInstance from "./axiosInstance";

/**
 * Buscar globalmente en negocios, eventos y comunidades.
 * @param {string} termino - término de búsqueda
 * @returns {Promise<Array>} resultados [{ tipo, ...datos }]
 */
export async function fetchBusquedaGlobal(termino) {
  const res = await axiosInstance.get("/busqueda", {
    params: { q: termino },
  });
  return res.data; // Asegurate de que backend devuelva: [{ tipo: "negocio", ... }]
}
