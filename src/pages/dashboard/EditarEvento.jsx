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

        setEvento(data);
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
      await updateEvent(id, valores, token);
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
          initialValues={{
            title: evento.title || "",
            description: evento.description || "",
            date: evento.date?.slice(0, 10) || "",
            time: evento.time || "",
            location: evento.location || "",
            image: evento.image || "",
            tags: Array.isArray(evento.tags)
              ? evento.tags.join(", ")
              : evento.tags || "",
            communities: evento.communities?.map((c) => c._id) || [],
            businesses: evento.businesses?.map((b) => b._id) || [],
            categories: evento.categories?.map((c) => c._id) || [],
          }}
        />
      </section>
    </>
  );
}
