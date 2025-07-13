// utils/ensureLastDays.js

export function ensureLastDays(data, days = 5) {
  const today = new Date();
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];

    const found = data.find((d) => d.date === dateStr);

    result.push({
      date: dateStr,
      count: found ? found.count : 0,
    });
  }

  return result;
}
