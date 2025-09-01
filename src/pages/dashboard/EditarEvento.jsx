import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEventById } from "../../api/eventApi";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";
import authBg from "../../../src/assets/authbg.png";
import { mostrarFeedback } from "../../store/feedbackSlice";
import { updateEventThunk } from "../../store/eventosSlice";
import ilust2 from "../../assets/ilust2.svg";
import icono from "../../../src/assets/icono.svg";

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getEventById(id);

        if (
          usuario.role !== "admin" &&
          data.organizer !== usuario.id &&
          data.organizer?.id !== usuario.id
        ) {
          setError("Acceso no autorizado");
          return;
        }

        setEvento(data.event);
      } catch (err) {
        console.error(err);
        setError("Error al cargar evento");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [id, usuario]);

  const handleEditar = async (valores, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Featured
      if (valores.image instanceof File) {
        formData.append("featuredImage", valores.image);
      } else if (typeof valores.image === "string" && valores.image.trim()) {
        formData.append("featuredImage", valores.image.trim());
      }

      // Galería mixta
      const allImages = Array.isArray(valores.images) ? valores.images : [];
      const existingImages = allImages.filter((x) => typeof x === "string");
      const newFiles = allImages.filter((x) => x instanceof File);
      newFiles.forEach((f) => formData.append("images", f));

      // Normalizaciones
      const tagsArray = valores.tags
        ? valores.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [];

      const organizerId =
        typeof valores.organizer === "object" && valores.organizer
          ? valores.organizer.value || valores.organizer._id || ""
          : valores.organizer || "";
      const organizerModelFromSelect =
        typeof valores.organizer === "object" && valores.organizer
          ? valores.organizer.model
          : valores.organizerModel;

      const organizer = String(organizerId || "");
      const organizerModel = organizerModelFromSelect || "User";

      let location = { ...(valores.location || {}) };
      if (valores.isOnline) {
        location = {
          address: "",
          city: "",
          state: "",
          zipCode: "",
          country: location.country || "USA",
        };
      } else if (location?.coordinates) {
        delete location.coordinates;
      }

      // 👉 Aquí metemos existingImages en data
      const data = {
        title: valores.title,
        description: valores.description,
        date: valores.date,
        time: valores.time,
        location,
        communities: (valores.communities || []).map(String),
        businesses: (valores.businesses || []).map(String),
        categories: (valores.categories || []).map(String),
        tags: tagsArray,
        language: valores.language || "es",
        price: Number(valores.price || 0),
        isFree: !!valores.isFree,
        isOnline: !!valores.isOnline,
        status: valores.status || "activo",
        featured: !!valores.featured,
        isPublished: !!valores.isPublished,
        registrationLink: valores.registrationLink || "",
        sponsors: (valores.sponsors || []).map(String),
        organizer,
        organizerModel,
        // ⬇️ clave para el back:
        existingImages, // <— AQUI
      };

      if (valores.isOnline && valores.virtualLink) {
        data.virtualLink = valores.virtualLink;
      }
      if (valores.coordinates) {
        data.coordinates = valores.coordinates;
      }

      formData.append("data", JSON.stringify(data));

      await dispatch(updateEventThunk({ id, formData, token })).unwrap();

      dispatch(
        mostrarFeedback({
          message: "✅ Evento actualizado exitosamente",
          type: "success",
        })
      );
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.message || "❌ No se pudo actualizar el evento",
          type: "error",
        })
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Cargando evento...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!evento) return <div className="p-4">Evento no encontrado.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 gap-8 lg:mt-16">
      <Helmet>
        <title>Editar Evento | Communidades</title>
      </Helmet>

      <section
        className="relative w-full max-w-5xl shadow-xl rounded-2xl  sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full z-0"></div>

        {/* Contenido */}
        <div className="relative z-10 space-y-6 grid gap-8">
          <div className="flex items-center justify-between p-4 gap-2">
            <div className="grid gap-8">
              <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                Poné al día tu evento
              </h1>
              <p className="text-gray-700  text-xs sm:text-base">
                Editá la información de tu evento para mantener a tu comunidad
                al tanto de cada detalle y asegurarte de que nadie se lo pierda.
              </p>
            </div>
            <img
              src={ilust2}
              alt="Communities Logo"
              className="w-40 xl:w-60 opacity-90"
            />
          </div>
        </div>

        {/* Formulario */}
        <CrearEditarEventoForm
          onSubmit={handleEditar}
          modoEdicion
          initialValues={{
            title: evento.title || "",
            description: evento.description || "",
            date: evento.date?.slice(0, 10) || "",
            time: evento.time || "",
            location: evento.location || "",
            image: evento.featuredImage || "",
            images: Array.isArray(evento.images) ? evento.images : [],
            categories: evento.categories?.map((c) => c._id || c) || [],
            communities: evento.communities?.map((c) => c._id || c) || [],
            businesses: evento.businesses?.map((b) => b._id || b) || [],
            tags: Array.isArray(evento.tags) ? evento.tags.join(", ") : "",
            language: evento.language || "es",
            isFree: evento.isFree ?? true,
            price: evento.price ?? 0,
            isOnline: evento.isOnline ?? false,
            virtualLink: evento.virtualLink || "",
            registrationLink: evento.registrationLink || "",
            sponsors: evento.sponsors?.map((s) => s._id || s) || [],
            status: evento.status || "activo",
            featured: evento.featured ?? false,
            isPublished: evento.isPublished ?? false,
            organizer: {
              value: evento.organizer?._id || evento.organizer?.id || "",
              model: evento.organizer?.__t || "User",
            },
            organizerModel: evento.organizer?.__t || "User",
            coordinates: evento.coordinates || null,
          }}
        />
      </section>

      {/* Footer mensaje motivacional */}
      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Actualiza tu evento y seguí fortaleciendo tu comunidad
        </p>
        <p className="  text-xs text-gray-600">
          Cada cambio es una nueva oportunidad para conectar.
        </p>
      </div>
    </div>
  );
}
