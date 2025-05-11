import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerEventos } from "../store/eventosSlice";
import { Helmet } from "react-helmet-async";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default function Eventos() {
  const dispatch = useDispatch();
  const { lista, loading, error } = useSelector((state) => state.eventos);
  console.log("Eventos:", lista);
  useEffect(() => {
    dispatch(obtenerEventos());
  }, [dispatch]);

  if (loading) return <Loading mensaje="Cargando eventos..." />;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Communities | Eventos</title>
        <meta
          name="description"
          content="Consulta eventos culturales y comunitarios relevantes para migrantes."
        />
      </Helmet>

      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold">Eventos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {lista.map((evento) => (
            <Link to={`/eventos/${evento.id}`} key={evento._id}>
              <Card
                title={evento.title}
                description={`${evento.description} (📅 ${new Date(
                  evento.date
                ).toLocaleDateString()})`}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
