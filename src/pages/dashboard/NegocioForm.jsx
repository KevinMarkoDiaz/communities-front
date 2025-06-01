import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion } from "framer-motion";

import Paso1General from "../../components/dashboard/formularios/negocios/Paso1General";
import Paso2Contacto from "../../components/dashboard/formularios/negocios/Paso2Contacto";
import Paso3Ubicacion from "../../components/dashboard/formularios/negocios/Paso3Ubicacion";
import Paso4Horarios from "../../components/dashboard/formularios/negocios/Paso4Horarios";
import Paso5Propietario from "../../components/dashboard/formularios/negocios/Paso5Propietario";
import Paso6Extras from "../../components/dashboard/formularios/negocios/Paso6Extras";

const pasos = [
  Paso1General,
  Paso2Contacto,
  Paso3Ubicacion,
  Paso4Horarios,
  Paso5Propietario,
  Paso6Extras,
];
const esquemaValidacion = [
  Yup.object({
    nombre: Yup.string().required("Nombre obligatorio"),
    descripcion: Yup.string().required("Descripción requerida"),
    categoria: Yup.string().required("Categoría requerida"),
    comunidad: Yup.string().required("Comunidad requerida"),
  }),
  Yup.object({
    contacto: Yup.object({
      telefono: Yup.string().required("Teléfono requerido"),
      email: Yup.string().email("Email inválido").required("Email requerido"),
      website: Yup.string().url("URL inválida"),
      redes: Yup.object({
        facebook: Yup.string(),
        instagram: Yup.string(),
        whatsapp: Yup.string(),
      }),
    }),
  }),
  Yup.object({
    ubicacion: Yup.object({
      direccion: Yup.string().required("Dirección requerida"),
      ciudad: Yup.string().required("Ciudad requerida"),
      estado: Yup.string().required("Estado requerido"),
      codigoPostal: Yup.string().required("Código postal requerido"),
      pais: Yup.string().required("País requerido"),
    }),
  }),
  Yup.object({
    horarios: Yup.array().of(
      Yup.object({
        dia: Yup.string().required(),
        cerrado: Yup.boolean(),
        apertura: Yup.string().when("cerrado", {
          is: false,
          then: (schema) => schema.required("Campo requerido"),
          otherwise: (schema) => schema.notRequired(),
        }),
        cierre: Yup.string().when("cerrado", {
          is: false,
          then: (schema) => schema.required("Campo requerido"),
          otherwise: (schema) => schema.notRequired(),
        }),
      })
    ),
  }),
  Yup.object({
    propietario: Yup.object({
      nombre: Yup.string().required("Nombre del propietario requerido"),
      imagen: Yup.string().url("Debe ser una URL válida"),
    }),
  }),
  Yup.object({
    imagenDestacada: Yup.string().url("Debe ser una URL válida"),
    etiquetas: Yup.array().of(Yup.string()),
  }),
];

const diasSemana = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

const valoresIniciales = {
  nombre: "",
  descripcion: "",
  categoria: "",
  comunidad: "",
  contacto: {
    telefono: "",
    email: "",
    website: "",
    redes: {
      facebook: "",
      instagram: "",
      whatsapp: "",
    },
  },
  ubicacion: {
    direccion: "",
    ciudad: "",
    estado: "",
    codigoPostal: "",
    pais: "",
    coordenadas: { lat: "", lng: "" },
  },
  horarios: diasSemana.map((dia) => ({
    dia,
    apertura: "",
    cierre: "",
    cerrado: false,
  })),
  propietario: {
    nombre: "",
    imagen: "",
  },
  imagenDestacada: "",
  etiquetas: [],
  verificado: false,
};

// ✂️ esquemaValidacion y valoresIniciales como ya los tenés

export default function NegocioForm({ onSubmit }) {
  const [paso, setPaso] = useState(0);
  const PasoActual = pasos[paso];

  const avanzar = () => setPaso((prev) => Math.min(prev + 1, pasos.length - 1));
  const retroceder = () => setPaso((prev) => Math.max(prev - 1, 0));

  return (
    <Formik
      initialValues={valoresIniciales}
      validationSchema={esquemaValidacion[paso]}
      onSubmit={(values) => {
        if (paso === pasos.length - 1) {
          onSubmit(values);
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
              {paso === pasos.length - 1 ? "Guardar" : "Siguiente"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
