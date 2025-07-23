// 📌 openingHours = array de objetos con { day, open, close, closed }

export function estaAbiertoAhora(openingHours) {
  if (!Array.isArray(openingHours)) return false;

  const diasSemana = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const hoy = new Date();
  const diaActual = diasSemana[hoy.getDay()];
  const horaActual =
    hoy.getHours().toString().padStart(2, "0") +
    ":" +
    hoy.getMinutes().toString().padStart(2, "0");

  const horarioHoy = openingHours.find((h) => h.day === diaActual);
  if (!horarioHoy || horarioHoy.closed) return false;

  return horarioHoy.open <= horaActual && horaActual < horarioHoy.close;
}
