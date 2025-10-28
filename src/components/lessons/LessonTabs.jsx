import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LessonHeader from "@/components/lessons/LessonHeader";
import LessonExercise from "@/components/lessons/LessonExercise";
import LessonCode from "@/components/lessons/LessonCode";
import { BookOpen, Code2, Sparkles } from "lucide-react";

export default function LessonTabs({
  isDark,
  lesson,
  exercises,
  courseId,
  lessonId,
}) {
  const [activeTab, setActiveTab] = useState("theory");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList
        className={`inline-flex rounded-xl p-2 gap-2 mb-6 ${
          isDark
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200 shadow-sm"
        }`}
      >
        <TabsTrigger
          value="theory"
          className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${
              isDark
                ? "text-gray-400 hover:text-gray-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                : "text-gray-600 hover:text-gray-900 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            }`}
        >
          <BookOpen className="w-4 h-4" />
          Lý thuyết
        </TabsTrigger>

        <TabsTrigger
          value="exercise"
          className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-semibold transition-all duration-200
            ${
              isDark
                ? "text-gray-400 hover:text-gray-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                : "text-gray-600 hover:text-gray-900 data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            }`}
        >
          <Code2 className="w-4 h-4" />
          Bài tập
          {exercises.length > 0 && (
            <span
              className={`ml-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                activeTab === "exercise"
                  ? "bg-white/20 text-white"
                  : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
              }`}
            >
              {exercises.length}
            </span>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="theory" className="space-y-6 mt-0">
        <div
          className={`p-8 rounded-2xl ${
            isDark
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <LessonHeader title={lesson.title} content={lesson.content} />
        </div>

        {lesson.example_code && (
          <div
            className={`p-8 rounded-2xl ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Ví dụ minh họa
              </h3>
            </div>
            <LessonCode code={lesson.example_code} language={lesson.language} />
          </div>
        )}
      </TabsContent>

      <TabsContent value="exercise" className="mt-0">
        {exercises.length > 0 ? (
          <LessonExercise
            exercises={exercises}
            courseId={courseId}
            lessonId={lessonId}
          />
        ) : (
          <div
            className={`p-16 rounded-2xl text-center ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                isDark ? "bg-gray-700" : "bg-gray-200"
              }`}
            >
              <Code2 className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Chưa có bài tập
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Bài tập sẽ được cập nhật trong thời gian tới
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
