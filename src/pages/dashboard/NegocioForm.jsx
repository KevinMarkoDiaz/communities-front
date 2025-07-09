import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import {
  createBusiness,
  getBusinessById,
  updateBusiness,
} from "../../api/businessApi";

import Paso1General from "../../components/dashboard/formularios/negocios/Paso1General";
import Paso2Contacto from "../../components/dashboard/formularios/negocios/Paso2Contacto";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
import Paso3Ubicacion from "../../components/dashboard/formularios/PasoUbicacion";
import Paso5Propietario from "../../components/dashboard/formularios/negocios/Paso5Propietario";
import Paso6Extras from "../../components/dashboard/formularios/negocios/Paso6Extras";
import { getAllCategories } from "../../api/categoryApi";
import { getAllCommunities } from "../../api/communityApi";

const steps = [
  Paso1General,
  Paso2Contacto,
  Paso3Ubicacion,
  Paso4Horarios,
  Paso5Propietario,
  Paso6Extras,
];

const nombresPasos = [
  "General",
  "Contacto",
  "Ubicación",
  "Horarios",
  "Propietario",
  "Extras",
];

const validationSchema = [
  Yup.object({
    name: Yup.string().required("Nombre requerido"),
    description: Yup.string().required("Descripción requerida"),
    category: Yup.string().required("Categoría requerida"),
    community: Yup.string().required("Comunidad requerida"),
  }),
  Yup.object({
    contact: Yup.object({
      phone: Yup.string().required("Teléfono requerido"),
      email: Yup.string().email("Email inválido").required("Email requerido"),
      website: Yup.string().url("URL inválida").nullable(),
      socialMedia: Yup.object({
        facebook: Yup.string().nullable(),
        instagram: Yup.string().nullable(),
        whatsapp: Yup.string().nullable(),
      }).nullable(),
    }).required(),
  }),
  Yup.object({
    location: Yup.object({
      address: Yup.string().required("Dirección requerida"),
      city: Yup.string().required("Ciudad requerida"),
      state: Yup.string().required("Estado requerido"),
      zipCode: Yup.string().required("Código postal requerido"),
      country: Yup.string().required("País requerido"),
      coordinates: Yup.object({
        lat: Yup.number().nullable(),
        lng: Yup.number().nullable(),
      }).nullable(),
    }).required(),
  }),
  Yup.object({
    openingHours: Yup.array()
      .of(
        Yup.object({
          day: Yup.string().required(),
          closed: Yup.boolean(),
          open: Yup.string()
            .nullable()
            .when("closed", {
              is: false,
              then: (schema) =>
                schema
                  .required("Hora de apertura requerida")
                  .matches(/^\d{2}:\d{2}$/, "Formato HH:MM inválido"),
              otherwise: (schema) => schema.oneOf(["", null]),
            }),
          close: Yup.string()
            .nullable()
            .when("closed", {
              is: false,
              then: (schema) =>
                schema
                  .required("Hora de cierre requerida")
                  .matches(/^\d{2}:\d{2}$/, "Formato HH:MM inválido"),
              otherwise: (schema) => schema.oneOf(["", null]),
            }),
        })
      )
      .required(),
  }),
  Yup.object({
    ownerId: Yup.string().required("Propietario requerido"),
    ownerDisplay: Yup.object({
      name: Yup.string().nullable(),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
    }).nullable(),
  }),
  Yup.object({
    featuredImage: Yup.mixed().required("Imagen destacada requerida"),
    profileImage: Yup.mixed().required("Imagen de perfil requerida"),
    images: Yup.array()
      .of(
        Yup.mixed().test(
          "is-valid-image",
          "Cada imagen debe ser una URL válida o un archivo",
          (value) =>
            typeof value === "string" ||
            (typeof File !== "undefined" && value instanceof File)
        )
      )
      .min(1, "Sube al menos una imagen"),
    tags: Yup.array().of(Yup.string()).nullable(),
    isVerified: Yup.boolean().nullable(),
  }),
];

