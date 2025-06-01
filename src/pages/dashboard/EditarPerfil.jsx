// src/pages/dashboard/EditarPerfil.jsx
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import EditarPerfilForm from "../../components/dashboard/formularios/perfil/EditarPerfilForm";

export default function EditarPerfil() {
  const navigate = useNavigate();

  const handleSubmit = async (valores) => {
    try {
      console.log("Perfil actualizado:", valores);
      // Aquí podrías hacer un PATCH/PUT a tu API
      navigate("/dashboard/perfil");
    } catch (err) {
      console.error("Error actualizando perfil", err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Perfil | Communities</title>
      </Helmet>

      <div className="min-h-screen flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl  p-6 space-y-6">
          <h1 className="text-[#141C24] text-3xl font-bold">Editar Perfil</h1>
          <EditarPerfilForm onSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
