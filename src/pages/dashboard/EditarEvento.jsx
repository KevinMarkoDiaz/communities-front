// src/pages/dashboard/EditarEvento.jsx
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";

const mockEventos = [
  {
    _id: "1",
    title: "Feria Cultural",
    description: "Evento para compartir nuestras raíces.",
    date: "2025-06-15",
    location: "Dallas, TX",
    image: "https://via.placeholder.com/300x200",
  },
  {
    _id: "2",
    title: "Taller de emprendimiento",
    description: "Aprende a lanzar tu negocio.",
    date: "2025-06-20",
    location: "Fort Worth, TX",
    image: "https://via.placeholder.com/300x200",
  },
];

export default function EditarEvento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    const encontrado = mockEventos.find((e) => e._id === id);
    setEvento(encontrado);
  }, [id]);

  if (!evento) {
    return <div className="p-6 text-gray-500">Cargando evento...</div>;
  }

  const handleEditar = (valores) => {
    console.log("🛠️ Evento actualizado:", valores);
    alert("Evento actualizado (mock)");
    navigate("/dashboard/mis-eventos");
  };

  return (
    <>
      <Helmet>
        <title>Editar Evento | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Editar Evento</h1>
        <CrearEditarEventoForm onSubmit={handleEditar} initialValues={evento} />
      </section>
    </>
  );
}
