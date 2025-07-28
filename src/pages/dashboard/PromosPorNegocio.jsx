import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deletePromotion,
  getPromotionsByBusiness,
} from "../../api/promotionApi";
import CardPromo from "../../components/dashboard/promo/CardPromo";
import { mostrarFeedback } from "../../store/feedbackSlice";
import { useDispatch } from "react-redux";

export default function PromosPorNegocio() {
  const { id } = useParams(); // ID del negocio desde la URL
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const fetchPromos = async () => {
    try {
      setLoading(true);
      const data = await getPromotionsByBusiness(id);
      setPromos(data.promotions);
    } catch (err) {
      setError("Error al cargar promociones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, [id]);

  const handleDelete = async (promoId) => {
    try {
      await deletePromotion(promoId);
      setPromos((prev) => prev.filter((p) => p._id !== promoId));
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: "No se pudo eliminar la promoción",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Promociones de este negocio
      </h2>

      {loading ? (
        <p className="text-gray-500">Cargando promociones...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : promos.length === 0 ? (
        <p className="text-gray-500">Este negocio aún no tiene promociones.</p>
      ) : (
        promos.map((promo) => (
          <CardPromo key={promo._id} promo={promo} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
}
