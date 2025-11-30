import React from "react";

export default function CourseIntro({ intro }) {
  return (
    <section className=" ">
      <div className="text-base bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-4 transition-all">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Giới thiệu khóa học
        </h2>
        {intro.description.map((text, index) => (
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm"
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
