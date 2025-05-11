import negociosData from "../data/negociosData"

export function fetchNegocios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(negociosData)
    }, 1000) // simula 1 segundo de delay
  })
}
import eventosData from "../data/eventosData"

export function fetchEventos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventosData)
    }, 1000)
  })
}
