import React from "react";
import { CheckCircle, Sparkles, Lightbulb } from "lucide-react";

const MonacoEditor = ({ value, theme }) => (
  <pre
    className={`p-4 rounded-lg overflow-auto h-full text-lg font-mono ${
      theme === "vs-dark"
        ? "bg-gray-900 text-gray-100"
        : "bg-gray-50 text-gray-900"
    }`}
  >
    <code>{value}</code>
  </pre>
);

export default function FeedbackContent({
  activeTab,
  feedback,
  isDark,
  solutionCode,
}) {
  return (
    <div
      className={`rounded-lg overflow-hidden border font-exo ${
        isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {activeTab === "feedback" && (
        <div className="p-8 space-y-4">
          {feedback.comments.map((c, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl border ${
                c.type === "success"
                  ? isDark
                    ? "bg-green-900/20 border-green-800/30"
                    : "bg-green-50 border-green-200"
                  : c.type === "warning"
                  ? isDark
                    ? "bg-yellow-900/20 border-yellow-800/30"
                    : "bg-yellow-50 border-yellow-200"
                  : isDark
                  ? "bg-blue-900/20 border-blue-800/30"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              {c.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : c.type === "warning" ? (
                <Sparkles className="w-5 h-5 text-yellow-500" />
              ) : (
                <Lightbulb className="w-5 h-5 text-blue-500" />
              )}
              <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                {c.text}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "solution" && (
        <div className="p-8">
          <MonacoEditor
            value={solutionCode}
            theme={isDark ? "vs-dark" : "vs-light"}
          />
          <p
            className={`mt-4 text-base ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            💡 <strong>Giải thích:</strong> Code trên sử dụng cấu trúc if-else
            để kiểm tra điều kiện tuổi. Đây là cách tiếp cận trực quan và dễ
            hiểu nhất.
          </p>
        </div>
      )}

      {activeTab === "suggestions" && (
        <div className="p-8 space-y-4">
          {feedback.suggestions.map((s, i) => (
            <div
              key={i}
              className={`p-5 rounded-lg border ${
                isDark
                  ? "bg-linear-to-br from-purple-900/20 to-pink-900/20 border-purple-800/30"
                  : "bg-linear-to-br from-purple-50 to-pink-50 border-purple-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-bold text-lg ${
                    isDark
                      ? "bg-purple-600 text-white"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {i + 1}
                </div>
                <p className={isDark ? "text-gray-300" : "text-gray-700"}>
                  {s}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
