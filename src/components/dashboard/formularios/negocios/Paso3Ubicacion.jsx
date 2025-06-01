// src/components/formularios/pasos/Paso3Ubicacion.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso3Ubicacion() {
  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">
        Dirección del negocio
      </h3>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Dirección
        </label>
        <Field
          name="ubicacion.direccion"
          placeholder="322 Calle Paz"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="ubicacion.direccion"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Ciudad
        </label>
        <Field
          name="ubicacion.ciudad"
          placeholder="Lewisville"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="ubicacion.ciudad"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Estado
        </label>
        <Field
          name="ubicacion.estado"
          placeholder="TX"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="ubicacion.estado"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Código postal
        </label>
        <Field
          name="ubicacion.codigoPostal"
          placeholder="75067"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="ubicacion.codigoPostal"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          País
        </label>
        <Field
          name="ubicacion.pais"
          placeholder="USA"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="ubicacion.pais"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <h3 className="text-[#141C24] text-lg font-semibold">
        Coordenadas (opcional)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#141C24] mb-1">
            Latitud
          </label>
          <Field
            name="ubicacion.coordenadas.lat"
            placeholder="33.042222"
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
          />
          <ErrorMessage
            name="ubicacion.coordenadas.lat"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#141C24] mb-1">
            Longitud
          </label>
          <Field
            name="ubicacion.coordenadas.lng"
            placeholder="-96.994222"
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
          />
          <ErrorMessage
            name="ubicacion.coordenadas.lng"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
}
