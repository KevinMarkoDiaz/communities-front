import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import { createBusiness } from "../../api/businessApi";

import Paso1General from "../../components/dashboard/formularios/negocios/Paso1General";
import Paso2Contacto from "../../components/dashboard/formularios/negocios/Paso2Contacto";
import Paso3Ubicacion from "../../components/dashboard/formularios/negocios/Paso3Ubicacion";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
import Paso5Propietario from "../../components/dashboard/formularios/negocios/Paso5Propietario";
import Paso6Extras from "../../components/dashboard/formularios/negocios/Paso6Extras";

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
          open: Yup.string().when("closed", {
            is: false,
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.notRequired(),
          }),
          close: Yup.string().when("closed", {
            is: false,
            then: (schema) => schema.required("Required"),
            otherwise: (schema) => schema.notRequired(),
          }),
        })
      )
      .required(),
  }),
  Yup.object({
    owner: Yup.object({
      name: Yup.string().required("Owner name is required"),
      image: Yup.string().url("Must be a valid URL").nullable(),
    }).required(),
  }),
  Yup.object({
    featuredImage: Yup.string().url("Must be a valid URL").nullable(),
    tags: Yup.array().of(Yup.string()).nullable(),
    isVerified: Yup.boolean().nullable(),
  }),
];

const initialValues = {
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
  owner: {
    name: "",
    image: "",
  },
  featuredImage: "",
  tags: [],
  isVerified: false,
};

export default function NegocioForm() {
  const [paso, setPaso] = useState(0);
  const PasoActual = steps[paso];
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const avanzar = () => setPaso((prev) => Math.min(prev + 1, steps.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema[paso]}
      onSubmit={async (values, { setSubmitting }) => {
        if (paso === steps.length - 1) {
          try {
            const response = await createBusiness(values, token);
            console.log("Negocio creado:", response);
            navigate("/dashboard/negocios"); // redirige al listado
          } catch (error) {
            console.error("Error al crear el negocio:", error);
            alert("Hubo un error al guardar el negocio.");
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
              {paso === steps.length - 1 ? "Guardar" : "Siguiente"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
