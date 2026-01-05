## Tổng quan

## 1. APIs Xác thực

### 1.1 Đăng nhập
**Endpoint**: `POST /auth/login`  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  },
  "access_token": "string",
  "refresh_token": "string"
}
```

### 1.2 Đăng ký
**Endpoint**: `POST /auth/register`  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "user": {
    "id": "number",
    "name": "string",
    "email": "string"
  },
  "access_token": "string",
  "refresh_token": "string"
}
```

### 1.3 Đăng xuất
**Endpoint**: `POST /auth/logout`  
**Headers**: `Authorization: Bearer {access_token}`  
**Request Body**: Không có  
**Response**:
```json
{
  "message": "string"
}
```

### 1.4 Làm mới Token
**Endpoint**: `POST /auth/refresh`  
**Request Body**:
```json
{
  "refresh_token": "string"
}
```
**Response**:
```json
{
  "access_token": "string",
  "refresh_token": "string"
}
```

### 1.5 Lấy Thông tin Cá nhân
**Endpoint**: `GET /auth/profile`  
**Headers**: `Authorization: Bearer {access_token}`  
**Response**: Object thông tin cá nhân người dùng

## 2. APIs Khóa học

### 2.1 Lấy Tất cả Khóa học
**Endpoint**: `GET /courses`  
**Headers**: `Authorization: Bearer {access_token}`  
**Response**: Mảng các object khóa học

### 2.2 Lấy Khóa học Theo Ngôn ngữ
**Endpoint**: `GET /courses/language/{langId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `langId` (number) - ID ngôn ngữ  
**Response**: Mảng các object khóa học được lọc theo ngôn ngữ

### 2.3 Lấy Khóa học Theo ID
**Endpoint**: `GET /courses/{id}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `id` (number) - ID khóa học  
**Response**: Object khóa học

### 2.4 Lấy Bài học Theo Khóa học
**Endpoint**: `GET /courses/{courseId}/lessons`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `courseId` (number) - ID khóa học  
**Response**: Mảng các object bài học

