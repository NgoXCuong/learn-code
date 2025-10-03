import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { BookOpen, Code } from "lucide-react";
// import "../../index.css";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 px-2 sm:px-4 lg:px-6 transition-colors">
      <div className="max-w-7xl w-full text-center relative mx-auto">
        <div className="relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="block text-gray-900 dark:text-gray-100 transition-colors opacity-0 animate-fadeIn translate-y-4 delay-100">
              Học lập trình
            </span>
            <span
              className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent animate-gradient-x animate-fadeIn translate-y-4"
              style={{ animationDelay: "0.3s" }}
            >
              với AI thông minh
            </span>
          </h1>

          {/* Background shapes */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-30 animate-zoom-in"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl opacity-30 animate-zoom-in delay-200"></div>
        </div>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed transition-colors opacity-0 animate-fadeIn delay-500">
          Nền tảng học lập trình hiện đại với AI dự đoán cảm xúc real-time, giúp
          bạn học Java và C++ một cách hiệu quả nhất
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/courses")}
            size="lg"
            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Bắt đầu học ngay
          </Button>

          <Button
            onClick={() => navigate("/compiler")}
            variant="outline"
            size="lg"
            className="border-2 border-indigo-300 dark:border-indigo-500 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 cursor-pointer"
          >
            <Code className="w-5 h-5 mr-2" />
            Thử compiler
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
