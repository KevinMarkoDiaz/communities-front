import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyPromotions, deletePromotion } from "../../api/promotionApi";
import CardPromo from "../../components/dashboard/promo/CardPromo";

export default function MisPromos() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const cargar = async () => {
      try {
        const promosUsuario = await getMyPromotions();
        setPromos(promosUsuario);
        console.log(promosUsuario);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar las promociones");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta promoción?");
    if (!confirmar) return;

    try {
      await deletePromotion(id, token);
      setPromos((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error al eliminar promoción:", err);
      alert("No se pudo eliminar la promoción");
    }
  };

  if (loading) return <div className="p-4">Cargando promociones...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#141C24]">Mis promociones</h2>
        <Link
          to="crear"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
        >
          + Nueva promoción
        </Link>
      </div>

      {promos?.length === 0 ? (
        <p className="text-gray-600">No has creado promociones todavía.</p>
      ) : (
        <div className="space-y-3">
          {promos?.map((promo) => (
            <CardPromo
              key={promo._id}
              promo={promo}
              onDelete={() => handleDelete(promo._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
