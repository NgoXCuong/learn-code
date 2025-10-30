import React, { useState } from "react";
import { BookOpen, Code, Brain, Sparkles } from "lucide-react";

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  gradientColors,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Glow effect background */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradientColors} rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500`}
      ></div>

      {/* Card content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8 h-full transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl">
        {/* Icon container with animated background */}
        <div className="relative mb-6 inline-block">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${gradientColors} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
          ></div>
          <div
            className={`relative bg-gradient-to-r ${gradientColors} p-4 rounded-2xl transform transition-transform duration-300 ${
              isHovered ? "rotate-6 scale-110" : ""
            }`}
          >
            <Icon className="w-8 h-8 text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors">
          {description}
        </p>

        {/* Decorative corner accent */}
        <div
          className={`absolute top-4 right-4 w-16 h-16 bg-gradient-to-br ${gradientColors} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300`}
        ></div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Bài học phong phú",
      description:
        "Các bài học được thiết kế chi tiết với lý thuyết dễ hiểu và bài tập thực hành phong phú",
      gradientColors: "from-blue-500 to-indigo-600",
    },
    {
      icon: Code,
      title: "Compiler tích hợp",
      description:
        "Viết và chạy code ngay trên trình duyệt với compiler mạnh mẽ",
      gradientColors: "from-purple-500 to-pink-600",
    },
    {
      icon: Brain,
      title: "AI dự đoán cảm xúc",
      description:
        "AI phân tích cảm xúc real-time giúp tối ưu hóa trải nghiệm học tập của bạn",
      gradientColors: "from-teal-500 to-green-600",
    },
  ];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
      <div
        className="absolute bottom-0 right-1/10 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Section header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          Tính năng nổi bật
        </h2>
        <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
          Khám phá những công nghệ tiên tiến giúp bạn học lập trình hiệu quả hơn
        </p>
      </div>

      {/* Features grid */}
      <div className="grid md:grid-cols-3 gap-8 text-center relative z-10">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradientColors={feature.gradientColors}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
