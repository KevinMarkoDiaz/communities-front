import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, ErrorMessage, useFormikContext } from "formik";
import Select from "react-select";
import { fetchCategorias } from "../../../../store/categoriasSlice";
import { fetchComunidades } from "../../../../store/comunidadesSlice";
import { obtenerNegocios } from "../../../../store/negociosSlice";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";
import SelectNegocioSponsor from "../../../SelectNegocioSponsor";
import SelectOrganizer from "../../../SelectOrganizer";

export default function Paso4Opciones() {
  const dispatch = useDispatch();
  const { values, setFieldValue } = useFormikContext();

  const categorias = useSelector((state) => state.categorias?.data ?? []);
  const comunidades = useSelector((state) => state.comunidades?.lista ?? []);
  const negocios = useSelector((state) => state.negocios?.lista ?? []);
  const usuario = useSelector((state) => state.auth.usuario);

  const loading =
    useSelector((state) => state.categorias.loading) ||
    useSelector((state) => state.comunidades.loading) ||
    useSelector((state) => state.negocios.loading);

  useEffect(() => {
    if (!categorias?.length) dispatch(fetchCategorias());
    if (!comunidades?.length) dispatch(fetchComunidades());
    if (!negocios?.length) dispatch(obtenerNegocios());
  }, [dispatch, categorias.length, comunidades.length, negocios.length]);

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando opciones...</p>;
  }

  return (
    <div className="space-y-6">
      {/* Categorías */}
      <div>
        <label className="block text-sm font-medium mb-1">Categorías</label>
        <Select
          isMulti
          options={categorias.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          value={categorias
            .filter((c) => values.categories?.includes(c._id))
            .map((c) => ({
              value: c._id,
              label: c.name,
            }))}
          styles={customSelectStylesForm}
          onChange={(selected) =>
            setFieldValue(
              "categories",
              selected.map((s) => s.value)
            )
          }
          placeholder="Selecciona categorías..."
        />
        <ErrorMessage
          name="categories"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Comunidades */}
      <div>
        <label className="block text-sm font-medium mb-1">Comunidades</label>
        <Select
          isMulti
          options={comunidades.map((com) => ({
            value: com._id,
            label: com.name,
          }))}
          value={comunidades
            .filter((c) => values.communities?.includes(c._id))
            .map((c) => ({
              value: c._id,
              label: c.name,
            }))}
          styles={customSelectStylesForm}
          onChange={(selected) =>
            setFieldValue(
              "communities",
              selected.map((s) => s.value)
            )
          }
          placeholder="Selecciona comunidades..."
        />
        <ErrorMessage
          name="communities"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Sponsors */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Negocios auspiciantes (opcional)
        </label>
        <Select
          isMulti
          options={negocios.map((n) => ({
            value: n._id,
            label: n.name,
          }))}
          value={negocios
            .filter((n) => values.sponsors?.includes(n._id))
            .map((n) => ({
              value: n._id,
              label: n.name,
            }))}
          styles={customSelectStylesForm}
          onChange={(selected) =>
            setFieldValue(
              "sponsors",
              selected.map((s) => s.value)
            )
          }
          placeholder="Selecciona negocios..."
        />
        <ErrorMessage
          name="sponsors"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Estado */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Estado del evento
        </label>
        <Select
          options={[
            { value: "activo", label: "Activo" },
            { value: "cancelado", label: "Cancelado" },
            { value: "finalizado", label: "Finalizado" },
          ]}
          value={
            values.status
              ? {
                  value: values.status,
                  label:
                    values.status.charAt(0).toUpperCase() +
                    values.status.slice(1),
                }
              : null
          }
          styles={customSelectStylesForm}
          onChange={(selected) => setFieldValue("status", selected.value)}
          placeholder="Selecciona estado..."
        />
        <ErrorMessage
          name="status"
          component="div"
          className="text-red-500 text-sm mt-1"
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

      {/* Organizer solo para admin */}
      {usuario.role === "admin" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Organizador del evento
          </label>
          <SelectOrganizer
            placeholder="Selecciona el organizador (usuario o negocio)..."
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
          <ErrorMessage
            name="organizer"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
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