### 2.5 Lấy Bài học Theo ID
**Endpoint**: `GET /lessons/{id}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `id` (number) - ID bài học  
**Response**: Object bài học

### 2.6 Lấy Bài tập Theo Bài học
**Endpoint**: `GET /lessons/{lessonId}/exercises`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `lessonId` (number) - ID bài học  
**Response**: Mảng các object bài tập

## 3. API Ngôn ngữ

### 3.1 Lấy Tất cả Ngôn ngữ
**Endpoint**: `GET /languages`  
**Headers**: `Authorization: Bearer {access_token}`  
**Response**: Mảng các object ngôn ngữ

## 4. APIs Trình biên dịch

### 4.1 Chạy Code
**Endpoint**: `POST /compiler/run`  
**Headers**: `Authorization: Bearer {access_token}`  
**Request Body**:
```json
{
  "language": "string",
  "code": "string"
}
```
**Response**:
```json
{
  "output": "string"
}
```

### 4.2 Nộp Code
**Endpoint**: `POST /compiler/submit`  
**Headers**: `Authorization: Bearer {access_token}`  
**Request Body**:
```json
{
  "exerciseId": "number",
  "code": "string"
}
```
**Response**:
```json
{
  "success": "boolean",
  "passed": "boolean",
  "message": "string",
  "comments": "array",
  "warning": "boolean"
}
```

## 5. APIs Phản hồi

### 5.1 Lấy Phản hồi Bài tập
**Endpoint**: `GET /feedback/exercise/{exerciseId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `exerciseId` (string) - ID bài tập  
**Response**: Object phản hồi bài tập

### 5.2 Gửi Phản hồi
**Endpoint**: `POST /feedback`  
**Headers**: `Authorization: Bearer {access_token}`  
**Request Body**: Object dữ liệu phản hồi  
**Response**: Object phản hồi đã gửi

### 5.3 Gửi Phản hồi Khóa học
**Endpoint**: `POST /feedback/course`  
**Headers**: `Authorization: Bearer {access_token}`  
**Request Body**:
```json
{
  "courseId": "string",
  "rating": "number",
  "comment": "string",
  "anonymous": "boolean"
}
```
**Response**: Object phản hồi khóa học đã gửi

### 5.4 Lấy Phản hồi Khóa học
**Endpoint**: `GET /feedback/course/{courseId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `courseId` (string) - ID khóa học  
**Query Parameters**:
- `page` (number) - Số trang, mặc định 1
- `limit` (number) - Số item mỗi trang, mặc định 10
- `sortBy` (string) - Tiêu chí sắp xếp, mặc định "newest"  
**Response**: Dữ liệu phản hồi khóa học với phân trang

### 5.5 Lấy Thống kê Phản hồi
**Endpoint**: `GET /feedback/stats/{courseId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `courseId` (string) - ID khóa học  
**Response**: Object thống kê phản hồi

## 6. APIs Tiến độ (Đã định nghĩa nhưng chưa implement)

### 6.1 Lấy Tiến độ Người dùng
**Endpoint**: `GET /progress`  
**Headers**: `Authorization: Bearer {access_token}`  
**Response**: Object tiến độ người dùng

### 6.2 Lấy Tiến độ Bài học
**Endpoint**: `GET /progress/lessons/{lessonId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `lessonId` (number) - ID bài học  
**Response**: Object tiến độ bài học

### 6.3 Lấy Tiến độ Bài tập
**Endpoint**: `GET /progress/exercises/{exerciseId}`  
**Headers**: `Authorization: Bearer {access_token}`  
**Parameters**: `exerciseId` (number) - ID bài tập  
**Response**: Object tiến độ bài tập

## 7. Các Module chỉ có Mock Data

Các module sau hiện tại chỉ có mock data, chưa có real API endpoints:

### 7.1 Thách thức
- `fetchChallenges(filters)` - Chỉ mock
- `submitChallenge(challengeId, code, language)` - Chỉ mock
- `fetchChallengeLeaderboard(challengeId)` - Chỉ mock
- `fetchDailyQuests(userId)` - Chỉ mock
- `updateQuestProgress(userId, questId, newProgress)` - Chỉ mock
- `claimQuestReward(userId, questId)` - Chỉ mock
- `fetchChallengeComments(challengeId, page, limit)` - Chỉ mock
- `addChallengeComment(challengeId, userId, content)` - Chỉ mock
- `fetchChallengeStats(challengeId)` - Chỉ mock

### 7.2 Kỳ thi/Trắc nghiệm
- `fetchExamData(courseId)` - Chỉ mock
- `submitQuizAnswers(courseId, answers)` - Chỉ mock
- `submitTaskCode(courseId, taskId, code, language)` - Chỉ mock
- `fetchUserExamProgress(userId, courseId)` - Chỉ mock
- `updateExamProgress(userId, courseId, progressData)` - Chỉ mock
- `fetchAvailableCoursesForExam()` - Chỉ mock
- `fetchExamResults(userId, courseId)` - Chỉ mock
- `fetchExamStats(courseId)` - Chỉ mock
- `resetExamProgress(userId, courseId)` - Chỉ mock

### 7.3 Hồ sơ cá nhân
- `fetchUserProfile(userId)` - Chỉ mock
- `updateUserProfile(userId, profileData)` - Chỉ mock
- `fetchUserCourses(userId)` - Chỉ mock
- `fetchUserBadges(userId)` - Chỉ mock
- `fetchUserStats(userId)` - Chỉ mock
- `fetchRecentActivity(userId, limit)` - Chỉ mock
- `fetchUserAchievements(userId)` - Chỉ mock
- `updateUserXP(userId, xpGained)` - Chỉ mock
- `updateUserStreak(userId, newStreak)` - Chỉ mock

### 7.4 Xếp hạng
- `fetchLeaderboard(filters)` - Chỉ mock
- `fetchTopRankings(limit)` - Chỉ mock
- `fetchUserRanking(userId)` - Chỉ mock
- `fetchRankingStats()` - Chỉ mock
- `fetchUserComparison(userId, compareWithIds)` - Chỉ mock
- `updateUserScore(userId, newXP, newCompleted)` - Chỉ mock
- `fetchCourseRankings(courseId)` - Chỉ mock

## 8. Cấu hình HTTP Client

- **Base URL**: Có thể cấu hình qua `VITE_API_BASE_URL`
- **Timeout**: Có thể cấu hình qua `VITE_API_TIMEOUT` (mặc định: 10000ms)
- **Mock Mode**: Được điều khiển bởi `VITE_USE_MOCK_API` (mặc định: false)
- **JWT Tokens**: Lưu trong localStorage dưới dạng `access_token` và `refresh_token`
- **Tự động Làm mới Token**: Tự động làm mới token đã hết hạn khi gặp response 401
- **Request Interceptor**: Thêm header Authorization vào tất cả requests
- **Response Interceptor**: Xử lý làm mới token và các response lỗi

## 9. Các Kiểu Dữ liệu

### 9.1 Object Người dùng (User)
```json
{
  "id": "number",
  "name": "string",
  "email": "string",
  "avatar": "string (URL)",
  "cover": "string (URL)",
  "bio": "string",
  "level": "number",
  "xp": "number",
  "nextLevelXp": "number",
  "streak": "number",
  "joinDate": "string"
}
```

### 9.2 Object Ngôn ngữ (Language)
```json
{
  "id": "number",
  "name": "string"
}
```

### 9.3 Object Khóa học (Course)
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "lang_id": "number",
  "level": "string",
  "image": "string (URL)",
  "rating": "number",
  "duration": "string",
  "lessons": "number",
  "progress": "number",
  "isFavorite": "boolean",
  "intro": {
    "description": "array<string>",
    "techIcons": "array<string>",
    "outcomes": "array<string>"
  }
}
```

### 9.4 Object Bài học (Lesson)
```json
{
  "id": "number",
  "course_id": "number",
  "chap": "string",
  "title": "string",
  "content": "string",
  "example_code": "string",
  "language": "string",
  "readTime": "string",
  "difficulty": "string",
  "progress": "number"
}
```

### 9.5 Object Bài tập (Exercise)
```json
{
  "id": "number",
  "lesson_id": "number",
  "title": "string",
  "description": "string",
  "example_code": "string",
  "language": "string",
  "input": "string",
  "output": "string",
  "hint": "string"
}
```

### 9.6 Object Thách thức (Challenge)
```json
{
  "id": "number",
  "title": "string",
  "difficulty": "string",
  "points": "number",
  "description": "string",
  "participants": "number",
  "successRate": "number",
  "tags": "array<string>",
  "comments": "number",
  "avgTime": "string",
  "hints": "array<string>"
}
```

### 9.7 Object Kỳ thi (Exam/Quiz)
```json
{
  "courseId": "string",
  "courseTitle": "string",
  "courseDescription": "string",
  "totalLessons": "number",
  "estimatedTime": "string",
  "difficultyLevel": "string",
  "requirements": "array<string>",
  "instructions": "array<string>",
  "passingScore": "number",
  "badges": "array<string>",
  "basicQuiz": {
    "title": "string",
    "description": "string",
    "timeLimit": "number",
    "totalQuestions": "number",
    "difficulty": "string",
    "questions": "array<Question>"
  },
  "advancedTasks": "array<Task>"
}
```

### 9.8 Object Câu hỏi (Question)
```json
{
  "id": "number",
  "question": "string",
  "options": "array<string>",
  "correctAnswer": "number",
  "explanation": "string",
  "tags": "array<string>",
  "code": "string"
}
```

### 9.9 Object Nhiệm vụ (Task)
```json
{
  "id": "number",
  "title": "string",
  "description": "string",
  "difficulty": "string",
  "status": "string",
  "estimatedTime": "string",
  "skills": "array<string>",
  "example": {
    "input": "string",
    "output": "string"
  },
  "testCases": "array<TestCase>",
  "hints": "array<string>"
}
```

### 9.10 Object Test Case
```json
{
  "input": "string",
  "expected": "string"
}
```

### 9.11 Object Huy hiệu (Badge)
```json
{
  "id": "number",
  "name": "string",
  "icon": "string",
  "date": "string",
  "rarity": "string",
  "desc": "string"
}
```

### 9.12 Object Thống kê (Stats)
```json
{
  "lessonsDone": "number",
  "exercisesSolved": "number",
  "challengesCompleted": "number",
  "totalHours": "number",
  "rank": "number",
  "totalUsers": "number"
}
```

### 9.13 Object Hoạt động gần đây (Recent Activity)
```json
{
  "type": "string",
  "title": "string",
  "time": "string",
  "icon": "string"
}
```

### 9.14 Object Thành tựu (Achievement)
```json
{
  "id": "number",
  "title": "string",
  "desc": "string",
  "icon": "component",
  "color": "string"
}
```

### 9.15 Object Bảng xếp hạng (Leaderboard)
```json
{
  "rank": "number",
  "name": "string",
  "score": "number",
  "avatar": "string",
  "change": "number"
}
```

### 9.16 Object Nhiệm vụ hàng ngày (Daily Quest)
```json
{
  "id": "number",
  "title": "string",
  "progress": "number",
  "target": "number",
  "reward": "number",
  "completed": "boolean"
}
```

### 9.17 Object Phản hồi (Feedback)
```json
{
  "passed": "boolean",
  "score": "number",
  "testsPassed": "number",
  "totalTests": "number",
  "comments": "array<Comment>",
  "suggestions": "array<string>",
  "solutionCode": "string"
}
```

### 9.18 Object Khóa học người dùng (User Course)
```json
{
  "id": "number",
  "name": "string",
  "progress": "number",
  "icon": "string",
  "lessons": "number",
  "totalLessons": "number"
}
```
