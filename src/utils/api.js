import negociosData from "../data/negociosData"

export function fetchNegocios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(negociosData)
    }, 1000) // simula 1 segundo de delay
  })
}
