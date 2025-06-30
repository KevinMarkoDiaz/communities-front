import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";

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

      // ✅ Solo agregar si son archivos nuevos
      if (flagImage instanceof File) formData.append("flagImage", flagImage);
      if (bannerImage instanceof File)
        formData.append("bannerImage", bannerImage);
      if (originCountryInfo?.flag instanceof File) {
        formData.append("originCountryFlag", originCountryInfo.flag);
      }

      // Imágenes de comida
      food.forEach((item, index) => {
        if (item.image instanceof File) {
          formData.append(`foodImages[${index}]`, item.image);
        }
      });

      // Construir payload limpio
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
          description: item.description,
          image: item.image instanceof File ? "" : item.image,
        })),
        owner: usuario.id,
      };

      // Limpiar coordenadas si vienen vacías
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

  // ✅ Valores iniciales adaptados dinámicamente
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
        <Form className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={paso}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PasoActual />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-6">
            {paso > 0 && (
              <button
                type="button"
                onClick={() => setPaso((p) => p - 1)}
                className="btn btn-secondary"
              >
                Atrás
              </button>
            )}

            {paso === pasos.length - 1 ? (
              <button type="submit" className="btn btn-primary">
                {modoEdicion ? "Actualizar comunidad" : "Crear comunidad"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
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
                    console.warn(
                      "❌ Errores en el paso actual:",
                      formattedErrors
                    );
                  }
                }}
              >
                Siguiente
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
