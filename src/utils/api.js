import negociosData from "../data/negociosData"
import eventosData from "../data/eventosData"
import comunidadesData from "../data/comunidadesData" // ✅ asegurate de tener este archivo

export function fetchNegocios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(negociosData)
    }, 1000)
  })
}

export function fetchEventos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventosData)
    }, 1000)
  })
}

export function fetchComunidades() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(comunidadesData)
    }, 1000)
  })
}

export function fetchBusquedaGlobal(termino) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const texto = termino.toLowerCase();

      const filtrar = (item, campos) =>
        campos.some((campo) =>
          item[campo]?.toLowerCase().includes(texto)
        );

      const negocios = negociosData
        .filter((n) => filtrar(n, ["nombre", "descripcion", "categoria"]))
        .map((n) => ({ ...n, tipo: "negocio" }));

      const eventos = eventosData
        .filter((e) => filtrar(e, ["title", "description"]))
        .map((e) => ({ ...e, tipo: "evento" }));

      const comunidades = comunidadesData
        .filter((c) => filtrar(c, ["name", "description", "language"]))
        .map((c) => ({ ...c, tipo: "comunidad" }));

      resolve([...negocios, ...eventos, ...comunidades]);
    }, 500);
  });
}