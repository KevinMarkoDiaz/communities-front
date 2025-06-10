import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage } from "formik";
import { fetchCategorias } from "../../../../store/categoriasSlice";
import { fetchComunidades } from "../../../../store/comunidadesSlice";

export default function Paso4Opciones() {
  const dispatch = useDispatch();

  const categorias = useSelector((state) => state.categorias.data);
  const categoriasLoading = useSelector((state) => state.categorias.loading);

  const comunidades = useSelector((state) => state.comunidades.lista);
  const comunidadesLoading = useSelector((state) => state.comunidades.loading);

  useEffect(() => {
    if (categorias.length === 0) dispatch(fetchCategorias());
    if (comunidades.length === 0) dispatch(fetchComunidades());
  }, [dispatch, categorias.length, comunidades.length]);

  if (categoriasLoading || comunidadesLoading) {
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

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Etiquetas (separadas por coma)
        </label>
        <Field
          name="tags"
          placeholder="gratuito, niños, comida"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-12 px-4"
        />
        <ErrorMessage
          name="tags"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
