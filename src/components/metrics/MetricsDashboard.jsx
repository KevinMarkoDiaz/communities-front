import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMetrics,
  fetchDailyViews,
  fetchTopViewers,
} from "../../store/metricsSlice";
import SummaryDashboard from "./SummaryDashboard";
import { FaUsers, FaEye } from "react-icons/fa";
import MetricsChartsTabs from "./MetricsChartsTabs";
import { ensureLastDays } from "../../utils/ensureLastDays";

function transformGrowthData(summary) {
  if (!summary) return [];

  const days = 7;
  const today = new Date();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const isoDate = date.toISOString().split("T")[0];

    result.push({
      date: isoDate,
      followers: Math.floor(Math.random() * 10),
      comments: Math.floor(Math.random() * 5),
    });
  }

  return result;
}

export default function MetricsDashboard({
  entityId,
  entityType,
  summary, // opcional: para SummaryDashboard y Charts
  className = "",
}) {
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const last7 = new Date();
    last7.setDate(today.getDate() - 7);
    return {
      startDate: last7.toISOString().split("T")[0],
      endDate: today.toISOString().split("T")[0],
    };
  });

  // 🔁 KEY de caché
  const cacheKey = useMemo(
    () => `${dateRange.startDate}_${dateRange.endDate}`,
    [dateRange]
  );

  // 🧠 Datos desde Redux cacheados
  const metrics =
    useSelector((state) => state.metrics.entities[entityId]) || {};
  const general = metrics.general || null;
  const daily = metrics.daily?.[cacheKey] || null;
  const topViewers = metrics.topViewers?.[cacheKey] || null;
  const loading = useSelector((state) => state.metrics.loading);
  const error = useSelector((state) => state.metrics.error);

  // 📦 Lógica de fetch defensiva
  useEffect(() => {
    if (!entityId || !entityType) return;

    if (!general) {
      dispatch(fetchMetrics({ entityId, entityType }));
    }

    if (!daily) {
      dispatch(fetchDailyViews({ entityId, entityType, ...dateRange }));
    }

    if (!topViewers) {
      dispatch(
        fetchTopViewers({ entityId, entityType, ...dateRange, limit: 5 })
      );
    }
  }, [entityId, entityType, cacheKey]);

  if (loading && !general && !daily && !topViewers)
    return <p className="p-2 text-sm">Cargando métricas...</p>;

  if (error) return <p className="text-red-600 p-2 text-sm">Error: {error}</p>;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-3 md:items-end">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Desde:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, startDate: e.target.value }))
            }
            className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Hasta:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, endDate: e.target.value }))
            }
            className="border border-gray-300 rounded px-2 py-1 text-xs focus:ring focus:border-blue-300"
          />
        </div>
      </div>

      {/* Resumen de visitas */}
      {general && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-gray-200 rounded-lg p-3 text-center hover:shadow transition">
            <FaEye className="mx-auto text-gray-500 mb-1" />
            <p className="text-lg font-bold text-gray-700">
              {general.totalViews}
            </p>
            <p className="text-xs text-gray-500">Visitas totales</p>
          </div>
          <div className="bg-blue-50 border border-gray-200 rounded-lg p-3 text-center hover:shadow transition">
            <FaEye className="mx-auto text-gray-500 mb-1" />
            <p className="text-lg font-bold text-gray-700">
              {general.anonymousViews}
            </p>
            <p className="text-xs text-gray-500">Visitas anónimas</p>
          </div>
          <div className="bg-blue-50 border border-gray-200 rounded-lg p-3 text-center hover:shadow transition">
            <FaUsers className="mx-auto text-gray-500 mb-1" />
            <p className="text-lg font-bold text-gray-700">
              {general.uniqueLoggedInViews}
            </p>
            <p className="text-xs text-gray-500">Visitas únicas</p>
          </div>
        </div>
      )}

      {/* Usuarios recurrentes */}
      {topViewers && topViewers.length > 0 && (
        <div className="bg-blue-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-600">
            Usuarios más recurrentes
          </h4>
          <ul className="space-y-1">
            {topViewers.map((viewer, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b border-gray-200 py-1 text-xs text-gray-600"
              >
                <span>{viewer.name}</span>
                <span>{viewer.visitCount} visitas</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Visitas diarias */}
      {daily && daily.length > 0 && (
        <div className="bg-blue-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-3 text-gray-600">
            Visitas diarias
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {daily.map((day) => (
              <div
                key={day.date}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-md p-2 text-xs text-gray-600 hover:shadow transition"
              >
                <span className="font-semibold text-gray-700">
                  {new Date(day.date).toLocaleDateString()}
                </span>
                <span className="text-xs">👁 {day.count} visitas</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resumen y Gráficas */}
      {summary && (
        <section className="bg-blue-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-4 text-gray-600">
            Resumen de actividad
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <SummaryDashboard summary={summary} />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <MetricsChartsTabs
                summary={summary}
                dailyViews={ensureLastDays(daily || [], 5)}
                ratingsDistribution={summary.ratings}
                visitsSummary={{
                  anonymous: general?.anonymousViews || 0,
                  logged: general?.uniqueLoggedInViews || 0,
                }}
                topViewers={topViewers}
                followersComments={transformGrowthData(summary)}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
