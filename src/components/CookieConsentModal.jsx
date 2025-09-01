// // components/CookieConsentModal.jsx
// import { useState, useEffect } from "react";
// import { FaCheck, FaTimes } from "react-icons/fa";

// export default function CookieConsentModal() {
//   const [visible, setVisible] = useState(false);
//   const [preferences, setPreferences] = useState({
//     essential: true,
//     analytics: false,
//     ads: false,
//   });

//   useEffect(() => {
//     const stored = localStorage.getItem("cookiePrefs");
//     if (!stored) {
//       setVisible(true);
//     }
//   }, []);

//   const savePreferences = (prefs) => {
//     localStorage.setItem("cookiePrefs", JSON.stringify(prefs));
//     if (window.gtag) {
//       window.gtag("consent", "update", {
//         ad_storage: prefs.ads ? "granted" : "denied",
//         analytics_storage: prefs.analytics ? "granted" : "denied",
//       });
//     }
//     setVisible(false);
//   };

//   const togglePref = (key) => {
//     setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-6 text-gray-800">
//         <div className="space-y-2">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Configuración de Cookies
//           </h2>
//           <p className="  text-xs text-gray-600">
//             Usamos cookies para mejorar tu experiencia. Podés elegir qué tipos
//             de cookies querés permitir. Las cookies esenciales son necesarias
//             para el funcionamiento del sitio.
//           </p>
//         </div>

//         <div className="space-y-4">
//           {/* Esenciales */}
//           <div className="flex items-center justify-between py-2 border-b border-gray-200">
//             <div>
//               <p className="  text-xs font-medium text-gray-800">
//                 Cookies esenciales
//               </p>
//               <p className="text-xs text-gray-500">
//                 Necesarias para el funcionamiento del sitio
//               </p>
//             </div>
//             <span className="text-green-600  text-xs font-semibold">
//               Siempre activas
//             </span>
//           </div>

//           {/* Analítica */}
//           <div className="flex items-center justify-between py-2 border-b border-gray-200">
//             <div>
//               <p className="  text-xs font-medium text-gray-800">
//                 Cookies de analítica
//               </p>
//               <p className="text-xs text-gray-500">
//                 Nos ayudan a entender cómo usás la plataforma
//               </p>
//             </div>
//             <button
//               onClick={() => togglePref("analytics")}
//               className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
//                 preferences.analytics
//                   ? "bg-green-500 text-white border-green-500"
//                   : "border-gray-300 text-gray-400"
//               }`}
//             >
//               {preferences.analytics ? (
//                 <FaCheck size={12} />
//               ) : (
//                 <FaTimes size={12} />
//               )}
//             </button>
//           </div>

//           {/* Publicidad */}
//           <div className="flex items-center justify-between py-2">
//             <div>
//               <p className="  text-xs font-medium text-gray-800">
//                 Cookies de publicidad
//               </p>
//               <p className="text-xs text-gray-500">
//                 Usadas para mostrar anuncios relevantes
//               </p>
//             </div>
//             <button
//               onClick={() => togglePref("ads")}
//               className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
//                 preferences.ads
//                   ? "bg-green-500 text-white border-green-500"
//                   : "border-gray-300 text-gray-400"
//               }`}
//             >
//               {preferences.ads ? <FaCheck size={12} /> : <FaTimes size={12} />}
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 pt-4">
//           <button
//             className="px-4 py-2  text-xs text-gray-700 border border-gray-300 rounded hover:bg-gray-100"
//             onClick={() =>
//               savePreferences({ essential: true, analytics: false, ads: false })
//             }
//           >
//             Rechazar todo
//           </button>
//           <button
//             className="px-4 py-2  text-xs bg-[#F45525] text-white rounded hover:bg-[#d9451f]"
//             onClick={() => savePreferences(preferences)}
//           >
//             Guardar preferencias
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// components/CookieConsentModal.jsx
import { useEffect } from "react";

export default function CookieConsentModal() {
  useEffect(() => {
    // ✅ Nueva lógica: aceptar siempre todas las cookies
    const prefs = {
      essential: true,
      analytics: true,
      ads: true,
    };

    localStorage.setItem("cookiePrefs", JSON.stringify(prefs));

    if (window.gtag) {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
    }
  }, []);

  // ❌ Nunca mostrar modal
  return null;
}
