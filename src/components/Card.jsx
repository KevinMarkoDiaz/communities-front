export default function Card({ title, description }) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300">
        <h3 className="text-xl font-semibold text-blue-600">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
      </div>
    )
  }
  