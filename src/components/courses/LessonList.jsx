import React, { useState } from "react";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  ChevronRight,
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

  const [openChapters, setOpenChapters] = useState(
    new Set(Object.keys(chapters))
  );

  const toggleChapter = (chapterName) => {
    const newOpenChapters = new Set(openChapters);
    if (newOpenChapters.has(chapterName)) {
      newOpenChapters.delete(chapterName);
    } else {
      newOpenChapters.add(chapterName);
    }
    setOpenChapters(newOpenChapters);
  };

  return (
    <div className="font-exo">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Danh sách bài học
      </h1>
      <div className="w-full p-6 rounded-xl bg-white dark:bg-gray-800 shadow-md transition-all">
        <div className="space-y-6 ">
          {Object.keys(chapters).map((chapterName, chapterIndex) => {
            const lessonsInChapter = chapters[chapterName];
            const completedCount = lessonsInChapter.filter(
              (l) => l.progress === 100
            ).length;
            const totalTime = lessonsInChapter.reduce(
              (sum, l) => sum + (l.readTimeMinutes || 0),
              0
            );
            const isOpen = openChapters.has(chapterName);

            return (
              <div
                key={chapterName}
                className="border-l-4 border-blue-500 pl-4 pb-4  bg-gray-50 dark:bg-gray-900 rounded-lg mb-6"
              >
                {/* HEADER CHƯƠNG */}
                <button
                  onClick={() => toggleChapter(chapterName)}
                  className="w-full flex flex-col  mb-4 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {isOpen ? (
                      <ChevronDown className="w-6 h-6 text-blue-600" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-blue-600" />
                    )}
                    <span className="font-bold text-xl">
                      {chapterIndex + 1}. {chapterName}
                    </span>
                    {completedCount === lessonsInChapter.length && (
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    )}
                  </div>
                  <span className="text-lg text-gray-600 dark:text-gray-300 pl-7">
                    {completedCount}/{lessonsInChapter.length} bài học •{" "}
                    {Math.floor(totalTime / 60)} phút
                  </span>
                </button>

                {/* DANH SÁCH BÀI HỌC */}
                {isOpen && (
                  <div className="space-y-3 pl-6">
                    {lessonsInChapter.map((lesson) => {
                      const isLocked = lesson.locked;
                      const isCurrent = lesson.isCurrent;
                      const isDone = lesson.progress === 100;

                      const shortContent =
                        lesson.content
                          ?.replace(/\s+/g, " ")
                          .trim()
                          .split(" ")
                          .slice(0, 15)
                          .join(" ") +
                        (lesson.content.split(" ").length > 15 ? "…" : "");

                      const exerciseCount = mockExercises.filter(
                        (ex) => ex.lesson_id === lesson.id
                      ).length;

                      return (
                        <div
                          key={lesson.id}
                          onClick={() =>
                            !isLocked && onLessonClick?.(lesson.id)
                          }
                          className={`flex flex-col gap-2 p-3 text-lg rounded-lg transition-all border-l-4 ${
                            isCurrent
                              ? "bg-blue-100 dark:bg-blue-900/50 border-blue-500 shadow-blue-200/50 dark:shadow-blue-900/20"
                              : "bg-green-50 dark:bg-green-900/20 border-green-400"
                          } ${
                            isLocked
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:shadow-md cursor-pointer hover:bg-green-100 dark:hover:bg-green-900/30"
                          }`}
                        >
                          {/* Header bài học */}
                          <div className="flex items-start gap-3 justify-between">
                            <div className="flex items-start gap-3 flex-1 min-w-0">
                              <div className="mt-2">
                                {isLocked ? (
                                  <Lock className="w-6 h-6 text-gray-400" />
                                ) : isDone ? (
                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                ) : (
                                  <PlayCircle className="w-6 h-6 text-blue-500" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <h1 className=" text-gray-900 text-lg font-semibold dark:text-gray-100">
                                  {lesson.title}
                                </h1>
                                <p className="text-gray-700 dark:text-gray-400 text-base mt-1 leading-relaxed">
                                  {shortContent}
                                </p>
                              </div>
                            </div>

                            <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap ml-2">
                              {lesson.readTime || "00:00"}
                            </span>
                          </div>

                          {/* Meta info + Progress */}
                          <div className="flex items-center justify-between ml-7 flex-wrap">
                            {/* Thông tin bài học bên trái */}
                            <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-400 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{lesson.readTime}</span>
                              </div>

                              <span>•</span>

                              <div className="flex items-center gap-1">
                                <Code2 className="w-4 h-4" />
                                <span>{lesson.language}</span>
                              </div>

                              <span>•</span>

                              <div className="flex items-center gap-1">
                                <ListChecks className="w-4 h-4" />
                                <span>{exerciseCount} bài tập</span>
                              </div>
                            </div>

                            {/* Progress bar bên phải */}
                            <div className="flex items-center gap-2 min-w-[150px]">
                              <span className="text-base font-medium text-blue-500 dark:text-blue-300 whitespace-nowrap">
                                {lesson.progress}%
                              </span>
                              <div className="relative flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`absolute left-0 top-0 h-full rounded-full transition-all duration-500 ${
                                    lesson.progress >= 100
                                      ? "bg-green-500"
                                      : "bg-blue-500"
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
