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
