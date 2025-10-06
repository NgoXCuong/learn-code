import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { BookOpen, Code } from "lucide-react";
import bookIcon from "../../assets/closed-book.svg";
import laptopIcon from "../../assets/laptop-icon.svg";

const languages = [
  { name: "Java", color: "from-orange-400 to-red-500" },
  { name: "C++", color: "from-blue-500 to-indigo-600" },
  { name: "Python", color: "from-yellow-400 to-blue-500" },
  { name: "JavaScript", color: "from-yellow-400 to-amber-500" },
  { name: "C#", color: "from-purple-500 to-indigo-500" },
  { name: "React", color: "from-cyan-400 to-blue-500" },
  { name: "NextJS", color: "from-gray-800 to-gray-700" },
  { name: "TypeScript", color: "from-blue-400 to-blue-600" },
  { name: "SQL", color: "from-green-400 to-teal-500" },
  { name: "HTML", color: "from-orange-500 to-pink-500" },
  { name: "CSS", color: "from-sky-400 to-blue-500" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 px-4 sm:py-16 md:py-20 lg:py-28 transition-colors">
      {/* Hiệu ứng nền động */}
      <img
        src={bookIcon}
        alt="Book"
        className="absolute top-12 sm:top-16 md:top-20 left-4 sm:left-12 md:left-60 w-32 sm:w-48 md:w-66 opacity-20 animate-float-slow"
      />
      <img
        src={laptopIcon}
        alt="Laptop"
        className="absolute bottom-10 sm:bottom-16 md:bottom-24 right-6 sm:right-16 md:right-24 w-40 sm:w-52 md:w-66 opacity-30 animate-float-slow delay-500"
      />

      {/* Nội dung chính */}
      <div className="max-w-7xl mx-auto text-center relative z-10 px-2 sm:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 sm:mb-8">
          <span className="block text-gray-900 dark:text-gray-100 opacity-0 animate-fadeIn delay-100">
            Học lập trình
          </span>
          <span
            className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x animate-fadeIn"
            style={{ animationDelay: "0.3s" }}
          >
            với AI thông minh
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-500">
          Nền tảng học lập trình hiện đại với AI dự đoán cảm xúc real-time, giúp
          bạn học code hiệu quả và thú vị hơn.
        </p>

        {/* Nút hành động */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 mb-10 sm:mb-14">
          <Button
            onClick={() => navigate("/courses")}
            size="lg"
            className="w-full sm:w-auto bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Bắt đầu học ngay
          </Button>

          <Button
            onClick={() => navigate("/compiler")}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-indigo-300 dark:border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-700 px-8 py-4 rounded-2xl text-base sm:text-lg font-semibold transition-all duration-200"
          >
            <Code className="w-5 h-5 mr-2" />
            Thử compiler
          </Button>
        </div>

        {/* ⚡ Dải ngôn ngữ động */}
        <div className="relative w-full overflow-hidden pointer-events-none select-none z-0 mt-4 sm:mt-6">
          {/* Viền mờ 2 bên */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute left-0 top-0 w-20 sm:w-28 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent"></div>
            <div className="absolute right-0 top-0 w-20 sm:w-28 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent"></div>
          </div>

          {/* Hàng 1 */}
          <div className="flex whitespace-nowrap animate-marquee">
            {languages.concat(languages).map((lang, i) => (
              <div
                key={`row1-${i}`}
                className={`mx-2 sm:mx-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${lang.color} text-white font-semibold shadow-md text-sm sm:text-base`}
              >
                {lang.name}
              </div>
            ))}
          </div>

          {/* Hàng 2 */}
          <div className="flex whitespace-nowrap animate-marquee-reverse mt-3 sm:mt-4">
            {languages.concat(languages).map((lang, i) => (
              <div
                key={`row2-${i}`}
                className={`mx-2 sm:mx-3 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${lang.color} text-white font-semibold shadow-md text-sm sm:text-base`}
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
