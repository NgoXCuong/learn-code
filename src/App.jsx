import React from "react";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import LessonPage from "@/pages/LessonPage";
import Compiler from "@/pages/Compiler";
import Feedback from "@/pages/Feedback";
import ProfilePage from "@/pages/ProfilePage";
import ChallengesPage from "@/pages/ChallengesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { UserCoursesProvider } from "@/context/UserCoursesContext"; // ✅ import context provider
import CareerPathsDemo from "@/pages/CareerPathsDemo";
import Chatbot from "./components/layout/Chatbot";

const App = () => {
  return (
    <UserCoursesProvider>
      <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Toaster đặt ở đây để toàn app đều có thể dùng toast */}
        <Toaster richColors position="top-center" reverseOrder={false} />

        <BrowserRouter>
          <Routes>
            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Home / Courses */}
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            {/* CarrerPath */}
            <Route path="/career-paths" element={<CareerPathsDemo />} />
            <Route path="/career-path/:pathId" element={<Courses />} />

            {/* Lessons */}
            <Route
              path="/courses/:courseId/lessons/:lessonId"
              element={<LessonPage />}
            />
            <Route
              path="/courses/:courseId/lessons/:lessonId/exercise/:exerciseId"
              element={<Compiler />}
            />

            {/* Compiler trực tiếp từ trang chủ */}
            <Route path="/compiler" element={<Compiler />} />

            <Route
              path="/courses/:courseId/lessons/:lessonId/exercise/:exerciseId/feedback"
              element={<Feedback />}
            />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
          </Routes>
        </BrowserRouter>
        <Chatbot />
      </div>
    </UserCoursesProvider>
  );
};

export default App;
