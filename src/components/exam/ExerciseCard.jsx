import React from "react";
import { ArrowRight, CheckCircle, Zap, Clock } from "lucide-react";

const diffStyles = {
  Dễ: {
    badge:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
    gradient: "from-green-500 to-emerald-600",
    shadow: "hover:shadow-green-200 dark:hover:shadow-green-900",
  },
  "Trung bình": {
    badge:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
    gradient: "from-yellow-500 to-orange-600",
    shadow: "hover:shadow-yellow-200 dark:hover:shadow-yellow-900",
  },
  Khó: {
    badge:
      "bg-red-100 text-red-700 border-red-300 dark:bg-red-900 dark:text-red-300 dark:border-red-700",
    gradient: "from-red-500 to-pink-600",
    shadow: "hover:shadow-red-200 dark:hover:shadow-red-900",
  },
};

export default function ExerciseCard({ exercise, isCompleted, onClick }) {
  const style = diffStyles[exercise.difficulty] || diffStyles["Dễ"];

  return (
    <div
      key={exercise.uniqueKey}
      onClick={() => onClick(exercise)}
      className={`btn-shimmer cursor-pointer p-5 rounded-xl border shadow-md transform transition
        bg-white border-gray-100
        dark:bg-gray-800 dark:border-gray-700
        hover:-translate-y-1 hover:shadow-xl
        ${style.shadow}
        ${isCompleted ? "opacity-60 order-last" : ""}
      `}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div
            className={`
      w-8 h-8 rounded-lg text-white flex items-center justify-center font-bold
      bg-linear-to-br ${style.gradient}
    `}
          >
            #{exercise.id}
          </div>

          <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 line-clamp-2 flex items-center gap-2">
            {exercise.title}
            {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted && <CheckCircle className="w-5 h-5 text-green-500" />}
          <span
            className={`px-2 py-0.5 text-sm rounded-full border ${style.badge}`}
          >
            {exercise.difficulty}
          </span>
        </div>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-base line-clamp-2 mb-3">
        {exercise.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {exercise.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-sm bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className="
          flex justify-between items-center text-sm border-t pt-3
          border-gray-200 dark:border-gray-700
        "
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
            <Zap className="w-3 h-3" /> +{exercise.exp}
          </span>
          <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" /> {exercise.timeEstimate}
          </span>
        </div>

        <div className="flex items-center gap-1 text-indigo-500 dark:text-indigo-400 font-medium">
          <span>{isCompleted ? "Đã hoàn thành" : "Bắt đầu"}</span>
          {!isCompleted && <ArrowRight className="w-4 h-4" />}
        </div>
      </div>
    </div>
  );
}
