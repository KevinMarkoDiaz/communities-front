import { useDispatch, useSelector } from "react-redux"
import { setBusqueda } from "../store/negociosSlice"

export default function SearchBar() {
  const dispatch = useDispatch()
  const busqueda = useSelector((state) => state.negocios.busqueda)

  return (
    <input
      type="text"
      placeholder="Buscar negocios..."
      value={busqueda}
      onChange={(e) => dispatch(setBusqueda(e.target.value))}
      className="w-full max-w-md px-4 py-2 border border-gray-300 rounded mb-4"
    />
  )
}
