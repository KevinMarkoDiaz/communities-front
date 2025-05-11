import { useEffect, useState } from "react"
import Card from "../components/Card"
import { fetchNegocios } from "../utils/api"

export default function Negocios() {
  const [negocios, setNegocios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNegocios().then((data) => {
      setNegocios(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="p-4 text-gray-600">
        Cargando negocios...
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Negocios</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {negocios.map((negocio) => (
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
