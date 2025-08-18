import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import HeaderPerfil from "../../components/dashboard/perfilUsuario/HeaderPerfil";
import Resumen from "../../components/dashboard/perfilUsuario/Resumen";
import ResumenComunidades from "../../components/dashboard/perfilUsuario/ResumenComunidades";
import ResumenNegocios from "../../components/dashboard/perfilUsuario/ResumenNegocios";
import ResumenEventos from "../../components/dashboard/perfilUsuario/ResumenEventos";
import { fetchMisComunidades } from "../../store/comunidadesSlice";
import { fetchMisNegocios } from "../../store/negociosSlice";
import { fetchMisEventos } from "../../store/eventosSlice";
import PerfilSkeleton from "../../components/Skeleton/PerfilSkeleton";
import ilust3 from "../../assets/ilust3.svg";
import { Link } from "react-router-dom";
import { fetchCategorias } from "../../store/categoriasSlice";

export default function PerfilPage() {
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);
  const categorias = useSelector((state) => state.categorias.data || []);

  const comunidades = useSelector((state) => state.comunidades.misComunidades);
  const negocios = useSelector((state) => state.negocios.misNegocios || []);
  const eventos = useSelector((state) => state.eventos.misEventos || []);
  const categoriasLoaded = useSelector((state) => state.categorias.loaded);

  const loadingComunidades = useSelector(
    (state) => state.comunidades.loadingMis
  );
  const loadingNegocios = useSelector((state) => state.negocios.misLoading);
  const loadingEventos = useSelector((state) => state.eventos.misLoading);

  const [tab, setTab] = useState("negocios");

  const isAdmin = ["admin"].includes(usuario?.role);

  // Referencias para evitar llamadas dobles
  const fetchedComunidades = useRef(false);
  const fetchedNegocios = useRef(false);
  const fetchedEventos = useRef(false);
  useEffect(() => {
    if (!categoriasLoaded) {
      dispatch(fetchCategorias());
    }
  }, [categoriasLoaded, dispatch]);
  useEffect(() => {
    if (
      !fetchedComunidades.current &&
      comunidades.length === 0 &&
      !loadingComunidades
    ) {
      dispatch(fetchMisComunidades());
      fetchedComunidades.current = true;
    }

    if (!fetchedNegocios.current && negocios.length === 0 && !loadingNegocios) {
      dispatch(fetchMisNegocios());
      fetchedNegocios.current = true;
    }

    if (!fetchedEventos.current && eventos.length === 0 && !loadingEventos) {
      dispatch(fetchMisEventos());
      fetchedEventos.current = true;
    }
  }, [
    dispatch,
    comunidades.length,
    negocios.length,
    eventos.length,
    loadingComunidades,
    loadingNegocios,
    loadingEventos,
  ]);

  if (loadingComunidades || loadingNegocios || loadingEventos) {
    return <PerfilSkeleton />;
  }

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 p-2">
      <div className="border border-gray-100 rounded-2xl shadow-md">
        <HeaderPerfil usuario={usuario} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap rounded-t-xl bg-gray-100 gap-2 border-gray-200 pt-2 px-4 shadow-md">
        {[
          isAdmin && { id: "comunidades", label: "Mis comunidades" },
          { id: "negocios", label: "Mis negocios" },
          { id: "eventos", label: "Mis eventos" },
        ]
          .filter(Boolean)
          .map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`text-xs px-3 py-2 rounded-t-xl font-medium transition ${
                tab === t.id
                  ? "bg-white border border-b-0 border-gray-200 text-gray-800"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Columna izquierda */}
        <div className="w-full md:w-1/3 flex flex-col">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
            <Resumen
              resumen={[
                {
                  label: "Tus comunidades",
                  value: comunidades?.length || 0,
                  path: "/dashboard-admin/mis-comunidades",
                  requireAdmin: true,
                },
                {
                  label: "Tus categorías",
                  value: categorias?.length || 0,
                  path: "/dashboard/categorias",
                  requireAdmin: true,
                },
                {
                  label: "Tus negocios",
                  value: negocios?.length || 0,
                  path: "/dashboard/mis-negocios",
                },
                {
                  label: "Tus eventos",
                  value: eventos?.length || 0,
                  path: "/dashboard/mis-eventos",
                },
              ]}
              user={usuario}
            />
          </div>
        </div>

        {/* Columna derecha dinámica */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          {tab === "comunidades" && isAdmin && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
              <ResumenComunidades comunidades={comunidades} />
            </div>
          )}
          {tab === "negocios" && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
              <ResumenNegocios negocios={negocios} />
            </div>
          )}
          {tab === "eventos" && (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full">
              <ResumenEventos eventos={eventos} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center text-center gap-5 py-16">
        <img src={ilust3} alt="Perfil" className="w-40 opacity-90" />
        <p className="text-gray-500 text-xs max-w-xs">
          Mantener tu información actualizada hace más fácil que la comunidad
          conecte contigo y conozca mejor tu proyecto.
        </p>
        <Link
          to="/dashboard/perfil/editar"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white  text-xs font-medium px-4 py-2 rounded-full transition shadow-lg"
        >
          Editar mi perfil
        </Link>
      </div>
    </div>
  );
}
