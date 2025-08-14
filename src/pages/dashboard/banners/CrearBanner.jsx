// src/pages/dashboard/banners/CrearBanner.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mostrarFeedback } from "../../../store/feedbackSlice";
import DropzoneImagen from "../../../components/DropzoneImagen";
import Select from "react-select";
import { useMemo } from "react";
import { customSelectStylesForm } from "../../../../src/styles/customSelectStylesForm";
import { submitAdBanner } from "../../../api/adsApi";

// Placements (deben coincidir con el backend)
const PLACEMENTS = [
  { value: "home_top", label: "Home - Top (728x90 / 100% x 120px)" },
  { value: "home_bottom", label: "Home - Bottom" },
  { value: "sidebar_right_1", label: "Sidebar derecha #1 (300x250)" },
  { value: "sidebar_right_2", label: "Sidebar derecha #2 (300x250)" },
  { value: "listing_top", label: "Listado - Top" },
  { value: "listing_inline", label: "Listado - Inline" },
  { value: "community_banner", label: "Detalle Comunidad" },
  { value: "event_banner", label: "Detalle Evento" },
  { value: "business_banner", label: "Detalle Negocio" },
  { value: "custom", label: "Custom" },
];

// Helpers
const toIntOrNull = (v) => {
  if (v === "" || v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};
const toIsoOrNull = (v) => {
  if (!v) return null;
  try {
    const d = new Date(v);
    return isNaN(d) ? null : d.toISOString();
  } catch {
    return null;
  }
};
const csvToIdArray = (txt) =>
  (txt || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

// Validación (MVP: comunidad requerida; al menos UNA imagen entre las 4 variantes)
const esquemaBanner = Yup.object()
  .shape({
    title: Yup.string().required("Título obligatorio"),
    placement: Yup.string()
      .oneOf(PLACEMENTS.map((p) => p.value))
      .required("Placement obligatorio"),
    redirectUrl: Yup.string().url("URL inválida").required("URL obligatoria"),

    // variantes de imagen (todas opcionales individualmente)
    image: Yup.mixed().nullable(), // fallback/general
    imageDesktop: Yup.mixed().nullable(),
    imageTablet: Yup.mixed().nullable(),
    imageMobile: Yup.mixed().nullable(),

    // comunidades (select múltiple) → al menos una
    communities: Yup.array()
      .of(
        Yup.object({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
      )
      .min(1, "Debes elegir al menos 1 comunidad")
      .required("Debes elegir al menos 1 comunidad"),

    // opcionales
    categories: Yup.array()
      .of(
        Yup.object({
          value: Yup.string().required(),
          label: Yup.string().required(),
        })
      )
      .optional(),
    businessesCSV: Yup.string().optional(),

    weight: Yup.number().min(0, "Mínimo 0").nullable(),
    maxImpressions: Yup.number()
      .min(1, "Debe ser > 0")
      .nullable()
      .transform((v, o) => (o === "" ? null : v)),
    maxClicks: Yup.number()
      .min(1, "Debe ser > 0")
      .nullable()
      .transform((v, o) => (o === "" ? null : v)),
    startAt: Yup.string().nullable(),
    endAt: Yup.string().nullable(),
    isFallback: Yup.boolean().optional(),
    openInNewTab: Yup.boolean().optional(),
  })
  .test(
    "al-menos-una-imagen",
    "Debes subir al menos una imagen (fallback, desktop, tablet o mobile)",
    (values) => {
      return Boolean(
        values?.image ||
          values?.imageDesktop ||
          values?.imageTablet ||
          values?.imageMobile
      );
    }
  );

export default function CrearBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🔐 auth & cat/comms desde Redux
  // 🔐 usuario y datasets
  const usuario = useSelector((s) => s.auth.usuario);
  const isAdmin = usuario?.role === "admin";

  // Admin: sus comunidades propias
  const todasLasComunidades =
    useSelector((s) => s.comunidades?.misComunidades) || [];

  // No-admin: comunidades del área metropolitana (lista en redux)
  // Nota: toleramos el typo "communidades" por si existe ese slice en tu store.
  const areaMetroComunidades =
    useSelector((s) => s.comunidades?.lista || s.communidades?.lista) || [];

  // Fuente efectiva según rol
  const fuenteComunidades = isAdmin
    ? todasLasComunidades
    : areaMetroComunidades;

  // Options para react-select (mostrar name, enviar _id)
  const communityOptions = useMemo(
    () =>
      (fuenteComunidades || []).map((c) => ({
        value: c._id ?? c.id, // tolerante a id/_id
        label: c.name ?? c.nombre ?? "—", // tolerante a name/nombre
      })),
    [fuenteComunidades]
  );

  // (si lo usas) categorías queda igual
  const categoriasData = useSelector((s) => s.categorias?.data) || [];

  const categoryOptions = useMemo(
    () =>
      (categoriasData || []).map((cat) => ({
        value: cat._id,
        label: cat.name,
      })),
    [categoriasData]
  );

  const initialValues = {
    title: "",
    placement: "home_top",
    redirectUrl: "",
    openInNewTab: true,

    // imágenes (multi-variant)
    image: null, // fallback/general → se envía como bannerImage
    imageDesktop: null, // → bannerDesktop
    imageTablet: null, // → bannerTablet
    imageMobile: null, // → bannerMobile

    // segmentación actual
    communities: [], // ← react-select (array de {value,label}) (requerido)
    categories: [], // ← opcional
    businessesCSV: "", // ← opcional (IDs separados por coma)

    // extras
    weight: 1,
    maxImpressions: "",
    maxClicks: "",
    startAt: "",
    endAt: "",
    isFallback: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Armar FormData
      const fd = new FormData();

      // Transformar selects a arrays de IDs
      const communityIds = (values.communities || []).map((o) => o.value);
      const categoryIds = (values.categories || []).map((o) => o.value);
      const businessIds = csvToIdArray(values.businessesCSV);

      const data = {
        title: values.title,
        placement: values.placement,
        redirectUrl: values.redirectUrl,
        openInNewTab: !!values.openInNewTab,
        isFallback: !!values.isFallback,
        weight: toIntOrNull(values.weight ?? 1),
        maxImpressions: toIntOrNull(values.maxImpressions),
        maxClicks: toIntOrNull(values.maxClicks),
        startAt: toIsoOrNull(values.startAt),
        endAt: toIsoOrNull(values.endAt),

        // segmentación MVP:
        communities: communityIds, // ← REQUERIDO
        categories: categoryIds, // ← opcional
        businesses: businessIds, // ← opcional
      };

      fd.append("data", JSON.stringify(data));

      // Archivos: solo adjunta los que estén presentes
      if (values.image && typeof values.image !== "string") {
        fd.append("bannerImage", values.image); // fallback
      }
      if (values.imageDesktop && typeof values.imageDesktop !== "string") {
        fd.append("bannerDesktop", values.imageDesktop);
      }
      if (values.imageTablet && typeof values.imageTablet !== "string") {
        fd.append("bannerTablet", values.imageTablet);
      }
      if (values.imageMobile && typeof values.imageMobile !== "string") {
        fd.append("bannerMobile", values.imageMobile);
      }

      await submitAdBanner(fd);

      dispatch(
        mostrarFeedback({
          type: "success",
          message: "✅ Enviado. Te avisaremos por email cuando sea aprobado.",
        })
      );

      navigate("/dashboard/mis-banners");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          type: "error",
          message: "❌ Error al crear el banner",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Banner | Dashboard</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center md:px-4">
        <section className="w-full max-w-3xl shadow md:rounded-2xl p-4 md:p-8 space-y-6 bg-black/40 backdrop-blur-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={esquemaBanner}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="grid gap-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Título
                  </label>
                  <Field
                    name="title"
                    placeholder="Ej. Promo de Arepas"
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* Placement (react-select simple) */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    Placement
                  </label>
                  <Select
                    instanceId="placementSelect"
                    options={PLACEMENTS}
                    value={
                      PLACEMENTS.find((p) => p.value === values.placement) ||
                      null
                    }
                    onChange={(opt) =>
                      setFieldValue("placement", opt?.value || "")
                    }
                    styles={customSelectStylesForm}
                    placeholder="Seleccioná un placement…"
                    isSearchable
                    menuPlacement="auto"
                  />
                  <ErrorMessage
                    name="placement"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* URL destino */}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">
                    URL de destino
                  </label>
                  <Field
                    name="redirectUrl"
                    placeholder="https://tu-destino.com/promo"
                    className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none"
                  />
                  <ErrorMessage
                    name="redirectUrl"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                {/* Preferencias */}
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-white">
                    <Field type="checkbox" name="openInNewTab" />
                    <span className="text-sm">Abrir en nueva pestaña</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-white">
                    <Field type="checkbox" name="isFallback" />
                    <span className="text-sm">Usar como fallback</span>
                  </label>
                </div>

                {/* Imágenes (multi-variant) */}
                <div className="grid gap-5">
                  <div>
                    <DropzoneImagen
                      value={values.image}
                      onChange={(file) => setFieldValue("image", file)}
                      label="Imagen general / fallback (recomendada siempre)"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <DropzoneImagen
                        value={values.imageDesktop}
                        onChange={(file) => setFieldValue("imageDesktop", file)}
                        label="Imagen Desktop (opcional)"
                      />
                    </div>
                    <div>
                      <DropzoneImagen
                        value={values.imageTablet}
                        onChange={(file) => setFieldValue("imageTablet", file)}
                        label="Imagen Tablet (opcional)"
                      />
                    </div>
                    <div>
                      <DropzoneImagen
                        value={values.imageMobile}
                        onChange={(file) => setFieldValue("imageMobile", file)}
                        label="Imagen Mobile (opcional)"
                      />
                    </div>
                  </div>

                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                  <ErrorMessage
                    name="imageDesktop"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                  <ErrorMessage
                    name="imageTablet"
                    component="div"
                    className="text-red-400 text-sm"
                  />
                  <ErrorMessage
                    name="imageMobile"
                    component="div"
                    className="text-red-400 text-sm"
                  />

                  <p className="text-xs text-gray-300">
                    Sugerencias: Home Top/Bottom ~ 120px alto; Sidebar ~ 250px
                    alto. Formatos: JPG/PNG/WebP ≤ 5MB. Podés cargar solo la
                    imagen general o subir variantes por dispositivo para mejor
                    legibilidad.
                  </p>
                </div>

                {/* SEGMENTACIÓN (MVP) */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Comunidades (MULTI, requerido) */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-white mb-1">
                      Comunidades (requerido)
                    </label>
                    <Select
                      instanceId="communitiesSelect"
                      isMulti
                      options={communityOptions}
                      value={values.communities}
                      onChange={(opts) =>
                        setFieldValue("communities", opts || [])
                      }
                      styles={customSelectStylesForm}
                      placeholder={
                        communityOptions.length
                          ? "Seleccioná una o más comunidades…"
                          : "No hay comunidades disponibles"
                      }
                      isSearchable
                      menuPlacement="auto"
                    />
                    <ErrorMessage
                      name="communities"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                    <p className="text-xs text-gray-300 mt-2">
                      Se mostrará cuando el usuario pertenezca a cualquiera de
                      estas comunidades (MVP).
                    </p>
                  </div>

                  {/* Categorías (MULTI, opcional) */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-white mb-1">
                      Categorías (opcional)
                    </label>
                    <Select
                      instanceId="categoriesSelect"
                      isMulti
                      options={categoryOptions}
                      value={values.categories}
                      onChange={(opts) =>
                        setFieldValue("categories", opts || [])
                      }
                      styles={customSelectStylesForm}
                      placeholder="(Opcional) Elegí categorías para segmentación futura"
                      isSearchable
                      menuPlacement="auto"
                    />
                  </div>

                  {/* Negocios (CSV, opcional) */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-white mb-1">
                      Businesses (IDs) (opcional)
                    </label>
                    <Field
                      name="businessesCSV"
                      placeholder="id1,id2,id3"
                      className="w-full px-3 py-2 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none text-sm"
                    />
                    <p className="text-xs text-gray-300 mt-2">
                      IDs separados por coma. Si lo dejás vacío, no se restringe
                      por negocio.
                    </p>
                  </div>
                </div>

                {/* Parámetros opcionales */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Peso (rotación)
                    </label>
                    <Field
                      name="weight"
                      type="number"
                      min="0"
                      placeholder="1"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="weight"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Máx. impresiones
                    </label>
                    <Field
                      name="maxImpressions"
                      type="number"
                      min="1"
                      placeholder="(opcional)"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="maxImpressions"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Máx. clicks
                    </label>
                    <Field
                      name="maxClicks"
                      type="number"
                      min="1"
                      placeholder="(opcional)"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="maxClicks"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Inicio (UTC)
                    </label>
                    <Field
                      name="startAt"
                      type="datetime-local"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="startAt"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">
                      Fin (UTC)
                    </label>
                    <Field
                      name="endAt"
                      type="datetime-local"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="endAt"
                      component="div"
                      className="text-red-400 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition"
                >
                  {isSubmitting ? "Creando..." : "Crear Banner"}
                </button>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    </>
  );
}
