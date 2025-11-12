import React from "react";
import { CheckCircle } from "lucide-react";

export default function CourseOutcomes({ outcomes }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        Bạn sẽ học được gì
      </h2>
      <div className="text-lg grid sm:grid-cols-2 gap-4">
        {outcomes.map((outcome, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-start gap-3 hover:shadow-lg transition-shadow"
          >
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
            <p className="text-gray-700 dark:text-gray-300">{outcome}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
