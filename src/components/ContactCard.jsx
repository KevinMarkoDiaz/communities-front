export function ContactCard({ contact }) {
  if (!contact) return null;

  const { phone, email, website } = contact;

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="text-lg font-bold mb-2">Contacto</h3>
      <ul className="text-sm text-[#181411] space-y-1">
        {email && (
          <li>
            <strong>Email:</strong> {email}
          </li>
        )}
        {phone && (
          <li>
            <strong>Teléfono:</strong> {phone}
          </li>
        )}
        {website && (
          <li>
            <strong>Sitio web:</strong>{" "}
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {website}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
}
