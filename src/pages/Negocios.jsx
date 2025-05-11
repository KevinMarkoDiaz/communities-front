import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerNegocios } from "../store/negociosSlice"
import Card from "../components/Card"

export default function Negocios() {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector((state) => state.negocios)

  useEffect(() => {
    dispatch(obtenerNegocios())
  }, [dispatch])

  if (loading) return <div className="p-4">Cargando negocios...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Negocios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((negocio) => (
          <Card
            key={negocio.id}
            title={negocio.nombre}
            description={negocio.descripcion}
          />
        ))}
      </div>
    </div>
  )
}
