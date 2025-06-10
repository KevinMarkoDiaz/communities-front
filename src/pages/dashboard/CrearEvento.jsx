// src/pages/dashboard/CrearEvento.jsx
import { Helmet } from "react-helmet-async";

import CrearEditarEventoForm from "../../components/dashboard/formularios/evento/CrearEditarEventoForm";

export default function CrearEvento() {
  return (
    <>
      <Helmet>
        <title>Crear Evento | Communities</title>
      </Helmet>

      <section className="max-w-3xl mx-auto bg-white shadow rounded-2xl p-6 sm:p-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#141C24]">Crear Evento</h1>
        <CrearEditarEventoForm />
      </section>
    </>
  );
}
