import { motion } from "framer-motion";
import ilustracion from "../assets/ilustz.svg";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-orange-500">
      {/* Ilustración animada */}
      <motion.img
        src={ilustracion}
        alt="Página no encontrada"
        className="w-64 md:w-96 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Título */}
      <motion.h1
        className="text-6xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        404
      </motion.h1>

      {/* Mensaje */}
      <motion.p
        className="text-xl text-white mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        La página que buscas no existe o fue movida.
      </motion.p>

      {/* Links rápidos */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <a
          href="/negocios"
          className="px-4 py-2 bg-white text-orange-600 rounded hover:bg-orange-100 transition"
        >
          Ver negocios
        </a>
        <a
          href="/eventos"
          className="px-4 py-2 bg-white text-orange-600 rounded hover:bg-orange-100 transition"
        >
          Ver eventos
        </a>
        <a
          href="/comunidades"
          className="px-4 py-2 bg-white text-orange-600 rounded hover:bg-orange-100 transition"
        >
          Ver comunidades
        </a>
      </motion.div>

      {/* Botón */}
      <motion.a
        href="/"
        className="inline-block px-6 py-3 bg-white text-orange-600 rounded hover:bg-orange-100 transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        Volver al inicio
      </motion.a>
    </div>
  );
}
