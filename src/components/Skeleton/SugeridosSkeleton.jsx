export default function SugeridosSkeleton() {
  return (
    <section className="space-y-4 animate-pulse">
      {/* Título simulado */}
      <div className="h-8 w-48 md:w-52 bg-gray-200 rounded" />

      {/* Cards simuladas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`w-full bg-gray-100 rounded-xl h-60 md:h-40 ${
              i === 0 ? "" : "hidden md:block"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
