import { useState } from "react";
import { useDispatch } from "react-redux";
import { redeemPromoThunk } from "../../store/userPromosSlice";
import { Helmet } from "react-helmet-async";
import ilusta from "../../assets/ilusta.svg";
import FadeInOnScroll from "../../components/FadeInOnScroll";

export default function RedimirCodigo() {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRedimir = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultado(null);

    const res = await dispatch(redeemPromoThunk(code));
    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      setResultado(res.payload);
    } else {
      setError(res.error?.message || "Código inválido o no autorizado");
    }
  };

  return (
    <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-8 md:gap-12 xl:gap-16 px-2 pb-10">
      <Helmet>
        <title>Redimir Código | Communities</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 xl:gap-10 mt-10">
        <div className="flex-1">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-sky-800">Redimir Código</h1>
            <p className="text-gray-700  text-xs md:text-base max-w-lg">
              Ingresá el código único que te presentó un usuario para validar y
              marcar la promoción como redimida.
            </p>
          </div>
        </div>

        {/* Imagen ilustrativa */}
        <div className="hidden lg:block w-[240px] shrink-0">
          <img src={ilusta} alt="Ilustración" className="w-full" />
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-grow border-gray-200" />
        <span className="text-gray-400 text-xs uppercase tracking-wider">
          Validación
        </span>
        <hr className="flex-grow border-gray-200" />
      </div>

      {/* Formulario */}
      <form
        onSubmit={handleRedimir}
        className="space-y-4 max-w-md mx-auto w-full"
      >
        <input
          type="text"
          placeholder="Ingresá el código del usuario"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-lg font-mono tracking-wide"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 text-white px-6 py-2 rounded-lg hover:bg-sky-700 disabled:opacity-60 transition font-semibold"
        >
          {loading ? "Verificando..." : "Redimir código"}
        </button>
      </form>

      {/* Resultado */}
      {resultado && (
        <div className="max-w-md mx-auto bg-green-50 border border-green-300 p-4 rounded-lg space-y-2">
          <p className="text-green-700 font-semibold  text-xs">
            ✅ ¡Código redimido correctamente!
          </p>
          <p className="text-gray-700  text-xs">
            Promo: <strong>{resultado.promotion?.name}</strong>
          </p>
          <p className="text-gray-700  text-xs">
            Usuario: <strong>{resultado.user}</strong>
          </p>
          <p className="text-gray-500 text-xs">
            Redimido el {new Date(resultado.redeemedAt).toLocaleString()}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-md mx-auto text-red-600 font-medium bg-red-50 border border-red-300 p-4 rounded-lg  text-xs">
          ❌ {error}
        </div>
      )}
      <FadeInOnScroll direction="left" duration={900} delay={200}>
        {/* Imagen ilustrativa para mobile (abajo) */}
        <div className="block lg:hidden mt-10 flex justify-center">
          <img src={ilusta} alt="Ilustración" className="max-h-48 w-auto" />
        </div>
      </FadeInOnScroll>
    </div>
  );
}
