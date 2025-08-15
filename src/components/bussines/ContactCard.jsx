import { FaEnvelope, FaPhone, FaGlobe } from "react-icons/fa";

export function ContactCard({ contact }) {
  if (!contact) return null;

  const { phone, email, website } = contact;

  const InfoItem = ({ label, value, href, Icon }) => (
    <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
      <div className="flex items-center justify-center rounded-lg bg-gray-100 shrink-0 size-12">
        {Icon && <Icon size={20} className="text-gray-600" />}
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-gray-900 text-base font-medium leading-normal line-clamp-1">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {value}
            </a>
          ) : (
            value
          )}
        </p>
        <p className="text-gray-500  text-xs font-normal leading-normal line-clamp-1">
          {label}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <h2 className="text-gray-900 text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Contacto
      </h2>
      <div className="flex flex-col">
        {email && (
          <InfoItem
            Icon={FaEnvelope}
            label="Correo electrónico"
            value={email}
            href={`mailto:${email}`}
          />
        )}
        {phone && (
          <InfoItem
            Icon={FaPhone}
            label="Teléfono"
            value={phone}
            href={`tel:${phone}`}
          />
        )}
        {website && (
          <InfoItem
            Icon={FaGlobe}
            label="Sitio web"
            value={website}
            href={website}
          />
        )}
      </div>
    </div>
  );
}
