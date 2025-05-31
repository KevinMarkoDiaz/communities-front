import { Link } from "react-router-dom";

export default function CardPromoBanner({ to, video }) {
  return (
    <Link
      to={to}
      className="block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-200 relative aspect-[5/2] w-full h-full"
    >
      {/* 🎥 Video de fondo */}
      <video
        src={video}
        autoPlay
        muted
        playsInline
        loop
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 🔲 Overlay para contraste */}
      <div className="absolute inset-0  z-10 rounded-xl" />

      {/* Texto opcional o íconos podrían ir aquí si querés */}
    </Link>
  );
}
