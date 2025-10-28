// import React, { useState, useMemo } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   Search,
//   X,
//   Trophy,
//   Flame,
//   Award,
//   TrendingUp,
//   MessageSquare,
//   Zap,
//   Star,
//   ChevronDown,
//   ChevronUp,
//   Send,
//   ThumbsUp,
//   Clock,
//   CheckCircle2,
//   Lightbulb,
//   Calendar,
// } from "lucide-react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Breadcrumb from "@/components/layout/Breadcrumb";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// // Mock data
// const userData = {
//   name: "johndoe",
//   level: 12,
//   xp: 3450,
//   xpToNextLevel: 4000,
//   streak: 7,
//   longestStreak: 15,
//   totalPoints: 700,
//   badges: [
//     {
//       id: 1,
//       name: "First Steps",
//       icon: "🎯",
//       unlocked: true,
//       description: "Hoàn thành thử thách đầu tiên",
//     },
//     {
//       id: 2,
//       name: "Week Warrior",
//       icon: "🔥",
//       unlocked: true,
//       description: "Duy trì streak 7 ngày",
//     },
//     {
//       id: 3,
//       name: "Problem Solver",
//       icon: "🧠",
//       unlocked: true,
//       description: "Giải 10 thử thách",
//     },
//     {
//       id: 4,
//       name: "Speed Demon",
//       icon: "⚡",
//       unlocked: false,
//       description: "Giải thử thách trong <5 phút",
//     },
//     {
//       id: 5,
//       name: "Master Mind",
//       icon: "👑",
//       unlocked: false,
//       description: "Đạt top 3 bảng xếp hạng",
//     },
//   ],
//   completedChallenges: [1, 2],
//   attemptedChallenges: [3],
// };

// const challenges = [
//   {
//     id: 1,
//     title: "Reverse a String",
//     difficulty: "Dễ",
//     points: 100,
//     description: "Viết hàm đảo ngược một chuỗi đầu vào.",
//     participants: 340,
//     successRate: 92,
//     tags: ["String", "Basic"],
//     comments: 12,
//     avgTime: "8 phút",
//     hints: [
//       "Thử sử dụng vòng lặp để duyệt ngược chuỗi",
//       "Hoặc có thể dùng built-in methods như split(), reverse(), join()",
//     ],
//   },
//   {
//     id: 2,
//     title: "Find the Missing Number",
//     difficulty: "Trung bình",
//     points: 200,
//     description: "Tìm số còn thiếu trong dãy 1→n.",
//     participants: 210,
//     successRate: 67,
//     tags: ["Array", "Math"],
//     comments: 8,
//     avgTime: "12 phút",
//     hints: [
//       "Công thức tổng của dãy số từ 1 đến n là n*(n+1)/2",
//       "Tính tổng thực tế và so sánh với tổng lý thuyết",
//     ],
//   },
//   {
//     id: 3,
//     title: "Two Sum Problem",
//     difficulty: "Khó",
//     points: 300,
//     description: "Tìm hai số trong mảng có tổng bằng target.",
//     participants: 125,
//     successRate: 40,
//     tags: ["Array", "HashMap"],
//     comments: 15,
//     avgTime: "18 phút",
//     hints: [
//       "Sử dụng HashMap để lưu các số đã duyệt qua",
//       "Với mỗi số, kiểm tra xem (target - số hiện tại) có trong HashMap không",
//     ],
//   },
//   {
//     id: 4,
//     title: "Valid Palindrome",
//     difficulty: "Dễ",
//     points: 100,
//     description: "Kiểm tra chuỗi có phải palindrome không.",
//     participants: 280,
//     successRate: 85,
//     tags: ["String", "Two Pointers"],
//     comments: 6,
//     avgTime: "10 phút",
//     hints: [],
//   },
//   {
//     id: 5,
//     title: "Binary Search",
//     difficulty: "Trung bình",
//     points: 200,
//     description: "Tìm kiếm phần tử trong mảng đã sắp xếp.",
//     participants: 190,
//     successRate: 72,
//     tags: ["Array", "Search"],
//     comments: 10,
//     avgTime: "15 phút",
//     hints: [],
//   },
// ];

