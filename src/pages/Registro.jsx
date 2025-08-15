import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { registerUser } from "../api/authApi";
import { fetchComunidades } from "../store/comunidadesSlice";
import icono from "../assets/logo_icono.svg";

/* =========================
   Pasos del formulario
========================= */
const steps = [
  "Cuéntanos sobre ti",
  "Elige tu rol en la comunidad",
  "Comparte un poco más",
  "Revisa y confirma",
];

/* =========================
   Estilos de react-select (oscuro)
========================= */
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: state.isFocused ? "#fb923c" : "rgba(255,255,255,0.2)",
    boxShadow: state.isFocused ? "0 0 0 1px #fb923c" : "none",
    "&:hover": { borderColor: "#fb923c" },
    borderRadius: "0.5rem",
    minHeight: "3rem",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "0.5rem",
    zIndex: 20,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "rgba(251,146,60,0.2)" : "transparent",
    color: "white",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({ ...provided, color: "white" }),
  placeholder: (provided) => ({ ...provided, color: "rgba(255,255,255,0.4)" }),
  input: (provided) => ({ ...provided, color: "white" }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "rgba(255,255,255,0.6)",
    "&:hover": { color: "white" },
  }),
  indicatorSeparator: () => ({ display: "none" }),
};

/* =========================
   Validaciones por paso
========================= */
const validationSchemas = [
  Yup.object().shape({
    name: Yup.string().min(2, "Muy corto").required("Campo obligatorio"),
    lastName: Yup.string().max(100, "Máximo 100 caracteres").optional(),
    email: Yup.string().email("Correo inválido").required("Campo obligatorio"),
    password: Yup.string()
      .min(8, "Mínimo 8 caracteres")
      .required("Campo obligatorio"),
  }),
  Yup.object().shape({
    role: Yup.string()
      .oneOf(["user", "business_owner"], "Rol inválido")
      .required("Selecciona un rol"),
  }),
  Yup.object().shape({
    profileImage: Yup.string().url("Debe ser una URL válida").optional(),
    title: Yup.string().max(100, "Máximo 100 caracteres").optional(),
    description: Yup.string().max(1000, "Máximo 1000 caracteres").optional(),
    location: Yup.string().max(100, "Máximo 100 caracteres").optional(),
    country: Yup.string().max(100, "Máximo 100 caracteres").optional(),
    community: Yup.string().optional(),
  }),
  Yup.object(), // Confirmación
];

/* =========================
   Helper: fondo responsive (sin imports)
========================= */
const pickBg = (w) => {
  if (w >= 1024) return "/images/3.png"; // desktop
  if (w >= 768) return "/images/2.png"; // tablet
  return "/images/1.png"; // mobile
};

