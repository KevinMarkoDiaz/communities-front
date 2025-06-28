import { Helmet } from "react-helmet-async";
import CrearEditarComunidadForm from "../../components/dashboard/formularios/comunidad/CrearEditarComunidadForm";

export default function CrearComunidad() {
  return (
    <>
      <Helmet>
        <title>Crear Comunidad | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Crear Comunidad</h1>
        <CrearEditarComunidadForm />
      </section>
    </>
  );
}
