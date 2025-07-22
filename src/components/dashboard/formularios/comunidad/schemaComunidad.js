import * as Yup from "yup";

export const initialValuesComunidad = {
  // Paso 1 – Información básica
  name: "",
  description: "",
  language: "es",
  tipo: "migrante",

  // Paso 2 – Información cultural
  originCountryInfo: {
    name: "",
    capital: "",
    flag: "",
  },
  traditions: [],
  food: [],

  // Paso 3 – Recursos y redes
  resources: [],
  socialMediaLinks: {
    facebook: "",
    instagram: "",
    whatsapp: "",
    youtube: "",
  },

  // Paso 4 – Ubicación
  region: "",
  mapCenter: {
    lat: "",
    lng: "",
  },
  location: {
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    coordinates: {
      lat: "",
      lng: "",
    },
  },

  // Paso 5 – Imágenes
  flagImage: "",
  bannerImage: "",

  // Paso 6 – SEO y extras
  metaTitle: "",
  metaDescription: "",
  status: "Publicada",
  verified: false,
};

export const validationSchemaComunidad = [
  // Paso 1
  Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    description: Yup.string().required("La descripción es obligatoria"),
    language: Yup.string().required("El idioma es obligatorio"),
    tipo: Yup.string().required("El tipo es obligatorio"),
  }),
  // Paso 2
  Yup.object({
    originCountryInfo: Yup.object({
      name: Yup.string().required("El país de origen es obligatorio"),
      capital: Yup.string().required("La capital es obligatoria"),
      flag: Yup.mixed().required("La bandera es obligatoria"),
    }),
    traditions: Yup.array()
      .of(Yup.string().trim().required("La tradición no puede estar vacía"))
      .min(1, "Agrega al menos una tradición"),
    food: Yup.array().of(
      Yup.object({
        name: Yup.string().required("El nombre del plato es obligatorio"),
        description: Yup.string().required("La descripción es obligatoria"),
        image: Yup.mixed().required("La imagen es obligatoria"),
      })
    ),
  }),
  // Paso 3
  Yup.object({
    resources: Yup.array().of(
      Yup.object({
        title: Yup.string().required("El título es obligatorio"),
        url: Yup.string()
          .url("Debe ser un enlace válido")
          .required("La URL es obligatoria"),
        type: Yup.string().required("El tipo es obligatorio"),
      })
    ),
    socialMediaLinks: Yup.object({
      facebook: Yup.string().url("URL inválida").nullable(),
      instagram: Yup.string().url("URL inválida").nullable(),
      whatsapp: Yup.string().url("URL inválida").nullable(),
      youtube: Yup.string().url("URL inválida").nullable(),
    }),
  }),
  // Paso 4
  Yup.object({
    region: Yup.string().required("La región es obligatoria"),
    mapCenter: Yup.object({
      lat: Yup.number()
        .nullable()
        .transform((v, o) => (o === "" ? null : v)),
      lng: Yup.number()
        .nullable()
        .transform((v, o) => (o === "" ? null : v)),
    }),
    location: Yup.object({
      address: Yup.string().required("Dirección obligatoria"),
      city: Yup.string().required("Ciudad obligatoria"),
      state: Yup.string().required("Estado obligatorio"),
      zipCode: Yup.string().required("Código postal obligatorio"),
      country: Yup.string().required("País obligatorio"),
      coordinates: Yup.object({
        lat: Yup.number()
          .nullable()
          .transform((v, o) => (o === "" || isNaN(o) ? null : v)),
        lng: Yup.number()
          .nullable()
          .transform((v, o) => (o === "" || isNaN(o) ? null : v)),
      }),
    }),
  }),
  // Paso 5 – SEO y estado
  Yup.object({
    metaTitle: Yup.string().required("El meta título es obligatorio"),
    metaDescription: Yup.string().required(
      "La meta descripción es obligatoria"
    ),
    status: Yup.string()
      .oneOf(["Publicada", "Pendiente", "Inactiva"])
      .required("El estado es obligatorio"),
    verified: Yup.boolean(),
  }),
  // Paso 6 – Imágenes
  Yup.object({
    flagImage: Yup.mixed()
      .required("La bandera es obligatoria")
      .test(
        "is-valid",
        "La bandera es inválida",
        (val) => typeof val === "string" || typeof val === "object"
      ),
    bannerImage: Yup.mixed()
      .required("La imagen de banner es obligatoria")
      .test(
        "is-valid",
        "La imagen es inválida",
        (val) => typeof val === "string" || typeof val === "object"
      ),
  }),
  // Paso 7 – Confirmación
  Yup.object(),
];
