import { Trophy, Clock, Flame } from "lucide-react";

export const user = {
  name: "Nguyễn Văn A",
  avatar: "https://i.pravatar.cc/150?img=32",
  cover:
    "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80",
  bio: "Lập trình viên đam mê học hỏi mỗi ngày 🚀",
  level: 12,
  xp: 4520,
  nextLevelXp: 5000,
  streak: 15,
  joinDate: "Tháng 8, 2024",
};

export const courses = [
  {
    id: 1,
    name: "Java Cơ bản",
    progress: 80,
    icon: "☕",
    lessons: 24,
    totalLessons: 30,
  },
  {
    id: 2,
    name: "C++ Nâng cao",
    progress: 50,
    icon: "⚙️",
    lessons: 15,
    totalLessons: 30,
  },
  {
    id: 3,
    name: "JavaScript Cơ bản",
    progress: 100,
    icon: "🟨",
    lessons: 25,
    totalLessons: 25,
  },
];

export const badges = [
  {
    id: 1,
    name: "Chăm chỉ",
    icon: "💪",
    date: "2024-08-20",
    rarity: "common",
    desc: "Hoàn thành 10 bài tập liên tiếp",
  },
  {
    id: 2,
    name: "Tốc độ",
    icon: "⚡",
    date: "2024-10-10",
    rarity: "rare",
    desc: "Giải bài tập trong 5 phút",
  },
  {
    id: 3,
    name: "Chinh phục",
    icon: "🏆",
    date: "2024-11-15",
    rarity: "epic",
    desc: "Hoàn thành khóa học đầu tiên",
  },
  {
    id: 4,
    name: "Bất bại",
    icon: "🔥",
    date: null,
    rarity: "legendary",
    desc: "Streak 30 ngày",
  },
];

export const stats = {
  lessonsDone: 64,
  exercisesSolved: 120,
  challengesCompleted: 5,
  totalHours: 48,
  rank: 127,
  totalUsers: 5420,
};

export const recentActivity = [
  {
    type: "course",
    title: 'Hoàn thành "Vòng lặp trong Java"',
    time: "2 giờ trước",
    icon: "✅",
  },
  {
    type: "badge",
    title: 'Đạt huy hiệu "Tốc độ"',
    time: "1 ngày trước",
    icon: "⚡",
  },
  {
    type: "challenge",
    title: 'Vượt qua thử thách "Sort Algorithm"',
    time: "2 ngày trước",
    icon: "🎯",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Top 10%",
    desc: "Xếp hạng cao trong cộng đồng",
    icon: Trophy,
    color: "text-yellow-500",
  },
  {
    id: 2,
    title: "48 giờ",
    desc: "Tổng thời gian học tập",
    icon: Clock,
    color: "text-blue-500",
  },
  {
    id: 3,
    title: "15 ngày",
    desc: "Streak học liên tiếp",
    icon: Flame,
    color: "text-orange-500",
  },
];
