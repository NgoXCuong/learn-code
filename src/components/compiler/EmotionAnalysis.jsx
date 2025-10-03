import React from "react";
import { Smile } from "lucide-react"; // icon lucide-react

const EmotionAnalysis = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Tiêu đề chính */}
      <h3 className="text-sm font-bold m-1">Emotion Analysis</h3>

      {/* Khung icon + nội dung */}
      <div className="flex flex-row items-center p-2 rounded-lg flex-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 overflow-auto gap-4">
        {/* Icon bên trái */}
        <div className="flex-shrink-0">
          <Smile className="w-20 h-20 md:w-24 md:h-24 text-yellow-500 dark:text-yellow-200" />
        </div>

        {/* Nội dung bên phải */}
        <div className="flex flex-col justify-center flex-1">
          <h3 className="text-lg font-bold mb-1">Tích cực</h3>
          <p className="text-sm mb-1">Bạn đang tập trung tốt!</p>
          <p className="text-sm italic text-yellow-800 dark:text-yellow-200">
            Tip: Hãy tiếp tục duy trì trạng thái này để học hiệu quả hơn!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmotionAnalysis;
