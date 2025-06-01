// src/pages/dashboard/EditarPerfil.jsx
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditarPerfilForm from "../../components/dashboard/formularios/perfil/EditarPerfilForm";
import { updateUserApi } from "../../api/authApi";
import { updateUser } from "../../store/authSlice";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  const handleSubmit = async (valores) => {
    try {
      // Hacemos PATCH con el usuario actual (id)
      const updatedUser = await updateUserApi(usuario.id, valores);

      // Actualizamos el estado global con los nuevos datos
      dispatch(updateUser(updatedUser.user || updatedUser)); // depende de la respuesta backend

      // Redirigimos al perfil
      navigate("/dashboard/perfil");
    } catch (err) {
      console.error("Error actualizando perfil", err);
      // Aquí podés agregar lógica para mostrar error al usuario
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Perfil | Communities</title>
      </Helmet>

      <div className="min-h-screen flex justify-center py-10 px-4">
        <div className="w-full max-w-2xl p-6 space-y-6">
          <h1 className="text-[#141C24] text-3xl font-bold">Editar Perfil</h1>
          <EditarPerfilForm onSubmit={handleSubmit} initialValues={usuario} />
        </div>
      </div>
    </>
  );
}
