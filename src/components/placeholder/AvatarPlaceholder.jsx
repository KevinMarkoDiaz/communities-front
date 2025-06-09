export default function AvatarPlaceholder() {
  return (
    <div className="w-10 h-10 rounded-2xl bg-gray-200 flex items-center justify-center flex-shrink-0">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
          10-4.48 10-10S17.52 2 12 2zm0 18c-1.85 0-3.55-.63-4.9-1.69.01-2.5 3.27-3.88 4.9-3.88
          1.63 0 4.89 1.38 4.9 3.88C15.55 19.37 13.85 20 12 20zm0-8a3 3 0 100-6 3 3 0 000 6z"
        />
      </svg>
    </div>
  );
}
