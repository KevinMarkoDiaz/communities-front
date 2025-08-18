import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { useSelector } from "react-redux";
import { searchUsersByName } from "../../../../api/businessApi";

export default function Paso5Propietario() {
  const { setFieldValue, values } = useFormikContext();
  const [search, setSearch] = useState("");
  const [resultados, setResultados] = useState([]);
  const [buscando, setBuscando] = useState(false);
  const usuario = useSelector((state) => state.auth.usuario);

  const isAdmin = usuario?.role === "admin";
  const isBusinessOwner = usuario?.role === "business_owner";

  // Si es business_owner o user, setea automáticamente
  useEffect(() => {
    if (!isAdmin && usuario?._id) {
      setFieldValue("ownerId", usuario._id);
      setFieldValue("ownerDisplay", {
        name: usuario.name,
        image: usuario.profileImage || "",
      });
    }
  }, [usuario, isAdmin, setFieldValue]);

  const handleBuscar = async () => {
    if (!search.trim()) return;
    setBuscando(true);
    try {
      const users = await searchUsersByName(search);
      setResultados(users || []);
    } catch (err) {
      console.error("Error al buscar usuarios:", err);
    } finally {
      setBuscando(false);
    }
  };

  const seleccionarUsuario = (user) => {
    setFieldValue("ownerId", user._id);
    setFieldValue("ownerDisplay", {
      name: user.name,
      image: user.profileImage || "",
    });
    setResultados([]);
    setSearch("");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-white text-lg font-semibold">
        Propietario del negocio
      </h3>

      {/* Caso no admin */}
      {!isAdmin && (
        <div className="p-3 bg-black/30 border border-white/20 rounded-lg text-sm text-white">
          Este negocio estará relacionado a tu cuenta en Communidades
          <br />
          <span className="font-semibold">{usuario?.name}</span>
        </div>
      )}

      {/* Caso admin */}
      {isAdmin && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-white mb-1">
              Buscar usuario por nombre
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: María López"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 text-white focus:outline-none"
              />
              <button
                type="button"
                onClick={handleBuscar}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition"
              >
                {buscando ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          {resultados.length > 0 && (
            <ul className="border border-white/20 rounded-lg p-2 space-y-2 bg-black/40 backdrop-blur max-h-60 overflow-auto">
              {resultados.map((user) => (
                <li
                  key={user._id}
                  className="p-2 hover:bg-white/10 cursor-pointer rounded text-white"
                  onClick={() => seleccionarUsuario(user)}
                >
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-300">{user.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {values.ownerDisplay?.name && (
        <div>
          <p className="text-xs text-white">
            <strong>Seleccionado:</strong> {values.ownerDisplay.name}
          </p>
          {values.ownerDisplay.image && (
            <img
              src={values.ownerDisplay.image}
              alt="Foto del propietario"
              className="mt-2 w-20 h-20 object-cover rounded-full border border-white/30"
            />
          )}
        </div>
      )}
    </div>
  );
}
