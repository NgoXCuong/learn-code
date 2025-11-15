import React, { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code, Sparkles, Zap } from "lucide-react";
import { ThemeContext } from "@/context/ThemeContext";

const languages = [
  { name: "Java", color: "from-orange-400 to-red-500" },
  { name: "C++", color: "from-blue-500 to-indigo-600" },
  { name: "Python", color: "from-yellow-400 to-blue-500" },
  { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
  { name: "C#", color: "from-purple-500 to-indigo-500" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 2,
        color:
          theme === "dark"
            ? Math.random() > 0.5
              ? "rgba(168, 85, 247, 0.8)"
              : "rgba(34, 211, 238, 0.8)"
            : Math.random() > 0.5
            ? "rgba(147, 51, 234, 0.6)"
            : "rgba(6, 182, 212, 0.6)",
      });
    }

    function animate() {
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(15, 23, 42, 0.05)"
          : "rgba(248, 250, 252, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 25;
        ctx.shadowColor = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <section className="relative overflow-hidden h-full flex items-center transition-colors duration-500 py-20">
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
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

            {/* Description */}
            <p
              className={`text-lg sm:text-xl mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-colors duration-300 ${
                theme === "dark" ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Nền tảng học lập trình hiện đại với AI dự đoán cảm xúc real-time,
              <br className="hidden sm:block" />
              <span
                className={
                  theme === "dark"
                    ? "text-cyan-300 font-medium"
                    : "text-cyan-700 font-semibold"
                }
              >
                giúp bạn học code hiệu quả và thú vị hơn bao giờ hết
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 mb-12">
              <button
                onClick={() => navigate("/courses")}
                className={`group relative w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100 ${
                  theme === "dark"
                    ? "bg-linear-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                    : "bg-linear-to-r from-purple-600 to-cyan-600 text-white hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
                }`}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2 cursor-pointer">
                  <BookOpen className="w-5 h-5" />
                  Bắt đầu học ngay
                </span>
              </button>

              <button
                onClick={() => navigate("/compiler")}
                className={`group relative w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 active:scale-95 ${
                  theme === "dark"
                    ? "bg-slate-800/50 backdrop-blur-sm border-2 border-purple-500/30 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-800/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    : "bg-white/70 backdrop-blur-sm border-2 border-purple-300 text-slate-700 hover:border-cyan-500 hover:bg-white hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                }`}
              >
                <span className="relative flex items-center justify-center gap-2 cursor-pointer">
                  <Code className="w-5 h-5" />
                  Thử compiler
                </span>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Holographic frame */}
              <div className="absolute -inset-4 bg-linear-to-r from-cyan-500/20 via-fuchsia-500/20 to-cyan-500/20 blur-2xl animate-pulse"></div>

              {/* Screen Container */}
              <div className="relative">
                {/* Main Screen */}
                <div className="relative w-full h-90 rounded-lg bg-slate-900/90 backdrop-blur-md border-2 border-cyan-400/60 shadow-[0_0_50px_rgba(34,211,238,0.5),inset_0_0_30px_rgba(34,211,238,0.2)] overflow-hidden">
                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-cyan-500/20 to-transparent border-b border-cyan-400/30 flex items-center justify-between px-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.8)]"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                    </div>
                    <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
                      AI_LEARN.exe
                    </div>
                  </div>

                  {/* Code content with enhanced styling */}
                  <div className="p-8 pt-16 space-y-3 font-mono text-sm">
                    <div className="flex gap-2">
                      <span className="text-fuchsia-400">const</span>
                      <span className="text-cyan-300">learnAI</span>
                      <span className="text-slate-400">=</span>
                      <span className="text-emerald-400">"intelligent"</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-fuchsia-400">function</span>
                      <span className="text-yellow-300">detectEmotion</span>
                      <span className="text-slate-400">(user) {"{"}</span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span className="text-cyan-300">return</span>
                      <span className="text-pink-400">AI.analyze</span>
                      <span className="text-slate-400">(user)</span>
                    </div>
                    <div className="text-slate-400">{"}"}</div>
                    <div className="mt-4 flex gap-2">
                      <span className="text-fuchsia-400">class</span>
                      <span className="text-yellow-300">SmartLearning</span>
                      <span className="text-slate-400">{"{"}</span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span className="text-cyan-300">adapt</span>
                      <span className="text-slate-400">() {"{"}</span>
                    </div>
                    <div className="flex gap-2 pl-12">
                      <span className="text-emerald-400">this</span>
                      <span className="text-slate-400">.optimize()</span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span className="text-slate-400">{"}"}</span>
                    </div>
                    <div className="text-slate-400">{"}"}</div>
                  </div>

                  {/* Glowing cursor */}
                  <div className="absolute bottom-8 right-8 w-2 h-5 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] animate-pulse"></div>

                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(34,211,238,0.03)_50%)] bg-size-[100%_4px] pointer-events-none"></div>
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-fuchsia-400 shadow-[0_0_10px_rgba(217,70,239,0.6)]"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Language tags */}
        <div className="relative w-full overflow-hidden mt-16">
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div
              className={`absolute left-0 top-0 w-48 h-full ${
                theme === "dark"
                  ? "bg-linear-to-r from-gray-900 via-gray-900/80 to-transparent"
                  : "bg-linear-to-r from-slate-50 via-slate-100/80 to-transparent"
              }`}
            ></div>
            <div
              className={`absolute right-0 top-0 w-48 h-full ${
                theme === "dark"
                  ? "bg-linear-to-l from-gray-900 via-gray-900/80 to-transparent"
                  : "bg-linear-to-l from-slate-50 via-slate-100/80 to-transparent"
              }`}
            ></div>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex gap-3 mb-3 animate-scroll-left">
              {[...languages, ...languages, ...languages, ...languages].map(
                (lang, i) => (
                  <div
                    key={`row1-${i}`}
                    className={`shrink-0 px-6 py-2.5 rounded-full bg-linear-to-r ${
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
                    className={`shrink-0 px-6 py-2.5 rounded-full bg-linear-to-r ${
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
      </div>
    </section>
  );
};

export default HeroSection;
