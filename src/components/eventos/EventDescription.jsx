export default function EventDescription({ description }) {
  if (!description) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-lg font-bold mb-2 text-[#111418]">Descripción</h2>
      <p className="text-[#637588]  text-xs leading-relaxed whitespace-pre-line">
        {description}
      </p>
    </div>
  );
}
