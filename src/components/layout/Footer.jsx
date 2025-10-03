import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // import context

const Footer = () => {
  const { theme } = useContext(ThemeContext); // lấy theme hiện tại

  return (
    <footer
      className={`py-3 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-900 dark:text-gray-400">
          © 2025 CodePulse. Được xây dựng với ❤️ tại Việt Nam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
