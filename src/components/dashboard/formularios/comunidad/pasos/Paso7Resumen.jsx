import { useFormikContext } from "formik";

export default function Paso7Resumen() {
  const { values } = useFormikContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-green-200">
        Revisión final de la comunidad
      </h3>

      <p className="  text-xs text-gray-100">
        Asegúrate de que toda la información sea correcta antes de crear la
        comunidad. Aquí tienes un resumen de los datos que has ingresado:
      </p>

      <div className="bg-black/20 p-4 rounded-xl  text-xs space-y-2 ">
        <p>
          <strong>Nombre:</strong> {values.name}
        </p>
        <p>
          <strong>Descripción:</strong> {values.description}
        </p>
        <p>
          <strong>Idioma:</strong> {values.language || "es"}
        </p>
        <p>
          <strong>Tipo:</strong> {values.tipo}
        </p>
        <p>
          <strong>Slug:</strong>{" "}
          {values.slug || "(se generará automáticamente)"}
        </p>

        {values.contact?.email && (
          <p>
            <strong>Email:</strong> {values.contact.email}
          </p>
        )}
        {values.contact?.phone && (
          <p>
            <strong>Teléfono:</strong> {values.contact.phone}
          </p>
        )}
        {values.contact?.website && (
          <p>
            <strong>Sitio web:</strong> {values.contact.website}
          </p>
        )}

        <p>
          <strong>Ubicación:</strong>
        </p>
        <ul className="ml-4 list-disc">
          <li>
            {values.location?.address}, {values.location?.city}
          </li>
          <li>
            {values.location?.state}, {values.location?.zipCode},{" "}
            {values.location?.country}
          </li>
        </ul>

        {values.tags?.length > 0 && (
          <p>
            <strong>Etiquetas:</strong> {values.tags.join(", ")}
          </p>
        )}

        {values.isVerified && (
          <p className="text-green-600 font-medium">
            ✅ Comunidad marcada como verificada
          </p>
        )}

        {values.culturalResources?.length > 0 && (
          <>
            <p>
              <strong>Recursos culturales:</strong>
            </p>
            <ul className="ml-4 list-disc">
              {values.culturalResources.map((res, idx) => (
                <li key={idx}>{res}</li>
              ))}
            </ul>
          </>
        )}

        {values.usefulLinks?.length > 0 && (
          <>
            <p>
              <strong>Enlaces útiles:</strong>
            </p>
            <ul className="ml-4 list-disc">
              {values.usefulLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="  text-xs text-gray-100">
        Si todo está correcto, haz clic en <strong>Crear comunidad</strong> para
        finalizar.
      </p>
    </div>
  );
}
