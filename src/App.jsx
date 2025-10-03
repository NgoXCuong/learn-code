import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import LessonPage from "./pages/LessonPage";
import Compiler from "./pages/Compiler";
import Feedback from "./pages/Feedback";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <BrowserRouter>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Home / Courses */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />

          {/* Lessons */}
          <Route
            path="/courses/:courseId/lessons/:lessonId"
            element={<LessonPage />}
          />
          <Route
            path="/courses/:courseId/lessons/:lessonId/exercise"
            element={<Compiler />}
          />

          {/* Compiler trực tiếp từ trang chủ */}
          <Route path="/compiler" element={<Compiler />} />

          <Route
            path="/courses/:courseId/lessons/:lessonId/exercise/feedback"
            element={<Feedback />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
