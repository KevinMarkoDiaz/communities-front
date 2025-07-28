import React from "react";
import { FaUsers, FaComments, FaStar } from "react-icons/fa";

export default function SummaryDashboard({ summary }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-3  lg:grid-cols-1 gap-4 mt-4">
      {/* Seguidores */}
      <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow transition">
        <FaUsers className="mx-auto text-gray-500 mb-1" />
        <p className="text-xs text-gray-500">Seguidores</p>
        <p className="text-lg font-bold text-gray-700">
          {summary.followersCount || 0}
        </p>
      </div>

      {/* Comentarios */}
      <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow transition">
        <FaComments className="mx-auto text-gray-500 mb-1" />
        <p className="text-xs text-gray-500">Comentarios</p>
        <p className="text-lg font-bold text-gray-700">
          {summary.commentsCount || 0}
        </p>
      </div>

      {/* Promedio de calificación */}
      <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 text-center hover:shadow transition ">
        <FaStar className="mx-auto text-gray-500 mb-1" />
        <p className="text-xs text-gray-500">Promedio</p>
        <p className="text-md font-bold text-gray-700">
          {summary.averageRating
            ? `${Number(summary.averageRating).toFixed(2)}`
            : "Sin datos"}
        </p>
      </div>

      {/* Distribución de ratings */}
      <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 hover:shadow transition col-span-3 md:col-span-3 lg:col-span-1">
        <p className="text-xs text-gray-500 mb-2">
          ¿Cómo calificaron los usuarios?{" "}
        </p>
        <ul className="space-y-1 text-xs text-gray-600">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count =
              summary.ratings?.find((r) => r._id === stars)?.count || 0;
            return (
              <li key={stars} className="flex justify-between items-center">
                <span className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: stars }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </span>
                <span className="text-gray-700">{count}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
