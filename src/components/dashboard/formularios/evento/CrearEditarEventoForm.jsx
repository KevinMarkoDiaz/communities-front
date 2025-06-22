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
    tags: Yup.string().nullable(),
  }),
  Yup.object({
    date: Yup.date().required("Fecha obligatoria"),
    time: Yup.string().required("Hora obligatoria"),
    location: Yup.string().required("Ubicación obligatoria"),
    isOnline: Yup.boolean(),
    virtualLink: Yup.string().when("isOnline", (isOnline, schema) =>
      isOnline
        ? schema.required("El link virtual es obligatorio").url("URL inválida")
        : schema.notRequired()
    ),
    registrationLink: Yup.string().nullable().url("Debe ser una URL válida"),
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
  location: "",
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
}) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avanzar = () => setPaso((prev) => Math.min(prev + 1, pasos.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  const handleSubmit = async (values, actions) => {
    try {
      console.log("🚀 Submitting values:", values);
      const formData = new FormData();

      if (values.image && typeof values.image !== "string") {
        console.log("🖼️ Imagen destacada:", values.image.name);
        formData.append("featuredImage", values.image);
      }

      if (Array.isArray(values.images)) {
        values.images.forEach((img, i) => {
          if (img instanceof File) {
            console.log(`🖼️ Imagen galería #${i + 1}:`, img.name);
            formData.append("images", img);
          }
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
        title: values.title,
        description: values.description,
        date: values.date,
        time: values.time,
        location: values.location,
        communities: values.communities,
        businesses: values.businesses || [],
        categories: values.categories,
        tags: tagsArray,
        language: values.language || "es",
        price: Number(values.price),
        isFree: values.isFree,
        isOnline: values.isOnline,
        status: values.status || "activo",
        featured: values.featured || false,
        isPublished: values.isPublished || false,
        registrationLink: values.registrationLink || "",
        sponsors: values.sponsors || [],
        organizer: organizerId,
        organizerModel: organizerModel,
      };

      if (values.isOnline && values.virtualLink) {
        data.virtualLink = values.virtualLink;
      }

      if (values.coordinates) {
        data.coordinates = values.coordinates;
      }

      console.log("📦 Datos enviados al backend:", data);
      formData.append("data", JSON.stringify(data));

      await createEvent(formData);
      dispatch(obtenerEventos());
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
