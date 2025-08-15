// src/pages/NegocioForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import { getBusinessById } from "../../api/businessApi";
import Paso1General from "../../components/dashboard/formularios/negocios/Paso1General";
import Paso2Contacto from "../../components/dashboard/formularios/negocios/Paso2Contacto";
import Paso3Ubicacion from "../../components/dashboard/formularios/PasoUbicacion";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
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

export default function NegocioForm() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.usuario);
  const comunidades = useSelector((state) => state.comunidades.lista);
  const categorias = useSelector((state) => state.categorias.data);
  const comunidadesLoaded = useSelector((state) => state.comunidades.loaded);
  const categoriasLoaded = useSelector((state) => state.categorias.loaded);

  const [paso, setPaso] = useState(0);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    categories: [],
    community: "",
    contact: {
      phone: "",
      email: "",
      website: "",
      socialMedia: { facebook: "", instagram: "", whatsapp: "" },
    },
    isDeliveryOnly: false,
    primaryZip: "",
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
  });
  const [cargando, setCargando] = useState(false);
  const PasoActual = steps[paso];

  useEffect(() => {
    if (!categoriasLoaded) dispatch(fetchCategorias());
    if (!comunidadesLoaded) dispatch(fetchComunidades());
  }, [dispatch, categoriasLoaded, comunidadesLoaded]);

  useEffect(() => {
    if (id) {
      setCargando(true);
      getBusinessById(id)
        .then((res) => {
          const negocio = res.business;
          setInitialValues((prev) => ({
            ...prev,
            ...negocio,
            categories: (negocio.categories || []).map((cat) => cat._id || cat),
            community: negocio.community?._id || negocio.community,
            ownerId: negocio.owner?._id || negocio.owner,
            ownerDisplay: {
              name: negocio.owner?.name || "",
              image: negocio.owner?.profileImage || "",
            },
            isDeliveryOnly: Boolean(negocio.isDeliveryOnly),
            primaryZip: negocio.primaryZip || "",
            location: {
              address: negocio.location?.address || "",
              city: negocio.location?.city || "",
              state: negocio.location?.state || "",
              zipCode: negocio.location?.zipCode || "",
              country: negocio.location?.country || "",
              coordinates: {
                // backend guarda [lng, lat]
                lat:
                  negocio.location?.coordinates?.coordinates?.[1] ??
                  negocio.location?.coordinates?.lat ??
                  "",
                lng:
                  negocio.location?.coordinates?.coordinates?.[0] ??
                  negocio.location?.coordinates?.lng ??
                  "",
              },
            },
          }));
        })
        .catch(() => {
          dispatch(
            mostrarFeedback({
              message: "Error al cargar los datos del negocio.",
              type: "error",
            })
          );
        })
        .finally(() => setCargando(false));
    } else if (user?.role !== "admin" && user?._id) {
      setInitialValues((prev) => ({
        ...prev,
        ownerId: user._id,
        ownerDisplay: { name: user.name, image: user.profileImage },
      }));
    }
  }, [id, user, dispatch]);

  if (cargando) return <SkeletonNegocioForm />;

  // Validación por paso
  const validationSchema = [
    Yup.object({
      name: Yup.string().required("Nombre requerido"),
      description: Yup.string().required("Descripción requerida"),
      categories: Yup.array()
        .of(Yup.string().matches(/^[0-9a-fA-F]{24}$/))
        .min(1, "Selecciona al menos una categoría"),
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
      isDeliveryOnly: Yup.boolean().default(false),
      primaryZip: Yup.string().when("isDeliveryOnly", {
        is: true,
        then: (s) =>
          s
            .required("ZIP requerido")
            .matches(/^\d{5}$/, "Debe ser un ZIP de 5 dígitos"),
        otherwise: (s) => s.notRequired().nullable(true),
      }),
      location: Yup.object().when("isDeliveryOnly", {
        is: true,
        then: (schema) =>
          schema.shape({
            address: Yup.string().nullable(true),
            city: Yup.string().nullable(true),
            state: Yup.string().nullable(true),
            zipCode: Yup.string().nullable(true),
            country: Yup.string().nullable(true),
            coordinates: Yup.object({
              // permisivo en el form; el backend recalcula si hace falta
              lat: Yup.mixed().nullable(true),
              lng: Yup.mixed().nullable(true),
            }).nullable(true),
          }),
        otherwise: (schema) =>
          schema.shape({
            address: Yup.string().required("Dirección requerida"),
            city: Yup.string().required("Ciudad requerida"),
            state: Yup.string().required("Estado requerido"),
            zipCode: Yup.string().required("Código postal requerido"),
            country: Yup.string().required("País requerido"),
            coordinates: Yup.object({
              lat: Yup.mixed().nullable(true),
              lng: Yup.mixed().nullable(true),
            }).nullable(true),
          }),
      }),
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
                then: (s) =>
                  s
                    .required("Hora de apertura requerida")
                    .matches(/\d{2}:\d{2}/, "Formato HH:MM inválido"),
              }),
            close: Yup.string()
              .nullable()
              .when("closed", {
                is: false,
                then: (s) =>
                  s
                    .required("Hora de cierre requerida")
                    .matches(/\d{2}:\d{2}/, "Formato HH:MM inválido"),
              }),
          })
        )
        .required(),
    }),
    Yup.object(
      user?.role === "admin"
        ? {
            ownerId: Yup.string().required("Propietario requerido"),
            ownerDisplay: Yup.object({
              name: Yup.string().nullable(),
              image: Yup.string().url("Debe ser una URL válida").nullable(),
            }).nullable(),
          }
        : {}
    ),
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

  // helper para limpiar ZIP a 5 dígitos
  const cleanZip = (z) =>
    (String(z || "").match(/\d/g) || []).join("").slice(0, 5);

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
              ownerId,
              categories, // 👈 lo sacamos para no duplicarlo
              ...restRaw
            } = values;

            // ❌ Nunca mandes owner (puede venir de ...negocio en initialValues)
            const { owner, ...rest } = restRaw;

            // 🧹 No mandes coordinates; el backend geocodifica
            const safePayload = { ...rest };
            if (safePayload?.location?.coordinates) {
              delete safePayload.location.coordinates;
            }

            // Delivery-only: solo manda primaryZip válido y no mandes location
            if (rest.isDeliveryOnly) {
              const zip = cleanZip(rest.primaryZip || rest.location?.zipCode);
              if (zip.length !== 5) {
                dispatch(
                  mostrarFeedback({
                    message: "ZIP requerido de 5 dígitos",
                    type: "error",
                  })
                );
                setSubmitting(false);
                return;
              }
              safePayload.primaryZip = zip;
              delete safePayload.location; // importantísimo
            } else {
              // no delivery-only → no mandes primaryZip vacío
              const z = cleanZip(safePayload.primaryZip);
              if (z.length === 5) safePayload.primaryZip = z;
              else delete safePayload.primaryZip;
            }

            const formData = new FormData();

            // Imágenes principales
            if (featuredImage instanceof File)
              formData.append("featuredImage", featuredImage);
            else if (featuredImage)
              formData.append("featuredImageUrl", featuredImage);

            if (profileImage instanceof File)
              formData.append("profileImage", profileImage);
            else if (profileImage)
              formData.append("profileImageUrl", profileImage);

            // Galería
            const existingImages = images.filter(
              (img) => typeof img === "string"
            );
            if (existingImages.length) {
              formData.append("existingImages", JSON.stringify(existingImages));
            }
            images
              .filter((img) => img instanceof File)
              .forEach((img) => formData.append("images", img));

            // Owner SOLO en creación
            const finalOwnerId = user?.role === "admin" ? ownerId : user?._id;
            if (!id && finalOwnerId) {
              formData.append("ownerId", finalOwnerId);
            }

            // ✅ Categories SOLO como múltiples campos, NO en safePayload
            const onlyIds = (categories || [])
              .map(String)
              .filter((x) => /^[0-9a-fA-F]{24}$/.test(x));
            onlyIds.forEach((cid) => formData.append("categories", cid));

            // 🚫 NO reinsertar 'categories' en safePayload
            // Adjunta el resto del payload evitando vacíos
            Object.entries(safePayload).forEach(([key, val]) => {
              if (val === "" || val === null || typeof val === "undefined")
                return;
              formData.append(
                key,
                typeof val === "object" ? JSON.stringify(val) : String(val)
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
        <Form className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto p-4 md:p-8 md:rounded-2xl bg-black/40 backdrop-blur-lg shadow-2xl text-white">
          {/* Sidebar de pasos */}
          <div className="flex flex-row md:flex-col w-full md:w-20 lg:w-36 space-x-4 md:space-x-0 md:space-y-8">
            {nombresPasos.map((nombre, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row md:items-start items-center"
              >
                {index !== nombresPasos.length - 1 && (
                  <>
                    <span className="absolute hidden md:hidden left-1/2 top-6 w-10 h-px bg-white/20 translate-x-1/2" />
                    <span
                      className="absolute hidden md:block left-2.5 top-7 h-full w-px bg-white/20"
                      style={{ minHeight: "1.5rem" }}
                    />
                  </>
                )}
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
                <div className="ml-2 text-xs lg: text-xs hidden md:block">
                  {nombre}
                </div>
              </div>
            ))}
          </div>

          {/* Paso actual */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div className=" text-xs font-medium">
                Paso {paso + 1} de {steps.length}:{" "}
                <span className="text-orange-400">{nombresPasos[paso]}</span>
              </div>
              <div className="w-1/3 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all"
                  style={{ width: `${((paso + 1) / steps.length) * 100}%` }}
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
                  soloLectura={paso === 4 && user?.role !== "admin"}
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
                      // envía el formulario
                      document.querySelector("form")?.requestSubmit();
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
