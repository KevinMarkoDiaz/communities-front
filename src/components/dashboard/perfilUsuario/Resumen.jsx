import { useNavigate } from "react-router-dom";
import { FiUsers, FiFolder, FiShoppingBag, FiCalendar } from "react-icons/fi";

export default function Resumen({ resumen = [], user }) {
  const navigate = useNavigate();

  const iconMap = {
    Comunidades: FiUsers,
    Categorías: FiFolder,
    Negocios: FiShoppingBag,
    Eventos: FiCalendar,
  };

  const filteredResumen = resumen.filter(
    (item) => !item.requireAdmin || user?.role === "admin"
  );

  return (
    <div className="bg-[#F7F7F7] px-2 py-3 md:p-3 lg:p-6 rounded-2xl h-full">
      <h3 className="text-gray-600 text-md font-semibold pb-4">Resumen</h3>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-3">
        {filteredResumen.map(({ label, value, path }, index) => {
          // Normaliza el label: remueve "Tus"/"Mis", capitaliza la primera letra
          const cleaned = label.replace(/^(Tus|Mis)\s+/i, "").trim();
          const normalizedLabel =
            cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
          const Icon = iconMap[normalizedLabel] || FiFolder;

          return (
            <div
              key={index}
              onClick={() => path && navigate(path)}
              className="cursor-pointer flex flex-col bg-white border border-gray-200 rounded-lg p-2 hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className="w-7 h-7 flex items-center xl:mx-auto justify-center rounded-sm text-orange-500">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex xl:flex-col items-center justify-between gap-1">
                <p className="text-xs font-normal text-[#3F5374] truncate">
                  {label}
                </p>
                <p className="text-md font-semibold text-gray-500">{value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
