export const COURSES = [
  { id: "html-css", label: "HTML/CSS" },
  { id: "javascript", label: "JavaScript" },
  { id: "python", label: "Python" },
  { id: "java", label: "Java" },
  { id: "cpp", label: "C++" },
];

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

export const MOCK_USERS = generateMockUsers();

// ---------- Set current user ----------
export const CURRENT_USER_ID = 10;