// const leaderboard = [
//   { rank: 1, name: "Lê Văn A", score: 1250, avatar: "👨‍💻", change: 0 },
//   { rank: 2, name: "Nguyễn Thị B", score: 980, avatar: "👩‍💻", change: 1 },
//   { rank: 3, name: "Trần C", score: 850, avatar: "🧑‍💻", change: -1 },
//   { rank: 4, name: "johndoe", score: 700, avatar: "😎", change: 2 },
//   { rank: 5, name: "Mai D", score: 650, avatar: "👨‍🎓", change: 0 },
// ];

// const dailyQuests = [
//   {
//     id: 1,
//     title: "Hoàn thành 1 thử thách",
//     progress: 0,
//     target: 1,
//     reward: 50,
//     completed: false,
//   },
//   {
//     id: 2,
//     title: "Đăng 3 bình luận hữu ích",
//     progress: 1,
//     target: 3,
//     reward: 30,
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Duy trì streak",
//     progress: 1,
//     target: 1,
//     reward: 20,
//     completed: true,
//   },
// ];

// const ChallengeCard = ({ challenge, onClick, userProgress }) => {
//   const isCompleted = userProgress.completedChallenges.includes(challenge.id);
//   const isAttempted = userProgress.attemptedChallenges.includes(challenge.id);

//   const difficultyColors = {
//     Dễ: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
//     "Trung bình":
//       "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
//     Khó: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
//   };

//   return (
//     <div
//       onClick={() => onClick(challenge)}
//       className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer group relative overflow-hidden"
//     >
//       {isCompleted && (
//         <div className="absolute top-3 right-3">
//           <CheckCircle2 className="w-6 h-6 text-green-500" />
//         </div>
//       )}
//       {isAttempted && !isCompleted && (
//         <div className="absolute top-3 right-3">
//           <Clock className="w-6 h-6 text-yellow-500" />
//         </div>
//       )}

//       <div className="flex items-start justify-between mb-3">
//         <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors pr-8">
//           {challenge.title}
//         </h3>
//       </div>

//       <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
//         {challenge.description}
//       </p>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {challenge.tags.map((tag, i) => (
//           <span
//             key={i}
//             className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <div className="flex items-center gap-4">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               difficultyColors[challenge.difficulty]
//             }`}
//           >
//             {challenge.difficulty}
//           </span>
//           <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
//             <Trophy className="w-4 h-4" />
//             {challenge.points} điểm
//           </span>
//         </div>
//       </div>

//       <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
//         <span className="flex items-center gap-1">
//           <TrendingUp className="w-3 h-3" />
//           {challenge.participants} người tham gia
//         </span>
//         <span className="flex items-center gap-1">
//           <MessageSquare className="w-3 h-3" />
//           {challenge.comments} bình luận
//         </span>
//       </div>
//     </div>
//   );
// };

// const ProgressCard = ({ userData }) => {
//   const xpPercentage = (userData.xp / userData.xpToNextLevel) * 100;

//   return (
//     <div className="bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 rounded-2xl p-6 text-white shadow-xl">
//       <div className="flex items-center justify-between mb-4">
//         <div>
//           <h3 className="text-2xl font-bold">{userData.name}</h3>
//           <p className="text-indigo-200">Level {userData.level}</p>
//         </div>
//         <div className="text-4xl">😎</div>
//       </div>

