// src/styles/customSelectStylesRefinado.js

export const customSelectStylesRefinado = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fcfcfcff", // gris claro (bg-neutral-100)
    borderColor: state.isFocused ? "#16dbf9ff" : "#16eaf9ff", // azul o gris
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(22, 151, 249, 0.17)"
      : "0 0 0 2px rgba(22, 211, 249, 0.15)",
    borderRadius: "0.5rem",
    minHeight: "2.5rem",
    fontSize: "0.75rem", // text-xs
    paddingLeft: "0.25rem",
    paddingRight: "0.25rem",
    transition: "all 0.2s ease-in-out",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "#f9fafb", // gris más claro
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
    padding: "0.25rem",
    zIndex: 30,
    fontSize: "0.75rem",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#16f99e9c" : "transparent", // hover gris
    color: "#111827", // texto oscuro
    cursor: "pointer",
    borderRadius: "0.375rem",
    padding: "0.5rem 0.75rem",
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "#111827", // texto visible
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#50545aff", // gris visible
    fontStyle: "italic",
  }),

  input: (provided) => ({
    ...provided,
    color: "#111827",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "#9ca3af",
    "&:hover": {
      color: "#6b7280",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menuList: (provided) => ({
    ...provided,
    maxHeight: "220px",
    overflowY: "auto",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eee4a0ff",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};
