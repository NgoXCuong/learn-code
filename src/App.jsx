import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { UserCoursesProvider } from "@/context/UserCoursesContext";
import { ProgressProvider } from "@/context/ProgressContext";
import { LoadingProvider } from "@/context/LoadingContext";
import Chatbot from "@/components/layout/Chatbot";
import { Loading } from "@/components/layout/Loading";

// Lazy load pages for code splitting
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Home = lazy(() => import("@/pages/Home"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const LessonPage = lazy(() => import("@/pages/LessonPage"));
const Compiler = lazy(() => import("@/pages/Compiler"));
const Feedback = lazy(() => import("@/pages/Feedback"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const ChallengesPage = lazy(() => import("@/pages/ChallengesPage"));
const ExamCode = lazy(() => import("@/pages/ExamCode"));
const Rankings = lazy(() => import("@/pages/Rankings"));
const CompilerPage = lazy(() => import("@/pages/CompilerPage"));

const AppRoutes = () => {
  return (
    <LoadingProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home / Courses */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          <Route path="/exam" element={<ExamCode />} />
          <Route path="/exam/:exerciseId/compiler" element={<Compiler />} />
          <Route path="/exam/:examId/feedback" element={<Feedback />} />

          <Route
            path="/courses/:courseId/lessons/:lessonId"
            element={<LessonPage />}
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId/exercise/:exerciseId"
            element={<Compiler />}
          />

          {/* Compiler trực tiếp từ trang chủ */}
          <Route path="/compiler" element={<CompilerPage />} />

          <Route
            path="/courses/:courseId/lessons/:lessonId/exercise/:exerciseId/feedback"
            element={<Feedback />}
          />

          <Route path="/profile" element={<ProfilePage />} />

          <Route path="/challenges" element={<ChallengesPage />} />
          <Route
            path="/challenges/:challengeId/compiler"
            element={<Compiler />}
          />
          <Route
            path="/challenges/:challengeId/feedback"
            element={<Feedback />}
          />

          <Route path="/ranks" element={<Rankings />} />
        </Routes>
      </Suspense>
      <Loading />
    </LoadingProvider>
  );
};

const App = () => {
  return (
    <ProgressProvider>
      <UserCoursesProvider>
        <div className="App min-h-screen bg-linear-to-br from-slate-50 to-blue-50">
          {/* Toaster đặt ở đây để toàn app đều có thể dùng toast */}
          <Toaster richColors position="top-center" reverseOrder={false} />

          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Chatbot />
        </div>
      </UserCoursesProvider>
    </ProgressProvider>
  );
};

export default App;
