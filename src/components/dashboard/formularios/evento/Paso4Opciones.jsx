import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage, useFormikContext } from "formik";
import { fetchCategorias } from "../../../../store/categoriasSlice";
import { fetchComunidades } from "../../../../store/comunidadesSlice";
import SelectNegocioSponsor from "../../../SelectNegocioSponsor";
import SelectOrganizer from "../../../SelectOrganizer";
import { obtenerNegocios } from "../../../../store/negociosSlice";

export default function Paso4Opciones() {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  // ✅ Aseguramos arrays por defecto
  const categorias = useSelector((state) => state.categorias?.data ?? []);
  const comunidades = useSelector((state) => state.comunidades?.lista ?? []);
  const negocios = useSelector((state) => state.negocios?.lista ?? []);

  const usuario = useSelector((state) => state.auth.usuario);

  const loading =
    useSelector((state) => state.categorias.loading) ||
    useSelector((state) => state.comunidades.loading) ||
    useSelector((state) => state.negocios.loading);

  // ✅ Protección contra undefined en .length
  useEffect(() => {
    if (!categorias?.length) dispatch(fetchCategorias());
    if (!comunidades?.length) dispatch(fetchComunidades());
    if (!negocios?.length) dispatch(obtenerNegocios());
  }, [dispatch]);

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando opciones...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Categorías */}
      <div>
        <label className="block text-sm font-medium mb-1">Categorías</label>
        <Field
          as="select"
          name="categories"
          multiple
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-2 h-32"
        >
          {categorias.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="categories"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Comunidades */}
      <div>
        <label className="block text-sm font-medium mb-1">Comunidades</label>
        <Field
          as="select"
          name="communities"
          multiple
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-2 h-32"
        >
          {comunidades.map((com) => (
            <option key={com._id} value={com._id}>
              {com.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="communities"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Sponsors */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Negocios auspiciantes (opcional)
        </label>
        <Field
          as="select"
          name="sponsors"
          multiple
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl px-4 py-2 h-32"
        >
          {negocios.map((n) => (
            <option key={n._id} value={n._id}>
              {n.name}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name="sponsors"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Estado del evento
        </label>
        <Field
          as="select"
          name="status"
          className="form-select w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        >
          <option value="activo">Activo</option>
          <option value="cancelado">Cancelado</option>
          <option value="finalizado">Finalizado</option>
        </Field>
        <ErrorMessage
          name="status"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Destacado */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="featured"
          id="featured"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Marcar como destacado
        </label>
      </div>

      {/* Select personalizado para sponsors */}
      <SelectNegocioSponsor
        value={
          Array.isArray(values.sponsors)
            ? values.sponsors.map((id) => {
                const negocio = negocios.find((n) => n._id === id);
                return negocio
                  ? { value: id, label: negocio.name }
                  : { value: id, label: id };
              })
            : []
        }
        onChange={(selected) =>
          setFieldValue(
            "sponsors",
            selected.map((s) => s.value)
          )
        }
      />

      {/* Organizer solo para admin */}
      {usuario.role === "admin" && (
        <SelectOrganizer
          value={
            values.organizer && values.organizerModel
              ? {
                  value: values.organizer,
                  label: values.organizerLabel || "",
                  model: values.organizerModel,
                }
              : null
          }
          onChange={(selected) => {
            setFieldValue("organizer", selected.value);
            setFieldValue("organizerModel", selected.model);
            setFieldValue("organizerLabel", selected.label);
          }}
        />
      )}

      {/* Publicado */}
      <div className="flex items-center space-x-2">
        <Field
          type="checkbox"
          name="isPublished"
          id="isPublished"
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label htmlFor="isPublished" className="text-sm font-medium">
          Publicar evento al guardarlo
        </label>
      </div>
    </div>
  );
}
