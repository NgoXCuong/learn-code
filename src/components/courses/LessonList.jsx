import React, { useState } from "react";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  ChevronDown,
  Clock,
  Code2,
  ListChecks,
} from "lucide-react";
import { mockExercises } from "../../mock/exercises";

export default function LessonList({ lessons, onLessonClick }) {
  const chapters = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.chap]) acc[lesson.chap] = [];
    acc[lesson.chap].push(lesson);
    return acc;
  }, {});

  const [openChapter, setOpenChapter] = useState(Object.keys(chapters)[0]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Danh sách bài học
      </h1>
      <div className="w-full p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all">
        <div className="space-y-6">
          {Object.keys(chapters).map((chapterName, chapterIndex) => {
            const lessonsInChapter = chapters[chapterName];
            const completedCount = lessonsInChapter.filter(
              (l) => l.progress === 100
            ).length;
            const totalTime = lessonsInChapter.reduce(
              (sum, l) => sum + (l.readTimeMinutes || 0),
              0
            );
            const isOpen = openChapter === chapterName;

            return (
              <div
                key={chapterName}
                className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all"
              >
                {/* HEADER CHƯƠNG */}
                <button
                  onClick={() => setOpenChapter(isOpen ? null : chapterName)}
                  className="w-full px-5 py-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      <span>
                        {chapterIndex + 1}. {chapterName}
                      </span>
                      {completedCount === lessonsInChapter.length && (
                        <CheckCircle2 className="text-green-500 w-5 h-5" />
                      )}
                    </div>

                    <span className="text-lg text-gray-500 dark:text-gray-400">
                      {completedCount}/{lessonsInChapter.length} bài học •{" "}
                      {Math.floor(totalTime / 60)} phút
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    } text-gray-500 dark:text-gray-400`}
                  />
                </button>

                {/* DANH SÁCH BÀI HỌC */}
                {isOpen && (
                  <div className="pb-2 space-y-4">
                    {lessonsInChapter.map((lesson) => {
                      const isLocked = lesson.locked;
                      const isCurrent = lesson.isCurrent;
                      const isDone = lesson.progress === 100;

                      const shortContent =
                        lesson.content
                          ?.replace(/\s+/g, " ")
                          .trim()
                          .split(" ")
                          .slice(0, 20)
                          .join(" ") +
                        (lesson.content.split(" ").length > 20 ? "…" : "");

                      const exerciseCount = mockExercises.filter(
                        (ex) => ex.lesson_id === lesson.id
                      ).length;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() =>
                            !isLocked && onLessonClick?.(lesson.id)
                          }
                          className={`flex flex-col gap-3 p-4 text-lg rounded-xl transition-all border ${
                            isCurrent
                              ? "bg-purple-50 dark:bg-purple-900 border-purple-500"
                              : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                          } ${
                            isLocked
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-md cursor-pointer"
                          }`}
                        >
                          {/* Header bài học */}
                          <div className="flex items-start gap-3 justify-between">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="mt-0.5">
                                {isLocked ? (
                                  <Lock className="w-4 h-4 text-gray-400" />
                                ) : isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                ) : (
                                  <PlayCircle className="w-4 h-4 text-purple-500" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  {lesson.title}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400 text-base mt-1 leading-relaxed">
                                  {shortContent}
                                </p>
                              </div>
                            </div>

                            <span className="text-gray-500 dark:text-gray-400 text-base whitespace-nowrap ml-2">
                              {lesson.readTime || "00:00"}
                            </span>
                          </div>

                          {/* Meta info + Progress */}
                          <div className="flex items-center justify-between ml-7 flex-wrap">
                            {/* Thông tin bài học bên trái */}
                            <div className="flex items-center gap-3 text-base text-gray-500 dark:text-gray-400 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{lesson.readTime}</span>
                              </div>

                              <span>•</span>

                              <div className="flex items-center gap-1">
                                <Code2 className="w-3 h-3" />
                                <span>{lesson.language}</span>
                              </div>

                              <span>•</span>

                              <div className="flex items-center gap-1">
                                <ListChecks className="w-3 h-3" />
                                <span>{exerciseCount} bài tập</span>
                              </div>
                            </div>

                            {/* Progress bar bên phải */}
                            <div className="flex items-center gap-2 min-w-[150px]">
                              <span className="text-base font-medium text-purple-500 dark:text-purple-400 whitespace-nowrap">
                                {lesson.progress}%
                              </span>
                              <div className="relative flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                    lesson.progress >= 100
                                      ? "bg-green-500"
                                      : "bg-purple-500"
                                  }`}
                                  style={{ width: `${lesson.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
