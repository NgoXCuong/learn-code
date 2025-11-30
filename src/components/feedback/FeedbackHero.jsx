import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function FeedbackHero({ feedback, isDark }) {
  console.log("FeedbackHero received feedback:", feedback);

  if (!feedback) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div
      className={`bg-linear-to-br   ${
        isDark
          ? "from-gray-800 via-gray-900 to-gray-800"
          : "from-blue-50 to-indigo-50"
      } border-b ${
        isDark ? "border-gray-700" : "border-gray-200"
      } transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-6 pt-10 text-center">
        <div
          className={`relative mb-6 ${feedback.passed ? "animate-bounce" : ""}`}
        >
          <div
            className={`absolute inset-0 rounded-full opacity-20 ${
              feedback.passed ? "bg-green-500" : "bg-red-500"
            } blur-2xl`}
          ></div>
          <div className="flex justify-center items-center h-full w-full relative z-10">
            {feedback.passed ? (
              <CheckCircle
                className="w-20 h-20 text-green-500"
                strokeWidth={2.5}
              />
            ) : (
              <XCircle className="w-20 h-20 text-red-500" strokeWidth={2.5} />
            )}
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          {feedback.passed ? "🎉 Hoàn thành xuất sắc!" : "Chưa đạt yêu cầu"}
        </h1>
        <p
          className={`text-lg mb-8 max-w-2xl mx-auto ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {feedback.passed
            ? "Chúc mừng! Bài làm của bạn đã đạt yêu cầu và thể hiện sự tiến bộ rõ rệt."
            : "Đừng lo lắng! Hãy xem feedback bên dưới và thử lại."}
        </p>
      </div>
    </div>
  );
}
