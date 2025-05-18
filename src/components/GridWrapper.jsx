// src/components/GridWrapper.jsx
export default function GridWrapper({ children }) {
  return <div className="flex flex-wrap gap-3 justify-start">{children}</div>;
}
