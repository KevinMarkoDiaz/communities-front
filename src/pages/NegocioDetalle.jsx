import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export default function NegocioDetalle() {
  const { id } = useParams()
  const { lista } = useSelector((state) => state.negocios)

  const negocio = lista.find((n) => String(n.id) === id)

  if (!negocio) {
    return (
      <div className="p-4 text-center text-gray-600">
        Negocio no encontrado.
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-3xl font-bold text-blue-700">{negocio.nombre}</h2>
      <p className="text-gray-700">{negocio.descripcion}</p>
      <p className="text-sm text-gray-500">Categoría: {negocio.categoria}</p>
      {/* Aquí podés agregar más detalles en el futuro */}
    </div>
  )
}
