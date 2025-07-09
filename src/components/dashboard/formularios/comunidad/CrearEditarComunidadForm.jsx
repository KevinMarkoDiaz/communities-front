import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";

import Paso1Info from "./pasos/Paso1Info";
import Paso2Cultura from "./pasos/Paso2Cultura";
import Paso3Recursos from "./pasos/Paso3Recursos";
import Paso4Ubicacion from "./pasos/Paso4Ubicacion";
import Paso5SEO from "./pasos/Paso5SEO";
import Paso6Imagenes from "./pasos/Paso6Imagenes";
import Paso7Resumen from "./pasos/Paso7Resumen";

import { createCommunity, updateCommunity } from "../../../../api/communityApi";
import {
  initialValuesComunidad,
  validationSchemaComunidad,
} from "./schemaComunidad";
// Títulos de cada paso
const nombresPasos = [
  "Información Básica",
  "Cultura y Origen",
  "Recursos y Enlaces",
  "Ubicación",
  "SEO y Visibilidad",
  "Imágenes",
  "Resumen Final",
];

const pasos = [
  Paso1Info,
  Paso2Cultura,
  Paso3Recursos,
  Paso4Ubicacion,
  Paso5SEO,
  Paso6Imagenes,
  Paso7Resumen,
];

export default function CrearEditarComunidadForm({
  modoEdicion = false,
  comunidadInicial = null,
}) {
  const [paso, setPaso] = useState(0);
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);
  const PasoActual = pasos[paso];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { flagImage, bannerImage, food, originCountryInfo, ...resto } =
        values;

      const formData = new FormData();

      if (flagImage instanceof File) formData.append("flagImage", flagImage);
      if (bannerImage instanceof File)
        formData.append("bannerImage", bannerImage);
      if (originCountryInfo?.flag instanceof File) {
        formData.append("originCountryFlag", originCountryInfo.flag);
      }

      food.forEach((item, index) => {
        if (item.image instanceof File) {
          formData.append(`foodImages[${index}]`, item.image);
        }
      });

      const payload = {
        ...resto,
        originCountryInfo: {
          ...originCountryInfo,
          flag:
            originCountryInfo?.flag instanceof File
              ? ""
              : originCountryInfo?.flag,
        },
        food: food.map((item) => ({
          name: item.name,
          description: item.description || "",
          image: item.image instanceof File ? "" : item.image,
        })),
        owner: usuario.id,
      };

      if (payload.location?.coordinates) {
        payload.location.coordinates.lat =
          payload.location.coordinates.lat === ""
            ? null
            : payload.location.coordinates.lat;
        payload.location.coordinates.lng =
          payload.location.coordinates.lng === ""
            ? null
            : payload.location.coordinates.lng;
      }

      if (payload.mapCenter) {
        payload.mapCenter.lat =
          payload.mapCenter.lat === "" ? null : payload.mapCenter.lat;
        payload.mapCenter.lng =
          payload.mapCenter.lng === "" ? null : payload.mapCenter.lng;
      }

      formData.append("data", JSON.stringify(payload));

      if (modoEdicion && comunidadInicial?._id) {
        await updateCommunity(comunidadInicial._id, formData);
      } else {
        await createCommunity(formData);
      }
      navigate("/dashboard/comunidades");
    } catch (err) {
      console.error("❌ Error al crear comunidad:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValuesFinales = useMemo(() => {
    if (!modoEdicion || !comunidadInicial) return initialValuesComunidad;

    return {
      ...initialValuesComunidad,
      ...comunidadInicial,
      flagImage: comunidadInicial.flagImage ?? "",
      bannerImage: comunidadInicial.bannerImage ?? "",
      originCountryInfo: {
        ...initialValuesComunidad.originCountryInfo,
        ...comunidadInicial.originCountryInfo,
        flag: comunidadInicial.originCountryInfo?.flag ?? "",
      },
      food:
        comunidadInicial.food?.map((item) => ({
          name: item.name,
          description: item.description || "",
          image: item.image ?? "",
        })) || [],
    };
  }, [modoEdicion, comunidadInicial]);

  return (
    <Formik
      initialValues={initialValuesFinales}
      enableReinitialize
      validationSchema={validationSchemaComunidad[paso]}
      onSubmit={handleSubmit}
      validateOnBlur
      validateOnChange
    >
      {({ validateForm, values, setErrors }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-8 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-col space-y-8 w-full md:w-36">
            {nombresPasos.map((nombre, index) => (
              <div key={index} className="flex items-start relative">
                {/* Línea vertical */}
                {index !== nombresPasos.length - 1 && (
                  <span
                    className="absolute left-2.5 top-7 h-full w-px bg-white/20"
                    style={{ minHeight: "1.5rem" }}
                  />
                )}
                {/* Círculo con número */}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
                    paso === index
                      ? "border-orange-500 bg-orange-500 text-black"
                      : paso > index
                      ? "border-green-500 bg-green-500 text-black"
                      : "border-white/30 text-white"
                  }`}
                >
                  {paso > index ? "✓" : index + 1}
                </div>
                {/* Nombre del paso */}
                <div className="ml-3 text-sm leading-tight">{nombre}</div>
              </div>
            ))}
          </div>

          {/* Contenido del paso */}
          <div className="flex-1 space-y-6">
            {/* Encabezado de progreso */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                Paso {paso + 1} de {pasos.length}:{" "}
                <span className="text-orange-400">{nombresPasos[paso]}</span>
              </div>
              <div className="w-1/3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{
                    width: `${((paso + 1) / pasos.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={paso}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <PasoActual customSelectStyles={customSelectStylesForm} />
              </motion.div>
            </AnimatePresence>

            {/* Botones */}
            <div className="flex justify-between gap-2 mt-6">
              {paso > 0 && (
                <button
                  type="button"
                  onClick={() => setPaso((p) => p - 1)}
                  className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition"
                >
                  Atrás
                </button>
              )}

              {paso === pasos.length - 1 ? (
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {modoEdicion ? "Actualizar comunidad" : "Crear comunidad"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const currentSchema = validationSchemaComunidad[paso];
                    try {
                      await currentSchema.validate(values, {
                        abortEarly: false,
                      });
                      setPaso((p) => p + 1);
                    } catch (err) {
                      const formattedErrors = {};
                      if (err.inner) {
                        err.inner.forEach((e) => {
                          formattedErrors[e.path] = e.message;
                        });
                      }
                      setErrors(formattedErrors);
                    }
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
