// src/pages/dashboard/EditarPerfil.jsx
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditarPerfilForm from "../../components/dashboard/formularios/perfil/EditarPerfilForm";
import { updateUserApi } from "../../api/authApi";
import { updateUser } from "../../store/authSlice";
import authBg from "../../../src/assets/authbg.png";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.auth.usuario);

  const handleSubmit = async (valores) => {
    try {
      const updatedUser = await updateUserApi(usuario.id, valores);
      dispatch(updateUser(updatedUser.user || updatedUser));
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

      <div className="flex flex-col items-center justify-center min-h-screen px-4 ">
        <section
          className="w-full max-w-2xl shadow rounded-2xl p-6 sm:p-12 space-y-6 bg-black/40 backdrop-blur-lg"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#141C24]">Editar Perfil</h1>
            <p className="text-gray-100 text-sm sm:text-base">
              Mantén tu información actualizada para que otros usuarios y
              negocios puedan conocerte mejor.
            </p>
          </div>

          <EditarPerfilForm onSubmit={handleSubmit} initialValues={usuario} />
        </section>

        <div className="pt-6 text-center max-w-xl">
          <p className="text-[#141C24] text-base font-medium">
            ✨ Tu perfil es tu carta de presentación ante la comunidad latina.
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Comparte quién eres, qué te apasiona y conecta con personas que
            valoran tu historia.
          </p>
        </div>
      </div>
    </>
  );
}
