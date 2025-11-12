import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Sparkles } from "lucide-react";
import bookIcon from "../../assets/closed-book.svg";
import laptopIcon from "../../assets/laptop-icon.svg";
import rocketIcon from "../../assets/rocket-icon.svg";

const languages = [
  { name: "Java", color: "from-orange-400 to-red-500" },
  { name: "C++", color: "from-blue-500 to-indigo-600" },
  { name: "Python", color: "from-yellow-400 to-blue-500" },
  { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
  { name: "C#", color: "from-purple-500 to-indigo-500" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 px-4 sm:py-26 md:py-20 lg:py-24 min-h-[85vh] flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-purple-50/30 to-teal-50/50 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Book icon with glow - Left side */}
        <div className="absolute top-1/4 left-8 sm:left-16 lg:left-32 transform -translate-y-1/2">
          <div className="absolute inset-0 bg-indigo-500/20 blur-[80px] rounded-full animate-pulse"></div>
          <img
            src={bookIcon}
            alt="Book"
            className="hidden md:block relative w-40 lg:w-56 opacity-70 animate-float"
            style={{ animationDuration: "6s" }}
          />
        </div>

        {/* Laptop icon with glow - Right side */}
        <div className="absolute top-1/3 right-8 sm:right-16 lg:right-32 transform -translate-y-1/2">
          <div
            className="absolute inset-0 bg-purple-500/20 blur-[80px] rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <img
            src={laptopIcon}
            alt="Laptop"
            className="hidden md:block relative w-40 lg:w-56 opacity-70 animate-float"
            style={{ animationDuration: "7s", animationDelay: "0.5s" }}
          />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-indigo-300/10 dark:bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6 sm:mb-8">
          <span
            className="block text-gray-900 dark:text-white opacity-0 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Học lập trình
          </span>
          <span
            className="block bg-linear-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent opacity-0 animate-fadeIn mt-2"
            style={{ animationDelay: "0.4s" }}
          >
            với AI thông minh
          </span>
        </h1>

        {/* Description */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-10 sm:mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fadeIn font-medium"
          style={{ animationDelay: "0.6s" }}
        >
          Nền tảng học lập trình hiện đại với AI dự đoán cảm xúc real-time,
          <br className="hidden sm:block" />
          giúp bạn học code hiệu quả và thú vị hơn bao giờ hết.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 sm:mb-20 opacity-0 animate-fadeIn"
          style={{ animationDelay: "0.8s" }}
        >
          <Button
            onClick={() => navigate("/courses")}
            className="w-full sm:w-auto bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-10 py-7 rounded-2xl text-lg font-bold transition-all duration-300 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transform hover:-translate-y-1 hover:scale-105"
          >
            <BookOpen className="w-6 h-6 mr-3" />
            Bắt đầu học ngay
          </Button>

          <Button
            onClick={() => navigate("/compiler")}
            variant="outline"
            className="w-full sm:w-auto bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 px-10 py-7 rounded-2xl text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Code className="w-6 h-6 mr-3" />
            Thử compiler
          </Button>
        </div>

        {/* Language tags - Marquee effect */}
        <div className="relative w-full overflow-hidden select-none">
          {/* Fade edges */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute left-0 top-0 w-24 sm:w-40 h-full bg-linear-to-r from-white dark:from-gray-900 to-transparent"></div>
            <div className="absolute right-0 top-0 w-24 sm:w-40 h-full bg-linear-to-l from-white dark:from-gray-900 to-transparent"></div>
          </div>

          {/* Row 1 - Moving right */}
          <div className="flex gap-3 sm:gap-4 mb-4 animate-marquee">
            {[...languages, ...languages, ...languages].map((lang, i) => (
              <div
                key={`row1-${i}`}
                className={`shrink-0 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-linear-to-r ${lang.color} text-white font-bold shadow-lg text-base sm:text-lg backdrop-blur-sm`}
              >
                {lang.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
