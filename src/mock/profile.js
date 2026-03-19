import { Trophy, Clock, Flame } from "lucide-react";
import mockUsers from "./users.json";
import { mockMyCourses } from "./myCourses";

const currentUser = mockUsers[0];

export const user = {
  name: currentUser.username,
  avatar: currentUser.avatar,
  cover: "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1350&q=80",
  bio: currentUser.bio,
  level: currentUser.level,
  xp: currentUser.xp,
  nextLevelXp: (currentUser.level + 1) * 1000,
  streak: currentUser.streak,
  joinDate: "Tháng 8, 2024",
};

export const courses = mockMyCourses.map(c => ({
  id: c.path_id,
  name: c.path_name,
  progress: c.progress_percentage,
  icon: c.difficulty_level === "beginner" ? "🔰" : (c.difficulty_level === "intermediate" ? "⚔️" : "🔥"),
  lessons: c.completed_lessons,
  totalLessons: c.total_lessons_in_path,
}));

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
