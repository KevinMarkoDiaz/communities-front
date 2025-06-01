// src/components/formularios/pasos/Paso3Ubicacion.jsx
import { Field, ErrorMessage } from "formik";

export default function Paso3Ubicacion() {
  return (
    <div className="space-y-5">
      <h3 className="text-[#141C24] text-lg font-semibold">Business Address</h3>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Address
        </label>
        <Field
          name="location.address"
          placeholder="322 Peace St"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="location.address"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          City
        </label>
        <Field
          name="location.city"
          placeholder="Lewisville"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="location.city"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          State
        </label>
        <Field
          name="location.state"
          placeholder="TX"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="location.state"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Zip Code
        </label>
        <Field
          name="location.zipCode"
          placeholder="75067"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="location.zipCode"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#141C24] mb-1">
          Country
        </label>
        <Field
          name="location.country"
          placeholder="USA"
          className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
        />
        <ErrorMessage
          name="location.country"
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      <h3 className="text-[#141C24] text-lg font-semibold">
        Coordinates (optional)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#141C24] mb-1">
            Latitude
          </label>
          <Field
            name="location.coordinates.lat"
            placeholder="33.042222"
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
            type="number"
            step="any"
          />
          <ErrorMessage
            name="location.coordinates.lat"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#141C24] mb-1">
            Longitude
          </label>
          <Field
            name="location.coordinates.lng"
            placeholder="-96.994222"
            className="form-input w-full bg-[#F8F9FB] border border-[#D4DBE8] rounded-xl h-14 px-4 placeholder:text-[#3F5374]"
            type="number"
            step="any"
          />
          <ErrorMessage
            name="location.coordinates.lng"
            component="div"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </div>
    </div>
  );
}