//       <div className="mb-4">
//         <div className="flex justify-between text-sm mb-2">
//           <span>XP Progress</span>
//           <span className="font-semibold">
//             {userData.xp} / {userData.xpToNextLevel}
//           </span>
//         </div>
//         <div className="w-full bg-indigo-800 rounded-full h-3 overflow-hidden">
//           <div
//             className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full rounded-full transition-all duration-500"
//             style={{ width: `${xpPercentage}%` }}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
//           <div className="flex items-center gap-2 mb-1">
//             <Flame className="w-5 h-5 text-orange-400" />
//             <span className="text-sm">Streak</span>
//           </div>
//           <p className="text-2xl font-bold">{userData.streak} ngày</p>
//           <p className="text-xs text-indigo-200">
//             Dài nhất: {userData.longestStreak}
//           </p>
//         </div>
//         <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
//           <div className="flex items-center gap-2 mb-1">
//             <Trophy className="w-5 h-5 text-yellow-400" />
//             <span className="text-sm">Điểm</span>
//           </div>
//           <p className="text-2xl font-bold">{userData.totalPoints}</p>
//           <p className="text-xs text-indigo-200">Tổng tích lũy</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const BadgesSection = ({ badges }) => {
//   const [expanded, setExpanded] = useState(false);
//   const displayBadges = expanded ? badges : badges.slice(0, 3);

//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//         <Award className="w-6 h-6 text-yellow-500" />
//         Huy hiệu ({badges.filter((b) => b.unlocked).length}/{badges.length})
//       </h3>

//       <div className="grid grid-cols-3 gap-3 mb-4">
//         {displayBadges.map((badge) => (
//           <div
//             key={badge.id}
//             className={`relative group ${badge.unlocked ? "" : "opacity-40"}`}
//           >
//             <div
//               className={`text-4xl mb-2 transform transition-transform group-hover:scale-110 ${
//                 badge.unlocked ? "" : "grayscale"
//               }`}
//             >
//               {badge.icon}
//             </div>
//             <p className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium">
//               {badge.name}
//             </p>
//             {!badge.unlocked && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-4xl">🔒</div>
//               </div>
//             )}
//             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
//               {badge.description}
//             </div>
//           </div>
//         ))}
//       </div>

//       {badges.length > 3 && (
//         <Button
//           onClick={() => setExpanded(!expanded)}
//           className="w-full text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium flex items-center justify-center gap-1"
//         >
//           {expanded ? (
//             <>
//               Ẩn bớt <ChevronUp className="w-4 h-4" />
//             </>
//           ) : (
//             <>
//               Xem thêm <ChevronDown className="w-4 h-4" />
//             </>
//           )}
//         </Button>
//       )}
//     </div>
//   );
// };

// const DailyQuestsPanel = ({ quests }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//         <Calendar className="w-6 h-6 text-blue-500" />
//         Nhiệm vụ hàng ngày
//       </h3>

//       <div className="space-y-3">
//         {quests.map((quest) => (
//           <div
//             key={quest.id}
//             className={`p-4 rounded-lg border-2 transition-all ${
//               quest.completed
//                 ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700"
//                 : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
//             }`}
//           >
//             <div className="flex items-start justify-between mb-2">
//               <div className="flex-1">
//                 <p className="font-medium text-gray-900 dark:text-white text-sm">
//                   {quest.title}
//                 </p>
//                 <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
//                   Phần thưởng:{" "}
//                   <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
//                     +{quest.reward} XP
//                   </span>
//                 </p>
//               </div>
//               {quest.completed && (
//                 <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
//               )}
//             </div>

