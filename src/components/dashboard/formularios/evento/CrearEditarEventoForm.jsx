// src/components/.../CrearEditarEventoForm.jsx
import { useState } from "react";
import { Formik, Form } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import { customSelectStylesForm } from "../../../../../src/styles/customSelectStylesForm.js";
import Paso1Info from "./Paso1Info";
import PasoUbicacion from "./PasoUbicacion";
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
    isOnline: Yup.boolean(),
    location: Yup.object({
      address: Yup.string().when("isOnline", {
        is: false,
        then: (s) => s.required("Dirección obligatoria"),
        otherwise: (s) => s.notRequired(),
      }),
      city: Yup.string().when("isOnline", {
        is: false,
        then: (s) => s.required("Ciudad obligatoria"),
        otherwise: (s) => s.notRequired(),
      }),
      state: Yup.string().when("isOnline", {
        is: false,
        then: (s) => s.required("Estado obligatorio"),
        otherwise: (s) => s.notRequired(),
      }),
      zipCode: Yup.string().when("isOnline", {
        is: false,
        then: (s) => s.required("Código postal obligatorio"),
        otherwise: (s) => s.notRequired(),
      }),
      country: Yup.string().when("isOnline", {
        is: false,
        then: (s) => s.required("País obligatorio"),
        otherwise: (s) => s.notRequired(),
      }),
    }),
  }),
  Yup.object({
    date: Yup.date().required("Fecha obligatoria"),
    time: Yup.string().required("Hora obligatoria"),
    isOnline: Yup.boolean(),
    virtualLink: Yup.string()
      .transform((v) => (v === "" ? null : v))
      .when("isOnline", {
        is: true,
        then: (s) =>
          s.required("El link virtual es obligatorio").url("URL inválida"),
        otherwise: (s) => s.nullable().notRequired(),
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
    // PasoUbicacion puede agregar coordinates.lat/lng en runtime
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
  organizer: "", // siempre string (ObjectId). No guardes objeto aquí.
  organizerModel: "", // "User" | "Business" | "Community"
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

      // ========= 1) Files =========
      if (values.image && typeof values.image !== "string") {
        formData.append("featuredImage", values.image);
      }
      if (Array.isArray(values.images)) {
        values.images.forEach((img) => {
          if (img instanceof File) formData.append("images", img);
        });
      }

      // ========= 2) Normalizaciones =========
      // tags: "a,b,c" -> ["a","b","c"]
      const tagsArray = values.tags
        ? values.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      // organizer: soporta string u objeto {value, model}
      const organizerId =
        typeof values.organizer === "object" && values.organizer !== null
          ? values.organizer.value || values.organizer._id || ""
          : values.organizer || "";

      // organizerModel si viene del select (guardas en values.organizer.model?)
      const organizerModelFromSelect =
        typeof values.organizer === "object" && values.organizer !== null
          ? values.organizer.model
          : values.organizerModel;

      // Si eres admin y seleccionaste un organizador explícito → úsalo
      let organizer = organizerId ? String(organizerId) : "";
      let organizerModel = organizerModelFromSelect || "";

      // Si no hay organizer válido, usa fallback:
      if (!organizer || !/^[0-9a-fA-F]{24}$/.test(organizer)) {
        if (usuario?.role === "admin") {
          // Admin debe seleccionar uno válido
          dispatch(
            mostrarFeedback({
              message: "Selecciona un organizador válido",
              type: "error",
            })
          );
          actions.setSubmitting(false);
          return;
        } else {
          // No admin → propio user
          organizer = String(usuario?._id || "");
          const rol = usuario?.role?.toLowerCase();
          organizerModel =
            rol === "business" || rol === "business_owner"
              ? "Business"
              : "User";
        }
      } else {
        // Si organizer es válido pero no enviaste model, infiere "User" por defecto
        if (!organizerModel) organizerModel = "User";
      }

      // precio
      const price = Number(values.price || 0);

      // ========= 3) Location & coords =========
      // Si online, limpia dirección
      let location = { ...(values.location || {}) };
      if (values.isOnline) {
        location = {
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: location.country || "USA",
        };
      } else {
        // si PasoUbicacion puso coords.lat/lng, arma geoJSON top-level `coordinates`
        const latRaw = location?.coordinates?.lat;
        const lngRaw = location?.coordinates?.lng;
        const lat = latRaw === "" ? null : Number(latRaw);
        const lng = lngRaw === "" ? null : Number(lngRaw);
        if (
          lat !== null &&
          lng !== null &&
          !Number.isNaN(lat) &&
          !Number.isNaN(lng)
        ) {
          // Tu backend de eventos puede aceptar coordinates geoJSON en top-level o dentro de location; si no, quítalo.
          // Aquí preferimos que el back geocodifique por address, así que NO lo mandamos.
          // Si tu back sí espera geoJSON, descomenta:
          // formData.append("coordinates", JSON.stringify({ type: "Point", coordinates: [lng, lat] }));
        }
        // Nunca mandes location.coordinates como objeto anidado
        if (location?.coordinates) delete location.coordinates;
      }

      // ========= 4) Helpers para anexar seguro =========
      const appendIf = (k, v) => {
        if (v === null || v === undefined) return;
        if (typeof v === "string" && v.trim() === "") return;
        formData.append(
          k,
          typeof v === "object" ? JSON.stringify(v) : String(v)
        );
      };
      const appendArrayAsJSON = (k, arr) => {
        const a = Array.isArray(arr) ? arr : [];
        if (!a.length) return;
        formData.append(k, JSON.stringify(a.map(String)));
      };

      // ========= 5) Campos primitivos =========
      appendIf("title", values.title);
      appendIf("description", values.description);
      appendIf("date", values.date);
      appendIf("time", values.time);

      // Online / links
      appendIf("isOnline", values.isOnline);
      if (values.isOnline) {
        appendIf("virtualLink", values.virtualLink);
      }
      appendIf("registrationLink", values.registrationLink);

      // Organizer
      formData.append("organizer", organizer);
      formData.append("organizerModel", organizerModel);

      // Location
      appendIf("location", location);

      // Precio y banderas
      appendIf("isFree", values.isFree);
      if (!values.isFree) appendIf("price", price);
      appendIf("language", values.language);
      appendIf("status", values.status);
      appendIf("featured", values.featured);
      appendIf("isPublished", values.isPublished);

      // Arrays
      appendArrayAsJSON("categories", values.categories);
      appendArrayAsJSON("communities", values.communities);
      appendArrayAsJSON("sponsors", values.sponsors);
      appendArrayAsJSON("likes", values.likes);
      appendArrayAsJSON("tags", tagsArray);

      // ========= 6) Dispatch =========
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
      {({ values }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 bg-black/40 backdrop-blur-lg md:rounded-2xl shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-row md:flex-col w-full md:w-20 lg:w-36 space-x-4 md:space-x-0 md:space-y-8">
            {nombresPasos.map((nombre, index) => (
              <div
                key={index}
                className="relative flex flex-row items-center md:items-start"
              >
                {index !== nombresPasos.length - 1 && (
                  <span className="absolute hidden md:block left-3 top-6 h-[2rem] w-px bg-white/20" />
                )}
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-full border-2 shrink-0
                    ${
                      paso === index
                        ? "border-orange-500 bg-orange-500 text-black"
                        : paso > index
                        ? "border-green-500 bg-green-500 text-black"
                        : "border-white/30 text-white"
                    }`}
                >
                  {paso > index ? "✓" : index + 1}
                </div>
                <div className="ml-2 text-xs hidden md:block">{nombre}</div>
              </div>
            ))}
          </div>

          {/* Contenido dinámico */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs font-medium">
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
