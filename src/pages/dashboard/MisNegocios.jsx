import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardNegocio from "../../components/dashboard/negocios/CardNegocio";
import { deleteBusiness, getMyBusinesses } from "../../api/businessApi";
import { MdAddBusiness } from "react-icons/md";

export default function MisNegocios() {
  const [negocios, setNegocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarNegocios = async () => {
      try {
        const data = await getMyBusinesses(); // 👈 sin token
        setNegocios(data.businesses);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los negocios");
      } finally {
        setLoading(false);
      }
    };

    cargarNegocios();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este negocio?"
    );
    if (!confirmar) return;

    try {
      await deleteBusiness(id); // 👈 sin token
      setNegocios((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (loading) return <div className="p-4">Cargando negocios...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Negocios</h2>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-white text-black p-1 rounded hover:bg-black hover:text-white transition text-sm"
        >
          <MdAddBusiness className="text-lg" />
          Agregar
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
