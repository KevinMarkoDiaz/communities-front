import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
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

  // Si es business_owner, rellenar campos automáticamente al montar
  useEffect(() => {
    if (isBusinessOwner && usuario?._id) {
      setFieldValue("ownerId", usuario._id);
      setFieldValue("ownerDisplay", {
        name: usuario.name,
        image: usuario.profileImage || "",
      });
    }
  }, [usuario, isBusinessOwner, setFieldValue]);

  // Buscar usuarios por nombre (solo admin)
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

  // Seleccionar un usuario como propietario
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
      <h3 className="text-[#141C24] text-lg font-semibold">
        Propietario del negocio
      </h3>

      {isBusinessOwner && (
        <div>
          <label className="block text-sm font-medium text-[#141C24] mb-1">
            Nombre del propietario
          </label>
          <input
            value={values.ownerDisplay.name}
            disabled
            className="form-input w-full bg-gray-100 border border-[#D4DBE8] rounded-xl h-14 px-4 text-[#3F5374] cursor-not-allowed"
          />
        </div>
      )}

      {isAdmin && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#141C24] mb-1">
              Buscar usuario por nombre
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: María López"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input flex-1 h-12 px-4 border border-[#D4DBE8] rounded-xl"
              />
              <button
                type="button"
                onClick={handleBuscar}
                className="btn btn-primary"
              >
                {buscando ? "Buscando..." : "Buscar"}
              </button>
            </div>
          </div>

          {resultados.length > 0 && (
            <ul className="border border-[#D4DBE8] rounded-xl p-2 space-y-2 bg-white max-h-60 overflow-auto">
              {resultados.map((user) => (
                <li
                  key={user._id}
                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                  onClick={() => seleccionarUsuario(user)}
                >
                  <div className="font-medium text-[#141C24]">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {values.ownerDisplay?.name && (
        <div>
          <p className="text-sm text-[#141C24]">
            <strong>Seleccionado:</strong> {values.ownerDisplay.name}
          </p>
          {values.ownerDisplay.image && (
            <img
              src={values.ownerDisplay.image}
              alt="Foto del propietario"
              className="mt-2 w-20 h-20 object-cover rounded-full border"
            />
          )}
        </div>
      )}
    </div>
  );
}
