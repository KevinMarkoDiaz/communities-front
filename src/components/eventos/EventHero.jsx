export default function EventHero({ image, title }) {
  return (
    <div
      className="bg-cover bg-center min-h-80 flex flex-col justify-end rounded-xl overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${image})`,
      }}
    >
      <div className="p-4">
        <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
}
