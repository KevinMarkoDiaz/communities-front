import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Paso1Info from "./Paso1Info";
import Paso2Detalles from "./Paso2Detalles";
import Paso3Imagen from "./Paso3Imagen";
import Paso4Opciones from "./Paso4Opciones";
import { obtenerEventos } from "../../../../store/eventosSlice";
import { createEvent } from "../../../../api/eventApi";

const pasos = [Paso1Info, Paso2Detalles, Paso3Imagen, Paso4Opciones];

const esquemaValidacion = [
  Yup.object({
    title: Yup.string().required("Título obligatorio"),
    description: Yup.string().required("Descripción obligatoria"),
  }),
  Yup.object({
    date: Yup.date().required("Fecha obligatoria"),
    time: Yup.string().required("Hora obligatoria"),
    location: Yup.string().required("Ubicación obligatoria"),
  }),
  Yup.object({
    image: Yup.mixed().required("Imagen destacada requerida"),
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
  time: "",
  location: "",
  image: null,
  categories: [],
  communities: [],
  tags: "",
};

export default function CrearEditarEventoForm({
  initialValues = valoresIniciales,
}) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  const usuario = useSelector((state) => state.auth.usuario);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avanzar = () => setPaso((prev) => Math.min(prev + 1, pasos.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (values, actions) => {
    try {
      const formData = new FormData();

      const data = {
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        tags: values.tags
          ? values.tags.split(",").map((tag) => tag.trim())
          : [],
        categories: values.categories,
        communities: values.communities,
        createdBy: usuario._id,
      };

      formData.append("data", JSON.stringify(data));

      if (values.image && typeof values.image !== "string") {
        formData.append("featuredImage", values.image);
      }

      await createEvent(formData, token);
      dispatch(obtenerEventos()); // ← 🔁 actualiza Redux
      alert("✅ Evento creado correctamente");
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      console.error("❌ Error al crear evento:", err);
      alert("Ocurrió un error al guardar el evento");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={esquemaValidacion[paso]}
      onSubmit={(values, actions) => {
        if (paso === pasos.length - 1) {
          handleSubmit(values, actions);
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
