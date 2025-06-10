export function BusinessCard({
  imageUrl,
  categoryName,
  businessName,
  businessDescription,
  highlightText,
}) {
  return (
    <div className="p-4 @container">
      <div className="flex flex-col items-stretch justify-start rounded-xl bg-white shadow-[0_0_4px_rgba(0,0,0,0.1)] @xl:flex-row @xl:items-start">
        <div
          className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 px-4 @xl:px-4">
          <p className="text-[#8a7460] text-sm font-normal leading-normal">
            {categoryName}
          </p>
          <p className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">
            {businessName}
          </p>
          <div className="flex items-end gap-3 justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[#8a7460] text-base font-normal leading-normal">
                {businessDescription}
              </p>
              <p className="text-[#8a7460] text-base font-normal leading-normal">
                {highlightText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
