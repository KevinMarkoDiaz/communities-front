import { useSelector, useDispatch } from "react-redux"
import { logout } from "../store/authSlice"

export default function Navbar() {
  const usuario = useSelector((state) => state.auth.usuario)
  const dispatch = useDispatch()

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <a href="/" className="text-xl font-bold text-blue-600">Communities</a>

      {usuario ? (
        <div className="flex items-center gap-3">
          {usuario.profileImage && (
            <img
              src={usuario.profileImage}
              alt={usuario.name}
              className="w-8 h-8 rounded-full object-cover border"
            />
          )}
          <span className="text-sm font-medium text-blue-800">{usuario.name}</span>
          <button
            onClick={() => dispatch(logout())}
            className="text-red-600 text-sm hover:underline"
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="text-sm space-x-4">
          <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
          <a href="/registro" className="text-blue-600 hover:underline">Registrarse</a>
        </div>
      )}
    </nav>
  )
}
