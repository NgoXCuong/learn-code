import React from "react";
import { Smile, Brain } from "lucide-react"; // icon lucide-react

const EmotionAnalysis = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Tiêu đề chính */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
          <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Phân tích AI
        </h3>
      </div>

      {/* Khung icon + nội dung */}
      <div className="flex flex-row items-center p-2 rounded-lg flex-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 overflow-auto gap-4">
        {/* Icon bên trái */}
        <div className="flex-shrink-0">
          <Smile className="w-20 h-20 md:w-24 md:h-24 text-yellow-500 dark:text-yellow-200" />
        </div>

        {/* Nội dung bên phải */}
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-xl font-bold mb-1">Tích cực</h3>
          <p className="text-base mb-1">Bạn đang tập trung tốt!</p>
          <p className="text-base italic text-yellow-800 dark:text-yellow-200">
            Tip: Hãy tiếp tục duy trì trạng thái này để học hiệu quả hơn!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysis;
