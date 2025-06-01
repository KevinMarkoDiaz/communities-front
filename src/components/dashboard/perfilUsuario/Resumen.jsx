const resumen = [
  { label: "Comunidades", value: 3 },
  { label: "Categorías Creadas", value: 2 },
  { label: "Negocios", value: 1 },
  { label: "Eventos Creados", value: 2 },
];

export default function Resumen() {
  return (
    <div>
      <h3 className="text-[#141C24] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Resumen
      </h3>
      <div className="p-4 grid grid-cols-2">
        {resumen.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 border-t border-[#D4DBE8] py-4 ${
              index % 2 === 0 ? "pr-2" : "pl-2"
            }`}
          >
            <p className="text-[#3F5374] text-sm font-normal leading-normal">
              {item.label}
            </p>
            <p className="text-[#141C24] text-sm font-normal leading-normal">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
