import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdAddBusiness } from "react-icons/md";

import { fetchMisNegocios, deleteNegocio } from "../../store/negociosSlice";

import CardNegocio from "../../components/dashboard/negocios/CardNegocio";
import DashboardSectionHeader from "../../components/dashboard/negocios/DashboardSectionHeader";
import NegocioDetalleDashboard from "./detalle/NegocioDetalleDashboard";
import SkeletonDashboardList from "../../components/Skeleton/SkeletonDashboardList";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

import ilusta from "../../assets/ilusta.svg";
import ilust2 from "../../assets/ilust2.svg";

export default function MisNegocios() {
  const dispatch = useDispatch();

  const { misNegocios, misLoading, error } = useSelector(
    (state) => state.negocios
  );

  const [selectedNegocio, setSelectedNegocio] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (misNegocios.length === 0) {
      dispatch(fetchMisNegocios())
        .unwrap()
        .then((data) => {
          if (data?.length > 0) {
            setSelectedNegocio(data[0]);
          }
        })
        .catch((err) => {
          console.error("Error al cargar negocios:", err);
        });
    } else {
      // Ya hay datos, seleccionamos el primero si aún no hay uno seleccionado
      if (!selectedNegocio && misNegocios.length > 0) {
        setSelectedNegocio(misNegocios[0]);
      }
    }
  }, [dispatch, misNegocios, selectedNegocio]);

  useEffect(() => {
    if (misNegocios.length > 0 && !selectedNegocio) {
      setSelectedNegocio(misNegocios[0]);
    }
  }, [misNegocios, selectedNegocio]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteNegocio(id)).unwrap();
      const nuevos = misNegocios.filter((n) => n._id !== id);
      setSelectedNegocio(nuevos[0] || null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error al eliminar negocio:", error);
      alert("No se pudo eliminar el negocio. Intenta más tarde.");
    }
  };

  if (misLoading) return <SkeletonDashboardList />;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2">
      {/* Header y Detalle */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 lg:mt-16">
        <div className="flex-1">
          <DashboardSectionHeader
            icon="🏪"
            title="Tus negocios"
            badge="Tu espacio de gestión"
            description="Administra tus negocios, comparte novedades y conecta con tu comunidad."
            illustration={ilusta}
          />
        </div>

        {/* Detalle en desktop */}
        {selectedNegocio && (
          <div className="hidden md:flex flex-3 flex-col justify-center">
            <NegocioDetalleDashboard
              negocio={selectedNegocio}
              onAskDelete={(neg) => {
                setSelectedNegocio(neg);
                setShowDeleteModal(true);
              }}
            />
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Tus negocios
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Listado */}
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-lg font-semibold text-[#141C24]">
          Lista de negocios
        </h3>
        <Link
          to="crear"
          className="flex items-center gap-2 bg-black text-white px-3 py-2 rounded hover:bg-[#f4c753] hover:text-black transition text-sm font-semibold"
        >
          <MdAddBusiness className="text-lg" />
          <p className="hidden md:block">Crear negocio</p>
        </Link>
      </div>

      {misNegocios.length === 0 ? (
        <div className="flex flex-col items-center text-center gap-5 py-16">
          <img src={ilust2} alt="Sin negocios" className="w-40 opacity-90" />
          <p className="text-gray-600 text-sm md:text-base max-w-xs">
            Aún no tienes ningún negocio creado.
            <br />
            Comparte tu proyecto con tu comunidad y haz que te encuentren
            fácilmente.
          </p>
          <Link
            to="/dashboard/mis-negocios/crear"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition"
          >
            Crear mi primer negocio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-3 md:gap-6 xl:gap-8">
          {misNegocios.map((negocio) => (
            <div
              key={negocio._id}
              onClick={() => {
                setSelectedNegocio(negocio);
                if (window.innerWidth < 768) setShowModal(true);
              }}
              className={`transition rounded-lg cursor-pointer ${
                selectedNegocio?._id === negocio._id
                  ? "border-blue-400 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <CardNegocio negocio={negocio} />
            </div>
          ))}
        </div>
      )}

      {/* Modal Mobile */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <NegocioDetalleDashboard
              negocio={selectedNegocio}
              onClose={() => setShowModal(false)}
              onAskDelete={(neg) => {
                setShowModal(false);
                setSelectedNegocio(neg);
                setShowDeleteModal(true);
              }}
            />
          </div>
        </div>
      )}

      {/* Confirmar eliminar */}
      {showDeleteModal && (
        <ConfirmDeleteModal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => handleDelete(selectedNegocio._id)}
          entityName={selectedNegocio.name}
          title="Eliminar negocio"
          description="Para confirmar, escribe el nombre exacto del negocio:"
        />
      )}
    </div>
  );
}
