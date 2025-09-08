import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CardResultadoCuadrada from "./CardResultadoCuadrada";

// Helpers defensivos
const getTitulo = (item = {}) =>
  item.nombre || item.titulo || item.title || item.name || "Sin título";

const PLACEHOLDER_IMG = "https://cdn.usegalileo.ai/sdxl10/placeholder.png";
const getImagen = (item = {}) =>
  item.imagen ||
  item.imagenDestacada ||
  item.featuredImage ||
  item.bannerImage ||
  PLACEHOLDER_IMG;

const getTipo = (item = {}) => item.tipo || "desconocido";
const esPremium = (item = {}) => item?.isPremium === true;

const getRuta = (tipo, id) => {
  if (!id) return null;
  switch (tipo) {
    case "negocio":
      return `/negocios/${id}`;
    case "evento":
      return `/eventos/${id}`;
    case "comunidad":
      return `/comunidades/${id}`;
    default:
      return null; // tipo desconocido → sin ruta
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

export default function GridResultadosGlobal({ resultados = [] }) {
  if (!Array.isArray(resultados) || resultados.length === 0) return null;

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">
        🔍 Resultados de tu búsqueda
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,180px))] md:grid-cols-[repeat(auto-fit,minmax(180px,180px))] gap-4">
        {resultados.map((rawItem, index) => {
          const item = rawItem ?? {};
          const id = item.id ?? item._id ?? null;
          const ruta = getRuta(getTipo(item), id);
          const premium = esPremium(item);

          const card = (
            <CardResultadoCuadrada
              title={getTitulo(item)}
              image={getImagen(item)}
              tipo={getTipo(item)}
              isPremium={premium}
            />
          );

          return (
            <motion.div
              key={id ?? `res-${index}`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className={premium ? "col-span-2" : undefined}
            >
              {ruta ? (
                <Link to={ruta} className="block">
                  {card}
                </Link>
              ) : (
                // Sin ruta válida → render estático (no clickeable)
                <div className="block opacity-90">{card}</div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
