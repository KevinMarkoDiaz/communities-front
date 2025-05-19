export default function EventOrganizerCard({ organizer }) {
  if (!organizer) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-[#637588] text-sm">Organizado por</p>
        <p className="text-[#111418] text-base font-bold">{organizer.name}</p>
        <p className="text-[#637588] text-sm">{organizer.description}</p>
      </div>
      {organizer.image && (
        <div
          className="w-24 h-16 rounded-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${organizer.image})` }}
        ></div>
      )}
    </div>
  );
}
