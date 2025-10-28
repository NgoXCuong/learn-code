import React from "react";

export default function CourseIntro({ intro }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Giới thiệu khóa học
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-4 transition-all">
        {intro.description.map((text, index) => (
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
          >
            {text}
          </p>
        ))}

        <div className="flex flex-wrap gap-4 pt-4">
          {intro.techIcons.map((icon, i) => (
            <img key={i} src={icon} alt="tech" className="w-12 h-12" />
          ))}
        </div>
      </div>
    </section>
  );
}
