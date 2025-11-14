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
                <span className="relative flex items-center justify-center gap-2">
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
                <span className="relative flex items-center justify-center gap-2">
                  <Code className="w-5 h-5" />
                  Thử compiler
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Code display */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Laptop container */}
              <div className="relative">
                {/* Screen */}
                <div
                  className={`relative w-full h-80 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-linear-to-br from-slate-800/90 to-slate-900/90 border-cyan-400/40 shadow-[0_0_60px_rgba(34,211,238,0.4)]"
                      : "bg-linear-to-br from-white/90 to-slate-100/90 border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                  }`}
                >
                  {/* Window controls */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  {/* Code content */}
                  <div className="p-8 pt-12 space-y-3 font-mono text-sm">
                    <div className="flex gap-2">
                      <span
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }
                      >
                        const
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-cyan-300" : "text-cyan-600"
                        }
                      >
                        learnAI
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        =
                      </span>
                      <span
                        className={
                          theme === "dark"
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }
                      >
                        "intelligent"
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }
                      >
                        function
                      </span>
                      <span
                        className={
                          theme === "dark"
                            ? "text-yellow-300"
                            : "text-yellow-600"
                        }
                      >
                        detectEmotion
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        (user) {"{"}
                      </span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span
                        className={
                          theme === "dark" ? "text-cyan-300" : "text-cyan-600"
                        }
                      >
                        return
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-pink-400" : "text-pink-600"
                        }
                      >
                        AI.analyze
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        (user)
                      </span>
                    </div>
                    <div
                      className={
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }
                    >
                      {"}"}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <span
                        className={
                          theme === "dark"
                            ? "text-purple-400"
                            : "text-purple-600"
                        }
                      >
                        class
                      </span>
                      <span
                        className={
                          theme === "dark"
                            ? "text-yellow-300"
                            : "text-yellow-600"
                        }
                      >
                        SmartLearning
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        {"{"}
                      </span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span
                        className={
                          theme === "dark" ? "text-cyan-300" : "text-cyan-600"
                        }
                      >
                        adapt
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        () {"{"}
                      </span>
                    </div>
                    <div className="flex gap-2 pl-12">
                      <span
                        className={
                          theme === "dark"
                            ? "text-emerald-400"
                            : "text-emerald-600"
                        }
                      >
                        this
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        .optimize()
                      </span>
                    </div>
                    <div className="flex gap-2 pl-6">
                      <span
                        className={
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }
                      >
                        {"}"}
                      </span>
                    </div>
                    <div
                      className={
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }
                    >
                      {"}"}
                    </div>
                  </div>

                  {/* Glowing cursor */}
                  <div
                    className={`absolute bottom-8 right-8 w-2 h-5 animate-pulse ${
                      theme === "dark"
                        ? "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        : "bg-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
                    }`}
                  ></div>
                </div>

                {/* Laptop base */}
                <div
                  className={`relative mt-2 h-6 rounded-b-2xl border-t-0 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-linear-to-b from-slate-800 to-slate-900 border border-purple-500/30"
                      : "bg-linear-to-b from-slate-200 to-slate-300 border border-purple-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full ${
                      theme === "dark" ? "bg-slate-700" : "bg-slate-400"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Connecting lines */}
              <svg className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-40 opacity-30 pointer-events-none">
                <line
                  x1="80"
                  y1="0"
                  x2="40"
                  y2="80"
                  stroke="url(#gradient1)"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <line
                  x1="80"
                  y1="0"
                  x2="120"
                  y2="80"
                  stroke="url(#gradient2)"
                  strokeWidth="2"
                  className="animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={theme === "dark" ? "#a855f7" : "#9333ea"}
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      stopColor={theme === "dark" ? "#22d3ee" : "#06b6d4"}
                      stopOpacity="0.2"
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor={theme === "dark" ? "#22d3ee" : "#06b6d4"}
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      stopColor={theme === "dark" ? "#a855f7" : "#9333ea"}
                      stopOpacity="0.2"
                    />
                  </linearGradient>
                </defs>
              </svg>
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
