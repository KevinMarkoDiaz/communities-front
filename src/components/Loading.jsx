export default function Loading({ mensaje = "Cargando..." }) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-blue-600 font-semibold text-lg animate-pulse">
          {mensaje}
        </div>
      </div>
    )
  }
  