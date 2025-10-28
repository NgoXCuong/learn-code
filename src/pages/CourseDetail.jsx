// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "@/components/layout/Header";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import Footer from "@/components/layout/Footer";
// import CourseHero from "@/components/courses/CourseHero";
// import LessonList from "@/components/courses/LessonList";
// import { CheckCircle } from "lucide-react";
// import { mockLessons } from "@/mock/lessons";
// import { mockCourses } from "@/mock/courses";

// export default function CourseDetail() {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const foundCourse = mockCourses.find((c) => c.id === Number(id));
//     setCourse(foundCourse);
//     const courseLessons = mockLessons.filter((l) => l.course_id === Number(id));
//     setLessons(courseLessons);
//   }, [id]);

//   if (!course) return <div className="text-center py-20">Đang tải...</div>;

//   const completedCount = lessons.filter((l) => l.status === "completed").length;
//   const inProgressCount = lessons.filter(
//     (l) => l.status === "in_progress"
//   ).length;

//   const learningOutcomes = [
//     "Hiểu rõ cấu trúc và nguyên lý hoạt động của ứng dụng web.",
//     "Nắm vững React, Node.js và MongoDB để xây dựng hệ thống Fullstack.",
//     "Xây dựng API RESTful và tích hợp frontend-backend.",
//     "Triển khai ứng dụng web thực tế lên hosting hoặc cloud.",
//     "Tối ưu hiệu suất và bảo mật cho ứng dụng.",
//     "Phát triển kỹ năng làm việc nhóm và tư duy giải quyết vấn đề.",
//   ];

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
//       dark:from-gray-800 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-500"
//     >
//       <Header />

//       <main className="flex-grow w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
//         <Breadcrumb
//           items={[
//             { label: "Trang chủ", href: "/" },
//             { label: "Khóa học", href: "/courses" },
//             { label: course.title },
//           ]}
//         />

//         <CourseHero
//           course={course}
//           lessons={lessons}
//           completedCount={completedCount}
//           inProgressCount={inProgressCount}
//         />

//         {/* Bố cục 2 cột */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
//           {/* Cột trái: Giới thiệu + Bạn sẽ học được gì */}
//           <div className="space-y-10">
//             {/* Giới thiệu khóa học */}
//             <section>
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
//                 Giới thiệu khóa học
//               </h2>
//               <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 space-y-4 transition-all">
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   Khóa học <strong>{course.title}</strong> được thiết kế để đưa
//                   bạn từ người mới bắt đầu trở thành lập trình viên web chuyên
//                   nghiệp. Bạn sẽ học cách xây dựng ứng dụng web hoàn chỉnh từ
//                   giao diện người dùng đến backend và cơ sở dữ liệu.
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   <strong>Yêu cầu đầu vào:</strong> Kiến thức cơ bản về HTML và
//                   CSS. Không cần kinh nghiệm lập trình trước đó, nhưng tinh thần
//                   ham học hỏi là điều cần thiết.
//                 </p>
//                 <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//                   <strong>Kết quả đạt được:</strong> Sau khóa học, bạn có thể tự
//                   tin xây dựng các ứng dụng web thực tế, hiểu rõ quy trình phát
//                   triển fullstack, và sẵn sàng ứng tuyển các vị trí Junior
//                   Developer hoặc Freelancer.
//                 </p>

//                 <div className="flex flex-wrap gap-4 pt-4">
//                   <img
//                     src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
//                     alt="React"
//                     className="w-12 h-12"
//                   />
//                   <img
//                     src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
//                     alt="Node.js"
//                     className="w-12 h-12"
//                   />
//                   <img
//                     src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
//                     alt="MongoDB"
//                     className="w-12 h-12"
//                   />
//                   <img
//                     src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
//                     alt="JavaScript"
//                     className="w-12 h-12"
//                   />
//                 </div>
//               </div>
//             </section>

//             {/* Bạn sẽ học được gì */}
//             <section>
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
//                 Bạn sẽ học được gì
//               </h2>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {learningOutcomes.map((outcome, index) => (
//                   <div
//                     key={index}
//                     className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-start gap-3 hover:shadow-lg transition-shadow"
//                   >
//                     <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
//                     <p className="text-gray-700 dark:text-gray-300">
//                       {outcome}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* Cột phải: Danh sách bài học */}
//           <div>
//             <LessonList
//               lessons={lessons}
//               onLessonClick={(lessonId) =>
//                 navigate(`/courses/${course.id}/lessons/${lessonId}`)
//               }
//             />
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Footer from "@/components/layout/Footer";
import CourseHero from "@/components/courses/CourseHero";
import CourseIntro from "@/components/courses/CourseIntro";
import CourseOutcomes from "@/components/courses/CourseOutcomes";
import { mockLessons } from "@/mock/lessons";
import { mockCourses } from "@/mock/courses";
import { mockCourseDetails } from "@/mock/courseDetailsIntro";
import LessonList from "@/components/courses/LessonList";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundCourse = mockCourses.find((c) => c.id === Number(id));
    const foundDetail = mockCourseDetails.find(
      (d) => d.course_id === Number(id)
    );
    const courseLessons = mockLessons.filter((l) => l.course_id === Number(id));

    setCourse(foundCourse);
    setCourseDetail(foundDetail);
    setLessons(courseLessons);
  }, [id]);

  if (!course || !courseDetail)
    return <div className="text-center py-20">Đang tải...</div>;

  const completedCount = lessons.filter((l) => l.status === "completed").length;
  const inProgressCount = lessons.filter(
    (l) => l.status === "in_progress"
  ).length;

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 
      dark:from-gray-800 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-500"
    >
      <Header />

      <main className="flex-grow w-full px-4 sm:px-6 md:px-14 lg:px-20 py-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Khóa học", href: "/courses" },
            { label: course.title },
          ]}
        />

        <CourseHero
          course={course}
          lessons={lessons}
          completedCount={completedCount}
          inProgressCount={inProgressCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="space-y-10">
            <CourseIntro intro={courseDetail.intro} />
            <CourseOutcomes outcomes={courseDetail.outcomes} />
          </div>

          <LessonList
            lessons={lessons}
            onLessonClick={(lessonId) =>
              navigate(`/courses/${course.id}/lessons/${lessonId}`)
            }
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
