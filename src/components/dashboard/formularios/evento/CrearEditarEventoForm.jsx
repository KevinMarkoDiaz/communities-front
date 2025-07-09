import { useState } from "react";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";

import Paso1Info from "./Paso1Info";
import PasoUbicacion from "../PasoUbicacion";
import Paso2Detalles from "./Paso2Detalles";
import Paso3Imagen from "./Paso3Imagen";
import Paso4Opciones from "./Paso4Opciones";

import { obtenerEventos } from "../../../../store/eventosSlice";
import { createEvent } from "../../../../api/eventApi";

// Nombres de los pasos
const nombresPasos = [
  "Información Básica",
  "Ubicación",
  "Detalles del Evento",
  "Imágenes",
  "Opciones Finales",
];

// Pasos en orden
const pasos = [
  Paso1Info,
  PasoUbicacion,
  Paso2Detalles,
  Paso3Imagen,
  Paso4Opciones,
];

// Validaciones
import * as Yup from "yup";
const esquemaValidacion = [
  Yup.object({
    title: Yup.string().required("Título obligatorio"),
    description: Yup.string().required("Descripción obligatoria"),
    tags: Yup.string().nullable(),
  }),
  Yup.object({
    location: Yup.object({
      address: Yup.string().required("Dirección obligatoria"),
      city: Yup.string().required("Ciudad obligatoria"),
      state: Yup.string().required("Estado obligatorio"),
      zipCode: Yup.string().required("Código postal obligatorio"),
      country: Yup.string().required("País obligatorio"),
      coordinates: Yup.object({
        lat: Yup.number().nullable(),
        lng: Yup.number().nullable(),
      }).nullable(),
    }).required("Ubicación obligatoria"),
  }),
  Yup.object({
    date: Yup.date().required("Fecha obligatoria"),
    time: Yup.string().required("Hora obligatoria"),
    isOnline: Yup.boolean(),
    virtualLink: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .when("isOnline", {
        is: true,
        then: (schema) =>
          schema.required("El link virtual es obligatorio").url("URL inválida"),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
    registrationLink: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .nullable()
      .notRequired()
      .url("Debe ser una URL válida"),
  }),
  Yup.object({
    image: Yup.mixed().required("Imagen destacada requerida"),
    images: Yup.array().of(Yup.mixed()).nullable(),
  }),
  Yup.object({
    categories: Yup.array()
      .min(1, "Selecciona al menos una categoría")
      .of(Yup.string().required()),
    communities: Yup.array()
      .min(1, "Selecciona al menos una comunidad")
      .of(Yup.string().required()),
    isFree: Yup.boolean(),
    price: Yup.mixed().when("isFree", {
      is: false,
      then: () =>
        Yup.number()
          .typeError("Debe ser un número")
          .required("Precio obligatorio")
          .min(1, "Debe ser mayor a 0"),
      otherwise: () => Yup.number().notRequired(),
    }),
    sponsors: Yup.array().of(Yup.string()).nullable(),
    language: Yup.string().oneOf(["es", "en", "pt", "fr"]).default("es"),
    status: Yup.string().oneOf(["activo", "cancelado", "finalizado"]),
    featured: Yup.boolean(),
    isPublished: Yup.boolean(),
  }),
];

const valoresIniciales = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    coordinates: { lat: null, lng: null },
  },
  image: null,
  images: [],
  categories: [],
  communities: [],
  tags: "",
  language: "es",
  isFree: true,
  price: 0,
  isOnline: false,
  virtualLink: "",
  registrationLink: "",
  sponsors: [],
  status: "activo",
  featured: false,
  isPublished: false,
  organizer: "",
  organizerModel: "",
  organizerLabel: "",
};

export default function CrearEditarEventoForm({
  initialValues = valoresIniciales,
  onSubmit,
  modoEdicion = false,
}) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitInterno = async (values, actions) => {
    try {
      const formData = new FormData();

      if (values.image && typeof values.image !== "string") {
        formData.append("featuredImage", values.image);
      }

      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append("images", img);
        });
      }

      const tagsArray = values.tags
        ? values.tags.split(",").map((tag) => tag.trim())
        : [];

      const organizerId = values.organizer?.value || usuario._id;
      const organizerModel =
        values.organizer?.model ||
        (usuario.role === "business_owner" ? "Business" : "User");

      const data = {
        ...values,
        tags: tagsArray,
        price: Number(values.price),
        organizer: organizerId,
        organizerModel,
      };

      formData.append("data", JSON.stringify(data));

      await createEvent(formData);
      dispatch(obtenerEventos());
      alert("✅ Evento creado correctamente");
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      console.error("❌ Error al guardar evento:", err);
      alert("Ocurrió un error al guardar el evento");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={esquemaValidacion[paso]}
      onSubmit={(values, actions) => {
        if (paso === pasos.length - 1) {
          modoEdicion
            ? onSubmit(values, actions)
            : handleSubmitInterno(values, actions);
        } else {
          setPaso((p) => p + 1);
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, setErrors }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-8 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-col space-y-8 w-full md:w-36">
            {nombresPasos.map((nombre, index) => (
              <div key={index} className="flex items-start relative">
                {index !== nombresPasos.length - 1 && (
                  <span
                    className="absolute left-2.5 top-7 h-full w-px bg-white/20"
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
                <div className="ml-3 text-sm leading-tight">{nombre}</div>
              </div>
            ))}
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
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
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
              >
                {paso === pasos.length - 1
                  ? modoEdicion
                    ? "Actualizar Evento"
                    : "Crear Evento"
                  : "Siguiente"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
