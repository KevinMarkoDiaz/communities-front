import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <footer className="flex justify-center mt-12">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex items-center justify-center p-4 gap-2 flex-wrap">
          {/* ← Botón anterior */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex size-10 items-center justify-center rounded-full border transition ${
              currentPage === 1
                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                : "text-orange-600 border-orange-600 hover:bg-orange-50"
            }`}
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Números de página */}
          {Array.from({ length: totalPages }, (_, i) => {
            const page = i + 1;
            const isActive = currentPage === page;

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`text-sm size-10 flex items-center justify-center rounded-full border font-medium transition ${
                  isActive
                    ? "bg-orange-600 text-white border-orange-600"
                    : "text-orange-600 border-orange-600 hover:bg-orange-50"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* → Botón siguiente */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex size-10 items-center justify-center rounded-full border transition ${
              currentPage === totalPages
                ? "text-gray-300 border-gray-200 cursor-not-allowed"
                : "text-orange-600 border-orange-600 hover:bg-orange-50"
            }`}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
