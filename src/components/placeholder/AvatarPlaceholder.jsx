export default function AvatarPlaceholder({ size = "md" }) {
  // Tailwind sizes por defecto
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-20 h-20",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 border border-gray-300 shadow-sm`}
    >
      <svg
        className="w-6 h-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zM12 14c-3.314 0-6 2.686-6 6v1h12v-1c0-3.314-2.686-6-6-6z" />
      </svg>
    </div>
  );
}
