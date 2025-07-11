import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMisPromos, deletePromo } from "../../store/promocionesSlice";
import CardPromo from "../../components/dashboard/promo/CardPromo";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import { MdLocalOffer } from "react-icons/md";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import ModalCrearPromo from "../../components/promo/ModalCrearPromo";
import DetallePromo from "./detalle/DetallePromo";

export default function MisPromos() {
  const dispatch = useDispatch();
  const {
    lista: promos,
    loading,
    error,
  } = useSelector((state) => state.promociones);

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [showModalDetalle, setShowModalDetalle] = useState(false);

  useEffect(() => {
    dispatch(fetchMisPromos())
      .unwrap()
      .then((data) => {
        if (data?.length > 0) {
          setSelectedPromo(data[0]);
        }
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Quieres eliminar esta promoción?");
    if (!confirmar) return;

    try {
      await dispatch(deletePromo(id)).unwrap();
      const nuevos = promos.filter((p) => p._id !== id);
      setSelectedPromo(nuevos[0] || null);
      setShowModalDetalle(false);
    } catch (err) {
      console.error("Error al eliminar promoción:", err);
      alert("No se pudo eliminar la promoción.");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-4 md:px-6">
      {/* Header y Detalle */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="💡"
            title="Tus promociones"
            badge="Tu espacio de ofertas"
            description="Crea promociones irresistibles y conecta con más clientes."
            illustration={ilusta}
          />
        </div>

        <div className="hidden md:flex flex-3 flex-col justify-center">
          {selectedPromo ? (
            <DetallePromo promo={selectedPromo} onDelete={handleDelete} />
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ninguna promoción seleccionada.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Haz clic en una tarjeta de la lista para ver detalles aquí.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus promociones
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Listado */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de promociones
        </h3>
        <button
          onClick={() => setMostrarModalCrear(true)}
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdLocalOffer className="text-lg" />
          Crear promoción
        </button>
      </div>

      {promos.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-4 py-12">
          <img
            src="/empty-state.svg"
            alt="Sin promociones"
            className="w-32 opacity-80"
          />
          <p className="text-gray-500">
            Aún no has creado ninguna promoción.
            <br />
            ¡Comienza a destacar tus ofertas hoy mismo!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {promos.map((promo) => (
            <div
              key={promo._id}
              onClick={() => {
                setSelectedPromo(promo);
                if (window.innerWidth < 768) setShowModalDetalle(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedPromo?._id === promo._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardPromo promo={promo} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Modal crear promo */}
      {mostrarModalCrear && (
        <ModalCrearPromo onClose={() => setMostrarModalCrear(false)} />
      )}

      {/* Modal detalle mobile */}
      {showModalDetalle && selectedPromo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModalDetalle(false)}
        >
          <div
            className="relative w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <DetallePromo
              promo={selectedPromo}
              onClose={() => setShowModalDetalle(false)}
              onDelete={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
}
