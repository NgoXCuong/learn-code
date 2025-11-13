import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const QuestionBlock = ({
  currentQ,
  currentQuestion,
  answers,
  selectAnswer,
  isReviewMode,
}) => {
  const userAnswer = answers[currentQ.id];

  return (
    <>
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-lg flex items-center justify-center text-xl font-bold shadow-md shrink-0">
          {currentQuestion + 1}
        </div>
        <h3 className="text-xl md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed flex-1">
          {currentQ.question}
        </h3>
      </div>

      <div className="mt-6 space-y-3">
        {currentQ.options.map((option, optIdx) => {
          const optionLabel = String.fromCharCode(65 + optIdx);
          const isSelected = userAnswer === optIdx;
          const isCorrect = currentQ.correctAnswer === optIdx;

          let style =
            "border-gray-200 hover:border-blue-400 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-blue-400 dark:hover:bg-gray-700";
          let labelStyle =
            "text-gray-600 border-gray-300 dark:text-gray-300 dark:border-gray-500";
          let icon = null;

          if (isReviewMode) {
            if (isCorrect) {
              style =
                "border-green-500 bg-green-50 shadow-md dark:bg-green-800";
              labelStyle = "bg-green-500 border-green-500 text-white";
              icon = (
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-300" />
              );
            } else if (isSelected && !isCorrect) {
              style = "border-red-500 bg-red-50 shadow-md dark:bg-red-800";
              labelStyle = "bg-red-500 border-red-500 text-white";
              icon = (
                <XCircle className="w-5 h-5 text-red-500 dark:text-red-300" />
              );
            } else {
              style = "border-gray-200 bg-gray-50 opacity-80 dark:bg-gray-700";
            }
          } else if (isSelected) {
            style = "border-blue-500 bg-blue-50 shadow-md dark:bg-blue-800";
            labelStyle = "bg-blue-500 border-blue-500 text-white";
            icon = (
              <CheckCircle className="w-5 h-5 text-blue-500 dark:text-blue-300" />
            );
          }

          return (
            <div
              key={optIdx}
              onClick={() => !isReviewMode && selectAnswer(currentQ.id, optIdx)}
              className={`p-4 border-2 rounded-lg transition-all ${
                !isReviewMode && "cursor-pointer hover:scale-[1.02]"
              } ${style}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-bold transition-all shrink-0 ${labelStyle}`}
                >
                  {optionLabel}
                </div>
                <div className="flex-1 text-gray-800 dark:text-gray-100">
                  {option}
                </div>
                {icon}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default QuestionBlock;
