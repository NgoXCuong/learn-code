import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const HeroContent = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="text-center lg:text-left">
      <h1 className="  font-extrabold text-5xl md:text-6xl  leading-tight mb-8">
        <span
          className={`block mb-3 transition-all duration-300 ${
            theme === "dark"
              ? "text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              : "text-slate-900 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          }`}
        >
          Học lập trình
        </span>

        <span
          className={`block bg-linear-to-r bg-clip-text text-transparent transition-all duration-300 ${
            theme === "dark"
              ? "from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]"
              : "from-purple-600 via-pink-500 to-cyan-600"
          }`}
        >
          với AI thông minh
        </span>
      </h1>

      <p
        className={`  text-lg sm:text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300 ${
          theme === "dark" ? "text-slate-300" : "text-slate-700"
        }`}
      >
        Nền tảng học lập trình hiện đại với AI dự đoán cảm xúc
        <br className="hidden sm:block" />
        <span
          className={
            theme === "dark"
              ? "text-cyan-300 font-semibold"
              : "text-cyan-700 font-semibold"
          }
        >
          giúp bạn học code hiệu quả và thú vị hơn bao giờ hết
        </span>
      </p>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6 mb-6">
        <button
          onClick={() => navigate("/courses")}
          className={`group relative w-full sm:w-auto px-8 py-3 rounded-lg   font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100 ${
            theme === "dark"
              ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
              : "bg-linear-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
          }`}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <span className="  font-bold relative flex items-center justify-center gap-2 cursor-pointer">
            <BookOpen className="w-5 h-5" />
            Bắt đầu học ngay
          </span>
        </button>

        <button
          onClick={() => navigate("/compiler")}
          className={`group relative w-full sm:w-auto px-8 py-3 rounded-lg   font-semibold text-lg overflow-hidden transition-all duration-300 active:scale-95 ${
            theme === "dark"
              ? "bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              : "bg-white/70 backdrop-blur-sm border-2 border-purple-300 text-slate-700 hover:border-cyan-500 hover:bg-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          }`}
        >
          <span className="  font-bold relative flex items-center justify-center gap-2 cursor-pointer">
            <Code className="w-5 h-5" />
            Thử compiler
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroContent;
