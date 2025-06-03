// src/components/dashboard/formularios/evento/CrearEditarEventoForm.jsx
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import Paso1Info from "./Paso1Info";
import Paso2Detalles from "./Paso2Detalles";
import Paso3Imagen from "./Paso3Imagen";
import Paso4Opciones from "./Paso4Opciones";

const pasos = [Paso1Info, Paso2Detalles, Paso3Imagen, Paso4Opciones];

const esquemaValidacion = [
  Yup.object({
    title: Yup.string().required("Título obligatorio"),
    description: Yup.string().required("Descripción obligatoria"),
  }),
  Yup.object({
    date: Yup.date().required("Fecha obligatoria"),
    time: Yup.string().required("Hora obligatoria"), // 👈 nuevo
    location: Yup.string().required("Ubicación obligatoria"),
  }),
  Yup.object({
    image: Yup.string()
      .url("Debe ser una URL válida")
      .required("Imagen requerida"),
  }),
  Yup.object({
    categories: Yup.array().min(1, "Selecciona al menos una categoría"),
    communities: Yup.array().min(1, "Selecciona al menos una comunidad"),
  }),
];

const valoresIniciales = {
  title: "",
  description: "",
  date: "",
  time: "", // 👈 nuevo
  location: "",
  image: "",
  categories: [],
  communities: [],
  tags: "",
};

export default function CrearEditarEventoForm({
  onSubmit,
  initialValues = valoresIniciales,
}) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  const avanzar = () => setPaso((prev) => Math.min(prev + 1, pasos.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={esquemaValidacion[paso]}
      onSubmit={(values, actions) => {
        if (paso === pasos.length - 1) {
          onSubmit(values, actions); // ✅ Pasás también 'actions'
        } else {
          avanzar();
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {() => (
        <Form className="space-y-6 p-4 overflow-hidden">
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
                onClick={retroceder}
                className="btn btn-secondary"
              >
                Atrás
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {paso === pasos.length - 1 ? "Guardar" : "Siguiente"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
