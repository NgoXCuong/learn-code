// // src/api/coursesApi.js
// const API_URL = "http://localhost:3001"; // đảm bảo chạy json-server

// // ==================== Courses ====================
// export const fetchCourses = async () => {
//   const res = await fetch(`${API_URL}/courses`);
//   if (!res.ok) throw new Error("Failed to fetch courses");
//   return res.json();
// };

// // Lấy khóa học theo lang_id
// export const fetchCoursesByLang = async (langId) => {
//   const res = await fetch(`${API_URL}/courses?lang_id=${langId}`);
//   if (!res.ok) throw new Error("Failed to fetch courses by language");
//   return res.json();
// };

// export const fetchCourseById = async (id) => {
//   const res = await fetch(`${API_URL}/courses/${id}`);
//   if (!res.ok) throw new Error("Failed to fetch course");
//   return res.json();
// };

// // ==================== Lessons ====================
// export const fetchLessonsByCourse = async (courseId) => {
//   const res = await fetch(`${API_URL}/lessons?course_id=${courseId}`);
//   if (!res.ok) throw new Error("Failed to fetch lessons");
//   return res.json();
// };

// export const fetchLessonProgress = async (userId, lessonId) => {
//   const res = await fetch(
//     `${API_URL}/lesson_progress?user_id=${userId}&lesson_id=${lessonId}`
//   );
//   if (!res.ok) return null;
//   const data = await res.json();
//   return data[0] || null;
// };

// // ==================== Exercises ====================
// export const fetchExercisesByLesson = async (lessonId) => {
//   const res = await fetch(`${API_URL}/exercises?lesson_id=${lessonId}`);
//   if (!res.ok) return [];
//   return res.json();
// };

// // ==================== Languages ====================
// export const fetchLanguage = async (langId) => {
//   const res = await fetch(`${API_URL}/languages/${langId}`);
//   if (!res.ok) return null;
//   return res.json();
// };

// // Lấy tất cả languages
// export const fetchLanguages = async () => {
//   const res = await fetch(`${API_URL}/languages`);
//   if (!res.ok) throw new Error("Failed to fetch languages");
//   return res.json();
// };

// // ==================== Run & Submit Code ====================
// export const runCode = async ({ language, code }) => {
//   console.log("Run code:", { language, code });

//   // Fake run code: trả về output dạng string
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       let output;
//       if (code.includes("Hello")) {
//         output = "Output:\nHello World!";
//       } else {
//         output = `Output giả lập:\n${code}`;
//       }
//       resolve({ output });
//     }, 1000);
//   });
// };

// export const submitExercise = async ({ exerciseId, code }) => {
//   const passed = code.includes("Hello");

//   // Lấy feedback từ JSON
//   const feedbacks = await fetch(
//     `${API_URL}/feedbacks?exercise_id=${exerciseId}`
//   ).then((res) => res.json());

//   const comments = feedbacks.length > 0 ? feedbacks.map((f) => f.content) : [];

//   return {
//     success: true,
//     passed,
//     message: passed ? "Bài tập passed!" : "Bài tập failed!",
//     comments,
//     warning: false, // bỏ cảnh báo đăng nhập
//   };
// };
