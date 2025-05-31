export default function BannerPromociones({ imagen }) {
  return (
    <div className=" py-6 flex justify-center">
      <div className="w-full  h-[9rem] max-h-40 rounded-xl overflow-hidden relative">
        {/* 🖼️ Imagen de fondo */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imagen})` }}
        />
      </div>
    </div>
  );
}
