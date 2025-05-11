import { useSelector } from "react-redux"

export default function Perfil() {
  const usuario = useSelector((state) => state.auth.usuario)

  if (!usuario) return <p>No estás logueado.</p>

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Mi perfil</h2>

      <div className="flex items-center gap-4">
        {usuario.profileImage && (
          <img
            src={usuario.profileImage}
            alt={usuario.name}
            className="w-20 h-20 rounded-full object-cover border"
          />
        )}
        <div>
          <p className="text-lg font-semibold">{usuario.name}</p>
          <p className="text-sm text-gray-600">{usuario.email}</p>
        </div>
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Rol:</strong> {usuario.role}</p>
        <p><strong>Verificado:</strong> {usuario.isVerified ? "Sí" : "No"}</p>
        <p><strong>Comunidad:</strong> {usuario.community?.name || "Sin asignar"}</p>
        <p><strong>Registrado desde:</strong> {new Date(usuario.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  )
}
