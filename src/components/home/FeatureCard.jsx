import React from "react";
import { Card } from "../ui/card";

const FeatureCard = ({ icon: Icon, title, description, gradientColors }) => {
  return (
    <Card
      className="p-8 bg-blue-50 dark:bg-violet-800/50 backdrop-blur-sm border-0 shadow-xl 
                 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 
                 animate-zoom-in"
    >
      <div
        className={`w-16 h-16 bg-linear-to-br ${gradientColors} rounded-2xl flex items-center 
                justify-center mb-6 mx-auto`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3
        className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100 transition-colors 
                 animate-fade-in-left"
      >
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors animate-slide-down">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;
