import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const languages = [
  { name: "Java", color: "from-orange-400 to-red-500" },
  { name: "C++", color: "from-blue-500 to-indigo-600" },
  { name: "Python", color: "from-yellow-400 to-blue-500" },
  { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
  { name: "C#", color: "from-purple-500 to-indigo-500" },
];

const LanguageScroll = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="relative w-full overflow-hidden mt-12 font-exo">
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className={`absolute left-0 top-0 w-32 h-full ${
            theme === "dark"
              ? "bg-linear-to-r from-gray-900/80 via-gray-900/40 to-transparent"
              : "bg-linear-to-r from-slate-50/80 via-slate-50/40 to-transparent"
          }`}
        ></div>

        <div
          className={`absolute right-0 top-0 w-32 h-full ${
            theme === "dark"
              ? "bg-linear-to-l from-gray-900/80 via-gray-900/40 to-transparent"
              : "bg-linear-to-l from-slate-50/80 via-slate-50/40 to-transparent"
          }`}
        ></div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-3 mb-3 animate-scroll-left">
          {[...languages, ...languages, ...languages, ...languages].map(
            (lang, i) => (
              <div
                key={`row1-${i}`}
                className={`font-exo shrink-0 px-6 py-2 rounded-full bg-linear-to-r ${
                  lang.color
                } text-white font-semibold text-sm sm:text-base whitespace-nowrap transition-shadow ${
                  theme === "dark"
                    ? "shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    : "shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
                }`}
              >
                {lang.name}
              </div>
            )
          )}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-3 animate-scroll-right">
          {[...languages, ...languages, ...languages, ...languages].map(
            (lang, i) => (
              <div
                key={`row2-${i}`}
                className={`font-exo shrink-0 px-6 py-2 rounded-full bg-linear-to-r ${
                  lang.color
                } text-white font-semibold text-sm sm:text-base whitespace-nowrap transition-shadow ${
                  theme === "dark"
                    ? "shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                    : "shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                }`}
              >
                {lang.name}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageScroll;
