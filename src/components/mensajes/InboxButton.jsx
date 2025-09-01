import { FiMessageCircle } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function InboxButton({ className = "", onClick }) {
  // Extrae las conversaciones desde Redux
  const conversations = useSelector(
    (state) => state.conversations?.items || []
  );

  // Cuenta cuántas conversaciones tienen un último mensaje NO leído
  const unreadCount = conversations.filter(
    (conv) => conv.lastMessageIsRead === false
  ).length;
  return (
    <Link
      to="/dashboard/inbox"
      onClick={onClick}
      className={`relative p-2 hover:text-orange-500 transition-colors duration-200 ${className}`}
      aria-label="Mensajes"
    >
      <FiMessageCircle className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 w-4 h-4 flex items-center justify-center text-white text-[10px] rounded-full leading-tight shadow-md">
          {unreadCount}
        </span>
      )}
    </Link>
  );
}
