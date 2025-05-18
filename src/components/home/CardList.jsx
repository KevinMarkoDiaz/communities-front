import CardHorizontal from "./CardHorizontal";

export default function CardList({
  items,
  getTitle,
  getDescription,
  getImage,
  getLink,
}) {
  if (!items || items.length === 0) {
    return (
      <p className="text-gray-500 w-full text-center">
        No se encontraron resultados.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
      {items.map((item) => (
        <a
          href={getLink(item)}
          key={item.id || item._id}
          className="flex-shrink-0"
        >
          <CardHorizontal
            title={getTitle(item)}
            description={getDescription(item)}
            image={getImage(item)}
          />
        </a>
      ))}
    </div>
  );
}
