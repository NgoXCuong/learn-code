import React from "react";

const QuestionGrid = ({
  quizQuestions,
  answers,
  currentQuestion,
  jumpTo,
  isReviewMode,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2  ">
      {quizQuestions.map((q, idx) => {
        const isCurrent = idx === currentQuestion;
        const isAnswered = answers[q.id] !== undefined;
        const isCorrect = isAnswered && answers[q.id] === q.correctAnswer;

        let style =
          "bg-gray-50 text-gray-600 border border-gray-300 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"; // default

        if (isReviewMode) {
          if (isCorrect)
            style =
              "bg-green-100 text-green-800 border border-green-300 dark:bg-green-800 dark:text-green-300 dark:border-green-700";
          else if (isAnswered)
            style =
              "bg-red-100 text-red-800 border border-red-300 dark:bg-red-800 dark:text-red-300 dark:border-red-700";
          else
            style =
              "bg-gray-100 text-gray-500 border border-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600";
        } else if (isAnswered) {
          style =
            "bg-green-50 text-green-700 border border-green-300 hover:bg-green-100 dark:bg-green-900 dark:text-green-400 dark:border-green-700 dark:hover:bg-green-800";
        }

        if (isCurrent) {
          style =
            "bg-gradient-to-br from-blue-500 to-indigo-600 text-white scale-110 shadow-md ring-2 ring-offset-2 ring-blue-400";
        }

        return (
          <button
            key={q.id}
            onClick={() => jumpTo(idx)}
            className={`aspect-square rounded-lg font-bold text-sm transition-all ${style}`}
          >
            {idx + 1}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionGrid;
