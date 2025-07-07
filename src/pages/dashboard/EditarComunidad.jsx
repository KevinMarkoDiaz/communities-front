// src/pages/dashboard/EditarComunidad.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";
import { getCommunityBySlug } from "../../api/communityApi";
import authBg from "../../../src/assets/authbg.png";

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
    <div className="flex-col flex items-center justify-center min-h-screen px-4 gap-8">
      <Helmet>
        <title>Crear Comunidad | Communities</title>
      </Helmet>

      <section
        className="w-full max-w-5xl shadow rounded-2xl p-6 sm:p-16 space-y-6"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[#141C24]">Crear Comunidad</h1>
          <p className="text-gray-100 text-sm sm:text-base">
            Une a las personas, celebra tu cultura y comparte tu historia con el
            mundo 🌎
          </p>
        </div>

        <CrearEditarComunidadForm />
      </section>
      <div className="pt-6 text-center">
        <p className="text-[#141C24] text-base font-medium">
          ✨ Dale vida a tu comunidad y conecta a los latinos en EE. UU.
        </p>
        <p className="text-sm text-gray-600">
          Crea un espacio donde todos se sientan como en casa.
        </p>
      </div>
    </div>
  );
}
