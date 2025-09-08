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

// Placements (solo las 4 primeras visibles)
const PLACEMENT_OPTIONS = [
  { value: "home_top", label: "Inicio - Superior (celular, tablet y PC)" },
  { value: "home_bottom", label: "Inicio - Inferior (celular, tablet y PC)" },
  {
    value: "sidebar_right_1",
    label: "Barra lateral derecha superior (solo PC)",
  },
  {
    value: "sidebar_right_2",
    label: "Barra lateral derecha inferior (solo PC)",
  },
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

// Validación (común)
const esquemaBanner = Yup.object()
  .shape({
    title: Yup.string().required("Título obligatorio"),
    placement: Yup.string()
      .oneOf(PLACEMENT_OPTIONS.map((p) => p.value))
      .required("Placement obligatorio"),
    redirectUrl: Yup.string().url("URL inválida").required("URL obligatoria"),

    // variantes de imagen (todas opcionales individualmente)
    image: Yup.mixed().nullable(),
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
    "Debes subir al menos una imagen (desktop, tablet o mobile)",
    (values) =>
      Boolean(
        values?.image ||
          values?.imageDesktop ||
          values?.imageTablet ||
          values?.imageMobile
      )
  );

// Sugerencias visuales según placement
function BannerTips({ placement }) {
  const isHome = placement === "home_top" || placement === "home_bottom";
  const isSidebar =
    placement === "sidebar_right_1" || placement === "sidebar_right_2";

  if (isHome) {
    return (
      <div className="text-xs text-gray-300 leading-relaxed space-y-3">
        <strong>Sugerencias (Inicio):</strong>
        <div className="space-y-2">
          {/* PC */}
          <div className="inline-block">
            <div className="bg-yellow-200 border border-yellow-500 w-[60vw] md:w-[300px] h-[50px] flex items-center justify-center text-[11px] text-yellow-900 font-bold">
              1200×120 px (PC)
            </div>
            <p className="text-[11px] text-white mt-1">
              Rectángulo muy ancho (mejor para logos + texto corto).
            </p>
          </div>
          <br />
          {/* Tablet */}
          <div className="inline-block">
            <div className="bg-orange-200 border border-orange-500 w-[50vw] md:w-[220px] h-[30px] flex items-center justify-center text-[11px] text-orange-900 font-bold">
              768×120 px (Tablet)
            </div>
            <p className="text-[11px] text-white mt-1">
              Versión más baja que PC (prioriza legibilidad).
            </p>
          </div>
          <br />
          {/* Mobile */}
          <div className="inline-block">
            <div className="bg-green-200 border border-green-500 w-[40vw] md:w-[160px] h-[20px] flex items-center justify-center text-[11px] text-green-900 font-bold">
              320×70 px (Mobile)
            </div>
            <p className="text-[11px] text-white mt-1">
              Texto mínimo; enfoca logo y CTA corto.
            </p>
          </div>
        </div>
        <div className="text-white">
          Es el mismo banner en 3 versiones (PC, tablet y celular) para que tu
          anuncio se vea bien en cualquier pantalla.
        </div>
      </div>
    );
  }

  if (isSidebar) {
    return (
      <div className="text-xs text-gray-300 leading-relaxed space-y-3">
        <strong>Sugerencias ( barra lateral ):</strong>
        <div className="inline-block">
          <div className="bg-blue-200 border border-blue-500 w-[120px] h-[100px] flex items-center justify-center text-[11px] text-blue-900 font-bold">
            300×250 px (PC)
          </div>
          <p className="text-[11px] text-white mt-1">
            Rectángulo más alto que ancho (solo PC).
          </p>
        </div>
        <div className="text-white">
          Para la barra lateral no se usan variantes por dispositivo (solo PC).
        </div>
      </div>
    );
  }

  return null;
}

export default function CrearBanner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // usuario
  const usuario = useSelector((s) => s.auth.usuario);
  const isAdmin = usuario?.role === "admin";

  // Comunidades
  const todasLasComunidades =
    useSelector((s) => s.comunidades?.misComunidades) || [];
  const areaMetroComunidades =
    useSelector((s) => s.comunidades?.lista || s.communidades?.lista) || [];
  const fuenteComunidades = isAdmin
    ? todasLasComunidades
    : areaMetroComunidades;

  const communityOptions = useMemo(
    () =>
      (fuenteComunidades || []).map((c) => ({
        value: c._id ?? c.id,
        label: c.name ?? c.nombre ?? "—",
      })),
    [fuenteComunidades]
  );

  // categorías (si se usan)
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

    image: null,
    imageDesktop: null,
    imageTablet: null,
    imageMobile: null,

    communities: [],
    categories: [],
    businessesCSV: "",

    weight: 1,
    maxImpressions: "",
    maxClicks: "",
    startAt: "",
    endAt: "",
    isFallback: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const safeValues = { ...values };
      if (!isAdmin) {
        safeValues.openInNewTab = true;
        safeValues.isFallback = false;
        safeValues.categories = [];
        safeValues.businessesCSV = "";
        safeValues.weight = 1;
        safeValues.maxImpressions = null;
        safeValues.maxClicks = null;
      }

      // FormData
      const fd = new FormData();
      const communityIds = (safeValues.communities || []).map((o) => o.value);
      const categoryIds = (safeValues.categories || []).map((o) => o.value);
      const businessIds = csvToIdArray(safeValues.businessesCSV);

      const data = {
        title: safeValues.title,
        placement: safeValues.placement,
        redirectUrl: safeValues.redirectUrl,
        openInNewTab: !!safeValues.openInNewTab,
        isFallback: !!safeValues.isFallback,
        weight: toIntOrNull(safeValues.weight ?? 1),
        maxImpressions: toIntOrNull(safeValues.maxImpressions),
        maxClicks: toIntOrNull(safeValues.maxClicks),
        startAt: toIsoOrNull(safeValues.startAt),
        endAt: toIsoOrNull(safeValues.endAt),
        communities: communityIds,
        categories: categoryIds,
        businesses: businessIds,
      };

      fd.append("data", JSON.stringify(data));

      if (safeValues.image && typeof safeValues.image !== "string")
        fd.append("bannerImage", safeValues.image);
      if (
        safeValues.imageDesktop &&
        typeof safeValues.imageDesktop !== "string"
      )
        fd.append("bannerDesktop", safeValues.imageDesktop);
      if (safeValues.imageTablet && typeof safeValues.imageTablet !== "string")
        fd.append("bannerTablet", safeValues.imageTablet);
      if (safeValues.imageMobile && typeof safeValues.imageMobile !== "string")
        fd.append("bannerMobile", safeValues.imageMobile);

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
            {({ values, setFieldValue, isSubmitting }) => {
              const isHome =
                values.placement === "home_top" ||
                values.placement === "home_bottom";
              const isSidebar =
                values.placement === "sidebar_right_1" ||
                values.placement === "sidebar_right_2";

              return (
                <Form className="grid gap-6">
                  {/* Título */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
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
                      className="text-red-400 text-xs mt-1"
                    />
                  </div>

                  {/* Placement (react-select) */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      Ubicación del banner
                    </label>
                    <Select
                      instanceId="placementSelect"
                      options={PLACEMENT_OPTIONS}
                      value={
                        PLACEMENT_OPTIONS.find(
                          (p) => p.value === values.placement
                        ) || null
                      }
                      onChange={(opt) =>
                        setFieldValue("placement", opt?.value || "")
                      }
                      styles={customSelectStylesForm}
                      placeholder="Seleccioná una ubicación…"
                      isSearchable
                      menuPlacement="auto"
                    />
                    <p className="text-xs text-gray-300 mt-2">
                      Según la ubicación elegida, cambian los tamaños
                      recomendados y las variantes disponibles.
                    </p>
                    <ErrorMessage
                      name="placement"
                      component="div"
                      className="text-red-400 text-xs mt-1"
                    />
                  </div>

                  {/* URL destino */}
                  <div>
                    <label className="block text-xs font-medium text-white mb-1">
                      URL de destino
                      <span className="block text-[11px] text-gray-300 font-normal">
                        ¿A dónde quieres dirigir a los usuarios? Puede ser tu
                        red social, tu página web o una landing.
                      </span>
                    </label>
                    <Field
                      name="redirectUrl"
                      placeholder="https://tusitio.com  |  https://instagram.com/tu_marca"
                      className="w-full px-4 py-3 border border-white/30 bg-white/10 rounded-lg placeholder:text-gray-300 text-white focus:outline-none"
                    />
                    <ErrorMessage
                      name="redirectUrl"
                      component="div"
                      className="text-red-400 text-xs mt-1"
                    />
                  </div>

                  {/* Preferencias */}
                  <div className="flex items-center gap-6">
                    {isAdmin ? (
                      <>
                        <label className="inline-flex items-center gap-2 text-white">
                          <Field type="checkbox" name="openInNewTab" />
                          <span className="text-xs">
                            Abrir en nueva pestaña
                          </span>
                        </label>
                        <label className="inline-flex items-center gap-2 text-white">
                          <Field type="checkbox" name="isFallback" />
                          <span className="text-xs">Usar como fallback</span>
                        </label>
                      </>
                    ) : (
                      <>
                        <Field type="hidden" name="openInNewTab" value={true} />
                        <Field type="hidden" name="isFallback" value={false} />
                      </>
                    )}
                  </div>

                  {/* Imágenes */}
                  <div className="grid gap-5">
                    {/* Inicio: 3 variantes */}
                    {isHome && (
                      <>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <DropzoneImagen
                              value={values.imageDesktop}
                              onChange={(file) =>
                                setFieldValue("imageDesktop", file)
                              }
                              label="Banner para computador: usa una imagen de 1200x120 px para que se vea bien."
                            />
                          </div>
                          <div>
                            <DropzoneImagen
                              value={values.imageTablet}
                              onChange={(file) =>
                                setFieldValue("imageTablet", file)
                              }
                              label="Banner para tablet: usa una imagen de 768x120 px para que se vea bien."
                            />
                          </div>
                          <div>
                            <DropzoneImagen
                              value={values.imageMobile}
                              onChange={(file) =>
                                setFieldValue("imageMobile", file)
                              }
                              label="Banner para celular: usa una imagen de 320x70 px para que se vea bien."
                            />
                          </div>
                        </div>
                        <div className="text-white">
                          Es el mismo banner en 3 versiones (PC, tablet y
                          celular) para que tu anuncio se vea bien en cualquier
                          pantalla.
                        </div>
                      </>
                    )}

                    {/* Sidebar: solo desktop */}
                    {isSidebar && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <DropzoneImagen
                            value={values.imageDesktop}
                            onChange={(file) =>
                              setFieldValue("imageDesktop", file)
                            }
                            label="Banner de barra lateral (solo PC): usa una imagen de 300x250 px."
                          />
                        </div>
                      </div>
                    )}

                    {/* Errores de imágenes */}
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-400 text-xs"
                    />
                    <ErrorMessage
                      name="imageDesktop"
                      component="div"
                      className="text-red-400 text-xs"
                    />
                    <ErrorMessage
                      name="imageTablet"
                      component="div"
                      className="text-red-400 text-xs"
                    />
                    <ErrorMessage
                      name="imageMobile"
                      component="div"
                      className="text-red-400 text-xs"
                    />

                    {/* Sugerencias visuales dinámicas */}
                    <BannerTips placement={values.placement} />
                  </div>

                  {/* SEGMENTACIÓN */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Comunidades (MULTI, requerido) */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-white mb-1">
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
                        className="text-red-400 text-xs mt-1"
                      />
                      <p className="text-xs text-gray-300 mt-2">
                        Se mostrará cuando el usuario pertenezca a cualquiera de
                        estas comunidades (MVP).
                      </p>
                    </div>

                    {/* Categorías / Businesses: solo admin visibles */}
                    {isAdmin ? (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-white mb-1">
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

                        <div className="sm:col-span-2">
                          <label className="block text-xs font-medium text-white mb-1">
                            Businesses (IDs) (opcional)
                          </label>
                          <Field
                            name="businessesCSV"
                            placeholder="id1,id2,id3"
                            className="w-full px-3 py-2 border border-white/30 bg-white/10 rounded-lg text-white focus:outline-none text-xs"
                          />
                          <p className="text-xs text-gray-300 mt-2">
                            IDs separados por coma. Si lo dejás vacío, no se
                            restringe por negocio.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <Field type="hidden" name="categories" />
                        <Field type="hidden" name="businessesCSV" />
                      </>
                    )}
                  </div>

                  {/* Parámetros opcionales */}
                  {isAdmin ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">
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
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">
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
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">
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
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <Field type="hidden" name="weight" />
                      <Field type="hidden" name="maxImpressions" />
                      <Field type="hidden" name="maxClicks" />
                    </>
                  )}

                  {/* Fechas: admin ve inicio y fin; no-admin solo inicio */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-white mb-1">
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
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>

                    {isAdmin ? (
                      <div>
                        <label className="block text-xs font-medium text-white mb-1">
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
                          className="text-red-400 text-xs mt-1"
                        />
                      </div>
                    ) : (
                      <Field type="hidden" name="endAt" />
                    )}
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
              );
            }}
          </Formik>
        </section>
      </div>
    </>
  );
}
