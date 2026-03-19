import { mockCourses } from "./courses";
import mockUsers from "./users.json";

export const COURSES = mockCourses.map(c => ({ id: c.id, label: c.title }));

const names = [
  "Minh Nguyen",
  "Quang Tran",
  "Anh Le",
  "Bao Pham",
  "Linh Ho",
  "Dat Do",
  "Trang Bui",
  "Khanh Vo",
  "Nhi Phan",
  "Cuong Ngo",
  "Huy Vu",
  "Phuc Phan",
  "Thao Dang",
  "An Pham",
  "Ly Do",
  "Tien Le",
  "Duc Nguyen",
  "Son Ho",
  "Tuan Tran",
  "My Le",
  "Nam Pham",
  "Quynh Vo",
  "Thinh Pham",
];

const LEVELS = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

// ---------------------------
// Generate fake leaderboard
// ---------------------------
function generateMockUsers() {
  const courseIds = COURSES.map((c) => c.id);

  return names.map((name, idx) => {
    const xp = Math.floor(1500 + Math.random() * 15000);
    const completed = Math.floor(10 + Math.random() * 300);
    const accuracy = Math.floor(60 + Math.random() * 40);
    const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];
    const streak = Math.floor(Math.random() * 45);

    return {
      id: idx + 1,
      name,
      xp,
      completed,
      accuracy,
      level,
      streak,
      course: courseIds[Math.floor(Math.random() * courseIds.length)],
      avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        name
      )}`,
    };
  });
}

export const MOCK_USERS = (() => {
  const generatedUsers = generateMockUsers();
  
  // Inject active user 
  const activeUser = mockUsers[0];
  generatedUsers.push({
    id: activeUser.id,
    name: activeUser.username,
    xp: activeUser.xp,
    completed: 120,
    accuracy: 95,
    level: "Diamond",
    streak: activeUser.streak,
    course: COURSES[0].id,
    avatarUrl: activeUser.avatar
  });
  
  // Sort leaderboard by XP (descending)
  return generatedUsers.sort((a, b) => b.xp - a.xp);
})();

// ---------- Set current user ----------
export const CURRENT_USER_ID = mockUsers[0].id;
