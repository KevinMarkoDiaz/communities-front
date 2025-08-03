import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CardResultadoCuadrada from "./CardResultadoCuadrada";

// Helpers
const getTitulo = (item) =>
  item.nombre || item.titulo || item.title || item.name || "Sin título";

const getImagen = (item) =>
  item.imagen ||
  item.imagenDestacada ||
  item.featuredImage ||
  item.bannerImage ||
  "";

const getTipo = (item) => item.tipo || "Sin tipo";

const getRuta = (tipo, id) => {
  switch (tipo) {
    case "negocio":
      return `/negocios/${id}`;
    case "evento":
      return `/eventos/${id}`;
    case "comunidad":
      return `/comunidades/${id}`;
    default:
      return "#";
  }
};

// Animación para cada tarjeta
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

export default function GridResultadosGlobal({ resultados = [] }) {
  if (!resultados.length) return null;

  return (
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-4 px-4">
      <h2 className="text-xl font-semibold text-gray-800">
        🔍 Resultados de tu búsqueda
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,180px))]  gap-4">
        {resultados.map((item, index) => (
          <motion.div
            key={item.id || item._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            <Link to={getRuta(item.tipo, item.id || item._id)}>
              <CardResultadoCuadrada
                title={getTitulo(item)}
                image={getImagen(item)}
                tipo={getTipo(item)}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
