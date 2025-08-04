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
const esPremium = (item) => item.isPremium === true;

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
    <section className="w-full max-w-7xl mx-auto flex flex-col gap-4 ">
      <h2 className="text-xl font-semibold text-gray-800">
        🔍 Resultados de tu búsqueda
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(180px,180px))] md:grid-cols-[repeat(auto-fit,minmax(180px,180px))]  gap-4">
        {resultados.map((item, index) => (
          <motion.div
            key={item.id || item._id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            className={item.isPremium ? "col-span-2 " : ""}
          >
            <Link to={getRuta(item.tipo, item.id || item._id)} className="">
              <CardResultadoCuadrada
                title={getTitulo(item)}
                image={getImagen(item)}
                tipo={getTipo(item)}
                isPremium={item.isPremium}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
