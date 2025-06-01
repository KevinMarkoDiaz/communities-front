import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import Paso1Datos from "./Paso1Datos";
import Paso2Descripcion from "./Paso2Descripcion";
import Paso3Ubicacion from "./Paso3Ubicacion";

const pasos = [Paso1Datos, Paso2Descripcion, Paso3Ubicacion];
const esquemaValidacion = [
  Yup.object({
    name: Yup.string().min(2).required("Nombre requerido"),
    lastName: Yup.string().min(2).required("Apellido requerido"),
    title: Yup.string().required("Título requerido"),
  }),
  Yup.object({
    description: Yup.string().min(10, "Muy corta").required("Requerida"),
  }),
  Yup.object({
    profileImage: Yup.string()
      .url("Debe ser una URL válida")
      .required("Requerida"),
    location: Yup.string().required("Requerida"),
    country: Yup.string().required("Selecciona un país"),
  }),
];

export default function EditarPerfilForm({ initialValues, onSubmit }) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  // Inicializa con los valores completos o con default
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
          setPaso(paso + 1);
          actions.setTouched({});
          actions.setSubmitting(false);
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
                onClick={() => setPaso(paso - 1)}
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
