import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  gridRef,
}) {
  if (totalPages <= 1) return null;

  const scrollToGrid = () => {
    if (gridRef?.current) {
      gridRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      scrollToGrid();
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      scrollToGrid();
    }
  };

  const handlePage = (page) => {
    onPageChange(page);
    scrollToGrid();
  };

  return (
    <footer className="flex justify-center mt-12">
      <div className="flex max-w-[960px] w-full flex-col">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* ← Botón anterior */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`flex size-10 items-center justify-center rounded-full border transition duration-200 ${
              currentPage === 1
                ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50"
                : "text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                onClick={() => handlePage(page)}
                className={`  text-xs size-10 flex items-center justify-center rounded-full border font-medium transition duration-200 ${
                  isActive
                    ? "bg-black text-white border-black"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
            className={`flex size-10 items-center justify-center rounded-full border transition duration-200 ${
              currentPage === totalPages
                ? "text-gray-300 border-gray-200 cursor-not-allowed bg-gray-50"
                : "text-gray-700 border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            }`}
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
