import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

export function BusinessCard({
  imageUrl,
  categoryName,
  businessName,
  businessDescription,
  highlightText,
  sm,
}) {
  return (
    <div className="">
      <div className="flex flex-row items-stretch bg-white rounded-xs  mx-2 shadow-lg  transition-all overflow-hidden">
        {/* Imagen cuadrada a la izquierda */}
        <div
          className="w-[30vw] md:w-40 aspect-square bg-center bg-cover bg-no-repeat shrink-0"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>

        {/* Contenido */}
        <div className="flex flex-col justify-between flex-grow gap-2 px-4 py-3">
          <p className="text-xs md:  text-xs text-gray-500 font-medium">
            {categoryName}
          </p>
          <p className="  text-lg font-semibold text-gray-900">
            {businessName}
          </p>
          {sm && (
            <div className="bg-white flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex py-2">
                {sm?.instagram && (
                  <div className="flex items-center gap-4 bg-white px-4 lg:min-h-[72px] ">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 md:size-10">
                      <a
                        href={sm?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="text-pink-600 size-6" />
                      </a>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center">
                      <p className="text-gray-500 text-xs">Instagram</p>
                    </div>
                  </div>
                )}

                {sm?.facebook && (
                  <div className="flex items-center gap-4 bg-white lg:px-4 lg:min-h-[72px] ">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 md:size-10">
                      <a
                        href={sm?.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="text-blue-600 size-6 " />
                      </a>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center">
                      <p className="text-gray-500 text-xs">Facebook</p>
                    </div>
                  </div>
                )}

                {sm?.twitter && (
                  <div className="flex items-center gap-4 bg-white lg:px-4 lg:min-h-[72px] ">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 md:size-10">
                      <a
                        href={sm?.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="text-sky-500 size-6" />
                      </a>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center">
                      <p className="text-gray-500 text-xs">Twitter</p>
                    </div>
                  </div>
                )}

                {sm?.youtube && (
                  <div className="flex items-center gap-4 bg-white px-4 lg:min-h-[72px] ">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 md:size-10">
                      <a
                        href={sm?.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaYoutube className="text-red-600 size-6" />
                      </a>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center">
                      <p className="text-gray-500 text-xs">YouTube</p>
                    </div>
                  </div>
                )}

                {sm?.whatsapp && (
                  <div className="flex items-center gap-4 bg-white px-4 lg:min-h-[72px] ">
                    <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 md:size-10">
                      <a
                        href={`https://wa.me/${sm?.whatsapp?.replace(
                          /[^\d]/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaWhatsapp className="text-green-500 size-6" />
                      </a>
                    </div>
                    <div className="hidden lg:flex flex-col justify-center">
                      <p className="text-gray-500 text-xs">WhatsApp</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col gap-1 text-xs text-gray-600">
            <p className="line-clamp-2">{businessDescription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
