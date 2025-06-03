// src/pages/dashboard/CrearEvento.jsx
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";

export default function CrearEvento() {
  const usuario = useSelector((state) => state.auth.usuario);
  const navigate = useNavigate();

  const handleCrear = async (valores, { setSubmitting }) => {
    try {
      const payload = {
        ...valores,
        categories: ["683ca148eeb450a92580128e"],
        communities: ["683dcb3396226795b0ad6d05"],
        organizer: usuario.id,
        organizerModel: "User",
        tags:
          typeof valores.tags === "string"
            ? valores.tags.split(",").map((tag) => tag.trim())
            : valores.tags,
        time: valores.time,
      };

      console.log("Payload final:", payload);

      await createEvent(payload);
      alert("🎉 Evento creado con éxito");
      navigate("/dashboard/mis-eventos");
    } catch (err) {
      console.error("Error al crear evento:", err?.response?.data || err);
      console.error("Error:", err?.response?.data || err);

      alert("Ocurrió un error al crear el evento");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Crear Evento | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Crear Evento</h1>
        <CrearEditarEventoForm onSubmit={handleCrear} />
      </section>
    </>
  );
}
