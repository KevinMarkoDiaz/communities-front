// src/styles/customSelectStyles.js
export const customSelectStylesForm = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderColor: state.isFocused ? "#fb923c" : "rgba(255,255,255,0.2)",
    boxShadow: state.isFocused ? "0 0 0 1px #fb923c" : "none",
    "&:hover": { borderColor: "#fb923c" },
    borderRadius: "0.5rem",
    minHeight: "3rem",
    cursor: "pointer", // 👈 Esto hace que el cursor sea tipo manito
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: "0.5rem",
    zIndex: 20,
    padding: "0.5rem", // 👈 padding interno en el dropdown
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "rgba(251, 146, 60, 0.2)"
      : "transparent",
    color: "white",
    cursor: "pointer",
    borderRadius: "0.375rem",
    padding: "0.5rem 0.75rem", // extra padding en cada opción si quieres
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "rgba(255,255,255,0.4)",
  }),
  input: (provided) => ({
    ...provided,
    color: "white",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "rgba(255,255,255,0.6)",
    "&:hover": {
      color: "white",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
