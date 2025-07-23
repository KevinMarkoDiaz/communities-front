import { useState } from "react";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";
import Paso1Info from "./Paso1Info";
import PasoUbicacion from "../PasoUbicacion";
import Paso2Detalles from "./Paso2Detalles";
import Paso3Imagen from "./Paso3Imagen";
import Paso4Opciones from "./Paso4Opciones";

import { createEventThunk } from "../../../../store/eventosSlice";
import { mostrarFeedback } from "../../../../store/feedbackSlice";

const nombresPasos = [
  "Información",
  "Ubicación",
  "Detalles",
  "Imágenes",
  "Opciones Finales",
];

const pasos = [
  Paso1Info,
  PasoUbicacion,
  Paso2Detalles,
  Paso3Imagen,
  Paso4Opciones,
];

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

      // Imagen destacada
      if (values.image && typeof values.image !== "string") {
        formData.append("featuredImage", values.image);
      }

      // Galería de imágenes
      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append("images", img);
        });
      }

      // Convertir tags a array
      const tagsArray = values.tags
        ? values.tags.split(",").map((tag) => tag.trim())
        : [];

      // Construcción base de datos (sin image ni images)
      const data = {
        ...values,
        tags: tagsArray,
        price: Number(values.price),
      };

      // Limpiar image e images (ya se mandan por FormData)
      delete data.image;
      delete data.images;

      // Si el usuario es admin y seleccionó organizador, usarlo
      if (usuario.role === "admin" && values.organizer?.value) {
        data.organizer = values.organizer.value;
        data.organizerModel = values.organizer.model;
      }

      formData.append("data", JSON.stringify(data));

      // Enviar al backend
      await dispatch(createEventThunk(formData)).unwrap();

      dispatch(
        mostrarFeedback({
          message: "✅ Evento creado correctamente",
          type: "success",
        })
      );
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.message || "❌ Ocurrió un error al crear el evento",
          type: "error",
        })
      );
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
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-black/40 backdrop-blur-lg md:rounded-2xl shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-row md:flex-col w-full md:w-20 lg:w-36 space-x-4 md:space-x-0 md:space-y-8">
            {nombresPasos.map((nombre, index) => (
              <div
                key={index}
                className="relative flex flex-row items-center md:items-start"
              >
                {/* Conector */}
                {index !== nombresPasos.length - 1 && (
                  <>
                    {/* Línea horizontal para mobile */}
                    {/* Línea vertical para md+ */}
                    <span className="absolute hidden md:block left-3 top-6 h-[2rem] w-px bg-white/20" />
                  </>
                )}

                {/* Círculo con número o check */}
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full border-2 shrink-0
          ${
            paso === index
              ? "border-orange-500 bg-orange-500 text-black"
              : paso > index
              ? "border-green-500 bg-green-500 text-black"
              : "border-white/30 text-white"
          }
        `}
                >
                  {paso > index ? "✓" : index + 1}
                </div>

                {/* Nombre del paso (solo visible en md+) */}
                <div className="ml-2 text-xs lg:text-sm hidden md:block">
                  {nombre}
                </div>
              </div>
            ))}
          </div>

          {/* Contenido dinámico */}
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
