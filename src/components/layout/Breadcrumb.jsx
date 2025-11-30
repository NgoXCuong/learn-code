import React, { useContext } from "react";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const textColor =
    theme === "dark"
      ? "text-gray-300 hover:text-indigo-400  "
      : "text-gray-900 hover:text-indigo-600  ";

  const lastItem = items[items.length - 1];

  return (
    <nav className="flex items-center space-x-1 sm:space-x-2 text-sm mb-6 transition-colors  ">
      {/* --- Mobile --- */}
      <div className="flex items-center sm:hidden space-x-1">
        {/* Icon Home */}
        <button
          onClick={() => navigate("/")}
          className={`flex items-center cursor-pointer ${textColor}`}
        >
          <Home className="w-4 h-4" />
        </button>

        <ChevronRight className="w-4 h-4 text-gray-400" />

        {items.length > 2 && (
          <>
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </>
        )}

        <span
          className={`font-medium truncate max-w-[120px]   ${
            theme === "dark" ? "text-gray-200" : "text-gray-900"
          }`}
        >
          {lastItem.label}
        </span>
      </div>

      {/* --- Desktop --- */}
      <div className="hidden sm:flex items-center space-x-2  ">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight
                className={`w-4 h-4 ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              />
            )}

            {item.href ? (
              <button
                onClick={() => navigate(item.href)}
                className={`flex items-center gap-1 cursor-pointer ${textColor}`}
              >
                {index === 0 ? <Home className="w-4 h-4" /> : null}
                {item.label}
              </button>
            ) : (
              <span
                className={`font-medium   ${
                  theme === "dark" ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
