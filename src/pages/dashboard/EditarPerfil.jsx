import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EditarPerfilForm from "../../components/dashboard/formularios/perfil/EditarPerfilForm";
import { updateUser } from "../../store/authSlice";
import { mostrarFeedback } from "../../store/feedbackSlice";
import authBg from "../../../src/assets/authbg.png";
import ilust2 from "../../assets/ilust2.svg";
import icono from "../../../src/assets/icono.svg";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { usuario, loading } = useSelector((state) => state.auth);

  const handleSubmit = async (valores) => {
    try {
      const formData = new FormData();

      Object.entries({
        name: valores.name,
        lastName: valores.lastName,
        title: valores.title,
        description: valores.description,
        location: valores.location,
        country: valores.country,
      }).forEach(([key, value]) => formData.append(key, value));

      if (valores.profileImage && typeof valores.profileImage !== "string") {
        formData.append("profileImage", valores.profileImage);
      }

      await dispatch(
        updateUser({ userId: usuario.id, userData: formData })
      ).unwrap();

      dispatch(
        mostrarFeedback({
          message: "✅ Perfil actualizado exitosamente",
          type: "success",
        })
      );

      navigate("/dashboard/perfil");
    } catch (err) {
      dispatch(
        mostrarFeedback({
          message: err?.message || "❌ Error al actualizar el perfil",
          type: "error",
        })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar Perfil | Communities</title>
      </Helmet>

      <div className="flex flex-col items-center justify-center min-h-screen px-2 gap-8 lg:mt-16">
        <section
          className="relative w-full max-w-5xl shadow-xl rounded-2xl sm:p-16 space-y-6 overflow-hidden"
          style={{
            backgroundImage: `url(${authBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Capa semitransparente */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl h-full z-0"></div>

          {/* Contenido */}
          <div className="relative z-10 space-y-6 grid gap-8">
            <div className="flex items-center justify-between p-4 gap-2">
              <div className="grid gap-8">
                <h1 className="text-2xl font-bold text-black flex items-center gap-2">
                  Actualiza tu perfil
                </h1>
                <p className="text-gray-700  text-xs sm:text-base">
                  Mantén tu información al día para conectar mejor con otras
                  personas y negocios dentro de la comunidad.
                </p>
              </div>
              <img
                src={ilust2}
                alt="Ilustración"
                className="w-40 xl:w-60 opacity-90"
              />
            </div>

            {/* Formulario */}
            <EditarPerfilForm onSubmit={handleSubmit} initialValues={usuario} />
          </div>
        </section>

        {/* Footer mensaje motivacional */}
        <div className="pt-6 text-center space-y-2">
          <p className="text-[#141C24] text-base font-medium flex justify-center items-center gap-2">
            <img src={icono} alt="Icono" className="h-8 md:h-12" />
            Tu historia merece ser contada.
          </p>
          <p className="  text-xs text-gray-600">
            Comparte quién eres y fortalece los lazos con tu comunidad.
          </p>
        </div>
      </div>
    </>
  );
}
