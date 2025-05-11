import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { obtenerNegocios } from "../store/negociosSlice"
import Card from "../components/Card"
import SearchBar from "../components/SearchBar"
import CategoryFilter from "../components/CategoryFilter"

export default function Negocios() {
  const dispatch = useDispatch()
  const { lista, loading, error, busqueda, categoria } = useSelector((state) => state.negocios)

  useEffect(() => {
    dispatch(obtenerNegocios())
  }, [dispatch])

  const negociosFiltrados = lista.filter((negocio) => {
    const coincideBusqueda = negocio.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === "todas" || negocio.categoria === categoria
    return coincideBusqueda && coincideCategoria
  })

  if (loading) return <div className="p-4">Cargando negocios...</div>
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Negocios</h2>

      <SearchBar />
      <CategoryFilter />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {negociosFiltrados.map((negocio) => (
          <Card
            key={negocio.id}
            title={negocio.nombre}
            description={negocio.descripcion}
          />
        ))}
        {negociosFiltrados.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No se encontraron resultados.</p>
        )}
      </div>
    </div>
  )
}
