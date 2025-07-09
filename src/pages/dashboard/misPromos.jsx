import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMisPromos, deletePromo } from "../../store/promocionesSlice";
import CardPromo from "../../components/dashboard/promo/CardPromo";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import ilusta from "../../assets/ilusta.svg";
import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import ModalCrearPromo from "../../components/promo/ModalCrearPromo";

export default function MisPromos() {
  const dispatch = useDispatch();
  const {
    lista: promos,
    loading,
    error,
  } = useSelector((state) => state.promociones);
  const [mostrarModal, setMostrarModal] = useState(false);

  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    dispatch(fetchMisPromos())
      .unwrap()
      .then((data) => {
        if (data && data.length > 0) {
          setSelectedPromo(data[0]);
        }
      });
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Eliminar esta promoción?");
    if (!confirmar) return;

    try {
      await dispatch(deletePromo(id)).unwrap();
      // Si eliminaste la promo seleccionada, cambia
      setSelectedPromo((prev) => (prev?._id === id ? null : prev));
    } catch (err) {
      console.error("Error al eliminar promoción:", err);
      alert("No se pudo eliminar la promoción");
    }
  };

  if (loading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-4 md:px-6">
      {/* Header y detalle */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 xl:gap-10 md:mt-16">
        {/* Header */}
        <div className="flex-1">
          <DashboardSectionHeader
            icon="💡"
            title="Tus promociones"
            badge="Tu espacio de ofertas"
            description="Crea promociones irresistibles y conecta con más clientes."
            illustration={ilusta}
          />
        </div>

        {/* Detalle promo */}
        <div className="flex-3 flex flex-col justify-center">
          {selectedPromo ? (
            <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] w-full h-full">
              {/* Imagen */}
              <div className="w-full md:w-60 flex-shrink-0 self-center md:self-start">
                <img
                  src={
                    selectedPromo.featuredImage ||
                    "https://cdn.usegalileo.ai/sdxl10/placeholder.png"
                  }
                  alt={selectedPromo.name}
                  className="w-full h-60 object-cover rounded-xl"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col justify-center gap-4">
                {/* Título y tipo */}
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-extrabold text-[#141C24] tracking-tight leading-snug">
                    {selectedPromo.name}
                  </h2>
                  <span className="inline-block bg-black text-white text-xs font-medium px-2 py-1 rounded-full capitalize w-fit">
                    {selectedPromo.type?.replace(/_/g, " ")}
                  </span>
                </div>

                {/* Descripción */}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {selectedPromo.description}
                </p>

                {/* Fechas */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-xs text-gray-500 mt-2">
                  <span>
                    Vigencia:{" "}
                    {new Date(selectedPromo.startDate).toLocaleDateString()} –{" "}
                    {new Date(selectedPromo.endDate).toLocaleDateString()}
                  </span>
                  <span>
                    Creado:{" "}
                    {new Date(selectedPromo.createdAt).toLocaleDateString()}
                  </span>
                  <span>
                    Actualizado:{" "}
                    {new Date(selectedPromo.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl shadow-lg p-6 md:p-8 xl:p-10 border border-gray-200 min-h-[260px] text-center">
              <p className="text-gray-600 text-sm">
                No hay ninguna promoción seleccionada.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Haz clic en una tarjeta de la lista para ver los detalles aquí.
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
          onClick={() => setMostrarModal(true)}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8">
          {promos.map((promo) => (
            <div
              key={promo._id}
              onClick={() => setSelectedPromo(promo)}
              className={`transition border rounded-xl cursor-pointer ${
                selectedPromo?._id === promo._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-none"
              }`}
            >
              <CardPromo
                promo={promo}
                onDelete={() => handleDelete(promo._id)}
              />
            </div>
          ))}
        </div>
      )}
      {mostrarModal && (
        <ModalCrearPromo onClose={() => setMostrarModal(false)} />
      )}
    </div>
  );
}
