import React, { useContext } from "react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none
        ${isDark ? "bg-gray-700" : "bg-yellow-400"}`}
    >
      {/* Circle */}
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transform transition-transform duration-300
          ${isDark ? "translate-x-8" : "translate-x-0"}`}
      >
        {isDark ? (
          <Moon size={16} className="text-gray-800" />
        ) : (
          <Sun size={16} className="text-yellow-500" />
        )}
      </span>
    </button>
  );
};

export default DarkModeToggle;
