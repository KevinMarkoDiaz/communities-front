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
import Paso3Ubicacion from "../../components/dashboard/formularios/negocios/Paso3Ubicacion";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
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

const validationSchema = [
  Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    community: Yup.string().required("Community is required"),
  }),
  Yup.object({
    contact: Yup.object({
      phone: Yup.string().required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      website: Yup.string().url("Invalid URL").nullable(),
      socialMedia: Yup.object({
        facebook: Yup.string().nullable(),
        instagram: Yup.string().nullable(),
        whatsapp: Yup.string().nullable(),
      }).nullable(),
    }).required(),
  }),
  Yup.object({
    location: Yup.object({
      address: Yup.string().required("Address is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      zipCode: Yup.string().required("Zip code is required"),
      country: Yup.string().required("Country is required"),
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
    ownerId: Yup.string().required("Se requiere un propietario"),
    ownerDisplay: Yup.object({
      name: Yup.string().nullable(),
      image: Yup.string().url("Debe ser una URL válida").nullable(),
    }).nullable(),
  }),
  Yup.object({
    featuredImage: Yup.string().url("Must be a valid URL").nullable(),
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
    socialMedia: {
      facebook: "",
      instagram: "",
      whatsapp: "",
    },
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
  ownerDisplay: {
    name: "",
    image: "",
  },
  featuredImage: "",
  tags: [],
  isVerified: false,
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
        console.error("Error cargando categorías o comunidades:", err);
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
            ...negocio,
            featuredImage: negocio.featuredImage || "",
            tags: negocio.tags || [],
            isVerified: negocio.isVerified || false,
          });
        })
        .catch((err) => {
          console.error("Error cargando negocio:", err);
          alert("Error al cargar los datos del negocio.");
        })
        .finally(() => setCargando(false));
    }
  }, [id]);

  const avanzar = () => setPaso((prev) => Math.min(prev + 1, steps.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  if (cargando) return <p className="p-4">Cargando datos...</p>;

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema[paso]}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("🧪 Datos originales:", values);

        if (paso === steps.length - 1) {
          try {
            // ✅ Sanitizar horarios correctamente
            const valuesSanitizados = {
              ...values,
              openingHours: values.openingHours.map((hora) =>
                hora.closed
                  ? { day: hora.day, closed: true } // ✅ nada de open/close
                  : {
                      day: hora.day,
                      closed: false,
                      open: hora.open,
                      close: hora.close,
                    }
              ),
            };

            console.log("🧪 Enviando datos sanitizados:", valuesSanitizados);

            if (id) {
              await updateBusiness(id, valuesSanitizados);
              alert("Negocio actualizado exitosamente.");
            } else {
              await createBusiness(valuesSanitizados);
              alert("Negocio creado exitosamente.");
            }

            navigate("/dashboard/mis-negocios");
          } catch (error) {
            const errores = error.response?.data?.errors;

            if (Array.isArray(errores)) {
              const mensaje = errores
                .map((err) => {
                  const campo = err?.path?.join(" > ") || "campo desconocido";
                  return `• Error en ${campo}: ${
                    err.message || "Error desconocido"
                  }`;
                })
                .join("\n");

              alert(`❌ Errores de validación:\n\n${mensaje}`);
            } else {
              alert("❌ Ocurrió un error al guardar el negocio.");
            }
          } finally {
            setSubmitting(false);
          }
        } else {
          avanzar();
        }
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {() => (
        <Form className="space-y-6 p-4 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={paso}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <PasoActual
                {...(paso === 0 ? { categorias, comunidades } : {})}
              />
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
              {paso === steps.length - 1
                ? id
                  ? "Actualizar"
                  : "Guardar"
                : "Siguiente"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
