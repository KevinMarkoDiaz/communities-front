// src/pages/dashboard/EditarComunidad.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";
import { getCommunityBySlug } from "../../api/communityApi";

export default function EditarComunidad() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunidad, setComunidad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarComunidad = async () => {
      try {
        const data = await getCommunityBySlug(id);
        console.log(data);
        setComunidad(data.community);
      } catch (err) {
        console.error("Error al cargar comunidad:", err);
        setError("No se pudo cargar la comunidad.");
      } finally {
        setLoading(false);
      }
    };

    cargarComunidad();
  }, [id]);

  if (loading) return <p className="text-center py-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!comunidad) return null;

  return (
    <>
      <Helmet>
        <title>Editar Comunidad | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Editar Comunidad</h1>
        <CrearEditarComunidadForm modoEdicion comunidadInicial={comunidad} />
      </section>
    </>
  );
}
