import sombrero from "../assets/loader.png"; // ajustá el path si está en otra carpeta

export default function Loading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-6 text-[#f45525]">
      {/* Imagen del sombrero animada */}
      <div className="w-36 h-36 animate-pulse">
        <img
          src={sombrero}
          alt="Sombrero vueltiao"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
