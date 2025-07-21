// src/components/dashboard/formularios/perfil/EditarPerfilForm.jsx
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import Paso1Datos from "./Paso1Datos";
import Paso2Descripcion from "./Paso2Descripcion";
import Paso3Ubicacion from "./Paso3Ubicacion";

// Pasos y nombres
const pasos = [Paso1Datos, Paso2Descripcion, Paso3Ubicacion];
const nombresPasos = ["Datos Básicos", "Descripción", "Ubicación"];

// Validaciones
const esquemaValidacion = [
  Yup.object({
    name: Yup.string().min(2, "Muy corto").required("Nombre requerido"),
    lastName: Yup.string().min(2, "Muy corto").required("Apellido requerido"),
    title: Yup.string().required("Título requerido"),
  }),
  Yup.object({
    description: Yup.string().min(10, "Muy corta").required("Requerida"),
  }),
  Yup.object({
    profileImage: Yup.mixed()
      .test(
        "is-valid-profile-image",
        "Debe ser una URL válida o un archivo de imagen",
        (value) => {
          if (!value) return false;
          if (typeof value === "string") {
            // valida si es una URL
            return /^https?:\/\/.+/.test(value);
          }
          if (typeof value === "object" && value instanceof File) {
            return true;
          }
          return false;
        }
      )
      .required("Imagen requerida"),
    location: Yup.string().required("Requerida"),
    country: Yup.string().required("Selecciona un país"),
  }),
];

export default function EditarPerfilForm({ initialValues, onSubmit }) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  // Valores iniciales
  const valoresIniciales = {
    name: initialValues?.name || "",
    lastName: initialValues?.lastName || "",
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    profileImage: initialValues?.profileImage || "",
    location: initialValues?.location || "",
    country: initialValues?.country || "",
  };

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={esquemaValidacion[paso]}
      onSubmit={(values, actions) => {
        if (paso === pasos.length - 1) {
          onSubmit(values);
          actions.setSubmitting(false);
        } else {
          setPaso((prev) => prev + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {() => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-3xl mx-auto p-8 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-col space-y-8 w-full md:w-36">
            {nombresPasos.map((nombre, index) => (
              <div key={index} className="flex items-start relative">
                {index !== nombresPasos.length - 1 && (
                  <span
                    className="absolute left-3 top-7 h-full w-px bg-white/20"
                    style={{ minHeight: "1.5rem" }}
                  />
                )}
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
                <div className="ml-3 text-sm">{nombre}</div>
              </div>
            ))}
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-6">
            {/* Barra de progreso */}
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

            {/* Contenido del paso */}
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

            {/* Botones de navegación */}
            <div className="flex justify-between gap-2 mt-6">
              {paso > 0 && (
                <button
                  type="button"
                  onClick={() => setPaso((prev) => prev - 1)}
                  className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition"
                >
                  Atrás
                </button>
              )}
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
              >
                {paso === pasos.length - 1 ? "Guardar Cambios" : "Siguiente"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
