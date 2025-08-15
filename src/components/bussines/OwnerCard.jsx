export function OwnerCard({ owner }) {
  if (!owner) return null;

  return (
    <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
      <div
        className="w-14 h-14 bg-center bg-cover rounded-full"
        style={{
          backgroundImage: `url(${
            owner.profileImage || "https://via.placeholder.com/100"
          })`,
        }}
      />
      <div>
        <p className="text-base font-medium">{owner.name}</p>
        <p className="  text-xs text-[#8a7560]">Dueño del comercio</p>
      </div>
    </div>
  );
}
