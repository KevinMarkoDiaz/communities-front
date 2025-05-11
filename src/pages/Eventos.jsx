import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerEventos } from "../store/eventosSlice"
import Card from "../components/Card"
import Loading from "../components/Loading"

export default function Eventos() {
  const dispatch = useDispatch()
  const { lista, loading, error } = useSelector((state) => state.eventos)

  useEffect(() => {
    dispatch(obtenerEventos())
  }, [dispatch])

  if (loading) return <Loading mensaje="Cargando eventos..." />
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Eventos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lista.map((evento) => (
          <Card
            key={evento.id}
            title={evento.titulo}
            description={`${evento.descripcion} (📅 ${evento.fecha})`}
          />
        ))}
      </div>
    </div>
  )
}
