import { useSelector, useDispatch } from "react-redux";
import { setComunidadSeleccionada } from "../store/comunidadSeleccionadaSlice";

export default function SidebarComunidad() {
  const dispatch = useDispatch();
  const comunidades = useSelector((state) => state.comunidades.lista || []);
  const comunidadSeleccionada = useSelector(
    (state) => state.comunidadSeleccionada
  );

  const handleChange = (e) => {
    const comunidadId = e.target.value;
    const comunidad = comunidades.find((c) => c._id === comunidadId);
    dispatch(setComunidadSeleccionada(comunidad));
  };

  return (
    <aside className="hidden lg:flex flex-col w-[280px] p-4 space-y-6 border-r bg-white shadow-inner">
      <h2 className="text-lg font-semibold text-gray-700">
        Selecciona comunidad
      </h2>

      <select
        value={comunidadSeleccionada?._id || ""}
        onChange={handleChange}
        className="p-2 rounded-md border bg-white shadow text-sm"
      >
        <option value="">Todas las comunidades</option>
        {comunidades.map((com) => (
          <option key={com._id} value={com._id}>
            {com.name}
          </option>
        ))}
      </select>

      {/* Aquí puedes agregar más filtros luego */}
    </aside>
  );
}
