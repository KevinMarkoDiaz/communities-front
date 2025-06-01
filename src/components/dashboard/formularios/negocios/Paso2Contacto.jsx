// src/components/formularios/pasos/Paso2Contacto.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso2Contacto() {
  return (
    <div className="space-y-5">
      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Phone
        </label>
        <Field
          name="contact.phone"
          placeholder="555-1040"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.phone"
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
          name="contact.email"
          type="email"
          placeholder="example@email.com"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.email"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* Website */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Website
        </label>
        <Field
          name="contact.website"
          placeholder="https://your-business.com"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.website"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <h3 className="text-[#141C24] text-lg font-semibold">Social Media</h3>

      {/* Facebook */}
      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Facebook
        </label>
        <Field
          name="contact.socialMedia.facebook"
          placeholder="Facebook ID or link"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.socialMedia.facebook"
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
          name="contact.socialMedia.instagram"
          placeholder="@username"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.socialMedia.instagram"
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
          name="contact.socialMedia.whatsapp"
          placeholder="1234567890"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="contact.socialMedia.whatsapp"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
}
