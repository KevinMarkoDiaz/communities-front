import { useDispatch, useSelector } from "react-redux"
import { setCategoria } from "../store/negociosSlice"

const categorias = ["todas", "comida", "servicios", "ropa", "otros"]

export default function CategoryFilter() {
  const dispatch = useDispatch()
  const categoria = useSelector((state) => state.negocios.categoria)

  return (
    <select
      value={categoria}
      onChange={(e) => dispatch(setCategoria(e.target.value))}
      className="px-3 py-2 border rounded mb-4"
    >
      {categorias.map((cat) => (
        <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
      ))}
    </select>
  )
}
