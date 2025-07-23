import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import { getBusinessById } from "../../api/businessApi";

import Paso1General from "../../components/dashboard/formularios/negocios/Paso1General";
import Paso2Contacto from "../../components/dashboard/formularios/negocios/Paso2Contacto";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
import Paso3Ubicacion from "../../components/dashboard/formularios/PasoUbicacion";
import Paso5Propietario from "../../components/dashboard/formularios/negocios/Paso5Propietario";
import Paso6Extras from "../../components/dashboard/formularios/negocios/Paso6Extras";

import { useDispatch, useSelector } from "react-redux";
import {
  createBusinessThunk,
  updateBusinessThunk,
} from "../../store/negociosSlice";
import { mostrarFeedback } from "../../store/feedbackSlice";
import { fetchComunidades } from "../../store/comunidadesSlice";
import { fetchCategorias } from "../../store/categoriasSlice";
import SkeletonNegocioForm from "../../components/Skeleton/SkeletonNegocioForm";

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
  const dispatch = useDispatch();
  const [paso, setPaso] = useState(0);
  const [initialValues, setInitialValues] = useState(defaultInitialValues);
  const [cargando, setCargando] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const PasoActual = steps[paso];

  const comunidades = useSelector((state) => state.comunidades.lista);
  const categorias = useSelector((state) => state.categorias.data);
  const comunidadesLoaded = useSelector((state) => state.comunidades.loaded);
  const categoriasLoaded = useSelector((state) => state.comunidades.loaded);

  useEffect(() => {
    if (!categoriasLoaded) dispatch(fetchCategorias());
    if (!comunidadesLoaded) dispatch(fetchComunidades());
  }, [dispatch]);

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
          dispatch(
            mostrarFeedback({
              message: "Error al cargar los datos del negocio.",
              type: "error",
            })
          );
        })
        .finally(() => setCargando(false));
    }
  }, [id]);

  if (cargando) return <SkeletonNegocioForm />;

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
          setSubmitting(false);
          return;
        }

        if (paso === steps.length - 1) {
          try {
            const {
              featuredImage,
              profileImage,
              images,
              ownerDisplay,
              owner,
              ownerId, // ✅ se usa solo si es creación
              ...rest
            } = values;

            const formData = new FormData();

            // Imágenes
            if (featuredImage instanceof File)
              formData.append("featuredImage", featuredImage);
            else formData.append("featuredImageUrl", featuredImage);

            if (profileImage instanceof File)
              formData.append("profileImage", profileImage);
            else formData.append("profileImageUrl", profileImage);

            const existingImages = images.filter(
              (img) => typeof img === "string"
            );
            if (existingImages.length) {
              formData.append("existingImages", JSON.stringify(existingImages));
            }

            images
              .filter((img) => img instanceof File)
              .forEach((img) => formData.append("images", img));

            // Agregar ownerId solo si es creación
            if (!id && ownerId) {
              formData.append("ownerId", ownerId);
            }

            // Resto del cuerpo
            Object.entries(rest).forEach(([key, val]) => {
              formData.append(
                key,
                typeof val === "object" ? JSON.stringify(val) : val
              );
            });

            if (id) {
              await dispatch(updateBusinessThunk({ id, formData })).unwrap();
              dispatch(
                mostrarFeedback({
                  message: "Negocio actualizado con éxito",
                  type: "success",
                })
              );
            } else {
              await dispatch(createBusinessThunk(formData)).unwrap();
              dispatch(
                mostrarFeedback({
                  message: "Negocio creado con éxito",
                  type: "success",
                })
              );
            }

            navigate("/dashboard/mis-negocios");
          } catch (err) {
            dispatch(
              mostrarFeedback({
                message: err?.message || "Error al guardar el negocio",
                type: "error",
              })
            );
          } finally {
            setSubmitting(false);
          }
        }
      }}
    >
      {({ validateForm }) => (
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 md:rounded-2xl bg-black/40 backdrop-blur-lg  shadow-2xl text-white">
          {/* Sidebar */}
          <div className="flex flex-row md:flex-col w-full md:w-20 lg:w-36 space-x-4 md:space-x-0 md:space-y-8">
            {nombresPasos.map((nombre, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row md:items-start items-center"
              >
                {/* Conector */}
                {index !== nombresPasos.length - 1 && (
                  <>
                    {/* Línea horizontal para mobile */}
                    <span className="absolute hidden md:hidden left-1/2 top-6 w-10 h-px bg-white/20 translate-x-1/2" />
                    {/* Línea vertical para md+ */}
                    <span
                      className="absolute hidden md:block left-2.5 top-7 h-full w-px bg-white/20"
                      style={{ minHeight: "1.5rem" }}
                    />
                  </>
                )}

                {/* Círculo con número o check */}
                <div
                  className={`flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0
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

                {/* Texto: solo visible en md+ */}
                <div className="ml-2 text-xs lg:text-sm hidden md:block">
                  {nombre}
                </div>
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
