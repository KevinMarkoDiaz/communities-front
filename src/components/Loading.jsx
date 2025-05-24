import sombrero from "../assets/loader.png"; // ajustá el path si está en otra carpeta

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-[#f45525]">
      <div className="w-28 h-28 animate-bounce">
        <img
          src={sombrero}
          alt="Sombrero vueltiao"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
