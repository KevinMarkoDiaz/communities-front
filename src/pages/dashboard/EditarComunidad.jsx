import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";
import authBg from "../../../src/assets/authbg.png";
import ilust2 from "../../assets/ilust2.svg";
import icono from "../../../src/assets/icono.svg";
import { fetchCommunityById } from "../../store/comunidadesSlice";
import SkeletonNegocioForm from "../../components/Skeleton/SkeletonNegocioForm";

export default function EditarComunidad() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comunidad = useSelector((state) => state.comunidades.comunidadActual);
  const loading = useSelector((state) => state.comunidades.loadingDetalle);
  const error = useSelector((state) => state.comunidades.error);

  useEffect(() => {
    if (id) dispatch(fetchCommunityById(id));
  }, [id, dispatch]);

  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;
  if (!comunidad) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 md:mt-8 lg:mt-16">
      <Helmet>
        <title>Editar Comunidad | Communidades</title>
      </Helmet>

      <section
        className="relative w-full max-w-5xl shadow-xl rounded-2xl sm:p-16 space-y-6 overflow-hidden"
        style={{
          backgroundImage: `url(${authBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full" />

        {/* Contenido */}
        <div className="relative z-10 space-y-6 grid gap-8">
          <div className="flex items-center justify-between p-4 gap-2">
            <div className="grid gap-8">
              <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                Refresca tu identidad local
              </h1>
              <p className="text-gray-700  text-xs sm:text-base">
                Une a las personas, celebra tu cultura y comparte tu historia
                con el mundo 🌎
              </p>
            </div>
            <img
              src={ilust2}
              alt="Ilustración comunidad"
              className="w-40 xl:w-60 opacity-90"
            />
          </div>
          {loading && <SkeletonNegocioForm />}
          <CrearEditarComunidadForm
            modoEdicion={true}
            comunidadInicial={comunidad}
          />{" "}
        </div>
      </section>

      <div className="pt-6 text-center space-y-2">
        <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2 ">
          <img src={icono} alt="Icono" className="h-8 md:h-12" />
          Dale vida a tu comunidad y conecta a los latinos en EE. UU.
        </p>
        <p className="  text-xs text-gray-600">
          Crea un espacio donde todos se sientan como en casa.
        </p>
      </div>
    </div>
  );
}
