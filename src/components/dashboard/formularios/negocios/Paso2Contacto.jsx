import { Field, ErrorMessage } from "formik";

export default function Paso2Contacto() {
  return (
    <div className="space-y-5">
      {/* Teléfono */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Teléfono
        </label>
        <Field
          name="contact.phone"
          placeholder="555-1040"
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.phone"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Email
        </label>
        <Field
          name="contact.email"
          type="email"
          placeholder="example@email.com"
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.email"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Sitio Web
        </label>
        <Field
          name="contact.website"
          placeholder="https://your-business.com"
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.website"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>

      <h3 className="text-white text-lg font-semibold">Redes Sociales</h3>

      {/* Facebook */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Facebook
        </label>
        <Field
          name="contact.socialMedia.facebook"
          placeholder="https://..."
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.socialMedia.facebook"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>

      {/* Instagram */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          Instagram
        </label>
        <Field
          name="contact.socialMedia.instagram"
          placeholder="https://..."
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.socialMedia.instagram"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block  text-xs font-medium text-white mb-1">
          WhatsApp
        </label>
        <Field
          name="contact.socialMedia.whatsapp"
          placeholder="1234567890"
          className="form-input w-full bg-white/10 border border-white/30 rounded-lg h-12 px-4 placeholder:text-gray-300 focus:outline-none"
        />
        <ErrorMessage
          name="contact.socialMedia.whatsapp"
          component="div"
          className="text-red-500  text-xs mt-1"
        />
      </div>
    </div>
  );
}
