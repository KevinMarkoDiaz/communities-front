// src/components/formularios/pasos/Paso2Contacto.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso2Contacto() {
  return (
    <div className="space-y-5">
      {/* Teléfono */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Teléfono
        </label>
        <Field
          name="contacto.telefono"
          placeholder="555-1040"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.telefono"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Email
        </label>
        <Field
          name="contacto.email"
          type="email"
          placeholder="ejemplo@correo.com"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Sitio Web
        </label>
        <Field
          name="contacto.website"
          placeholder="https://tu-negocio.com"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.website"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <h3 className="text-[#141C24] text-lg font-semibold">Redes Sociales</h3>

      {/* Facebook */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Facebook
        </label>
        <Field
          name="contacto.redes.facebook"
          placeholder="Facebook ID o enlace"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.redes.facebook"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Instagram */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Instagram
        </label>
        <Field
          name="contacto.redes.instagram"
          placeholder="@nombreusuario"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.redes.instagram"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          WhatsApp
        </label>
        <Field
          name="contacto.redes.whatsapp"
          placeholder="1234567890"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contacto.redes.whatsapp"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
