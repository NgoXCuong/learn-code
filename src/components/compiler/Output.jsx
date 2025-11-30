import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { SquareTerminal } from "lucide-react"; // thêm icon console

const Output = ({ output }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      className={`p-4 rounded-sm font-mono h-full overflow-auto flex flex-col ${
        isDark ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header với icon */}
      <div className="flex items-center gap-2 mb-2  ">
        <SquareTerminal className="w-5 h-5 text-purple-500 " />
        <h3 className="font-bold text-lg">Output:</h3>
      </div>

      <pre className="whitespace-pre-wrap text-sm">
        {output || "// Chưa chạy code"}
      </pre>
    </div>
  );
};

export default Output;
