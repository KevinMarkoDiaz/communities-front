// src/pages/dashboard/EditarEvento.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getEventById, updateEvent } from "../../api/eventApi";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const usuario = useSelector((state) => state.auth.usuario);

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getEventById(id);
        // Opcional: validar que el usuario sea el organizador o admin
        if (
          usuario.role !== "admin" &&
          data.organizer !== usuario.id &&
          data.organizer?.id !== usuario.id // por si viene populado
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

      // Solo agregá las imágenes si son nuevas (tipo File)
      if (valores.image && typeof valores.image !== "string") {
        formData.append("featuredImage", valores.image);
      }

      if (Array.isArray(valores.images)) {
        valores.images.forEach((img) => {
          if (img instanceof File) {
            formData.append("images", img);
          }
        });
      }

      const tagsArray = valores.tags
        ? valores.tags.split(",").map((tag) => tag.trim())
        : [];

      const organizerId = valores.organizer?.value || usuario._id;
      const organizerModel = valores.organizer?.model || "User";

      const data = {
        title: valores.title,
        description: valores.description,
        date: valores.date,
        time: valores.time,
        location: valores.location,
        communities: valores.communities,
        businesses: valores.businesses || [],
        categories: valores.categories,
        tags: tagsArray,
        language: valores.language || "es",
        price: Number(valores.price),
        isFree: valores.isFree,
        isOnline: valores.isOnline,
        status: valores.status || "activo",
        featured: valores.featured || false,
        isPublished: valores.isPublished || false,
        registrationLink: valores.registrationLink || "",
        sponsors: valores.sponsors || [],
        organizer: organizerId,
        organizerModel,
      };

      if (valores.isOnline && valores.virtualLink) {
        data.virtualLink = valores.virtualLink;
      }

      if (valores.coordinates) {
        data.coordinates = valores.coordinates;
      }

      formData.append("data", JSON.stringify(data));

      await updateEvent(id, formData, token); // <-- asegúrate de pasar FormData
      alert("✅ Evento actualizado");
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      console.error("Error al actualizar evento:", err);
      alert("❌ No se pudo actualizar el evento");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-4">Cargando evento...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!evento) return <div className="p-4">Evento no encontrado.</div>;

  return (
    <>
      <Helmet>
        <title>Editar Evento | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Editar Evento</h1>
        <CrearEditarEventoForm
          onSubmit={handleEditar}
          modoEdicion
          initialValues={{
            title: evento.title || "",
            description: evento.description || "",
            date: evento.date?.slice(0, 10) || "",
            time: evento.time || "",
            location: evento.location || "",
            image: evento.featuredImage || "", // puede ser una URL
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
              model: evento.organizer?.__t || "User", // o "Business" si viene así
            },
            organizerModel: evento.organizer?.__t || "User",
            organizerLabel: evento.organizer?.name || "", // si querés mostrar el nombre
            coordinates: evento.coordinates || null,
          }}
        />
      </section>
    </>
  );
}