const defaultInitialValues = {
  name: "",
  description: "",
  category: "",
  community: "",
  contact: {
    phone: "",
    email: "",
    website: "",
    socialMedia: { facebook: "", instagram: "", whatsapp: "" },
  },
  location: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    coordinates: { lat: "", lng: "" },
  },
  openingHours: [
    { day: "Monday", open: "", close: "", closed: false },
    { day: "Tuesday", open: "", close: "", closed: false },
    { day: "Wednesday", open: "", close: "", closed: false },
    { day: "Thursday", open: "", close: "", closed: false },
    { day: "Friday", open: "", close: "", closed: false },
    { day: "Saturday", open: "", close: "", closed: false },
    { day: "Sunday", open: "", close: "", closed: false },
  ],
  ownerId: "",
  ownerDisplay: { name: "", image: "" },
  featuredImage: "",
  profileImage: "",
  tags: [],
  isVerified: false,
  images: [],
};

export default function NegocioForm() {
  const [categorias, setCategorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [paso, setPaso] = useState(0);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const PasoActual = steps[paso];

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const [cats, comms] = await Promise.all([
          getAllCategories(),
          getAllCommunities(),
        ]);
        setCategorias(cats.categories);
        setComunidades(comms.communities);
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    };
    cargarOpciones();
  }, []);

  useEffect(() => {
    if (id) {
      setCargando(true);
      getBusinessById(id)
        .then((res) => {
          const negocio = res.business;
          setInitialValues({
            ...defaultInitialValues,
            ...negocio,
            category: negocio.category?._id || negocio.category,
            community: negocio.community?._id || negocio.community,
            ownerId: negocio.owner?._id || negocio.owner,
            ownerDisplay: {
              name: negocio.owner?.name || "",
              image: negocio.owner?.profileImage || "",
            },
          });
        })
        .catch((err) => {
          console.error("Error:", err);
          alert("Error cargando datos del negocio.");
        })
        .finally(() => setCargando(false));
    }
  }, [id]);

  if (cargando) return <p className="p-4">Cargando datos...</p>;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema[paso]}
      validateOnBlur={false}
      validateOnChange={false}
      onSubmit={async (values, { setSubmitting, validateForm }) => {
        const errors = await validateForm();
        if (Object.keys(errors).length) {
          console.warn("Errores:", errors);
          setSubmitting(false);
          return;
        }

        if (paso === steps.length - 1) {
          try {
            const { featuredImage, profileImage, images, ...rest } = values;
            const formData = new FormData();

            if (featuredImage instanceof File)
              formData.append("featuredImage", featuredImage);
            else formData.append("featuredImageUrl", featuredImage);

            if (profileImage instanceof File)
              formData.append("profileImage", profileImage);
            else formData.append("profileImageUrl", profileImage);

            images.forEach((img) =>
              img instanceof File
                ? formData.append("images", img)
                : formData.append("existingImages[]", img)
            );

            Object.entries(rest).forEach(([k, v]) =>
              formData.append(k, typeof v === "object" ? JSON.stringify(v) : v)
            );

            id
              ? await updateBusiness(id, formData)
              : await createBusiness(formData);

            navigate("/dashboard/mis-negocios");
          } catch (err) {
            console.error("Error al guardar:", err);
          } finally {
            setSubmitting(false);
          }
        }
      }}
    >
      {({ validateForm }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-8 bg-black/40 backdrop-blur-lg rounded-2xl shadow-2xl text-white">
          {/* Sidebar */}
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
                <div className="ml-3 text-sm">{nombre}</div>
              </div>
            ))}
          </div>

          {/* Contenido */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium">
                Paso {paso + 1} de {steps.length}:{" "}
                <span className="text-orange-400">{nombresPasos[paso]}</span>
              </div>
              <div className="w-1/3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{
                    width: `${((paso + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={paso}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                <PasoActual
                  {...(paso === 0 ? { categorias, comunidades } : {})}
                />
              </motion.div>
            </AnimatePresence>

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
                type="button"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                onClick={async () => {
                  const errors = await validateForm();
                  if (Object.keys(errors).length === 0) {
                    if (paso < steps.length - 1) {
                      setPaso((p) => p + 1);
                    } else {
                      document.querySelector("form").requestSubmit();
                    }
                  }
                }}
              >
                {paso === steps.length - 1
                  ? id
                    ? "Actualizar negocio"
                    : "Crear negocio"
                  : "Siguiente"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
