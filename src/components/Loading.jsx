import { useState, useEffect } from "react";
import spin1 from "../assets/spin1.svg";
import spin2 from "../assets/spin2.svg";
import spin3 from "../assets/spin3.svg";
import spin4 from "../assets/spin4.svg";
import spin5 from "../assets/spin5.svg";

const icons = [spin1, spin2, spin3, spin4, spin5];

export default function Loading() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % icons.length);
    }, 150); // cambia cada 300ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <img
        src={icons[current]}
        alt="Loading..."
        className="w-26 h-26 animate-pulse"
      />
    </div>
  );
}
