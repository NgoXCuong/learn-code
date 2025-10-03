import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const Output = ({ output }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-lg font-mono ${
        isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <h3 className="font-bold mb-2">Output:</h3>
      <pre className="whitespace-pre-wrap">{output || "// Chưa chạy code"}</pre>
    </div>
  );
};

export default Output;
