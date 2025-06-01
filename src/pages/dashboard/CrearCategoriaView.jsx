import { Helmet } from "react-helmet-async";
import CrearCategoria from "./CrearCategoria";

export default function CrearCategoriaView() {
  return (
    <>
      <Helmet>
        <title>Crear Categoría | Dashboard</title>
      </Helmet>
      <section className="p-4 max-w-4xl mx-auto">
        <CrearCategoria />
      </section>
    </>
  );
}
