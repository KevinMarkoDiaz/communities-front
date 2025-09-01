import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";

import Paso1Info from "./pasos/Paso1Info";
import Paso2Cultura from "./pasos/Paso2Cultura";
import Paso3Recursos from "./pasos/Paso3Recursos";
import Paso4Ubicacion from "./pasos/Paso4Ubicacion";
import Paso5SEO from "./pasos/Paso5SEO";
import Paso6Imagenes from "./pasos/Paso6Imagenes";
import Paso7Resumen from "./pasos/Paso7Resumen";

import {
  initialValuesComunidad,
  validationSchemaComunidad,
} from "./schemaComunidad";

import {
  createCommunityThunk,
  updateCommunityThunk,
} from "../../../../store/comunidadesSlice.js";
import { mostrarFeedback } from "../../../../store/feedbackSlice.js";
import Paso8EnlacesExternos from "./pasos/Paso8EnlacesExternos.jsx";

const nombresPasos = [
  "Información Básica",
  "Cultura y Origen",
  "Recursos y Enlaces",
  "Ubicación",
  "SEO y Visibilidad",
  "Imágenes",
  "Resumen Final",
  "Enlaces Externos",
];

const pasos = [
  Paso1Info,
  Paso2Cultura,
  Paso3Recursos,
  Paso4Ubicacion,
  Paso5SEO,
  Paso6Imagenes,
  Paso7Resumen,
  Paso8EnlacesExternos,
];

export default function CrearEditarComunidadForm({
  modoEdicion = false,
  comunidadInicial = null,
}) {
  const [paso, setPaso] = useState(0);
  const navigate = useNavigate();
  const usuario = useSelector((state) => state.auth.usuario);
  const PasoActual = pasos[paso];
  const dispatch = useDispatch();

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
          ...(item.image instanceof File ? {} : { image: item.image }),
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

      if (
        payload.mapCenter?.lat !== undefined &&
        payload.mapCenter?.lng !== undefined
      ) {
        const lat =
          payload.mapCenter.lat === "" ? null : Number(payload.mapCenter.lat);
        const lng =
          payload.mapCenter.lng === "" ? null : Number(payload.mapCenter.lng);
        payload.mapCenter = {
          type: "Point",
          coordinates: [lng, lat],
        };
      }

      formData.append("data", JSON.stringify(payload));

      if (modoEdicion && comunidadInicial?._id) {
        await dispatch(
          updateCommunityThunk({ id: comunidadInicial._id, formData })
        ).unwrap();
        dispatch(
          mostrarFeedback({
            message: "✅ Comunidad actualizada correctamente",
            type: "success",
          })
        );
      } else {
        await dispatch(createCommunityThunk(formData)).unwrap();
        dispatch(
          mostrarFeedback({
            message: "✅ Comunidad creada correctamente",
            type: "success",
          })
        );
      }

      navigate("/dashboard-admin/mis-comunidades");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message:
            err?.message || "❌ Ocurrió un error al guardar la comunidad",
          type: "error",
        })
      );
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
      externalLinks:
        comunidadInicial.externalLinks?.map((link) => ({
          title: link.title,
          url: link.url,
          type: link.type,
          description: link.description || "",
        })) || [],
    };
  }, [modoEdicion, comunidadInicial]);

  return (
    <Formik
      initialValues={initialValuesFinales}
      enableReinitialize
      validationSchema={validationSchemaComunidad[paso]}
      onSubmit={(values, actions) => {
        if (paso === pasos.length - 1) {
          handleSubmit(values, actions);
        } else {
          setPaso((p) => p + 1);
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ validateForm, values, setErrors }) => (
        <Form
          className="flex flex-col lg:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-black/40 backdrop-blur-lg md:rounded-2xl shadow-2xl text-white"
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          <div className="flex flex-row lg:flex-col w-full lg:w-36 space-x-4 lg:space-x-0 lg:space-y-8">
            {nombresPasos.map((nombre, index) => (
              <div
                key={index}
                className="relative flex flex-col lg:flex-row lg:items-start items-center"
              >
                {index !== nombresPasos.length - 1 && (
                  <>
                    <span className="absolute lg:hidden left-full top-3 w-4 h-px bg-white/20" />
                    <span
                      className="absolute hidden lg:block left-2.5 top-7 h-full w-px bg-white/20"
                      style={{ minHeight: "1.5rem" }}
                    />
                  </>
                )}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 ${
                    paso === index
                      ? "border-orange-500 bg-orange-500 text-black"
                      : paso > index
                      ? "border-green-500 bg-green-500 text-black"
                      : "border-white/30 text-white"
                  }`}
                >
                  {paso > index ? "✓" : index + 1}
                </div>
                <div className="mt-2 text-xs lg:  text-xs hidden lg:block lg:ml-2">
                  {nombre}
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="  text-xs font-medium">
                Paso {paso + 1} de {pasos.length}:{" "}
                <span className="text-orange-400">{nombresPasos[paso]}</span>
              </div>
              <div className="w-1/3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{ width: `${((paso + 1) / pasos.length) * 100}%` }}
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
              {paso < pasos.length - 1 && (
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
              {paso === pasos.length - 1 && (
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {modoEdicion ? "Actualizar comunidad" : "Crear comunidad"}
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