export default function RegistroMultiStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const comunidades = useSelector((state) => state.comunidades.lista ?? []);
  const loadingComunidades = useSelector((state) => state.comunidades.loading);

  /* =========================
     Carga de comunidades
  ========================= */
  useEffect(() => {
    if (!comunidades.length) {
      dispatch(fetchComunidades());
    }
  }, [dispatch, comunidades.length]);

  /* =========================
     Fondo responsive (solo descarga el actual)
  ========================= */
  const [bgImage, setBgImage] = useState(() => {
    if (typeof window === "undefined") return "/images/3.png"; // Fallback SSR
    return pickBg(window.innerWidth);
  });

  useEffect(() => {
    // Corrige en primer render del cliente
    setBgImage(pickBg(window.innerWidth));

    // Respeta ahorro de datos si el user lo tiene activo (opcional)
    const saveData = navigator.connection?.saveData;
    if (saveData) setBgImage("/images/1.png");

    // Resize con rAF para evitar exceso de renders
    let ticking = false;
    const onResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = pickBg(window.innerWidth);
          setBgImage((prev) => (prev === next ? prev : next));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* =========================
     Handlers submit
  ========================= */
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const nuevoUsuario = await registerUser(values);
      dispatch(login(nuevoUsuario));
      navigate("/dashboard/perfil");
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrors({
        email: "No se pudo registrar el usuario. Intenta más tarde.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () =>
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <Helmet>
        <title>Communities | Registro</title>
      </Helmet>

      {/* Fondo dinámico según dispositivo */}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative gap-2 py-7 px-2"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="relative w-full max-w-lg mx-auto p-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl text-black m-4">
          <h2 className=" text-lg font-bold text-center mb-4 tracking-wide">
            {steps[currentStep]}
          </h2>

          <Formik
            initialValues={{
              name: "",
              lastName: "",
              email: "",
              password: "",
              role: "",
              profileImage: "",
              title: "",
              description: "",
              location: "",
              country: "",
              community: "",
            }}
            validationSchema={validationSchemas[currentStep]}
            onSubmit={(values, helpers) => {
              if (currentStep < steps.length - 1) {
                helpers.setTouched({});
                nextStep();
                helpers.setSubmitting(false);
              } else {
                handleSubmit(values, helpers);
              }
            }}
          >
            {({ setFieldValue, values, isSubmitting }) => (
              <Form className="space-y-5">
                {currentStep === 0 && (
                  <>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Nombre
                      </label>
                      <Field
                        name="name"
                        placeholder="Usuario"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Apellido
                      </label>
                      <Field
                        name="lastName"
                        placeholder="Usuario"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Correo electrónico
                      </label>
                      <Field
                        name="email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Contraseña
                      </label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>
                  </>
                )}

                {currentStep === 1 && (
                  <div>
                    <label className="text-xs font-medium block mb-1">
                      Rol
                    </label>
                    <Select
                      menuPlacement="top"
                      name="role"
                      options={[
                        { value: "user", label: "Usuario" },
                        { value: "business_owner", label: "Dueño de negocio" },
                      ]}
                      placeholder="Selecciona tu rol..."
                      styles={customSelectStyles}
                      value={
                        values.role
                          ? {
                              value: values.role,
                              label:
                                values.role === "user"
                                  ? "Usuario"
                                  : "Dueño de negocio",
                            }
                          : null
                      }
                      onChange={(option) => setFieldValue("role", option.value)}
                    />
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="text-red-400 text-xs mt-1"
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Imagen de perfil
                      </label>
                      <Field
                        name="profileImage"
                        placeholder="https://..."
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                      <ErrorMessage
                        name="profileImage"
                        component="div"
                        className="text-red-400 text-xs mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Título
                      </label>
                      <Field
                        name="title"
                        placeholder="Chef venezolano"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Descripción
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        placeholder="Cuéntanos algo sobre ti..."
                        rows={3}
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        Ubicación
                      </label>
                      <Field
                        name="location"
                        placeholder="Dallas, TX"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium block mb-1">
                        País
                      </label>
                      <Field
                        name="country"
                        placeholder="Estados Unidos"
                        className="w-full px-4 py-1 border border-black/10 bg-black/30 rounded-lg placeholder:text-gray-300 focus:outline-none"
                      />
                    </div>
                    {loadingComunidades ? (
                      <p className="text-xs text-gray-300">
                        Cargando comunidades...
                      </p>
                    ) : (
                      <div>
                        <label className="text-xs font-medium block mb-1">
                          Comunidad
                        </label>
                        <Select
                          menuPlacement="top"
                          name="community"
                          options={[
                            { value: "", label: "Sin comunidad asignada" },
                            ...comunidades.map((com) => ({
                              value: com._id,
                              label: com.name,
                            })),
                          ]}
                          placeholder="Selecciona tu comunidad..."
                          styles={customSelectStyles}
                          classNamePrefix="react-select"
                          className="w-full"
                          value={
                            values.community
                              ? {
                                  value: values.community,
                                  label:
                                    comunidades.find(
                                      (c) => c._id === values.community
                                    )?.name || "Sin comunidad asignada",
                                }
                              : { value: "", label: "Sin comunidad asignada" }
                          }
                          onChange={(option) =>
                            setFieldValue("community", option.value)
                          }
                        />
                      </div>
                    )}
                  </>
                )}

                {currentStep === 3 && (
                  <div className="space-y-4 text-xs text-gray-200">
                    <p className="text-center">
                      Revisa tus datos antes de registrarte.
                    </p>

                    <div className="bg-black/30 border border-white/10 rounded-lg p-4 text-left space-y-1">
                      <p>
                        <span className="font-semibold text-white">
                          Nombre:
                        </span>{" "}
                        {values.name || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          Apellido:
                        </span>{" "}
                        {values.lastName || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-white">
                          Correo:
                        </span>{" "}
                        {values.email || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-white">Rol:</span>{" "}
                        {values.role === "user"
                          ? "Usuario"
                          : values.role === "business_owner"
                          ? "Dueño de negocio"
                          : "-"}
                      </p>

                      {values.title && (
                        <p>
                          <span className="font-semibold text-white">
                            Título:
                          </span>{" "}
                          {values.title}
                        </p>
                      )}
                      {values.description && (
                        <p>
                          <span className="font-semibold text-white">
                            Descripción:
                          </span>{" "}
                          {values.description}
                        </p>
                      )}
                      {values.location && (
                        <p>
                          <span className="font-semibold text-white">
                            Ubicación:
                          </span>{" "}
                          {values.location}
                        </p>
                      )}
                      {values.country && (
                        <p>
                          <span className="font-semibold text-white">
                            País:
                          </span>{" "}
                          {values.country}
                        </p>
                      )}
                      <p>
                        <strong>Comunidad:</strong>{" "}
                        {values.community
                          ? comunidades.find((c) => c._id === values.community)
                              ?.name || "ID desconocido"
                          : "Sin comunidad asignada"}
                      </p>
                    </div>

                    <p className="text-center">
                      Cuando estés listo, haz clic en{" "}
                      <strong className="text-white">Registrarse</strong>.
                    </p>
                  </div>
                )}

                <div className="flex justify-between gap-2 mt-6">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="w-full bg-white/10 border border-white/20 text-white py-1 rounded-lg font-semibold hover:bg-white/20 transition"
                    >
                      Atrás
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 text-xs md:text-sm hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition"
                  >
                    {currentStep === steps.length - 1
                      ? "Registrarse"
                      : "Siguiente"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-4">
            <p className="text-gray-900 text-xs mb-2">¿Ya tienes cuenta?</p>
            <Link
              to="/login"
              className="block text-xs md:text-sm text-center border border-black/10 bg-black/30 text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              Volver al inicio de sesión
            </Link>
          </div>
          <div className="flex justify-center mt-8 relative z-10">
            <div className="relative inline-block orbit-wrapper">
              <img
                src={icono}
                alt="Logo Communities"
                className="h-24 opacity-90 relative z-20 logo-pulse select-none pointer-events-none"
                draggable="false"
              />
              <span className="orbit-sphere sphere1" />
              <span className="orbit-sphere sphere2" />
              <span className="orbit-sphere sphere3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
