export default function CardComunidad({
  id,
  title = "The Founders Club",
  description = "Una comunidad para emprendedores y dueños de negocios.",
}) {
  return (
    <div className="flex items-center gap-4 bg-[#F8F9FB] px-4 min-h-[72px] py-2 justify-between">
      <div className="flex items-center gap-4">
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
          style={{
            backgroundImage: `url(https://cdn.usegalileo.ai/sdxl10/${id}.png)`,
          }}
        ></div>
        <div className="flex flex-col justify-center">
          <p className="text-[#141C24] text-base font-medium leading-normal line-clamp-1">
            {title}
          </p>
          <p className="text-[#3F5374] text-sm font-normal leading-normal line-clamp-2">
            {description}
          </p>
        </div>
      </div>
      <div className="shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128Zm56-12a12,12,0,1,0,12,12A12,12,0,0,0,196,116ZM60,116a12,12,0,1,0,12,12A12,12,0,0,0,60,116Z" />
        </svg>
      </div>
    </div>
  );
}
