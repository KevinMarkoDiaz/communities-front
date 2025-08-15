export function CommunityTags({ tags }) {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, idx) => (
        <div
          key={idx}
          className="flex items-center h-8 px-4 rounded-full bg-[#f5f2f0] text-[#181411]  text-xs font-medium"
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
