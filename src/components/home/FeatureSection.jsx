import React from "react";
import { BookOpen, Code, Brain } from "lucide-react";
import FeatureCard from "../home/FeatureCard";

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Lý thuyết phong phú",
      description:
        "Các bài học được thiết kế chi tiết với lý thuyết dễ hiểu và bài tập thực hành phong phú",
      gradientColors: "from-blue-500 to-indigo-600",
    },
    {
      icon: Code,
      title: "Compiler tích hợp",
      description:
        "Viết và chạy code Java, C++ ngay trên trình duyệt với compiler mạnh mẽ",
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      {/* Optional section title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8 transition-colors">
        Tính năng nổi bật
      </h2>

      <div className="grid md:grid-cols-3 gap-8 text-center">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            gradientColors={feature.gradientColors}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