//             <div className="mt-2">
//               <div className="flex justify-between text-xs mb-1">
//                 <span className="text-gray-600 dark:text-gray-400">
//                   Tiến độ: {quest.progress}/{quest.target}
//                 </span>
//                 <span className="text-gray-600 dark:text-gray-400">
//                   {Math.round((quest.progress / quest.target) * 100)}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                 <div
//                   className={`h-full rounded-full transition-all ${
//                     quest.completed ? "bg-green-500" : "bg-blue-500"
//                   }`}
//                   style={{
//                     width: `${Math.min(
//                       (quest.progress / quest.target) * 100,
//                       100
//                     )}%`,
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const LeaderboardPanel = ({ leaderboard, currentUser }) => {
//   return (
//     <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
//       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//         <Trophy className="w-6 h-6 text-yellow-500" />
//         Bảng xếp hạng
//       </h3>

//       <div className="space-y-2">
//         {leaderboard.map((user) => {
//           const isCurrentUser = user.name === currentUser;
//           const rankColors = {
//             1: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white",
//             2: "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900",
//             3: "bg-gradient-to-r from-orange-400 to-orange-600 text-white",
//           };

//           return (
//             <div
//               key={user.rank}
//               className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
//                 isCurrentUser
//                   ? "bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-400 dark:border-indigo-600"
//                   : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//             >
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
//                   rankColors[user.rank] ||
//                   "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
//                 }`}
//               >
//                 {user.rank}
//               </div>

//               <div className="text-2xl">{user.avatar}</div>

//               <div className="flex-1 min-w-0">
//                 <p
//                   className={`font-semibold truncate ${
//                     isCurrentUser
//                       ? "text-indigo-700 dark:text-indigo-300"
//                       : "text-gray-900 dark:text-white"
//                   }`}
//                 >
//                   {user.name}
//                   {isCurrentUser && <span className="ml-2 text-xs">(Bạn)</span>}
//                 </p>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   {user.score.toLocaleString()} điểm
//                 </p>
//               </div>

//               {user.change !== 0 && (
//                 <div
//                   className={`flex items-center gap-1 text-sm font-medium ${
//                     user.change > 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {user.change > 0 ? (
//                     <ChevronUp className="w-4 h-4" />
//                   ) : (
//                     <ChevronDown className="w-4 h-4" />
//                   )}
//                   {Math.abs(user.change)}
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// const ChallengeDetailModal = ({ challenge, onClose, userProgress }) => {
//   const [showHints, setShowHints] = useState(false);
//   const [failedAttempts, setFailedAttempts] = useState(0);
//   const [showAiHelp, setShowAiHelp] = useState(false);
//   const [comments, setComments] = useState([
//     {
//       id: 1,
//       user: "Alice",
//       avatar: "👩‍💻",
//       text: "Đây là bài tập hay để luyện tập cơ bản!",
//       time: "2 giờ trước",
//       likes: 5,
//     },
//     {
//       id: 2,
//       user: "Bob",
//       avatar: "👨‍💻",
//       text: "Mình giải bằng cách dùng two pointer, rất hiệu quả!",
//       time: "5 giờ trước",
//       likes: 8,
//     },
//   ]);
//   const [newComment, setNewComment] = useState("");

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       setComments([
//         {
//           id: Date.now(),
//           user: "johndoe",
//           avatar: "😎",
//           text: newComment,
//           time: "Vừa xong",
//           likes: 0,
//         },
//         ...comments,
//       ]);
//       setNewComment("");
//     }
//   };

//   const handleAttemptFailed = () => {
//     const newAttempts = failedAttempts + 1;
//     setFailedAttempts(newAttempts);
//     if (newAttempts >= 3) {
//       setShowAiHelp(true);
//     }
//   };
//   const navigate = useNavigate();
//   const { courseId, lessonId, exerciseId } = useParams();

//   const handleClick = () => {
//     if (courseId && lessonId && exerciseId) {
//       // Điều hướng tới compiler của bài tập cụ thể
//       navigate(
//         `/courses/${courseId}/lessons/${lessonId}/exercise/${exerciseId}`
//       );
//     } else {
//       // Điều hướng chung tới compiler
//       navigate("/compiler");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//         <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
//                 {challenge.title}
//               </h2>
//               <div className="flex flex-wrap items-center gap-3">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                     challenge.difficulty === "Dễ"
//                       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//                       : challenge.difficulty === "Trung bình"
//                       ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
//                       : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
//                   }`}
//                 >
//                   {challenge.difficulty}
//                 </span>
//                 <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
//                   <Trophy className="w-4 h-4" />
//                   {challenge.points} điểm
//                 </span>
//                 <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   Trung bình: {challenge.avgTime}
//                 </span>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           {/* Description */}
//           <div>
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
//               Mô tả
//             </h3>
//             <p className="text-gray-700 dark:text-gray-300">
//               {challenge.description}
//             </p>
//           </div>

//           {/* Tags */}
//           <div className="flex flex-wrap gap-2">
//             {challenge.tags.map((tag, i) => (
//               <span
//                 key={i}
//                 className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full text-sm"
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//           {/* Stats */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                 Tỷ lệ thành công
//               </p>
//               <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
//                 {challenge.successRate}%
//               </p>
//             </div>
//             <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                 Người tham gia
//               </p>
//               <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
//                 {challenge.participants}
//               </p>
//             </div>
//           </div>

//           {/* Hints */}
//           {challenge.hints.length > 0 && (
//             <div className="border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
//               <button
//                 onClick={() => setShowHints(!showHints)}
//                 className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200 font-semibold mb-2"
//               >
//                 <Lightbulb className="w-5 h-5" />
//                 Gợi ý ({challenge.hints.length})
//                 {showHints ? (
//                   <ChevronUp className="w-4 h-4" />
//                 ) : (
//                   <ChevronDown className="w-4 h-4" />
//                 )}
//               </button>

//               {showHints && (
//                 <ul className="space-y-2 mt-3">
//                   {challenge.hints.map((hint, i) => (
//                     <li
//                       key={i}
//                       className="text-sm text-yellow-900 dark:text-yellow-100 flex gap-2"
//                     >
//                       <span className="font-bold">{i + 1}.</span>
//                       <span>{hint}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           )}

//           {/* AI Help (shows after 3 failed attempts) */}
//           {showAiHelp && (
//             <div className="border border-indigo-200 dark:border-indigo-800 rounded-lg p-4 bg-indigo-50 dark:bg-indigo-900/20">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <Zap className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">
//                     Trợ lý AI của bạn
//                   </h4>
//                   <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-3">
//                     Bạn đã thử {failedAttempts} lần. Đây là một số gợi ý để giúp
//                     bạn:
//                   </p>
//                   <ul className="text-sm text-indigo-900 dark:text-indigo-100 space-y-2">
//                     <li className="flex gap-2">
//                       <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span>Hãy xem lại logic xử lý biên (edge cases)</span>
//                     </li>
//                     <li className="flex gap-2">
//                       <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span>Kiểm tra kỹ điều kiện vòng lặp của bạn</span>
//                     </li>
//                     <li className="flex gap-2">
//                       <Star className="w-4 h-4 flex-shrink-0 mt-0.5" />
//                       <span>Thử debug từng bước với input nhỏ</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Action Buttons */}
//           <div className="flex gap-3">
//             <button
//               onClick={handleClick}
//               className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
//             >
//               Bắt đầu thử thách
//             </button>
//             <button
//               onClick={handleAttemptFailed}
//               className="px-6 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-3 rounded-lg transition-all"
//             >
//               Simulate Failed Attempt
//             </button>
//           </div>

//           {/* Comments Section */}
//           <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
//             <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
//               <MessageSquare className="w-5 h-5" />
//               Bình luận ({comments.length})
//             </h3>

//             {/* Add Comment */}
//             <div className="mb-6">
//               <div className="flex gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
//                   <span className="text-xl">😎</span>
//                 </div>
//                 <div className="flex-1">
//                   <textarea
//                     value={newComment}
//                     onChange={(e) => setNewComment(e.target.value)}
//                     placeholder="Chia sẻ suy nghĩ của bạn..."
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//                     rows="3"
//                   />
//                   <div className="flex justify-end mt-2">
//                     <button
//                       onClick={handleAddComment}
//                       disabled={!newComment.trim()}
//                       className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
//                     >
//                       <Send className="w-4 h-4" />
//                       Gửi bình luận
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Comments List */}
//             <div className="space-y-4">
//               {comments.map((comment) => (
//                 <div
//                   key={comment.id}
//                   className="flex gap-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
//                 >
//                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
//                     <span className="text-xl">{comment.avatar}</span>
//                   </div>
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-1">
//                       <span className="font-semibold text-gray-900 dark:text-white">
//                         {comment.user}
//                       </span>
//                       <span className="text-xs text-gray-500 dark:text-gray-400">
//                         {comment.time}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
//                       {comment.text}
//                     </p>
//                     <button className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
//                       <ThumbsUp className="w-3 h-3" />
//                       Hữu ích ({comment.likes})
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function EnhancedChallengesPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [difficultyFilter, setDifficultyFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("points");
//   const [selectedChallenge, setSelectedChallenge] = useState(null);
//   const [activeTab, setActiveTab] = useState("all"); // all, completed, attempted

//   const handleChallengeClick = (challenge) => {
//     setSelectedChallenge(challenge);
//   };

//   const filteredAndSortedChallenges = useMemo(() => {
//     let result = [...challenges];

//     // Filter by tab
//     if (activeTab === "completed") {
//       result = result.filter((ch) =>
//         userData.completedChallenges.includes(ch.id)
//       );
//     } else if (activeTab === "attempted") {
//       result = result.filter((ch) =>
//         userData.attemptedChallenges.includes(ch.id)
//       );
//     }

//     // Filter by search query
//     if (searchQuery) {
//       result = result.filter(
//         (ch) =>
//           ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           ch.tags.some((tag) =>
//             tag.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//       );
//     }

//     // Filter by difficulty
//     if (difficultyFilter !== "all") {
//       result = result.filter((ch) => ch.difficulty === difficultyFilter);
//     }

//     // Sort
//     result.sort((a, b) => {
//       switch (sortBy) {
//         case "points":
//           return b.points - a.points;
//         case "difficulty":
//           const diffOrder = { Dễ: 1, "Trung bình": 2, Khó: 3 };
//           return diffOrder[a.difficulty] - diffOrder[b.difficulty];
//         case "participants":
//           return b.participants - a.participants;
//         case "successRate":
//           return b.successRate - a.successRate;
//         default:
//           return 0;
//       }
//     });

//     return result;
//   }, [searchQuery, difficultyFilter, sortBy, activeTab]);

//   const clearFilters = () => {
//     setSearchQuery("");
//     setDifficultyFilter("all");
//     setSortBy("points");
//   };

//   const hasActiveFilters =
//     searchQuery || difficultyFilter !== "all" || sortBy !== "points";

//   const totalParticipants = challenges.reduce(
//     (sum, c) => sum + c.participants,
//     0
//   );
//   const avgSuccess = Math.round(
//     challenges.reduce((sum, c) => sum + c.successRate, 0) / challenges.length
//   );

//   return (
//     <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors min-h-screen">
//       {/* Header */}
//       <Header />

//       <main className="px-6 sm:px-14 lg:px-20 py-8">
//         <Breadcrumb
//           items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
//         />
//         {/* Hero Section */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
//               <span className="text-2xl">🧠</span>
//             </div>
//             <div>
//               <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
//                 Thử thách lập trình
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
//                 Rèn luyện kỹ năng và leo bảng xếp hạng cùng mọi người
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-8">
//           {/* Main Content */}
//           <section className="lg:col-span-8 space-y-6">
//             {/* Progress Card */}
//             <ProgressCard userData={userData} />

//             {/* Challenges Section */}
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
//               {/* Tabs */}
//               <div className="flex items-center gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
//                 {[
//                   { id: "all", label: "Tất cả", count: challenges.length },
//                   {
//                     id: "completed",
//                     label: "Đã hoàn thành",
//                     count: userData.completedChallenges.length,
//                   },
//                   {
//                     id: "attempted",
//                     label: "Đang thử",
//                     count: userData.attemptedChallenges.length,
//                   },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
//                       activeTab === tab.id
//                         ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
//                         : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
//                     }`}
//                   >
//                     {tab.label} ({tab.count})
//                   </button>
//                 ))}
//               </div>

//               {/* Filters */}
//               <div className="mb-6 space-y-4">
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   {/* Search input */}
//                   <div className="relative flex-1">
//                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//                     <Input
//                       type="text"
//                       placeholder="Tìm kiếm thử thách..."
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="pl-10"
//                     />
//                   </div>

//                   {/* Difficulty select */}
//                   <Select
//                     value={difficultyFilter}
//                     onValueChange={setDifficultyFilter}
//                   >
//                     <SelectTrigger className="w-[150px]">
//                       <SelectValue placeholder="Tất cả độ khó" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="all">Tất cả độ khó</SelectItem>
//                       <SelectItem value="Dễ">Dễ</SelectItem>
//                       <SelectItem value="Trung bình">Trung bình</SelectItem>
//                       <SelectItem value="Khó">Khó</SelectItem>
//                     </SelectContent>
//                   </Select>

//                   {/* Sort select */}
//                   <Select value={sortBy} onValueChange={setSortBy}>
//                     <SelectTrigger className="w-[180px]">
//                       <SelectValue placeholder="Sắp xếp theo" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="points">Điểm (cao → thấp)</SelectItem>
//                       <SelectItem value="difficulty">
//                         Độ khó (dễ → khó)
//                       </SelectItem>
//                       <SelectItem value="participants">
//                         Người tham gia
//                       </SelectItem>
//                       <SelectItem value="successRate">
//                         Tỷ lệ thành công
//                       </SelectItem>
//                     </SelectContent>
//                   </Select>

//                   {/* Clear filters button */}
//                   {hasActiveFilters && (
//                     <Button
//                       variant="outline"
//                       onClick={clearFilters}
//                       className="p-2"
//                     >
//                       <X className="h-4 w-4" />
//                     </Button>
//                   )}
//                 </div>

//                 {/* Active filters badges */}
//                 {hasActiveFilters && (
//                   <div className="flex flex-wrap gap-2 text-sm">
//                     {searchQuery && (
//                       <Badge
//                         variant="secondary"
//                         className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
//                       >
//                         Tìm kiếm: "{searchQuery}"
//                       </Badge>
//                     )}
//                     {difficultyFilter !== "all" && (
//                       <Badge
//                         variant="secondary"
//                         className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
//                       >
//                         Độ khó: {difficultyFilter}
//                       </Badge>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Challenges Grid */}
//               {filteredAndSortedChallenges.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {filteredAndSortedChallenges.map((ch, index) => (
//                     <div
//                       key={ch.id}
//                       className="transform transition-all duration-300 hover:scale-[1.02]"
//                       style={{ animationDelay: `${index * 50}ms` }}
//                     >
//                       <ChallengeCard
//                         challenge={ch}
//                         onClick={handleChallengeClick}
//                         userProgress={userData}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <div className="text-6xl mb-4">🔍</div>
//                   <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
//                     Không tìm thấy thử thách
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-400 mb-4">
//                     Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
//                   </p>
//                   <button
//                     onClick={clearFilters}
//                     className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                   >
//                     Xóa bộ lọc
//                   </button>
//                 </div>
//               )}
//             </div>
//           </section>

//           {/* Sidebar */}
//           <aside className="lg:col-span-4 space-y-6">
//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                       Tổng người tham gia
//                     </p>
//                     <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
//                       {totalParticipants.toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
//                     <span className="text-2xl">👥</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md border border-gray-100 dark:border-gray-700">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                       Tỷ lệ thành công TB
//                     </p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {avgSuccess}%
//                     </p>
//                   </div>
//                   <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
//                     <span className="text-2xl">🎯</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Daily Quests */}
//             <DailyQuestsPanel quests={dailyQuests} />

//             {/* Badges */}
//             <BadgesSection badges={userData.badges} />

//             {/* Leaderboard */}
//             <LeaderboardPanel
//               leaderboard={leaderboard}
//               currentUser={userData.name}
//             />
//           </aside>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />

//       {/* Challenge Detail Modal */}
//       {selectedChallenge && (
//         <ChallengeDetailModal
//           challenge={selectedChallenge}
//           onClose={() => setSelectedChallenge(null)}
//           userProgress={userData}
//         />
//       )}
//     </div>
//   );
// }

// ============================================
// FILE: src/pages/ChallengesPage.jsx (Main Page)
// ============================================
import React, { useState, useMemo } from "react";
import {
  userData,
  challenges,
  leaderboard,
  dailyQuests,
} from "@/mock/mockDataChallenge";
import { ChallengeCard } from "../components/challenges/ChallengeCard";
import { ProgressCard } from "../components/challenges/ProgressCard";
import { BadgesSection } from "../components/challenges/BadgesSection";
import { DailyQuestsPanel } from "../components/challenges/DailyQuestsPanel";
import { LeaderboardPanel } from "../components/challenges/LeaderboardPanel";
import { ChallengeDetailModal } from "../components/challenges/ChallengeDetailModal";
import { ChallengesFilter } from "../components/challenges/ChallengesFilter";
import { ChallengesTabs } from "../components/challenges/ChallengesTabs";
import { StatsCards } from "../components/challenges/StatsCards";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const handleChallengeClick = (challenge) => {
    setSelectedChallenge(challenge);
  };

  const filteredAndSortedChallenges = useMemo(() => {
    let result = [...challenges];

    if (activeTab === "completed") {
      result = result.filter((ch) =>
        userData.completedChallenges.includes(ch.id)
      );
    } else if (activeTab === "attempted") {
      result = result.filter((ch) =>
        userData.attemptedChallenges.includes(ch.id)
      );
    }

    if (searchQuery) {
      result = result.filter(
        (ch) =>
          ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ch.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    if (difficultyFilter !== "all") {
      result = result.filter((ch) => ch.difficulty === difficultyFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "points":
          return b.points - a.points;
        case "difficulty":
          const diffOrder = { Dễ: 1, "Trung bình": 2, Khó: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case "participants":
          return b.participants - a.participants;
        case "successRate":
          return b.successRate - a.successRate;
        default:
          return 0;
      }
    });

    return result;
  }, [searchQuery, difficultyFilter, sortBy, activeTab]);

  const clearFilters = () => {
    setSearchQuery("");
    setDifficultyFilter("all");
    setSortBy("points");
  };

  const hasActiveFilters =
    searchQuery || difficultyFilter !== "all" || sortBy !== "points";

  const totalParticipants = challenges.reduce(
    (sum, c) => sum + c.participants,
    0
  );
  const avgSuccess = Math.round(
    challenges.reduce((sum, c) => sum + c.successRate, 0) / challenges.length
  );

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors min-h-screen">
      <Header />
      <main className="px-6 sm:px-14 lg:px-20 py-8">
        <Breadcrumb
          items={[{ label: "Trang chủ", href: "/" }, { label: "Thử thách" }]}
        />
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧠</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Thử thách lập trình
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Rèn luyện kỹ năng và leo bảng xếp hạng cùng mọi người
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 space-y-6">
            <ProgressCard userData={userData} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <ChallengesTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                challenges={challenges}
                userData={userData}
              />

              <ChallengesFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                difficultyFilter={difficultyFilter}
                setDifficultyFilter={setDifficultyFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                clearFilters={clearFilters}
                hasActiveFilters={hasActiveFilters}
              />

              {filteredAndSortedChallenges.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredAndSortedChallenges.map((ch, index) => (
                    <div
                      key={ch.id}
                      className="transform transition-all duration-300 hover:scale-[1.02]"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ChallengeCard
                        challenge={ch}
                        onClick={handleChallengeClick}
                        userProgress={userData}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Không tìm thấy thử thách
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Thử điều chỉnh bộ lọc hoặc tìm kiếm của bạn
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              )}
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-6">
            <StatsCards
              totalParticipants={totalParticipants}
              avgSuccess={avgSuccess}
            />
            <DailyQuestsPanel quests={dailyQuests} />
            <BadgesSection badges={userData.badges} />
            <LeaderboardPanel
              leaderboard={leaderboard}
              currentUser={userData.name}
            />
          </aside>
        </div>
      </main>

      {selectedChallenge && (
        <ChallengeDetailModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          userProgress={userData}
        />
      )}
      <Footer />
    </div>
  );
}
