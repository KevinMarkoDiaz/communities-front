import { Link } from "react-router-dom";

export default function CardEvento({ evento, onDelete }) {
  const { _id, title, description, date, location } = evento;

  return (
    <div className="flex items-center justify-between gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-3 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
          style={{
            backgroundImage: `url(https://cdn.usegalileo.ai/sdxl10/${_id}.png)`,
          }}
        ></div>

        <div className="flex flex-col justify-center">
          <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-[#3F5374] text-sm line-clamp-1">{description}</p>
          <p className="text-[#A0AEC0] text-xs mt-1">
            {new Date(date).toLocaleDateString()} – {location}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <Link
          to={`/dashboard/mis-eventos/${_id}/editar`}
          className="text-sm text-blue-600 hover:underline"
        >
          Editar
        </Link>
        <button
          onClick={() => onDelete(_id)}
          className="text-sm text-red-600 hover:underline"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
