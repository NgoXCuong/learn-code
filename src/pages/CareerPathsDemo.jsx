import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  Circle,
  Lock,
  Code,
  Briefcase,
  Target,
  Award,
} from "lucide-react";

// Mock data
const careerPaths = [
  {
    id: "1",
    name: "Frontend Developer",
    slug: "frontend-developer",
    description:
      "Trở thành chuyên gia phát triển giao diện web hiện đại với React, TypeScript và các công nghệ tiên tiến",
    icon: "💻",
    difficulty: "beginner",
    duration: "6 tháng",
    salaryRange: "12-25 triệu",
    jobOpportunities: 1250,
    skills: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind"],
    totalCourses: 8,
    totalLessons: 156,
    totalProjects: 12,
    enrolledStudents: 3420,
    phases: [
      {
        id: "p1",
        order: 1,
        name: "Nền tảng Web",
        duration: "2 tháng",
        courses: [
          {
            id: "c1",
            name: "HTML & CSS Cơ bản",
            completed: true,
            locked: false,
          },
          {
            id: "c2",
            name: "JavaScript Fundamentals",
            completed: true,
            locked: false,
          },
          {
            id: "c3",
            name: "Responsive Web Design",
            completed: false,
            locked: false,
          },
        ],
      },
      {
        id: "p2",
        order: 2,
        name: "JavaScript Nâng cao",
        duration: "2 tháng",
        courses: [
          {
            id: "c4",
            name: "ES6+ & Async Programming",
            completed: false,
            locked: false,
          },
          {
            id: "c5",
            name: "DOM Manipulation",
            completed: false,
            locked: true,
          },
          { id: "c6", name: "APIs & Fetch", completed: false, locked: true },
        ],
      },
      {
        id: "p3",
        order: 3,
        name: "React Ecosystem",
        duration: "2 tháng",
        courses: [
          { id: "c7", name: "React Basics", completed: false, locked: true },
          {
            id: "c8",
            name: "React Hooks & State Management",
            completed: false,
            locked: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Backend Python Developer",
    slug: "backend-python",
    description:
      "Làm chủ phát triển backend với Python, Django và xây dựng API RESTful mạnh mẽ",
    icon: "🐍",
    difficulty: "intermediate",
    duration: "8 tháng",
    salaryRange: "15-30 triệu",
    jobOpportunities: 890,
    skills: ["Python", "Django", "PostgreSQL", "REST API", "Docker"],
    totalCourses: 10,
    totalLessons: 198,
    totalProjects: 15,
    enrolledStudents: 2156,
  },
  {
    id: "3",
    name: "Full Stack Developer",
    slug: "fullstack-developer",
    description:
      "Trở thành lập trình viên toàn diện, làm chủ cả frontend và backend",
    icon: "⚡",
    difficulty: "advanced",
    duration: "12 tháng",
    salaryRange: "20-40 triệu",
    jobOpportunities: 2100,
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    totalCourses: 15,
    totalLessons: 320,
    totalProjects: 25,
    enrolledStudents: 4521,
  },
];

// Main Component
export default function CareerPathsDemo() {
  const [view, setView] = useState("list"); // 'list' or 'detail'
  const [selectedPath, setSelectedPath] = useState(careerPaths[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Lộ Trình Học Tập
              </h1>
              <p className="text-gray-600 mt-1">
                Chọn con đường phù hợp để bắt đầu sự nghiệp lập trình
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Danh sách
              </button>
              <button
                onClick={() => setView("detail")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  view === "detail"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Chi tiết
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {view === "list" ? (
          <CareerPathsList
            paths={careerPaths}
            onSelect={(path) => {
              setSelectedPath(path);
              setView("detail");
            }}
          />
        ) : (
          <CareerPathDetail
            path={selectedPath}
            onBack={() => setView("list")}
          />
        )}
      </div>
    </div>
  );
}

// Career Paths List Component
function CareerPathsList({ paths, onSelect }) {
  const [filter, setFilter] = useState("all");

  const filteredPaths =
    filter === "all" ? paths : paths.filter((p) => p.difficulty === filter);

  return (
    <div>
      {/* Filters */}
      <div className="mb-6 flex gap-3">
        {["all", "beginner", "intermediate", "advanced"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === level
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50 border"
            }`}
          >
            {level === "all"
              ? "Tất cả"
              : level === "beginner"
              ? "Cơ bản"
              : level === "intermediate"
              ? "Trung cấp"
              : "Nâng cao"}
          </button>
        ))}
      </div>

      {/* Career Paths Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <div
            key={path.id}
            onClick={() => onSelect(path)}
            className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
              <div className="text-4xl mb-3">{path.icon}</div>
              <h3 className="text-xl font-bold mb-2">{path.name}</h3>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                  {path.difficulty === "beginner"
                    ? "Cơ bản"
                    : path.difficulty === "intermediate"
                    ? "Trung cấp"
                    : "Nâng cao"}
                </span>
                <span className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                  {path.duration}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {path.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">
                    {path.totalCourses} khóa học
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">
                    {path.totalProjects} dự án
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-gray-700">
                    {path.enrolledStudents.toLocaleString()} học viên
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">{path.salaryRange}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {path.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
                {path.skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{path.skills.length - 4}
                  </span>
                )}
              </div>

              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Career Path Detail Component
function CareerPathDetail({ path, onBack }) {
  const [activeTab, setActiveTab] = useState("roadmap");

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        ← Quay lại danh sách
      </button>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-5xl mb-4">{path.icon}</div>
            <h1 className="text-4xl font-bold mb-3">{path.name}</h1>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl">
              {path.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium">{path.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                <span className="font-medium">{path.salaryRange}/tháng</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span className="font-medium">
                  {path.jobOpportunities}+ việc làm
                </span>
              </div>
            </div>

            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
              Bắt đầu học ngay
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 min-w-64">
            <h3 className="font-bold mb-4">Thống kê lộ trình</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-100">Khóa học</span>
                <span className="font-bold">{path.totalCourses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Bài học</span>
                <span className="font-bold">{path.totalLessons}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Dự án thực tế</span>
                <span className="font-bold">{path.totalProjects}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">Học viên</span>
                <span className="font-bold">
                  {path.enrolledStudents.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="flex border-b">
          {[
            { id: "roadmap", label: "Lộ trình học", icon: Target },
            { id: "skills", label: "Kỹ năng đạt được", icon: Award },
            { id: "projects", label: "Dự án thực tế", icon: Code },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === "roadmap" && <RoadmapView phases={path.phases} />}
          {activeTab === "skills" && <SkillsView skills={path.skills} />}
          {activeTab === "projects" && (
            <ProjectsView totalProjects={path.totalProjects} />
          )}
        </div>
      </div>
    </div>
  );
}

// Roadmap View
function RoadmapView({ phases }) {
  return (
    <div className="space-y-8">
      {phases.map((phase, index) => (
        <div key={phase.id} className="relative">
          {/* Connector Line */}
          {index < phases.length - 1 && (
            <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200 -mb-8" />
          )}

          <div className="flex gap-6">
            {/* Phase Number */}
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10">
                {phase.order}
              </div>
            </div>

            {/* Phase Content */}
            <div className="flex-1">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {phase.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Thời gian: {phase.duration}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {phase.courses.length} khóa học
                  </span>
                </div>

                {/* Courses */}
                <div className="space-y-3">
                  {phase.courses.map((course) => (
                    <div
                      key={course.id}
                      className={`flex items-center gap-3 p-4 rounded-lg transition ${
                        course.locked
                          ? "bg-gray-100 opacity-60"
                          : "bg-white hover:shadow-md cursor-pointer"
                      }`}
                    >
                      {course.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                      ) : course.locked ? (
                        <Lock className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-300 flex-shrink-0" />
                      )}
                      <span
                        className={`flex-1 font-medium ${
                          course.locked ? "text-gray-400" : "text-gray-900"
                        }`}
                      >
                        {course.name}
                      </span>
                      {!course.locked && !course.completed && (
                        <button className="px-4 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition">
                          Học ngay
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skills View
function SkillsView({ skills }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Kỹ năng bạn sẽ đạt được
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg text-blue-700 font-medium"
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}

// Projects View
function ProjectsView({ totalProjects }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Dự án thực tế bạn sẽ làm
      </h3>
      <p className="text-gray-600">
        Trong lộ trình này, bạn sẽ hoàn thành{" "}
        <strong>{totalProjects} dự án thực tế</strong> từ cơ bản đến nâng cao,
        giúp bạn xây dựng portfolio ấn tượng và sẵn sàng cho công việc thực tế.
      </p>
    </div>
  );
}
