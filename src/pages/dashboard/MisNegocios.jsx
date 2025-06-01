import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardNegocio from "../../components/dashboard/negocios/CardNegocio"; // ✅ Nuevo componente estilizado

export default function MisNegocios() {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuario = useSelector((state) => state.auth.usuario);

  useEffect(() => {
    const cargarNegocios = async () => {
      try {
        const mockOwner = usuario?._id || "123";

        // const todos = await getAllBusinesses(); // ❌ API real
        // const propios = todos.filter((n) => n.owner === usuario._id);

        // ✅ Mock temporal
        const propios = [
          {
            _id: "140",
            name: "Estudio de Yoga Tierra y Alma",
            description: "Clases de yoga, meditación y bienestar holístico.",
            category: "Salud",
            owner: mockOwner,
            community: "Latinoamericana",
            location: {
              address: "322 Calle Paz",
              city: "Lewisville",
              state: "TX",
              country: "USA",
              zipCode: "75067",
              coordinates: { lat: 33.042222, lng: -96.994222 },
            },
            contact: {
              telefono: "555-1040",
              email: "yogatierrayalma@ejemplo.com",
              website: "https://yogatierrayalma.com",
              redes: {
                facebook: "YogaTierraYAlma",
                instagram: "@tierrayalma.yoga",
                whatsapp: "1234567840",
              },
            },
            imagenDestacada: "https://cdn.usegalileo.ai/sdxl10/140.png",
            ownerName: "Luciana Ortega",
            ownerImage: "https://randomuser.me/api/portraits/women/55.jpg",
            horarios: [],
            verificado: true,
            etiquetas: ["Yoga", "Bienestar", "Meditación", "Salud"],
          },
        ];

        setNegocios(propios);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los negocios");
      } finally {
        setLoading(false);
      }
    };

    cargarNegocios();
  }, [usuario]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este negocio?"
    );
    if (!confirmar) return;

    try {
      // await deleteBusiness(id, token); // ❌ API real
      setNegocios((prev) => prev.filter((n) => n._id !== id)); // ✅ Mock
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (loading) return <div className="p-4">Cargando negocios...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis negocios</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Nuevo negocio
        </Link>
      </div>

      {negocios.length === 0 ? (
        <p className="text-gray-600">No has creado negocios todavía.</p>
      ) : (
        <div className="space-y-3">
          {negocios.map((negocio) => (
            <CardNegocio
              key={negocio._id}
              negocio={negocio}
              onDelete={() => handleDelete(negocio._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
