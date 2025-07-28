import React, { useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  FiTrendingUp,
  FiBarChart,
  FiPieChart,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

export default function MetricsChartsTabs({
  summary,
  dailyViews = [],
  ratingsDistribution = [],
  visitsSummary = { anonymous: 0, logged: 0 },
  topViewers = [],
  followersComments = [],
}) {
  const [activeTab, setActiveTab] = useState("daily");

  const tabs = [
    { key: "daily", label: "Visitas Diarias", icon: <FiTrendingUp /> },
    { key: "ratings", label: "Calificaciones", icon: <FiBarChart /> },
    { key: "visits", label: "Anónimas vs Usuarios", icon: <FiPieChart /> },
    { key: "top", label: "Usuarios Recurrentes", icon: <FiUsers /> },
    { key: "growth", label: "Seguidores/Comentarios", icon: <FiActivity /> },
  ];

  return (
    <div className="md:border border-gray-200 rounded-xl md:p-4 space-y-4 bg-blue-50 h-full">
      <h3 className="text-lg font-bold text-gray-700">Métricas Visuales</h3>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center justify-center p-2 rounded transition ${
              activeTab === tab.key
                ? "text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
          </button>
        ))}
      </div>

      {/* Texto del tab activo */}
      <div className="mt-1 text-xs font-medium text-gray-600 text-center">
        {tabs.find((t) => t.key === activeTab)?.label}
      </div>

      <div className="w-full h-82 bg-white border border-gray-100 rounded-lg p-4">
        {activeTab === "daily" && dailyViews?.length > 0 && (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              data={dailyViews}
              margin={{ top: 10, right: 0, left: -30, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60dbfaff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60fa93ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(d) => new Date(d).toLocaleDateString("es-ES")}
                stroke="#6B7280"
                tick={{ fontSize: 11 }}
              />
              <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="2 2" />
              <Tooltip
                formatter={(value) => [`${value} visitas`, "Visitas"]}
                labelFormatter={(label) =>
                  `Fecha: ${new Date(label).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}`
                }
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#60cefaff"
                fillOpacity={1}
                fill="url(#colorCount)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeTab === "ratings" && (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[5, 4, 3, 2, 1].map((stars) => ({
                _id: stars,
                count:
                  ratingsDistribution?.find((r) => r._id === stars)?.count || 0,
              }))}
              margin={{ top: 10, right: 0, left: -39, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                tick={{ fontSize: 14 }}
                dataKey="_id"
                tickFormatter={(val) => `${val}★`}
                stroke="#6B7280"
              />
              <YAxis
                allowDecimals={false}
                stroke="#6B7280"
                tick={{ fontSize: 14 }}
              />
              <Tooltip
                formatter={(value) => [`${value} calificaciones`, "Cantidad"]}
                labelFormatter={(label) => `${label} estrellas`}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={30}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <Cell
                    key={stars}
                    fill={stars < 2 ? "#de4e4eff" : "#00c83cff"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeTab === "visits" && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {visitsSummary.anonymous + visitsSummary.logged > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      {
                        name: "Visitas anónimas",
                        value: visitsSummary.anonymous,
                      },
                      {
                        name: "Visitas de usuarios",
                        value: visitsSummary.logged,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {["#57ffd2ff", "#ffe855ff"].map((color, index) => (
                      <Cell key={index} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} visitas`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-gray-500 text-center w-full py-8">
                No hay datos de visitas para mostrar.
              </div>
            )}

            {/* Leyenda personalizada */}
            <div className="flex flex-col text-xs text-gray-400 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: "#57ffd2ff" }}
                />
                <span>
                  Personas que vieron tu perfil pero no estaban logueadas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: "#ffe855ff" }}
                />
                <span>Personas que vieron tu perfil estando logueadas</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "top" && (
          <>
            {topViewers?.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  layout="vertical"
                  data={topViewers}
                  margin={{ top: 10, right: 0, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="2 2" />
                  <XAxis type="number" tick={{ fontSize: 14 }} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value} visitas`, "Visitas"]}
                  />
                  <Bar dataKey="visitCount" fill="#8bfa9aff" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-sm text-gray-500 text-center w-full py-8">
                No hay usuarios recurrentes registrados en este periodo.
              </div>
            )}
          </>
        )}

        {activeTab === "growth" && summary && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Seguidores",
                      value:
                        summary.followersCount > 0 ? summary.followersCount : 1,
                    },
                    {
                      name: "Comentarios",
                      value:
                        summary.commentsCount > 0 ? summary.commentsCount : 1,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  label
                >
                  {["#60a5fa", "#fbbf24"].map((color, index) => (
                    <Cell key={index} fill={color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, name]} />
              </PieChart>
            </ResponsiveContainer>

            {/* Leyenda personalizada */}
            <div className="flex flex-col text-xs text-gray-600 space-y-2">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: "#60a5fa" }}
                />
                <span>Total de seguidores</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded"
                  style={{ backgroundColor: "#fbbf24" }}
                />
                <span>Total de comentarios</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
