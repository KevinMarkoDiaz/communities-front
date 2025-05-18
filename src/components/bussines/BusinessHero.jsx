export default function BusinessHero({ title, imageUrl }) {
  return (
    <div
      className="bg-cover bg-center min-h-[218px] rounded-xl flex items-end p-4"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.4), transparent 25%), url(${imageUrl})`,
      }}
    >
      <h1 className="text-white text-[28px] font-bold leading-tight">
        {title}
      </h1>
    </div>
  );
}
